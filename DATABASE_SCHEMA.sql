-- =====================================================
-- REVERSE CODING 2K26 - DATABASE SCHEMA
-- Supabase PostgreSQL Schema with Feature Flags & RBAC
-- =====================================================

-- =====================================================
-- 1. CONTEST CONFIGURATION (Singleton Table)
-- Controls global contest state from a single row
-- =====================================================
CREATE TABLE IF NOT EXISTS contest_config (
    id INT PRIMARY KEY DEFAULT 1,
    start_time TIMESTAMPTZ NOT NULL DEFAULT '2026-02-01T14:00:00+05:30',
    end_time TIMESTAMPTZ NOT NULL DEFAULT '2026-02-01T17:00:00+05:30',
    is_maintenance_mode BOOLEAN DEFAULT false,
    registration_open BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Enforce singleton pattern - only one row with id=1 allowed
    CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default config (run once)
INSERT INTO contest_config (id, start_time, end_time) 
VALUES (1, '2026-02-01T14:00:00+05:30', '2026-02-01T17:00:00+05:30')
ON CONFLICT (id) DO NOTHING;

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contest_config_updated_at
    BEFORE UPDATE ON contest_config
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- =====================================================
-- 2. USER PROFILES (Extended with Role)
-- =====================================================
-- If profiles table already exists, add role column:
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'participant';

-- If creating fresh:
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    name TEXT NOT NULL,
    institute TEXT,
    codeforces_id TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'participant' CHECK (role IN ('participant', 'admin', 'tester')),
    questions_status JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for role lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);


-- =====================================================
-- 3. PROBLEMS TABLE (Extended with Visibility)
-- =====================================================
-- If problems table exists, add visibility column:
ALTER TABLE problems 
ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'DRAFT' CHECK (visibility IN ('DRAFT', 'TEST', 'PRACTICE', 'ACTIVE', 'HIDDEN'));

-- If creating fresh:
CREATE TABLE IF NOT EXISTS problems (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
    status TEXT DEFAULT 'ACTIVE',
    
    -- DRAFT: Only visible to admins (still being written)
    -- TEST: Visible to admins and testers (ready for testing)
    -- PRACTICE: Available to everyone BEFORE contest (dummy questions for warmup)
    -- ACTIVE: Contest problems (visible during LIVE and after ENDED for review)
    -- HIDDEN: Hidden from everyone (e.g., broken problem)
    visibility TEXT DEFAULT 'DRAFT' CHECK (visibility IN ('DRAFT', 'TEST', 'PRACTICE', 'ACTIVE', 'HIDDEN')),
    
    intel TEXT,
    constraints JSONB DEFAULT '{}',
    
    -- Codeforces integration
    cf_contest_id TEXT,
    cf_index TEXT,
    
    -- NOTE: blackbox_script moved to separate 'problem_scripts' table for security
    -- The script is only accessible via service role (server-side actions)
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for visibility filtering
CREATE INDEX IF NOT EXISTS idx_problems_visibility ON problems(visibility);


-- =====================================================
-- 4. RATE LIMITING TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL,
    request_count INT DEFAULT 1,
    window_start TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, endpoint)
);


-- =====================================================
-- 5. PROBLEM SCRIPTS (Secure - Separate from Problems)
-- Stores blackbox scripts with restricted access
-- Only accessible via service role (server-side actions)
-- =====================================================
CREATE TABLE IF NOT EXISTS problem_scripts (
    id SERIAL PRIMARY KEY,
    problem_id INT UNIQUE REFERENCES problems(id) ON DELETE CASCADE,
    blackbox_script TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by problem_id
CREATE INDEX IF NOT EXISTS idx_problem_scripts_problem_id ON problem_scripts(problem_id);

-- Trigger for updated_at
CREATE TRIGGER update_problem_scripts_updated_at
    BEFORE UPDATE ON problem_scripts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- =====================================================
-- 6. SUBMISSIONS LOG (Optional - for analytics)
-- =====================================================
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    problem_id INT REFERENCES problems(id) ON DELETE CASCADE,
    input TEXT,
    output TEXT,
    is_correct BOOLEAN,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);


-- =====================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_scripts ENABLE ROW LEVEL SECURITY;



-- =====================================================
-- 7.5 COLUMN-LEVEL SECURITY
-- =====================================================



-- Profiles: Users can read/update their own profile
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Contest Config: Everyone can read, only service role can update
CREATE POLICY "Everyone can read contest config"
    ON contest_config FOR SELECT
    TO authenticated
    USING (true);

-- Problems: Complex policy based on visibility and role
-- Note: Service role bypasses RLS, so server actions using service key will work
-- For client-side queries, you'd need these policies:

CREATE POLICY "Admins can see all problems"
    ON problems FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Testers can see TEST and ACTIVE problems"
    ON problems FOR SELECT
    USING (
        visibility IN ('TEST', 'ACTIVE')
        AND EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'tester')
        )
    );

CREATE POLICY "Participants see ACTIVE problems during contest"
    ON problems FOR SELECT
    USING (
        visibility = 'ACTIVE'
        AND EXISTS (
            SELECT 1 FROM contest_config 
            WHERE NOW() >= start_time 
            AND NOW() <= end_time
            AND is_maintenance_mode = false
        )
    );

-- Problem Scripts: ONLY service role can access (no client-side access)
-- This ensures blackbox scripts are never exposed to users
-- Server actions use supabaseServer with service role key which bypasses RLS

CREATE POLICY "Only admins can view scripts (for admin panel)"
    ON problem_scripts FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Only admins can insert scripts"
    ON problem_scripts FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Only admins can update scripts"
    ON problem_scripts FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Only admins can delete scripts"
    ON problem_scripts FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );


-- =====================================================
-- 8. HELPER FUNCTIONS
-- =====================================================

-- Function to check if contest is live
CREATE OR REPLACE FUNCTION is_contest_live()
RETURNS BOOLEAN AS $$
DECLARE
    config contest_config%ROWTYPE;
BEGIN
    SELECT * INTO config FROM contest_config WHERE id = 1;
    
    IF config.is_maintenance_mode THEN
        RETURN false;
    END IF;
    
    RETURN NOW() >= config.start_time AND NOW() <= config.end_time;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get contest state
CREATE OR REPLACE FUNCTION get_contest_state()
RETURNS TEXT AS $$
DECLARE
    config contest_config%ROWTYPE;
BEGIN
    SELECT * INTO config FROM contest_config WHERE id = 1;
    
    IF config.is_maintenance_mode THEN
        RETURN 'MAINTENANCE';
    END IF;
    
    IF NOW() < config.start_time THEN
        RETURN 'UPCOMING';
    ELSIF NOW() > config.end_time THEN
        RETURN 'ENDED';
    ELSE
        RETURN 'LIVE';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check user role
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID)
RETURNS TEXT AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role FROM profiles WHERE id = user_id;
    RETURN COALESCE(user_role, 'participant');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- =====================================================
-- 9. SAMPLE DATA FOR TESTING
-- =====================================================

-- Set yourself as admin (replace with your user ID from auth.users)
-- UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';

-- Sample problems with different visibility states
-- INSERT INTO problems (title, description, difficulty, visibility, intel, constraints)
-- VALUES 
--     ('Practice: Hello World', 'Simple practice problem', 'EASY', 'PRACTICE', 'Warmup!', '{"input": "A number", "output": "The number doubled"}'),
--     ('Contest Problem 1', 'Find the sum of two numbers', 'EASY', 'ACTIVE', 'Basic arithmetic', '{"input": "Two integers", "output": "Their sum"}'),
--     ('Contest Problem 2', 'Reverse a string', 'MEDIUM', 'ACTIVE', 'String manipulation', '{"input": "A string", "output": "Reversed string"}'),
--     ('Test Problem', 'For internal testing', 'MEDIUM', 'TEST', 'Testing only', '{}'),
--     ('Draft Problem', 'Work in progress', 'HARD', 'DRAFT', 'Not ready yet', '{}');


-- =====================================================
-- QUICK REFERENCE: Contest Phase Management
-- =====================================================
-- 
-- VISIBILITY VALUES:
--   DRAFT    -> Only admins (work in progress)
--   TEST     -> Admins + testers (ready for testing)
--   PRACTICE -> Everyone BEFORE contest (dummy warmup questions)
--   ACTIVE   -> Contest problems (visible during LIVE + after ENDED)
--   HIDDEN   -> Nobody (broken/removed problems)
--
-- PHASE 1: Pre-Contest (Practice Mode)
--   1. Set start_time to future date
--   2. Add PRACTICE problems for participants to warmup
--   3. Add ACTIVE problems (real contest) - hidden until LIVE
--   4. Participants see PRACTICE problems with countdown banner
--   5. Admins see everything
--
-- PHASE 2: Go Live
--   - When clock hits start_time, status auto-changes to 'LIVE'
--   - PRACTICE problems hidden, ACTIVE problems revealed
--   - No action needed - it's automatic!
--
-- PHASE 3: Emergency Hide Problem
--   UPDATE problems SET visibility = 'HIDDEN' WHERE id = <problem_id>;
--
-- PHASE 4: Maintenance Mode (Emergency Pause)
--   UPDATE contest_config SET is_maintenance_mode = true WHERE id = 1;
--
-- PHASE 5: Contest Ended
--   - Automatic when NOW() > end_time
--   - ACTIVE + PRACTICE problems visible for review
--   - Black box still works (for learning)
--   - Or end manually: UPDATE contest_config SET end_time = NOW() WHERE id = 1;
-- =====================================================


-- =====================================================
-- MIGRATION: Move blackbox_script to problem_scripts
-- Run this ONCE if you have existing data in problems.blackbox_script
-- =====================================================
-- 
-- Step 1: Migrate existing scripts to new table
-- INSERT INTO problem_scripts (problem_id, blackbox_script)
-- SELECT id, blackbox_script 
-- FROM problems 
-- WHERE blackbox_script IS NOT NULL;
--
-- Step 2: Drop the old column (AFTER verifying migration)
-- ALTER TABLE problems DROP COLUMN IF EXISTS blackbox_script;
--
-- =====================================================

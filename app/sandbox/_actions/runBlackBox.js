import vm from 'vm';
import { createClient } from '@supabase/supabase-js';

//cache the scripts for problems (reduce latency of fetching from DB) => persist in RAM untill server restart - on vercel untill cold restart, like after 3-5 mins of inactivity vercel kill the container on hobby plan (no gurantees :/)

const globalScriptCache = new Map(); //<problemid,vm.script> bytecode of script stored

// using supabase-js as we dont need auth here - service role key has access to everything
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

function parseInput(val) {
    // Check if it's a pure number
    const num = Number(val);
    if (!isNaN(num)) return num;

    // Check if it's JSON (Array/Object)
    if (val.startsWith('[') || val.startsWith('{')) {
        try {
            return JSON.parse(val);
        } catch {
            // If parse fails, treat as string
        }
    }

    // Fallback to string
    return val;
}

export async function runBlackBox(input, problemId) {
    console.log(`Running black box for problem ${problemId} with input:`, input);


    let script = globalScriptCache.get(problemId);
    if (!script) {
        console.log(`Cache miss for problem ${problemId}, fetching from DB.`);
        //fetch from DB separate problem_scripts table for security
        const { data, error } = await supabase
            .from('problem_scripts')
            .select('blackbox_script')
            .eq('problem_id', problemId)
            .single();

        if (error || !data?.blackbox_script) {
            throw new Error('Failed to fetch black box script from DB');
        }

        const code = `result = (function(input) {\n${data.blackbox_script}\n})(input);`;

        try {
            script = new vm.Script(code);
            globalScriptCache.set(problemId, script);
        } catch (e) {
            console.error('Error compiling black box script:', e);
            throw new Error('Black box script has syntax errors');
        }

        // //compile script to bytecode
        // script = new vm.Script(code, {
        //     filename: `blackbox_problem_${problemId}.js`,
        //     lineOffset: 0,
        //     columnOffset: 0,
        //     displayErrors: true,
        // });
    }

    //create a new context for each exe to avoid state sharing
    const sandbox = {
        input: parseInput(input),
        result: null,
        Math: Math, //access to Math library
        console: { log: () => { } } // to prevetn log clutter in server logs, diabled
    };

    try {
        const context = vm.createContext(sandbox);

        // script is already a vm.Script - parsed and compiled, so this just runs it and its fast, as the compiled bytecode is cached    
        // time limit 50ms execution time to avoid infinite loops and brute force input space
        script.runInContext(context, { timeout: 50 });

        return { output: sandbox.result };
    } catch (err) {
        if (err.message?.includes('timed out')) {
            return { error: "Execution Timed Out (Infinite loop detected?)" };
        }
        return { error: "Runtime Error" };
    }
}
# Reverse Coding 2k26

A website/platform for hosting the OG - **CCxEnigma: TESSERACT** event — a unique programming challenge where participants reverse engineer the logic from input-output patterns.

You can use this platform for hosting your reverse coding event too.

## About the Event

In Reverse Coding, participants are presented with a **black box interface**:

- They provide **inputs** to the system and observe the corresponding **outputs**
- The actual problem statement is **not given** — participants must deduce the underlying logic
- Based on the patterns they discover, participants **submit code** that implements the reverse-engineered logic

This challenges participants to think critically, recognize patterns, and demonstrate their problem-solving skills without explicit instructions.


## Somethings about the platform:

- The platform capable of full **Registration**, display **Leaderboard**, and most important thing -> Running the **Black Box**.

- The main thing is that participant should not get the **code** behind the black box in any case. So I used this architecture:

- The live leaderboard architecture:
   -  "Whole Function" Memoization: Utilizes Next.js 15's `use cache` to memoize the entire aggregation pipeline (Codeforces API + Supabase DB + Merge Logic), reducing database load to zero during high-traffic refreshes.

   - Serverless-Safe Rate Limiting: Implements a custom 10s cacheLife profile to act as a statistical buffer against Vercel's concurrent instance scaling, ensuring zero risk of hitting Codeforces' strict API limits.

## Tech Stack

Design (by [@MrQuantum1915](https://github.com/MrQuantum1915)): [Figma](https://www.figma.com/site/lJRYGJ69cRKp5DLjasc3ft/Website?node-id=0-1&t=noOlhMHRDrxEjRDG-1)

Framework: [Next.js](https://nextjs.org/) 14+ (App Router)

Styling: [Tailwind](https://tailwindcss.com/) CSS (Custom Cyberpunk/Neon Config)

3D Rendering: [Three.js](https://threejs.org/)

Fonts: `Orbitron`, `Share Tech Mono`

## Getting Started

### Prerequisites

Ensure you have Node.js 18+ installed.

### Installation

1. Clone the repository:

```bash 
git clone https://github.com/MrQuantum1915/reverse-coding-2k26.git
cd reverse-coding-2k26
```


2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
#or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.



## Project Structure

```
app/
├── page.tsx          # Home page
├── about/            # About page
├── login/            # Login page
├── sandbox/          # Black box interface for testing inputs/outputs
├── team/             # Team page
└── components/       # Reusable components
```

## Contribution Guidelines

1. Fork the repository and create your branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes, then commit them:

   ```bash
   git commit -m "Add feature: description of feature"
   ```

3. Push to your forked repository:

   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a pull request to the *main* branch of the repository.

Before submitting, ensure your code adheres to our coding standards and passes all linting and testing checks.

Run Build command before submitting pull request

```bash
npm run build
#or
pnpm build
```

## License

See [LICENSE](LICENSE) for details.

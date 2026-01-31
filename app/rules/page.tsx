
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import VoidParticles from "../components/VoidParticles";
import Snowfall from "react-snowfall";
import { Inter, Orbitron } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
});
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Section = ({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 p-6 md:p-8 mb-8 relative group"
  >
    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
    
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-400 tracking-wider flex items-center gap-3">
        <span className="w-2 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
        {title}
    </h2>
    <div className="text-gray-300 space-y-4 leading-relaxed font-light">
      {children}
    </div>
  </motion.div>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-bold text-white mb-3 mt-6 border-b border-white/10 pb-2 inline-block">
        {children}
    </h3>
);

export default function RulesPage() {
  return (
    <div className={`relative pt-24 pb-12 ${inter.className}`}>
      <div className="fixed inset-0 z-0 overflow-hidden">
        <Image
          src="/tesseract-bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <VoidParticles />
        <Snowfall color="#a5f3fc" snowflakeCount={40} style={{ opacity: 0.4 }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
        >
            <h1 className={`${orbitron.className} text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 via-cyan-400 to-cyan-600/10 mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]`}>
            GUIDELINES & RULES
            </h1>
            <div className="h-1 w-128 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
        </motion.div>

        <Section title="1. Event Guidelines" delay={0.2}>
          <SubHeading>The Objective</SubHeading>
          <p>
            Tesseract’26 is a Reverse Coding challenge. Unlike standard competitive programming, 
            you are not provided with a problem statement. Instead, you face a <span className="text-cyan-400 font-semibold">&quot;Black Box&quot;</span>, 
            a compiled executable with hidden logic.
          </p>

          <SubHeading>The Workflow</SubHeading>
          <ul className="list-none space-y-4 ml-2">
            {[
                { title: "Probe", desc: <span>Access the specific challenge via the <Link href="/sandbox" className="text-cyan-400 font-semibold">&quot;<u>SANDBOX</u>&quot;</Link> page. You will see an Input field.</span> },
                { title: "Analyze", desc: "Feed inputs into the Black Box and observe the resulting Outputs.", example: "Example: Input 2 → Output 5; Input 3 → Output 10." },
                { title: "Deduce", desc: <span>Use inductive reasoning to determine the function <em className="text-cyan-400">f(x)</em> or algorithm that transforms the Input to the Output.</span> },
                { title: "Implement", desc: "Write a solution in C++, Java, or Python that replicates this logic." },
                { title: "Submit", desc: "Submit your source code to the corresponding problem on Codeforces." }
            ].map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start bg-white/5 p-4 border border-white/5 hover:border-cyan-500/30 transition-colors">
                    <span className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-sm border border-cyan-500/30">
                        {idx + 1}
                    </span>
                    <div>
                        <strong className="text-white block mb-1">{item.title}</strong>
                        <span className="text-sm md:text-base">{item.desc}</span>
                        {item.example && <div className="mt-2 text-sm text-gray-400 italic bg-black/30 p-2 border-l-2 border-cyan-500/50">{item.example}</div>}
                    </div>
                </li>
            ))}
          </ul>

          <SubHeading>Platform Architecture</SubHeading>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-black/40 p-5 border border-red-500/20">
                    <h4 className="text-red-400 font-bold mb-2">The Probe Interface</h4>
                    <p className="text-sm">Hosted on this website. This is strictly for testing and analysis.</p>
                </div>
                <div className="bg-black/40 p-5 border border-green-500/20">
                    <h4 className="text-green-400 font-bold mb-2">The Judge</h4>
                    <p className="text-sm">Hosted on Codeforces. This is for validation. Your code must pass hidden test cases on Codeforces that may be significantly larger (in magnitude) than what the Probe Interface allows.</p>
                </div>
            </div>
        </Section>

        <Section title="2. Technical Rules" delay={0.4}>
          <SubHeading>A. Solution Integrity (The &quot;No Hard-Coding&quot; Rule)</SubHeading>
          <ul className="list-disc list-inside space-y-2 ml-4 marker:text-cyan-500">
            <li>
                <strong className="text-white">Generalization is Mandatory:</strong> Your code must implement the general algorithm/mathematical formula.
            </li>
            <li>
                <strong className="text-red-400">Prohibited:</strong> &quot;Hard-coding&quot; solutions or using &quot;Lookup Tables&quot; (e.g., massive if-else chains or HashMaps mapping specific inputs to outputs) is strictly forbidden.
            </li>
            <li>
                <strong className="text-yellow-400">Consequence:</strong> Even if a Lookup Table solution passes the Codeforces system tests, it will be disqualified during the manual code review phase.
            </li>
          </ul>

          <SubHeading>B. Interface Usage</SubHeading>
          <ul className="list-disc list-inside space-y-2 ml-4 marker:text-cyan-500">
             <li>
                <strong className="text-white">Rate Limiting:</strong> The Black Box interface is rate-limited to prevent server overload. <span className="text-cyan-300 font-semibold">You may only execute <u>1 request every 2 seconds</u> on the Sandbox.</span> Automated scripts/bots designed to brute-force the input space (e.g., sending 1000 requests/second) will automatically be blocked by the system.
            </li>
            <li>
                <strong className="text-white">Input Constraints:</strong> The Black Box on the website may handle smaller constraints (e.g., <em className="text-cyan-200">N ≤ 100</em>) for demonstration. Note that constraints will be explicitly mentioned on the Black Box interface. The Codeforces system tests may test up to <em className="text-cyan-200">N ≤ 10<sup>9</sup></em> or <em className="text-cyan-200">10<sup>18</sup></em>. Your logic must hold for the larger constraints.
            </li>
          </ul>

          <SubHeading>C. Competition Rules</SubHeading>
           <ul className="list-disc list-inside space-y-2 ml-4 marker:text-cyan-500">
            <li>
                <strong className="text-white">Individual Participation:</strong> This is a solo event. Collaboration, team-play, or sharing logic with other participants is prohibited.
            </li>
            <li className="list-none ml-0 mt-4">
                <strong className="text-white block mb-2">AI & Tools:</strong>
                <ul className="list-disc list-inside ml-6 space-y-1 text-gray-400">
                    <li>Use of standard IDEs and local documentation is <span className="text-green-400 font-bold">allowed</span>.</li>
                    <li>Use of Generative AI (ChatGPT, Gemini, etc.) to generate the code is <span className="text-red-400 font-bold">prohibited</span>.</li>
                    <li>Using automated tools to interact with the Codeforces judge is <span className="text-red-400 font-bold">strictly prohibited</span>.</li>
                </ul>
            </li>
          </ul>
        </Section>

        <Section title="3. Disqualification Criteria" delay={0.6}>
            <div className="bg-red-500/10 border border-red-500/30 p-6">
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-red-200">
                        <span className="text-red-500">⚠</span> Plagiarism detected.
                    </li>
                    <li className="flex items-center gap-3 text-red-200">
                        <span className="text-red-500">⚠</span> Attempting to attack, flood, or exploit the Black Box web infrastructure.
                    </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-red-500/20 text-center text-sm text-gray-400 font-semibold tracking-wide uppercase">
                    The decision of the organizers and judges is final and binding.
                </div>
            </div>
        </Section>

      </div>
    </div>
  );
}
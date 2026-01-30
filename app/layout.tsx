// import { SpeedInsights } from '@vercel/speed-insights/next';
// import { Analytics } from '@vercel/analytics/next';
import { Orbitron, Fira_Code } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import SmoothScroll from './components/SmoothScroll';
import ConditionalFooter from './components/conditional-footer';

export const metadata = {
    title: 'Tesseract',
    description: 'CCxEnigma Tesseract - A Reverse Coding Challenge Platform',
};

const orbitron = Orbitron({
    subsets: ['latin'],
    variable: '--font-orbitron',
})

const firaCode = Fira_Code({
    subsets: ['latin'],
    variable: '--font-fira-code',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${orbitron.className} ${orbitron.variable} ${firaCode.variable} bg-black text-white w-full min-h-screen`}>
                <SmoothScroll />
                <Navbar />
                {children}
                <ConditionalFooter />
                {/* <Analytics />
                <SpeedInsights /> */}
            </body>
        </html>
    );
}
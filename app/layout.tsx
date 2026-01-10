import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { Orbitron } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import SmoothScroll from './components/SmoothScroll';

export const metadata = {
    title: 'Tesseract',
    description: 'CCxEnigma Tesseract - A Reverse Coding Challenge Platform',
};

const orbitron = Orbitron({
    subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${orbitron.className} bg-black text-white w-full min-h-screen`}>
                <SmoothScroll />
                <Navbar />
                {children}
                <Footer />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
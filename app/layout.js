import { Inter } from "next/font/google";
import { AudioProvider } from '@/components/Audiocontext'; 
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MelodyAI-your music companion",
  description: "your revolutionary music companion that transcends the boundaries of conventional music players. Immerse yourself in a symphony of cutting-edge technology and unparalleled elegance as MelodyAI combines the timeless magic of music with the intelligence of a built-in AI assistant. Sonic Symphony, AI Maestro, Global Harmony.",
  icons: {
    icon: "/icon.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><AudioProvider>{children}</AudioProvider><SpeedInsights /></body>
    </html>
  );
}

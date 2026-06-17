import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import StarBackground from "@/components/StarBackground";

export const metadata: Metadata = {
  title: "Cosmic Dice — Real Randomness from Space",
  description: "The first dice game powered by verifiable cosmic randomness harvested from orbital infrastructure via SpaceComputer cTRNG.",
  openGraph: {
    title: "Cosmic Dice — Real Randomness from Space",
    description: "The first dice game powered by verifiable cosmic randomness harvested from orbital infrastructure via SpaceComputer cTRNG.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Cosmic Dice Showcase Banner",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased select-none">
        <Providers>
          {/* Animated cosmic starfield */}
          <StarBackground />
          
          {/* Main content wrapper */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

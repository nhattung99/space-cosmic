'use client';

import React from 'react';
import CosmicDice from '@/components/CosmicDice';
import AboutSection from '@/components/AboutSection';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={`flex flex-col min-h-screen ${spaceGrotesk.className}`}>
      
      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
        
        {/* Hero Banner Section */}
        <section className="text-center mt-6 mb-12 max-w-3xl z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/20 px-3.5 py-1.5 text-xs font-mono font-medium text-purple-300 mb-6 uppercase tracking-wider">
            🌌 Orbitport cTRNG Showcase
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-4 uppercase font-display bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            COSMIC DICE
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-semibold tracking-wide max-w-xl mx-auto">
            Roll a dice powered by real cosmic randomness harvested from orbital infrastructure.
          </p>
          
          <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide mt-3 max-w-md mx-auto">
            Every roll uses entropy generated beyond Earth and delivered through SpaceComputer's cTRNG service.
          </p>
        </section>

        {/* Dice Game Component */}
        <section className="w-full flex justify-center z-10">
          <CosmicDice />
        </section>

        {/* About Section */}
        <section className="w-full z-10">
          <AboutSection />
        </section>

      </main>

      {/* Page Footer */}
      <footer className="border-t border-space-border/40 bg-black/60 backdrop-blur-md py-8 mt-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono space-y-4 sm:space-y-0">
          <div>
            © 2026 COSMIC DICE. Powered by SpaceComputer cTRNG.
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://docs.spacecomputer.io" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-purple-400 transition-colors"
            >
              Orbitport Docs ↗
            </a>
            <a 
              href="https://accounts.spacecomputer.io" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-purple-400 transition-colors"
            >
              API Credentials ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

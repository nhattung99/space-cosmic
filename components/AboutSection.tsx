'use client';

import React from 'react';
import { Sparkles, Orbit, ShieldCheck, Database } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="w-full max-w-4xl mx-auto mt-16 px-4">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-sky-400 bg-clip-text text-transparent uppercase tracking-wider">
          About SpaceComputer & cTRNG
        </h2>
        <p className="text-sm text-slate-400 mt-2 font-medium">
          Verifiable randomness generated beyond Earth's atmosphere.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What is SpaceComputer */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Orbit className="w-24 h-24 text-purple-500" />
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Orbit className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">What is SpaceComputer?</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            SpaceComputer is a decentralized space network that provides compute resources, satellite APIs, and orbital telemetry tools. It runs micro-services directly on satellites, allowing developers to execute secure computations in low-Earth orbit.
          </p>
        </div>

        {/* What is cTRNG */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-sky-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Sparkles className="w-24 h-24 text-sky-500" />
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">What is cTRNG?</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            cTRNG (Cosmic True Random Number Generator) is SpaceComputer's signature service that harvests entropy from physical cosmic rays. Spacecraft sensors intercept high-energy particles to generate cryptographically signed, absolute true random seeds.
          </p>
        </div>

        {/* Why Randomness Matters */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck className="w-24 h-24 text-emerald-500" />
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Why Randomness Matters?</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Standard software generators are pseudo-random, meaning they follow predictable algorithms. In gaming, lotteries, and security protocols, pseudo-randomness can be exploited. True randomness ensures fairness that cannot be front-run or manipulated.
          </p>
        </div>

        {/* Why Space Randomness is Valuable */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Database className="w-24 h-24 text-amber-500" />
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Why Orbital Randomness?</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Orbital telemetry is physically isolated from Earth-bound atmospheric and electromagnetic interference. Intercepting cosmic particles in space yields a pure source of physical entropy, creating seeds that are signed by enclaves onboard the spacecraft.
          </p>
        </div>
      </div>

      {/* Attestation Banner */}
      <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-purple-950/20 via-slate-900/40 to-sky-950/20 border border-purple-500/20 text-center">
        <p className="text-sm text-purple-200 leading-relaxed">
          🌌 <span className="font-semibold text-white">Ecosystem Attestation:</span> The randomness used in this application originates from SpaceComputer's orbital infrastructure, delivering verifiably unique roll outcomes for each game round.
        </p>
      </div>
    </section>
  );
}

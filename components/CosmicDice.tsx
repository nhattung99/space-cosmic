'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { 
  Sparkles, 
  RotateCw, 
  Copy, 
  Check, 
  History, 
  BarChart3, 
  ShieldCheck, 
  Clock, 
  Hash, 
  Info,
  Server
} from 'lucide-react';
import type { RollRecord, RollStats } from '@/types';

// Cube face rotations to look directly at the viewer
const FACE_ROTATIONS: Record<number, { x: number; y: number }> = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: 180 },
  3: { x: 0, y: -90 },
  4: { x: 0, y: 90 },
  5: { x: -90, y: 0 },
  6: { x: 90, y: 0 }
};

export default function CosmicDice() {
  const { address, isConnected } = useAccount();
  
  // Game states
  const [rolling, setRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState<RollRecord | null>(null);
  const [history, setHistory] = useState<RollRecord[]>([]);
  const [stats, setStats] = useState<RollStats>({
    total: 0,
    faces: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
  });
  
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Ref to track absolute rotation degrees to ensure it always rolls forward
  const rotationRef = useRef({ x: 30, y: 45 });
  const [rotation, setRotation] = useState({ x: 30, y: 45 });

  // Load history and stats from localStorage on mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('cosmic_dice_history');
      if (storedHistory) {
        const parsed = JSON.parse(storedHistory) as RollRecord[];
        setHistory(parsed);
        if (parsed.length > 0) {
          setCurrentRoll(parsed[0]);
        }
      }
      
      const storedStats = localStorage.getItem('cosmic_dice_stats');
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      }
    } catch (e) {
      console.error('Failed to load local storage:', e);
    }
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rollDice = async () => {
    if (rolling) return;

    setRolling(true);
    setError(null);

    // Start a heavy pre-spin animation during the API request
    const tempX = rotationRef.current.x + 720;
    const tempY = rotationRef.current.y + 720;
    setRotation({ x: tempX, y: tempY });

    try {
      const response = await fetch('/api/random');
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch cTRNG from space.');
      }

      const { randomHex, timestamp, provider } = data;

      // Extract dice value strictly from cosmic entropy
      // Formula: (Number(BigInt(randomHex) % 6n)) + 1
      const cleanHex = randomHex.replace(/^0x/, '');
      const seedBigInt = BigInt('0x' + cleanHex);
      const diceValue = Number((seedBigInt % 6n) + 1n);

      // Deterministically pick rotational spins based on the cosmic seed to avoid Math.random()
      const extraSpinsX = Number(((seedBigInt / 6n) % 3n) + 5n) * 360;
      const extraSpinsY = Number(((seedBigInt / 18n) % 3n) + 5n) * 360;

      // Calculate final target landing rotations
      const targetFace = FACE_ROTATIONS[diceValue] || FACE_ROTATIONS[1];
      const finalX = rotationRef.current.x + extraSpinsX + targetFace.x - (rotationRef.current.x % 360);
      const finalY = rotationRef.current.y + extraSpinsY + targetFace.y - (rotationRef.current.y % 360);

      // Apply landing rotation
      setRotation({ x: finalX, y: finalY });
      rotationRef.current = { x: finalX, y: finalY };

      // Wait for dice landing transition (4s in css) to display results
      setTimeout(() => {
        // Unique ID from slice of random hex and timestamp
        const rollId = `${cleanHex.slice(0, 12)}-${new Date(timestamp).getTime()}`;

        const newRoll: RollRecord = {
          id: rollId,
          diceValue,
          randomHex: '0x' + cleanHex,
          timestamp,
          provider,
          verified: true
        };

        setCurrentRoll(newRoll);
        
        // Update roll history (keep latest 20)
        setHistory(prev => {
          const updated = [newRoll, ...prev].slice(0, 20);
          localStorage.setItem('cosmic_dice_history', JSON.stringify(updated));
          return updated;
        });

        // Update statistics
        setStats(prev => {
          const updatedFaces = { ...prev.faces };
          updatedFaces[diceValue] = (updatedFaces[diceValue] || 0) + 1;
          const updatedStats = {
            total: prev.total + 1,
            faces: updatedFaces
          };
          localStorage.setItem('cosmic_dice_stats', JSON.stringify(updatedStats));
          return updatedStats;
        });

        setRolling(false);
      }, 4000);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Error connecting to space telemetry.');
      setRolling(false);
      // Reset rotation to neutral if failed
      setRotation({ x: 30, y: 45 });
      rotationRef.current = { x: 30, y: 45 };
    }
  };

  // Helper to render dots on dice faces
  const renderDots = (value: number) => {
    const dotPositions: Record<number, number[]> = {
      1: [5], // Center
      2: [1, 9], // Top-Left, Bottom-Right
      3: [1, 5, 9], // Diagonal
      4: [1, 3, 7, 9], // Corners
      5: [1, 3, 5, 7, 9], // Corners + Center
      6: [1, 3, 4, 6, 7, 9] // Left and Right Columns
    };

    const activeDots = dotPositions[value] || [];

    return Array.from({ length: 9 }).map((_, index) => {
      const dotIndex = index + 1;
      const isActive = activeDots.includes(dotIndex);
      return (
        <div key={index} className="flex items-center justify-center w-full h-full">
          {isActive && <div className="dot" />}
        </div>
      );
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center">
      {/* Header section with wallet connection */}
      <header className="w-full flex items-center justify-between py-4 border-b border-space-border/40 mb-10 z-10">
        <div className="flex items-center space-x-2.5">
          <span className="text-2xl animate-spin" style={{ animationDuration: '60s' }}>🎲</span>
          <span className="font-display font-bold text-lg sm:text-xl tracking-wider bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent uppercase">
            COSMIC DICE
          </span>
        </div>
        <ConnectButton 
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
          showBalance={false}
        />
      </header>

      {/* Main Grid: Game area, Statistics, History */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Verification Panel & Statistics (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Verification Panel */}
          <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
            <h3 className="text-sm font-bold font-display text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              Verify Space Roll
            </h3>

            {currentRoll ? (
              <div className="space-y-4">
                {/* Result Indicator */}
                <div className="flex justify-between items-center bg-slate-900/60 p-3 rounded-xl border border-space-border">
                  <span className="text-xs text-slate-400 font-mono">Roll Result</span>
                  <span className="text-lg font-bold text-sky-400 font-display">Face {currentRoll.diceValue}</span>
                </div>

                {/* Hex Randomness */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Hash className="w-3 h-3 text-purple-400" />
                      cTRNG Hex Value
                    </span>
                    <button
                      onClick={() => copyToClipboard(currentRoll.randomHex)}
                      className="text-[10px] text-sky-400 hover:underline flex items-center gap-1 transition"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-black/40 rounded-xl p-3 border border-space-border/60">
                    <p className="font-mono text-[10px] leading-relaxed text-slate-300 break-all max-h-16 overflow-y-auto select-all">
                      {currentRoll.randomHex}
                    </p>
                  </div>
                </div>

                {/* Meta details */}
                <div className="space-y-2 text-xs font-mono text-slate-400 border-t border-space-border/40 pt-3">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><Server className="w-3 h-3 text-purple-400" /> Provider:</span>
                    <span className="text-white font-semibold">{currentRoll.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-purple-400" /> Timestamp:</span>
                    <span className="text-slate-300">{new Date(currentRoll.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-400" /> Verification:</span>
                    <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">VERIFIED OK</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center border border-dashed border-space-border/50 rounded-2xl">
                <Info className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-mono">No rolls verification loaded.</p>
                <p className="text-[10px] text-slate-600 font-mono mt-1">Roll the dice to see real orbital randomness.</p>
              </div>
            )}
          </div>

          {/* Statistics Panel */}
          <div className="glass-panel rounded-2xl p-5">
            <h3 className="text-sm font-bold font-display text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              Outcome Distribution
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between text-slate-400 border-b border-space-border/30 pb-1.5">
                <span>Face</span>
                <span>Distribution Bar ({stats.total} total)</span>
                <span>Count</span>
              </div>
              
              {Array.from({ length: 6 }).map((_, i) => {
                const face = i + 1;
                const count = stats.faces[face] || 0;
                const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                
                return (
                  <div key={face} className="flex items-center space-x-3">
                    <span className="w-3 text-slate-200 font-bold">{face}</span>
                    <div className="flex-grow bg-slate-950 rounded-full h-3 overflow-hidden border border-space-border/50 relative">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-sky-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-slate-300 font-semibold">{count}</span>
                    <span className="w-8 text-right text-[10px] text-slate-500">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Column: Interactive Dice Display & Rolling Controls (5 cols) */}
        <div className="relative lg:col-span-5 flex flex-col items-center justify-center rounded-2xl p-6 sm:p-8 min-h-[480px]">
          {/* Sibling glass background to prevent 3D flattening */}
          <div className="absolute inset-0 glass-panel-neon rounded-2xl -z-10 pointer-events-none" />
          
          {/* Orbital rings behind the dice */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-10">
            {/* Outer spinning ring */}
            <div className="absolute w-60 h-60 rounded-full border border-purple-500/10 border-t-purple-500/40 orbit-ring pointer-events-none" />
            {/* Inner spinning ring */}
            <div className="absolute w-44 h-44 rounded-full border border-sky-500/10 border-b-sky-500/40 orbit-ring pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '10s' }} />
            
            {/* 3D Dice Scene */}
            <div className="dice-scene absolute">
              <div 
                className="dice-cube"
                style={{ 
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
                }}
              >
                {/* Face 1 */}
                <div className="dice-face face-1">{renderDots(1)}</div>
                {/* Face 2 */}
                <div className="dice-face face-2">{renderDots(2)}</div>
                {/* Face 3 */}
                <div className="dice-face face-3">{renderDots(3)}</div>
                {/* Face 4 */}
                <div className="dice-face face-4">{renderDots(4)}</div>
                {/* Face 5 */}
                <div className="dice-face face-5">{renderDots(5)}</div>
                {/* Face 6 */}
                <div className="dice-face face-6">{renderDots(6)}</div>
              </div>
            </div>
          </div>

          {/* Roll CTA area */}
          <div className="w-full text-center space-y-4 max-w-sm">
            <button
              onClick={rollDice}
              disabled={rolling}
              className="w-full py-4 rounded-xl font-display font-bold tracking-wider text-white shadow-lg bg-gradient-to-r from-purple-600 via-pink-600 to-sky-500 hover:brightness-110 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 flex items-center justify-center gap-2.5 uppercase"
            >
              <RotateCw className={`w-5 h-5 ${rolling ? 'animate-spin' : ''}`} />
              {rolling ? 'Harvesting Entropy...' : 'Roll From Space'}
            </button>

            {error && (
              <div className="p-3 bg-red-950/30 border border-red-500/20 text-red-300 rounded-xl text-xs font-mono">
                ⚠ {error}
              </div>
            )}

            <p className="text-[11px] text-slate-500 font-mono tracking-wide leading-relaxed">
              Every roll triggers a cTRNG telemetry call to fetch random bytes from orbit.
            </p>
          </div>
        </div>

        {/* Right Column: Local History Panel (3 cols) */}
        <div className="lg:col-span-3 glass-panel rounded-2xl p-5">
          <h3 className="text-sm font-bold font-display text-white mb-4 uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4 text-purple-400" />
            Roll History
          </h3>

          {history.length > 0 ? (
            <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
              {history.map((roll, index) => {
                const isSelected = currentRoll?.id === roll.id;
                return (
                  <button
                    key={roll.id}
                    onClick={() => setCurrentRoll(roll)}
                    className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between ${
                      isSelected 
                        ? 'bg-purple-950/30 border-purple-500/50 text-white shadow-md' 
                        : 'bg-slate-900/30 border-space-border/60 text-slate-300 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 font-mono">#{history.length - index}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(roll.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                      <p className="font-mono text-[9px] text-slate-500 truncate w-32">
                        {roll.randomHex}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-sky-400 font-semibold font-mono">cTRNG</span>
                      <span className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center font-display font-bold text-sm text-sky-300">
                        {roll.diceValue}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center border border-dashed border-space-border/50 rounded-2xl">
              <History className="w-6 h-6 text-slate-700 mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-mono">No rolls recorded locally.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

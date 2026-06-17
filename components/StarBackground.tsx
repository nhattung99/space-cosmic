'use client';

import React, { useEffect, useState } from 'react';

export default function StarBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden stars-container">
      {/* Parallax Star Layers */}
      <div className="absolute inset-0 stars-layer-1 opacity-60" />
      <div className="absolute inset-0 opacity-40 animate-twinkle" style={{ animationDuration: '4s' }}>
        <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 rounded-full bg-sky-400 blur-[0.5px]" />
        <div className="absolute top-[60%] left-[80%] w-1 h-1 rounded-full bg-purple-400 blur-[0.5px]" />
        <div className="absolute top-[80%] left-[15%] w-1.5 h-1.5 rounded-full bg-white opacity-80" />
        <div className="absolute top-[35%] left-[75%] w-1 h-1 rounded-full bg-white opacity-60" />
      </div>
      
      {/* Cosmic Nebula Glow */}
      <div className="absolute top-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[100px] pointer-events-none" />
    </div>
  );
}

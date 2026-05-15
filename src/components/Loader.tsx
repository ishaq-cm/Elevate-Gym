'use client';

import { useEffect, useState } from 'react';

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [showGym, setShowGym] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [letters, setLetters] = useState<string[]>([]);
  const fullText = "ELEVATE";

  useEffect(() => {
    // Letter by letter animation
    fullText.split('').forEach((char, i) => {
      setTimeout(() => {
        setLetters(prev => [...prev, char]);
      }, 120 * i);
    });

    // Fades
    const gymTimer = setTimeout(() => setShowGym(true), 900);
    const tagTimer = setTimeout(() => setShowTagline(true), 1200);
    const fadeTimer = setTimeout(() => setVisible(false), 3000);

    return () => {
      clearTimeout(gymTimer);
      clearTimeout(tagTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center transition-opacity duration-400 ${!visible ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        <div className="flex justify-center mb-2">
          {letters.map((char, i) => (
            <span key={i} className="font-headline text-7xl md:text-8xl text-white tracking-wider">
              {char}
            </span>
          ))}
        </div>
        <div className={`font-headline text-3xl text-primary transition-opacity duration-500 ${showGym ? 'opacity-100' : 'opacity-0'}`}>
          GYM
        </div>
        <div className={`font-body text-xs text-muted mt-4 uppercase tracking-[0.25em] transition-opacity duration-500 ${showTagline ? 'opacity-100' : 'opacity-0'}`}>
          Forge Your Best Self
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 bg-primary animate-progress" />
    </div>
  );
}

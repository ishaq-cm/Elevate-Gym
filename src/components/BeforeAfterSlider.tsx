'use client';

import { useState, useRef, MouseEvent, TouchEvent } from 'react';

interface Props {
  before: string;
  after: string;
  text: string;
  member: string;
}

export default function BeforeAfterSlider({ before, after, text, member }: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      setPosition(Math.min(Math.max(x, 0), 100));
    }
  };

  const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] overflow-hidden group border border-border rounded-2xl"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* After Image (Background) */}
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Before Image (Overlay) */}
      <div 
        className="absolute inset-0 overflow-hidden" 
        style={{ width: `${position}%` }}
      >
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover grayscale" style={{ width: `${100 / (position / 100)}%` }} />
      </div>

      {/* Divider */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-2 border-white rounded-full bg-background/50 flex items-center justify-center">
          <span className="text-white text-xs">
            <i className="fa-solid fa-arrows-left-right"></i>
          </span>
        </div>
      </div>

      {/* Bottom Overlay */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="font-body italic text-[13px] text-white">{text}</div>
        <div className="font-body text-[11px] text-muted uppercase mt-1">{member}</div>
      </div>
    </div>
  );
}

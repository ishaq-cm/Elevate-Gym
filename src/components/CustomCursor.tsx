'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    const animate = () => {
      const lerp = 0.1;
      circlePos.current.x += (mousePos.current.x - circlePos.current.x) * lerp;
      circlePos.current.y += (mousePos.current.y - circlePos.current.y) * lerp;

      if (circleRef.current) {
        circleRef.current.style.left = `${circlePos.current.x - 21}px`;
        circleRef.current.style.top = `${circlePos.current.y - 21}px`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div id="custom-cursor-dot" ref={dotRef} className="hidden md:block" />
      <div 
        id="custom-cursor-circle" 
        ref={circleRef} 
        className={`hidden md:block ${isActive ? 'active' : ''}`} 
      />
    </>
  );
}

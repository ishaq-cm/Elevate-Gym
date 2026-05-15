'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 2400, label: 'Active Members', suffix: '+' },
  { value: 18, label: 'Expert Trainers', suffix: '+' },
  { value: 0, label: 'Always Open', display: '24/7' },
  { value: 0, label: 'Google Rating', display: '4.9★' },
];

export default function StatsBar() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 1800;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts(stats.map(s => Math.floor(s.value * easeOut)));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [hasStarted]);

  return (
    <div 
      ref={containerRef}
      className="bg-card border-y border-border py-10 md:py-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-0">
        {stats.map((stat, i) => (
          <div key={i} className={`flex flex-col items-center text-center ${i % 2 === 0 ? 'border-r md:border-r-0' : ''} md:border-r border-primary/20 last:border-r-0`}>
            <div className="font-headline text-4xl md:text-7xl text-primary mb-1 md:mb-2">
              {stat.display ? stat.display : `${counts[i]}${stat.suffix}`}
            </div>
            <div className="font-body text-[9px] md:text-[11px] text-muted uppercase tracking-[0.2em]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

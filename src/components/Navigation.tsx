'use client';

import { useEffect, useState } from 'react';

const links = [
  { name: 'Home', hash: '#home', sub: 'Start Here' },
  { name: 'Programs', hash: '#programs', sub: 'Train Hard' },
  { name: 'Trainers', hash: '#trainers', sub: 'Meet The Team' },
  { name: 'Schedule', hash: '#schedule', sub: 'Class Times' },
  { name: 'Pricing', hash: '#pricing', sub: 'Get Started' },
  { name: 'Gallery', hash: '#gallery', sub: 'See Results' },
  { name: 'Contact', hash: '#contact', sub: 'Reach Us' },
];

export default function Navigation({ activeHash }: { activeHash: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full h-[68px] z-[999] transition-all duration-350 flex items-center justify-between px-6 md:px-12 ${scrolled ? 'bg-background/94 border-b border-border backdrop-blur-md' : 'bg-transparent'}`}>
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="font-headline text-2xl tracking-[0.15em] text-white">ELEVATE</span>
          <span className="font-headline text-2xl tracking-[0.15em] text-primary">GYM</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.hash}
              href={link.hash}
              className={`text-[11px] uppercase tracking-[0.2em] font-body transition-all relative py-2 ${activeHash === link.hash ? 'text-primary' : 'text-muted hover:text-white'}`}
            >
              {link.name}
              {activeHash === link.hash && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />
              )}
            </a>
          ))}
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-6">
          <a
            href="#pricing"
            className="hidden sm:block bg-primary text-white text-[11px] uppercase tracking-[0.25em] px-6 py-2.5 hover:bg-red-dark transition-all transform hover:scale-105"
          >
            Join Now
          </a>
          
          {/* Hamburger */}
          <button 
            onClick={() => setMenuOpen(true)}
            className="lg:hidden flex flex-col gap-[6px] w-6 group"
          >
            <span className="w-full h-[1.5px] bg-white group-hover:bg-primary transition-colors" />
            <span className="w-full h-[1.5px] bg-white group-hover:bg-primary transition-colors" />
            <span className="w-full h-[1.5px] bg-white group-hover:bg-primary transition-colors" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[1000] bg-background transition-transform duration-500 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-red-glow rounded-full blur-[120px] pointer-events-none" />
        
        <button 
          onClick={closeMenu}
          className="absolute top-8 right-8 text-3xl text-muted hover:text-white"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="h-full flex flex-col items-center justify-center gap-10">
          {links.map((link, i) => (
            <a
              key={link.hash}
              href={link.hash}
              onClick={closeMenu}
              className={`group flex flex-col items-center transition-all duration-300 transform ${menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="font-headline text-5xl md:text-6xl text-white group-hover:text-primary transition-colors">
                {link.name}
              </span>
              <span className="font-body text-xs text-primary uppercase tracking-[0.2em] mt-1">
                {link.sub}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

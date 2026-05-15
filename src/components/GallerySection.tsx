'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const categories = ['All', 'Gym Floor', 'Equipment', 'Classes', 'Trainers', 'Events'];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=85", category: "Gym Floor", height: "h-[300px]" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=85", category: "Gym Floor", height: "h-[420px]" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85", category: "Gym Floor", height: "h-[250px]" },
  { src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=85", category: "Equipment", height: "h-[350px]" },
  { src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&q=85", category: "Equipment", height: "h-[280px]" },
  { src: "https://images.unsplash.com/photo-1549476464-37392f717541?w=700&q=85", category: "Equipment", height: "h-[400px]" },
  { src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=85", category: "Classes", height: "h-[320px]" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&q=85", category: "Classes", height: "h-[220px]" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85", category: "Classes", height: "h-[380px]" },
  { src: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=700&q=85", category: "Trainers", height: "h-[300px]" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&q=85", category: "Trainers", height: "h-[420px]" },
  { src: "https://images.unsplash.com/photo-1549476464-37392f717541?w=700&q=85", category: "Trainers", height: "h-[260px]" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85", category: "Events", height: "h-[340px]" },
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=85", category: "Events", height: "h-[290px]" },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);

  const filteredImages = galleryImages.map((img, index) => ({
    ...img,
    originalIndex: index,
    isVisible: activeCategory === 'All' || img.category === activeCategory
  }));

  const visibleImages = filteredImages.filter(img => img.isVisible);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    const currentPos = visibleImages.findIndex(img => img.originalIndex === lightboxIndex);
    const nextPos = (currentPos + 1) % visibleImages.length;
    setLightboxIndex(visibleImages[nextPos].originalIndex);
  }, [lightboxIndex, visibleImages]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    const currentPos = visibleImages.findIndex(img => img.originalIndex === lightboxIndex);
    const prevPos = (currentPos - 1 + visibleImages.length) % visibleImages.length;
    setLightboxIndex(visibleImages[prevPos].originalIndex);
  }, [lightboxIndex, visibleImages]);

  const handleClose = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev, handleClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) handlePrev();
    else if (deltaX < -50) handleNext();
  };

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-headline text-5xl md:text-8xl text-white">
          INSIDE <span className="text-primary">ELEVATE</span>
        </h1>
        <p className="font-body text-xs md:text-sm text-muted uppercase tracking-[0.25em] mt-4">
          The space. The sweat. The results.
        </p>
      </section>

      {/* Sticky Filters */}
      <div className="sticky top-[68px] z-[900] bg-background/90 backdrop-blur-md border-b border-border py-4 px-6 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex justify-center gap-4 md:gap-8 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] md:text-xs uppercase tracking-[0.2em] font-body transition-all py-2 px-1 relative ${
                activeCategory === cat ? 'text-primary' : 'text-muted hover:text-white'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="max-w-7xl mx-auto px-1.5 py-6">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-1.5">
          {filteredImages.map((img, i) => (
            <div
              key={i}
              className={`relative mb-1.5 break-inside-avoid overflow-hidden cursor-pointer group rounded-sm transition-all duration-300 ${
                img.isVisible 
                  ? 'opacity-100 scale-100 h-auto visible' 
                  : 'opacity-0 scale-92 h-0 pointer-events-none invisible m-0 overflow-hidden'
              }`}
              onClick={() => setLightboxIndex(img.originalIndex)}
            >
              <img
                src={img.src}
                alt={img.category}
                className={`w-full ${img.height} object-cover transition-transform duration-500 group-hover:scale-106`}
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-all duration-300 flex items-center justify-center">
                <i className="fa-solid fa-magnifying-glass text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
              </div>
              <div className="absolute bottom-3 left-3 bg-primary text-white text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm font-body">
                {img.category}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[2000] bg-black/96 flex items-center justify-center select-none"
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl p-2 z-50"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* Navigation */}
          <button 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 hover:bg-primary text-white flex items-center justify-center transition-all z-50 group"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          >
            <i className="fa-solid fa-arrow-left text-xl md:text-2xl"></i>
          </button>
          <button 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 hover:bg-primary text-white flex items-center justify-center transition-all z-50 group"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
          >
            <i className="fa-solid fa-arrow-right text-xl md:text-2xl"></i>
          </button>

          {/* Image */}
          <div 
            className="relative max-w-[90vw] max-h-[88vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={galleryImages[lightboxIndex].src} 
              alt="Gallery Preview" 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
            />
            
            {/* Meta */}
            <div className="absolute -bottom-12 flex flex-col items-center gap-2">
              <span className="text-[10px] text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full uppercase tracking-widest font-body">
                {galleryImages[lightboxIndex].category}
              </span>
              <span className="text-[11px] text-muted font-body">
                {visibleImages.findIndex(img => img.originalIndex === lightboxIndex) + 1} / {visibleImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

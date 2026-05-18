
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 'post-1',
    title: '5 Essential Compound Lifts for Massive Strength',
    summary: 'Master these movements to transform your physique and build real-world power.',
    date: 'March 15, 2026',
    author: 'Coach Vikram Singh',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    content: `
      Compound exercises are the foundation of any serious strength training program. Unlike isolation movements, compound lifts engage multiple muscle groups and joints simultaneously, allowing you to move heavier loads and trigger greater hormonal responses for growth.

      1. The Squat: Often called the king of all exercises. It targets your entire lower body and core.
      2. The Deadlift: The ultimate test of raw strength, engaging your entire posterior chain.
      3. The Bench Press: The gold standard for upper body pushing strength.
      4. The Overhead Press: Essential for building stable, powerful shoulders.
      5. The Row: Crucial for a strong back and balanced physique.

      Start light, master the form, and watch your strength skyrocket. At ELEVATE, we prioritize these movements in our Weight Training program.
    `
  },
  {
    id: 'post-2',
    title: 'The Truth About Cardio: How Much Do You Really Need?',
    summary: 'Ditch the hours on the treadmill and learn how to optimize your cardiovascular health efficiently.',
    date: 'March 10, 2026',
    author: 'Coach Priya Nair',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    content: `
      Many people believe that hours of steady-state cardio are necessary for fat loss. While cardio is great for heart health, excessive amounts can actually hinder muscle retention and lead to burnout.

      Efficiency is key. High-Intensity Interval Training (HIIT) can provide similar cardiovascular benefits to longer steady-state sessions in half the time. By alternating between short bursts of intense activity and recovery periods, you keep your metabolic rate elevated long after the workout is over.

      We recommend a mix: 2-3 sessions of HIIT per week combined with daily low-intensity movement like walking. This balance ensures heart health without sacrificing strength gains.
    `
  },
  {
    id: 'post-3',
    title: 'Mental Fortitude: The Key to Long-Term Fitness Success',
    summary: 'Why your mindset is more important than your training split for staying consistent.',
    date: 'March 5, 2026',
    author: 'Coach Aryan Kapoor',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    content: `
      Fitness is 20% mechanics and 80% psychology. You can have the perfect program, but if you don't have the discipline to follow it, you won't see results. 

      The most successful members at ELEVATE aren't those with the best genetics; they are the ones who show up on the days they don't feel like it. Building mental fortitude means viewing challenges as opportunities to grow. 

      Tips for staying consistent:
      - Set small, measurable goals.
      - Find your "why" – a reason deeper than just aesthetics.
      - Embrace the grind. The "boring" basics are what lead to extraordinary results.
    `
  }
];

export default function BlogSection() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const selectedPost = blogPosts.find(p => p.id === selectedPostId);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center mb-12 md:mb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=85")' }}
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-headline text-5xl md:text-8xl text-white">THE <span className="text-primary">BLOG</span></h1>
          <p className="font-body text-xs md:text-sm text-muted uppercase tracking-widest mt-4">Insights, tips, and stories from the forge.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-24">
        {!selectedPostId ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {blogPosts.map((post) => (
              <div 
                key={post.id} 
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300"
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={post.img} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] text-primary uppercase tracking-widest">{post.date}</span>
                    <span className="text-[10px] text-muted uppercase tracking-widest">{post.author}</span>
                  </div>
                  <h3 className="font-headline text-2xl text-white mb-4 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="font-body text-xs text-muted leading-relaxed mb-6">{post.summary}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedPostId(post.id)}
                    className="w-full border-primary/30 text-primary hover:bg-primary hover:text-white transition-all text-[10px] uppercase tracking-widest rounded-xl"
                  >
                    Read Article
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedPostId(null)}
              className="text-muted hover:text-white mb-8 text-[10px] uppercase tracking-widest"
            >
              ← Back to all articles
            </Button>
            
            <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-12">
              <img src={selectedPost?.img} alt={selectedPost?.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            <div className="px-2 md:px-0">
              <div className="flex gap-4 items-center mb-6">
                <span className="text-xs text-primary font-bold uppercase tracking-widest">{selectedPost?.author}</span>
                <span className="text-xs text-muted uppercase tracking-widest">•</span>
                <span className="text-xs text-muted uppercase tracking-widest">{selectedPost?.date}</span>
              </div>
              <h2 className="font-headline text-4xl md:text-6xl text-white mb-10 leading-tight">{selectedPost?.title}</h2>
              <div className="font-body text-sm md:text-base text-muted leading-loose whitespace-pre-line">
                {selectedPost?.content}
              </div>
            </div>

            <div className="mt-20 pt-12 border-t border-border flex justify-between items-center">
              <div className="flex gap-4">
                <Button size="icon" variant="outline" className="rounded-full border-border text-muted hover:text-primary hover:border-primary">
                  <i className="fa-brands fa-facebook-f"></i>
                </Button>
                <Button size="icon" variant="outline" className="rounded-full border-border text-muted hover:text-primary hover:border-primary">
                  <i className="fa-brands fa-twitter"></i>
                </Button>
                <Button size="icon" variant="outline" className="rounded-full border-border text-muted hover:text-primary hover:border-primary">
                  <i className="fa-solid fa-link"></i>
                </Button>
              </div>
              <Button 
                onClick={() => setSelectedPostId(null)}
                className="bg-primary hover:bg-red-dark text-white font-headline text-lg px-8 rounded-xl"
              >
                BACK TO BLOG
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

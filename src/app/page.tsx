'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Loader from '@/components/Loader';
import Footer from '@/components/Footer';
import StatsBar from '@/components/StatsCounter';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import Testimonials from '@/components/Testimonials';
import AIPathStrategist from '@/components/AIPathStrategist';

export default function Home() {
  const [activeHash, setActiveHash] = useState('#home');
  const [prevHash, setPrevHash] = useState('');
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash || '#home';
      setPrevHash(activeHash);
      setTransitioning(true);
      
      setTimeout(() => {
        setActiveHash(hash);
        setTransitioning(false);
        window.scrollTo(0, 0);
        document.title = `ELEVATE GYM | ${hash.slice(1).toUpperCase()}`;
        
        // Staggered scroll reveals re-init
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      }, 250);
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, [activeHash]);

  return (
    <main className="relative">
      <Loader />
      <CustomCursor />
      <Navigation activeHash={activeHash} />

      {/* Pages Container */}
      <div className={`transition-all duration-350 ${transitioning ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
        
        {/* HOME PAGE */}
        {activeHash === '#home' && (
          <div id="home" className="page-section">
            {/* HERO */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-fixed bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=85")' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
              <div className="absolute top-[80%] left-[20%] w-[400px] h-[400px] bg-red-glow rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute top-[20%] left-[85%] w-[300px] h-[300px] bg-red-glow rounded-full blur-[100px] pointer-events-none opacity-50" />

              <div className="relative z-10 text-center px-6">
                <span className="text-[10px] uppercase tracking-[0.45em] text-primary font-body block mb-6 animate-fadeIn">NEW DELHI'S PREMIER GYM</span>
                <h1 className="font-headline leading-none text-white flex flex-col items-center">
                  <span className="text-[clamp(80px,14vw,180px)]">FORGE</span>
                  <span className="text-[clamp(80px,14vw,180px)]"><span className="text-primary">YOUR BEST</span></span>
                  <span className="text-[clamp(80px,14vw,180px)]">SELF</span>
                </h1>
                <div className="w-20 h-[2px] bg-primary mx-auto my-8" />
                <p className="text-[13px] text-muted uppercase tracking-[0.25em] font-body mb-10">Train harder. Push further. Elevate everything.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#pricing" className="bg-primary text-white text-[11px] uppercase tracking-[0.3em] px-10 py-4 hover:bg-red-dark transition-all transform hover:scale-105">Start Free Trial</a>
                  <a href="#programs" className="border border-white text-white text-[11px] uppercase tracking-[0.3em] px-10 py-4 hover:border-primary hover:text-primary transition-all">Explore Programs</a>
                </div>
              </div>

              {/* Float Cards */}
              <div className="absolute bottom-12 left-6 md:left-12 bg-black/60 border border-border p-4 md:p-5 backdrop-blur-md hidden sm:block">
                <i className="fa-solid fa-users text-primary text-xl mb-2 block"></i>
                <div className="font-headline text-3xl text-white">2,400+</div>
                <div className="font-body text-[10px] text-muted uppercase tracking-widest">Active Members</div>
              </div>
              <div className="absolute bottom-12 right-6 md:right-12 bg-black/60 border border-border p-4 md:p-5 backdrop-blur-md hidden sm:block">
                <i className="fa-solid fa-star text-yellow-500 text-xl mb-2 block"></i>
                <div className="font-headline text-3xl text-white">4.9★</div>
                <div className="font-body text-[10px] text-muted uppercase tracking-widest">Google Rating</div>
              </div>

              {/* Scroll Down */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-[9px] uppercase tracking-[0.4em] text-muted">Scroll Down</span>
                <div className="w-[1px] h-14 bg-gradient-to-b from-primary to-transparent animate-bounce-slow" />
              </div>
            </section>

            <StatsBar />

            {/* PROGRAMS PREVIEW */}
            <section className="bg-background py-24 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 reveal">
                  <span className="text-[11px] text-primary uppercase tracking-[0.4em] font-body">What We Offer</span>
                  <h2 className="text-5xl md:text-7xl font-headline mt-4">Train <span className="text-primary">Your Way</span></h2>
                  <p className="font-body text-sm text-muted uppercase tracking-widest mt-2">6 specialist programs. One elite facility.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { id: 'weight-training', name: 'Weight Training', icon: 'dumbbell', level: 'Intermediate', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80', desc: 'Build raw strength with our powerlifting and hypertrophy-focused training systems.' },
                    { id: 'cardio-hiit', name: 'Cardio & HIIT', icon: 'heart-pulse', level: 'Beginner', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', desc: 'High-intensity intervals designed to torch calories and build cardiovascular endurance fast.' },
                    { id: 'crossfit', name: 'CrossFit', icon: 'person-running', level: 'Advanced', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80', desc: 'Functional movements, Olympic lifting, and conditioning — pushed to your limit every session.' },
                    { id: 'yoga', name: 'Yoga & Mobility', icon: 'spa', level: 'Beginner', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80', desc: 'Restore, stretch and strengthen. Essential recovery and flexibility training for every athlete.' },
                    { id: 'mma', name: 'MMA & Boxing', icon: 'hand-fist', level: 'Intermediate', img: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=600&q=80', desc: 'Combat conditioning meets elite technique. Train like a fighter, move like an athlete.' },
                    { id: 'zumba', name: 'Zumba & Dance Fitness', icon: 'music', level: 'Beginner', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', desc: 'High-energy dance workouts that don\'t feel like exercise — until the next morning.' }
                  ].map((p, i) => (
                    <div key={p.id} className="reveal group bg-card border border-border transition-all hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_8px_32px_rgba(224,43,43,0.15)]">
                      <div className="h-52 w-full overflow-hidden">
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <div className="p-8">
                        <i className={`fa-solid fa-${p.icon} text-primary text-3xl mb-4 block`}></i>
                        <h3 className="font-headline text-3xl text-white mb-3">{p.name}</h3>
                        <p className="font-body text-sm text-muted leading-relaxed mb-6 h-12 overflow-hidden">{p.desc}</p>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex gap-1">
                            {[1, 2, 3].map(dot => (
                              <div key={dot} className={`w-2 h-2 rounded-full ${dot <= (p.level === 'Beginner' ? 1 : p.level === 'Intermediate' ? 2 : 3) ? 'bg-primary' : 'bg-muted/30'}`} />
                            ))}
                          </div>
                          <span className="text-[10px] text-muted uppercase tracking-widest">{p.level}</span>
                        </div>
                        <a href="#programs" className="text-[12px] text-primary uppercase tracking-widest hover:underline">View Program →</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TRANSFORMATIONS */}
            <section className="bg-secondary py-24 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 reveal">
                  <span className="text-[11px] text-primary uppercase tracking-[0.4em] font-body">Real Results</span>
                  <h2 className="text-5xl md:text-7xl font-headline mt-4">Transformation<span className="text-primary">s</span></h2>
                  <p className="font-body text-sm text-muted uppercase tracking-widest mt-2">Our members speak through their results.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="reveal"><BeforeAfterSlider before="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80" after="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" text="— 22kg lost · 6 months" member="Arjun M." /></div>
                  <div className="reveal" style={{ transitionDelay: '0.1s' }}><BeforeAfterSlider before="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" after="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80" text="— Gained 8kg muscle · 5 months" member="Sneha R." /></div>
                  <div className="reveal" style={{ transitionDelay: '0.2s' }}><BeforeAfterSlider before="https://images.unsplash.com/photo-1549476464-37392f717541?w=400&q=80" after="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80" text="— Lost 15kg · 3 months" member="Rahul T." /></div>
                </div>
              </div>
            </section>

            {/* AI PATH STRATEGIST */}
            <section className="bg-background py-24 px-6">
              <AIPathStrategist />
            </section>

            <Testimonials />

            {/* WHY ELEVATE */}
            <section className="bg-background py-24 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="mb-16 reveal">
                  <span className="text-[11px] text-primary uppercase tracking-[0.4em] font-body">Why Choose Us</span>
                  <h2 className="text-5xl md:text-7xl font-headline mt-4">The Elevate <span className="text-primary">Edge</span></h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { icon: 'dumbbell', title: 'World-Class Equipment', desc: 'Over ₹2 crore invested in Technogym, Life Fitness, and custom free-weight sections. No waiting. Ever.' },
                    { icon: 'user-tie', title: 'Certified Expert Trainers', desc: 'Every trainer at Elevate holds a minimum of 2 international certifications. Your goals are their goals.' },
                    { icon: 'clock', title: 'Open 24 Hours, 7 Days', desc: 'Train at 3am or 3pm — Elevate never closes. Smart-card access for all members, all hours.' },
                    { icon: 'chart-line', title: 'Proven Results System', desc: 'Monthly body composition scans, progress tracking app, and quarterly goal reviews with your trainer.' }
                  ].map((f, i) => (
                    <div key={i} className="reveal group bg-card border-l-[3px] border-primary p-12 border border-border hover:bg-primary/5 transition-all">
                      <div className="flex gap-8">
                        <i className={`fa-solid fa-${f.icon} text-primary text-4xl`}></i>
                        <div>
                          <h3 className="font-headline text-3xl text-white mb-4">{f.title}</h3>
                          <p className="font-body text-sm text-muted leading-relaxed">{f.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA BANNER */}
            <section className="relative py-24 px-6 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-red-dark to-primary" />
               <div className="relative z-10 max-w-4xl mx-auto text-center">
                  <h2 className="font-headline text-6xl md:text-8xl text-white mb-6">Ready To Elevate?</h2>
                  <p className="font-body text-sm md:text-base text-white/80 uppercase tracking-widest mb-10">First 7 days free. No commitment. Cancel anytime.</p>
                  <a href="#contact" className="bg-white text-primary font-headline text-2xl px-12 py-5 hover:bg-white/90 transition-all transform hover:scale-105 inline-block">Claim Free Trial</a>
               </div>
            </section>
          </div>
        )}

        {/* PRICING PAGE */}
        {activeHash === '#pricing' && (
          <div id="pricing" className="page-section">
            <section className="relative h-[50vh] flex items-center justify-center pt-20">
               <div 
                 className="absolute inset-0 bg-cover bg-center"
                 style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=85")' }}
               />
               <div className="absolute inset-0 bg-black/75" />
               <div className="relative z-10 text-center px-6">
                  <h1 className="font-headline text-6xl md:text-8xl text-white">Membership <span className="text-primary">Plans</span></h1>
                  <p className="font-body text-sm text-muted uppercase tracking-widest mt-4">No hidden fees. No long-term contracts. Just results.</p>
               </div>
            </section>

            <section className="bg-background py-24 px-6">
              <div className="max-w-7xl mx-auto">
                 {/* Prices & Toggle would go here - simplified for proposal length */}
                 <div className="grid md:grid-cols-3 gap-8">
                    {['BASIC', 'PRO', 'ELITE'].map((plan, i) => (
                      <div key={plan} className={`relative bg-card p-10 border border-border flex flex-col h-full ${i === 1 ? 'border-primary md:-translate-y-4 shadow-[0_12px_40px_rgba(224,43,43,0.15)]' : ''}`}>
                        {i === 1 && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-body tracking-[0.2em] px-4 py-1 uppercase">Most Popular</div>}
                        <h3 className="font-headline text-4xl text-white mb-4">{plan}</h3>
                        <div className="flex items-end gap-2 mb-8">
                          <span className="font-headline text-6xl text-primary">₹{plan === 'BASIC' ? '1,499' : plan === 'PRO' ? '2,499' : '3,999'}</span>
                          <span className="text-muted font-body text-lg mb-2">/mo</span>
                        </div>
                        <div className="w-full h-px bg-primary/20 mb-8" />
                        <ul className="flex-1 space-y-4 mb-10">
                           {['Gym Floor Access', 'Locker Room & Showers', 'Unlimited Group Classes', 'Personal Training', 'Guest Passes'].map((feat, idx) => (
                             <li key={idx} className={`flex items-center gap-3 text-xs font-body ${idx > 2 && plan === 'BASIC' ? 'text-muted/50' : 'text-white'}`}>
                               <i className={`fa-solid ${idx > 2 && plan === 'BASIC' ? 'fa-xmark text-muted/30' : 'fa-check text-primary'}`}></i>
                               {feat}
                             </li>
                           ))}
                        </ul>
                        <a href="#contact" className={`w-full text-center py-4 font-body text-[11px] uppercase tracking-[0.2em] transition-all ${i === 1 ? 'bg-primary text-white hover:bg-red-dark' : i === 2 ? 'bg-white text-black hover:bg-white/90' : 'border border-primary text-primary hover:bg-primary hover:text-white'}`}>
                          {plan === 'ELITE' ? 'Go Elite' : 'Join Now'}
                        </a>
                      </div>
                    ))}
                 </div>
              </div>
            </section>
          </div>
        )}

        {/* OTHER PAGES PLACEHOLDERS - To be filled based on proposal */}
        {['#programs', '#trainers', '#schedule', '#gallery', '#contact'].includes(activeHash) && (
          <div className="min-h-screen pt-40 flex flex-col items-center justify-center px-6 text-center">
            <h1 className="font-headline text-6xl text-white mb-4">{activeHash.slice(1).toUpperCase()}</h1>
            <p className="font-body text-muted uppercase tracking-[0.2em] mb-12">This section is being forged.</p>
            {activeHash === '#contact' && (
              <div className="max-w-2xl w-full bg-card border border-border p-12 text-left">
                <h2 className="font-headline text-3xl text-white mb-8">Send a Message</h2>
                <div className="grid gap-6">
                  <input type="text" placeholder="Full Name" className="bg-background border border-border p-4 text-xs outline-none focus:border-primary" />
                  <input type="email" placeholder="Email Address" className="bg-background border border-border p-4 text-xs outline-none focus:border-primary" />
                  <textarea placeholder="Your Message" className="bg-background border border-border p-4 text-xs outline-none focus:border-primary h-32" />
                  <button onClick={() => alert('Message Received!')} className="bg-primary text-white py-4 font-headline text-xl hover:bg-red-dark transition-all">Send Message</button>
                </div>
              </div>
            )}
            {activeHash === '#programs' && (
              <div className="max-w-7xl mx-auto py-24 px-6 text-left w-full">
                <AIPathStrategist />
              </div>
            )}
          </div>
        )}

      </div>

      <Footer />

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/919165349085" 
        target="_blank"
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] text-white flex items-center justify-center text-2xl z-[998] hover:scale-110 transition-all shadow-[0_0_0_0_rgba(37,211,102,0.4)] hover:shadow-[0_0_0_12px_rgba(37,211,102,0)]"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </main>
  );
}

'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';

const trainers = [
  {
    name: "Vikram Singh",
    title: "Head Trainer, Powerlifting & Strength",
    bio: "IPF Powerlifting certified, 8 years coaching, specializes in strength building and body recomposition.",
    certs: ["IPF Level 2", "NSCA-CPT", "Precision Nutrition Level 1"],
    tags: ["Powerlifting", "Strength", "Body Recomp"],
    stats: [
      { value: "8 yrs", label: "Experience" },
      { value: "200+", label: "Clients" },
      { value: "IPF", label: "Certified" }
    ],
    img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=500&q=80"
  },
  {
    name: "Priya Nair",
    title: "Cardio & Nutrition Coach",
    bio: "ACE certified personal trainer and nutrition specialist. Completed 3 marathons. Helped 150+ clients lose weight.",
    certs: ["ACE-CPT", "Precision Nutrition", "ACSM"],
    tags: ["HIIT", "Weight Loss", "Nutrition"],
    stats: [
      { value: "6 yrs", label: "Experience" },
      { value: "150+", label: "Clients" },
      { value: "ACE", label: "Certified" }
    ],
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80"
  },
  {
    name: "Aryan Kapoor",
    title: "Combat & CrossFit",
    bio: "Ex-national level boxer. CrossFit Level 2 certified. Known for his brutal but effective conditioning sessions.",
    certs: ["CrossFit L2", "Boxing Coach Level 3", "CSCS"],
    tags: ["MMA", "CrossFit", "Boxing"],
    stats: [
      { value: "7 yrs", label: "Experience" },
      { value: "180+", label: "Clients" },
      { value: "CF-L2", label: "Certified" }
    ],
    img: "https://images.unsplash.com/photo-1549476464-37392f717541?w=500&q=80"
  },
  {
    name: "Sunita Mehra",
    title: "Yoga & Mobility",
    bio: "200hr RYT certified yoga instructor. Specializes in athletic mobility and injury prevention programs.",
    certs: ["RYT-200", "FMS Level 2", "NASM-CES"],
    tags: ["Yoga", "Mobility", "Recovery"],
    stats: [
      { value: "10 yrs", label: "Experience" },
      { value: "300+", label: "Clients" },
      { value: "RYT", label: "Certified" }
    ],
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80"
  },
  {
    name: "Rohan Das",
    title: "Zumba & Dance Fitness",
    bio: "Licensed Zumba instructor with 5 years experience. His classes consistently have a 3-week waitlist.",
    certs: ["Zumba Licensed", "ACE Group Fitness", "AFAA"],
    tags: ["Zumba", "Dance", "Cardio"],
    stats: [
      { value: "5 yrs", label: "Experience" },
      { value: "400+", label: "Clients" },
      { value: "ACE", label: "Certified" }
    ],
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80"
  },
  {
    name: "Neha Sharma",
    title: "Women's Fitness Specialist",
    bio: "Specializes in postpartum fitness, women's strength training, and hormonal health-based programming.",
    certs: ["NASM-CPT", "Pre/Postnatal Cert", "Precision Nutrition"],
    tags: ["Women's Fitness", "Strength", "Wellness"],
    stats: [
      { value: "9 yrs", label: "Experience" },
      { value: "220+", label: "Clients" },
      { value: "NASM", label: "Certified" }
    ],
    img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80"
  }
];

export default function TrainersSection() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=1800&q=85")' }}
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-headline text-5xl md:text-8xl text-white">MEET YOUR <span className="text-primary">COACHES</span></h1>
          <p className="font-body text-xs md:text-sm text-muted uppercase tracking-widest mt-4">Certified. Experienced. Obsessed with your results.</p>
        </div>
      </section>

      {/* Trainer Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {trainers.map((trainer, index) => (
            <div 
              key={index} 
              className="reveal group bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-[6px] hover:border-border-hover hover:shadow-[0_12px_40px_rgba(224,43,43,0.12)]"
            >
              <div className="h-[280px] w-full overflow-hidden">
                <img 
                  src={trainer.img} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="font-headline text-3xl text-white mb-1 uppercase tracking-tight">{trainer.name}</h3>
                <div className="text-primary font-body text-[11px] uppercase tracking-[0.3em] mb-4">{trainer.title}</div>
                
                <div className="w-full h-px bg-primary/20 mb-6" />
                
                <p className="font-body text-[13px] text-muted leading-relaxed mb-6 h-[80px] overflow-hidden">
                  {trainer.bio}
                </p>

                <div className="space-y-2 mb-6">
                  {trainer.certs.map((cert, i) => (
                    <div key={i} className="flex items-center gap-2 text-white font-body text-[12px]">
                      <i className="fa-solid fa-certificate text-primary text-[10px]"></i>
                      {cert}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {trainer.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 border border-primary/30 rounded-full text-primary font-body text-[10px] uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {trainer.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="font-headline text-[22px] text-primary leading-none">{stat.value}</div>
                      <div className="font-body text-[10px] text-muted uppercase tracking-tighter mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mb-8 justify-center sm:justify-start">
                  <a href="#" className="text-muted hover:text-primary transition-colors">
                    <i className="fa-brands fa-instagram text-lg"></i>
                  </a>
                  <a href="#" className="text-muted hover:text-primary transition-colors">
                    <i className="fa-brands fa-youtube text-lg"></i>
                  </a>
                </div>

                <button className="w-full bg-primary text-white font-headline text-lg py-3 rounded-xl hover:bg-red-dark transition-all">
                  Book a Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hiring Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        <div className="bg-primary/90 border border-primary p-12 md:p-16 text-center rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h2 className="font-headline text-4xl md:text-6xl text-white mb-4">Want to train with us?</h2>
            <p className="font-body text-white/80 text-lg mb-10">We're hiring passionate trainers.</p>
            <a 
              href="mailto:hello@elevategym.in" 
              className="inline-block bg-white text-primary font-headline text-xl px-12 py-4 rounded-xl hover:scale-105 transition-transform shadow-xl"
            >
              Send Your Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

const reviews = [
  { name: 'Rohit Sharma', program: 'Weight Training', text: "Lost 20kg in 5 months. Coach Vikram changed my entire approach to training. Best decision of my life." },
  { name: 'Meera Kapoor', program: 'HIIT & Cardio', text: "The 24/7 access is a game changer. I train at 6am before work and the facility is always spotless." },
  { name: 'Anjali Singh', program: 'Zumba', text: "Joined for Zumba, stayed for everything else. The energy here is unlike any gym I've been to." },
  { name: 'Karan Mehta', program: 'MMA & Boxing', text: "Coach Aryan's boxing classes are brutal in the best way possible. Down 12kg and I can actually fight." },
  { name: 'Divya Rao', program: 'CrossFit', text: "The body composition scans every month keep me accountable. I can actually see my fat dropping." },
];

export default function Testimonials() {
  const allReviews = [...reviews, ...reviews];

  return (
    <section className="bg-background py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <span className="text-[11px] text-primary uppercase tracking-[0.4em] font-body">Member Stories</span>
        <h2 className="text-5xl md:text-7xl font-headline mt-4">Real People. Real <span className="text-primary">Results.</span></h2>
      </div>

      <div className="carousel-track-container relative">
        <div className="carousel-track gap-8 px-4">
          {allReviews.map((review, i) => (
            <div 
              key={i} 
              className="w-[320px] shrink-0 bg-card border border-border p-8 flex flex-col justify-between"
            >
              <div>
                <div className="text-yellow-500 text-sm mb-4">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="font-body italic text-sm text-white leading-relaxed">"{review.text}"</p>
              </div>
              <div className="mt-8">
                <div className="font-body text-[11px] text-muted uppercase tracking-wider">{review.name}</div>
                <div className="font-body text-[10px] text-primary uppercase mt-1 px-2 border border-primary/30 inline-block">{review.program}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

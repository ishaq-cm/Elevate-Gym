'use client';

export default function Footer() {
  return (
    <footer className="bg-card border-t-2 border-border pt-16 md:pt-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 pb-12 md:pb-16">
        {/* Col 1 */}
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-6">
            <span className="font-headline text-2xl md:text-3xl tracking-[0.15em] text-white">ELEVATE</span>
            <span className="font-headline text-2xl md:text-3xl tracking-[0.15em] text-primary">GYM</span>
          </div>
          <p className="font-body text-xs md:text-sm text-muted italic mb-6">Forge Your Best Self</p>
          <address className="not-italic text-[11px] md:text-xs text-muted leading-relaxed mb-4">
            12, Saket District Centre,<br />
            New Delhi — 110017
          </address>
          <a href="tel:+919165349085" className="text-primary font-body text-sm hover:underline block mb-6">+91 9165349085</a>
          <div className="flex gap-4 justify-center sm:justify-start">
            {['instagram', 'facebook-f', 'youtube', 'twitter'].map((icon) => (
              <a key={icon} href="#" className="w-8 h-8 md:w-9 md:h-9 border border-muted text-muted flex items-center justify-center hover:border-primary hover:text-primary transition-all rounded-lg">
                <i className={`fa-brands fa-${icon} text-xs md:text-base`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 */}
        <div className="hidden sm:block">
          <h4 className="font-headline text-lg tracking-[0.3em] text-white mb-8">Explore</h4>
          <ul className="grid gap-3">
            {['Home', 'Programs', 'Trainers', 'Schedule', 'Pricing', 'Gallery', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="text-xs text-muted hover:text-white transition-all flex items-center group">
                  {item} <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-1">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 */}
        <div className="hidden lg:block">
          <h4 className="font-headline text-lg tracking-[0.3em] text-white mb-8">Programs</h4>
          <ul className="grid gap-3">
            {['Weight Training', 'HIIT & Cardio', 'CrossFit', 'Yoga & Mobility', 'MMA & Boxing', 'Zumba'].map((item) => (
              <li key={item}>
                <a href="#programs" className="text-xs text-muted hover:text-white transition-all">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 */}
        <div className="text-center sm:text-left">
          <h4 className="font-headline text-lg tracking-[0.3em] text-white mb-6 md:mb-8">Join The Movement</h4>
          <p className="text-[11px] md:text-xs text-muted leading-relaxed mb-6">Get fitness tips and exclusive member offers.</p>
          <div className="flex max-w-[300px] mx-auto sm:mx-0">
            <input 
              type="email" 
              placeholder="Email Address"
              className="bg-background border border-border px-4 py-2.5 w-full text-xs outline-none focus:border-primary rounded-l-xl"
            />
            <button className="bg-primary px-4 hover:bg-red-dark transition-all rounded-r-xl">
              <i className="fa-solid fa-arrow-right text-white"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-border py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="text-[10px] md:text-[11px] text-muted tracking-widest uppercase order-2 md:order-1">
          © 2025 ELEVATE GYM. ALL RIGHTS RESERVED.
        </div>
        <div className="font-headline text-primary text-xl md:text-2xl order-1 md:order-2">
          FORGE YOUR BEST SELF
        </div>
        <div className="text-[10px] md:text-[11px] text-muted flex gap-4 order-3">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  );
}

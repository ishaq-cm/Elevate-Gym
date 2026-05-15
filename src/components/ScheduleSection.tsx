
'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

type ClassType = 'Weight Training' | 'HIIT/Cardio' | 'Yoga' | 'CrossFit' | 'MMA/Boxing' | 'Zumba' | 'OPEN GYM';

interface ScheduleItem {
  name: string;
  type: ClassType;
  trainer?: string;
  duration?: string;
}

const timeSlots = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM',
  '11:00 AM', '12:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const classStyles: Record<ClassType, string> = {
  'Weight Training': 'bg-[rgba(224,43,43,0.15)]',
  'HIIT/Cardio': 'bg-[rgba(245,200,66,0.12)]',
  'Yoga': 'bg-[rgba(46,204,113,0.12)]',
  'CrossFit': 'bg-[rgba(224,43,43,0.20)]',
  'MMA/Boxing': 'bg-[rgba(180,30,30,0.15)]',
  'Zumba': 'bg-[rgba(155,89,182,0.15)]',
  'OPEN GYM': 'bg-transparent'
};

const legendItems = [
  { name: 'Weight Training', color: 'bg-[rgba(224,43,43,0.6)]' },
  { name: 'HIIT/Cardio', color: 'bg-[rgba(245,200,66,0.6)]' },
  { name: 'Yoga', color: 'bg-[rgba(46,204,113,0.6)]' },
  { name: 'CrossFit', color: 'bg-[rgba(224,43,43,0.8)]' },
  { name: 'MMA/Boxing', color: 'bg-[rgba(180,30,30,0.6)]' },
  { name: 'Zumba', color: 'bg-[rgba(155,89,182,0.6)]' },
];

const scheduleData: Record<string, Record<string, ScheduleItem>> = {
  'Monday': {
    '6:00 AM': { name: 'Weight Training', type: 'Weight Training', trainer: 'Vikram', duration: '60min' },
    '7:00 AM': { name: 'HIIT', type: 'HIIT/Cardio', trainer: 'Priya', duration: '45min' },
    '9:00 AM': { name: 'Yoga', type: 'Yoga', trainer: 'Sunita', duration: '60min' },
    '6:00 PM': { name: 'CrossFit', type: 'CrossFit', trainer: 'Aryan', duration: '60min' },
    '7:00 PM': { name: 'Zumba', type: 'Zumba', trainer: 'Rohan', duration: '50min' },
    '8:00 PM': { name: 'Weight Training', type: 'Weight Training', trainer: 'Vikram', duration: '60min' },
  },
  'Tuesday': {
    '6:00 AM': { name: 'CrossFit', type: 'CrossFit', trainer: 'Aryan', duration: '60min' },
    '8:00 AM': { name: 'Yoga', type: 'Yoga', trainer: 'Sunita', duration: '60min' },
    '11:00 AM': { name: 'Zumba', type: 'Zumba', trainer: 'Rohan', duration: '50min' },
    '5:00 PM': { name: 'HIIT', type: 'HIIT/Cardio', trainer: 'Priya', duration: '45min' },
    '7:00 PM': { name: 'MMA/Boxing', type: 'MMA/Boxing', trainer: 'Aryan', duration: '60min' },
    '8:00 PM': { name: 'Weight Training', type: 'Weight Training', trainer: 'Vikram', duration: '60min' },
  },
  'Wednesday': {
    '6:00 AM': { name: 'Weight Training', type: 'Weight Training', trainer: 'Vikram', duration: '60min' },
    '7:00 AM': { name: 'HIIT', type: 'HIIT/Cardio', trainer: 'Priya', duration: '45min' },
    '8:00 AM': { name: 'Yoga', type: 'Yoga', trainer: 'Sunita', duration: '60min' },
    '5:00 PM': { name: 'Zumba', type: 'Zumba', trainer: 'Rohan', duration: '50min' },
    '6:00 PM': { name: 'CrossFit', type: 'CrossFit', trainer: 'Aryan', duration: '60min' },
    '7:00 PM': { name: 'MMA/Boxing', type: 'MMA/Boxing', trainer: 'Aryan', duration: '60min' },
    '8:00 PM': { name: 'Weight Training', type: 'Weight Training', trainer: 'Vikram', duration: '60min' },
  },
  'Thursday': {
    '6:00 AM': { name: 'CrossFit', type: 'CrossFit', trainer: 'Aryan', duration: '60min' },
    '7:00 AM': { name: 'HIIT', type: 'HIIT/Cardio', trainer: 'Priya', duration: '45min' },
    '9:00 AM': { name: 'Yoga', type: 'Yoga', trainer: 'Sunita', duration: '60min' },
    '5:00 PM': { name: 'Zumba', type: 'Zumba', trainer: 'Rohan', duration: '50min' },
    '6:00 PM': { name: 'MMA/Boxing', type: 'MMA/Boxing', trainer: 'Aryan', duration: '60min' },
    '7:00 PM': { name: 'Weight Training', type: 'Weight Training', trainer: 'Vikram', duration: '60min' },
    '8:00 PM': { name: 'Yoga', type: 'Yoga', trainer: 'Sunita', duration: '60min' },
  },
  'Friday': {
    '6:00 AM': { name: 'HIIT', type: 'HIIT/Cardio', trainer: 'Priya', duration: '45min' },
    '7:00 AM': { name: 'Weight Training', type: 'Weight Training', trainer: 'Vikram', duration: '60min' },
    '8:00 AM': { name: 'Yoga', type: 'Yoga', trainer: 'Sunita', duration: '60min' },
    '11:00 AM': { name: 'Zumba', type: 'Zumba', trainer: 'Rohan', duration: '50min' },
    '5:00 PM': { name: 'CrossFit', type: 'CrossFit', trainer: 'Aryan', duration: '60min' },
    '6:00 PM': { name: 'MMA/Boxing', type: 'MMA/Boxing', trainer: 'Aryan', duration: '60min' },
    '7:00 PM': { name: 'Zumba', type: 'Zumba', trainer: 'Rohan', duration: '50min' },
    '8:00 PM': { name: 'Weight Training', type: 'Weight Training', trainer: 'Vikram', duration: '60min' },
  },
  'Saturday': {
    '7:00 AM': { name: 'CrossFit', type: 'CrossFit', trainer: 'Aryan', duration: '60min' },
    '8:00 AM': { name: 'HIIT', type: 'HIIT/Cardio', trainer: 'Priya', duration: '45min' },
    '9:00 AM': { name: 'Zumba', type: 'Zumba', trainer: 'Rohan', duration: '50min' },
    '11:00 AM': { name: 'MMA/Boxing', type: 'MMA/Boxing', trainer: 'Aryan', duration: '60min' },
    '5:00 PM': { name: 'Yoga', type: 'Yoga', trainer: 'Sunita', duration: '60min' },
    '6:00 PM': { name: 'Weight Training', type: 'Weight Training', trainer: 'Vikram', duration: '60min' },
  },
  'Sunday': {
    '6:00 AM': { name: 'Yoga', type: 'Yoga', trainer: 'Sunita', duration: '60min' },
    '7:00 AM': { name: 'Zumba', type: 'Zumba', trainer: 'Rohan', duration: '50min' },
    '8:00 AM': { name: 'Weight Training', type: 'Weight Training', trainer: 'Vikram', duration: '60min' },
    '9:00 AM': { name: 'CrossFit', type: 'CrossFit', trainer: 'Aryan', duration: '60min' },
  }
};

export default function ScheduleSection() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center mb-12 md:mb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=85")' }}
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-headline text-5xl md:text-8xl text-white">CLASS <span className="text-primary">SCHEDULE</span></h1>
          <p className="font-body text-xs md:text-sm text-muted uppercase tracking-widest mt-4">Plan your week. Own your results.</p>
        </div>
      </section>

      {/* Table Container */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
        <div className="overflow-x-auto border border-white/5 rounded-2xl bg-card/30 backdrop-blur-sm">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 md:p-6 text-left text-[10px] md:text-xs text-muted uppercase tracking-widest font-body w-24 md:w-32">Time</th>
                {days.map((day) => (
                  <th key={day} className="p-4 md:p-6 text-left text-[10px] md:text-xs text-muted uppercase tracking-widest font-body">{day}</th>
                ))}
              </tr>
            </thead>
            <TooltipProvider delayDuration={100}>
              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot} className="border-b border-white/5 last:border-0">
                    <td className="p-4 md:p-6 font-body text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">{slot}</td>
                    {days.map((day) => {
                      const item = scheduleData[day]?.[slot];
                      if (!item) {
                        return (
                          <td key={`${day}-${slot}`} className="p-2 md:p-2.5 border-r border-white/5 last:border-0">
                            <div className="p-2 md:p-2.5 text-[9px] md:text-[10px] text-muted/40 font-body uppercase tracking-tighter">OPEN GYM</div>
                          </td>
                        );
                      }
                      return (
                        <td key={`${day}-${slot}`} className="p-2 md:p-2.5 border-r border-white/5 last:border-0">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className={`cursor-pointer transition-all hover:brightness-125 hover:scale-[1.02] p-2.5 md:p-3 rounded-lg border border-white/5 ${classStyles[item.type]}`}>
                                <div className="font-body text-[11px] md:text-xs text-white font-bold leading-tight">{item.name}</div>
                                <div className="font-body text-[9px] md:text-[10px] text-muted mt-1">{item.trainer}</div>
                                <div className="font-body text-[9px] md:text-[10px] text-primary mt-0.5">{item.duration}</div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-card border-border p-4 rounded-xl shadow-2xl">
                              <div className="space-y-2">
                                <div className="font-headline text-lg text-white">{item.name}</div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-[10px] text-muted uppercase tracking-widest">Trainer: <span className="text-white">{item.trainer}</span></span>
                                  <span className="text-[10px] text-muted uppercase tracking-widest">Duration: <span className="text-white">{item.duration}</span></span>
                                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest">8/12 spots left</span>
                                </div>
                                <Button size="sm" className="w-full bg-primary hover:bg-red-dark text-white text-[9px] uppercase tracking-widest h-8 rounded-lg">Book Class</Button>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </TooltipProvider>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-6 md:gap-8">
          {legendItems.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${item.color}`} />
              <span className="text-[10px] md:text-[11px] text-muted uppercase tracking-widest font-body">{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Note */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 mb-20">
        <div className="bg-card/50 border border-border p-8 md:p-12 text-center rounded-3xl backdrop-blur-md">
          <h2 className="font-headline text-2xl md:text-3xl text-white mb-4">To book a class, call us or WhatsApp:</h2>
          <a href="tel:+919165349085" className="font-headline text-4xl md:text-6xl text-primary block hover:scale-105 transition-transform">+91 9165349085</a>
          <p className="font-body text-xs md:text-sm text-muted mt-6 mb-10">Walk-ins welcome based on availability.</p>
          <a 
            href="https://wa.me/919165349085" 
            target="_blank" 
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 md:px-10 py-4 md:py-5 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-[#25D366]/20 font-headline text-lg md:text-xl"
          >
            <i className="fa-brands fa-whatsapp text-2xl" />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

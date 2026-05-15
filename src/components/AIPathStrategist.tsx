'use client';

import { useState } from 'react';
import { aiPathStrategistRecommendation, AIPathStrategistOutput } from '@/ai/flows/ai-path-strategist-recommendation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AIPathStrategist() {
  const [goals, setGoals] = useState('');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIPathStrategistOutput | null>(null);

  const handleGenerate = async () => {
    if (!goals) return;
    setLoading(true);
    try {
      const res = await aiPathStrategistRecommendation({
        fitnessGoals: goals,
        currentLevel: level
      });
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border p-6 md:p-12 max-w-4xl mx-auto rounded-3xl">
      {!result ? (
        <>
          <span className="text-[10px] md:text-[11px] text-primary uppercase tracking-[0.4em] font-body">GenAI Tool</span>
          <h2 className="text-3xl md:text-5xl font-headline mt-2 mb-6 md:mb-8">AI PATH STRATEGIST</h2>
          <div className="grid gap-5 md:gap-6">
            <div>
              <label className="text-[9px] md:text-[10px] text-muted uppercase tracking-widest mb-2 block">Tell us your goals</label>
              <Input 
                value={goals} 
                onChange={(e) => setGoals(e.target.value)}
                placeholder="e.g. lose 10kg, build muscle..."
                className="bg-background border-border text-white h-11 md:h-12 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-[9px] md:text-[10px] text-muted uppercase tracking-widest mb-2 block">Current Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l as any)}
                    className={`h-11 md:h-12 border rounded-xl transition-all text-xs uppercase tracking-wider ${level === l ? 'bg-primary border-primary text-white' : 'border-border text-muted hover:border-primary/50'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={loading || !goals}
              className="bg-primary hover:bg-red-dark text-white font-headline text-lg md:text-xl h-12 md:h-14 mt-4 rounded-xl"
            >
              {loading ? <i className="fa-solid fa-spinner animate-spin" /> : 'GENERATE MY PATH'}
            </Button>
          </div>
        </>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="font-headline text-2xl md:text-3xl mb-4 text-primary">Recommended Program</h3>
            <div className="bg-background p-5 md:p-6 border border-border rounded-2xl">
              <div className="font-headline text-xl md:text-2xl text-white mb-2">{result.recommendedProgram.name}</div>
              <p className="font-body text-xs md:text-sm text-muted mb-4">{result.recommendedProgram.description}</p>
              <div className="text-[9px] md:text-[10px] uppercase text-primary border border-primary px-2 py-0.5 inline-block rounded-md">
                Level: {result.recommendedProgram.difficulty}
              </div>
            </div>

            <h3 className="font-headline text-2xl md:text-3xl mt-6 md:mt-8 mb-4 text-primary">Recommended Coach</h3>
            <div className="bg-background p-5 md:p-6 border border-border rounded-2xl">
              <div className="font-headline text-xl md:text-2xl text-white mb-2">{result.recommendedCoach.name}</div>
              <div className="text-[10px] md:text-[11px] text-primary uppercase mb-2">{result.recommendedCoach.specialization}</div>
              <p className="font-body text-xs md:text-sm text-muted italic">"{result.recommendedCoach.bioSnippet}"</p>
            </div>
          </div>
          <div>
            <h3 className="font-headline text-2xl md:text-3xl mb-4 text-primary">Sample Schedule</h3>
            <div className="space-y-3 md:space-y-4">
              {result.sampleWeeklySchedule.map((session, i) => (
                <div key={i} className="bg-background p-4 border-l-4 border-primary rounded-r-xl rounded-l-md">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-headline text-lg md:text-xl text-white">{session.class}</span>
                    <span className="text-[9px] text-muted uppercase">{session.day}</span>
                  </div>
                  <div className="text-[10px] md:text-xs text-muted flex flex-wrap gap-x-4 gap-y-1">
                    <span><i className="fa-solid fa-clock mr-1 text-primary"></i> {session.time}</span>
                    <span><i className="fa-solid fa-user mr-1 text-primary"></i> {session.coach}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={() => setResult(null)} className="w-full mt-6 md:mt-8 bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition-all rounded-xl text-xs h-12">
              START OVER
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

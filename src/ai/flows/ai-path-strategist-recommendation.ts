'use server';
/**
 * @fileOverview An AI agent that recommends a suitable gym program, coach, and sample weekly schedule
 * based on a user's fitness goals and current level.
 *
 * - aiPathStrategistRecommendation - A function that handles the recommendation process.
 * - AIPathStrategistInput - The input type for the aiPathStrategistRecommendation function.
 * - AIPathStrategistOutput - The return type for the aiPathStrategistRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPathStrategistInputSchema = z.object({
  fitnessGoals: z.string().describe('The prospective member\'s fitness goals (e.g., "lose weight", "gain muscle", "improve endurance").'),
  currentLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('The prospective member\'s current fitness level.'),
});
export type AIPathStrategistInput = z.infer<typeof AIPathStrategistInputSchema>;

const ProgramRecommendationSchema = z.object({
  name: z.string().describe('The name of the recommended program.'),
  description: z.string().describe('A short description of the recommended program.'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('The difficulty level of the recommended program.'),
});

const CoachRecommendationSchema = z.object({
  name: z.string().describe('The name of the recommended coach.'),
  specialization: z.string().describe('The specialization of the recommended coach.'),
  bioSnippet: z.string().describe('A brief, 2-line snippet of the coach\'s bio.'),
});

const ScheduledSessionSchema = z.object({
  day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']).describe('Day of the week for the session.'),
  time: z.string().describe('Time of the session (e.g., "6:00 AM", "7:00 PM").'),
  class: z.string().describe('The name of the class (e.g., "Weight Training", "HIIT").'),
  coach: z.string().describe('The name of the coach leading the session.'),
  durationMinutes: z.number().int().positive().describe('Duration of the session in minutes.'),
});

const AIPathStrategistOutputSchema = z.object({
  recommendedProgram: ProgramRecommendationSchema.describe('The most suitable program recommended for the member.'),
  recommendedCoach: CoachRecommendationSchema.describe('A coach who matches well with the recommended program and member\'s goals.'),
  sampleWeeklySchedule: z.array(ScheduledSessionSchema).describe('A sample weekly schedule (3-4 sessions) tailored to the recommended program and coach.'),
});
export type AIPathStrategistOutput = z.infer<typeof AIPathStrategistOutputSchema>;

// Data for programs and coaches to be injected into the prompt
const programsData = [
  {
    name: "Weight Training",
    description: "Build raw strength with our powerlifting and hypertrophy-focused training systems.",
    difficulty: "Intermediate",
    coachTags: ["Powerlifting", "Strength", "Body Recomp"], // For matching coaches
  },
  {
    name: "Cardio & HIIT",
    description: "High-intensity intervals designed to torch calories and build cardiovascular endurance fast.",
    difficulty: "Beginner",
    coachTags: ["HIIT", "Weight Loss", "Nutrition"],
  },
  {
    name: "CrossFit",
    description: "Functional movements, Olympic lifting, and conditioning — pushed to your limit every session.",
    difficulty: "Advanced",
    coachTags: ["MMA", "CrossFit", "Boxing"], // CrossFit coach tags from Aryan
  },
  {
    name: "Yoga & Mobility",
    description: "Restore, stretch and strengthen. Essential recovery and flexibility training for every athlete.",
    difficulty: "Beginner",
    coachTags: ["Yoga", "Mobility", "Recovery"],
  },
  {
    name: "MMA & Boxing",
    description: "Combat conditioning meets elite technique. Train like a fighter, move like an athlete.",
    difficulty: "Intermediate",
    coachTags: ["MMA", "CrossFit", "Boxing"], // MMA coach tags from Aryan
  },
  {
    name: "Zumba & Dance Fitness",
    description: "High-energy dance workouts that don't feel like exercise — until the next morning.",
    difficulty: "Beginner",
    coachTags: ["Zumba", "Dance", "Cardio"],
  },
];

const coachesData = [
  {
    name: "Coach Vikram Singh",
    specialization: "Powerlifting & Strength",
    bioSnippet: "8 years, IPF certified, 200+ transformations",
    tags: ["Powerlifting", "Strength", "Body Recomp"],
  },
  {
    name: "Coach Priya Nair",
    specialization: "Cardio & Nutrition Coach",
    bioSnippet: "ACE certified, nutrition specialist. Completed 3 marathons.",
    tags: ["HIIT", "Weight Loss", "Nutrition"],
  },
  {
    name: "Coach Aryan Kapoor",
    specialization: "Combat & CrossFit",
    bioSnippet: "Ex-national level boxer. CrossFit Level 2 certified.",
    tags: ["MMA", "CrossFit", "Boxing"],
  },
  {
    name: "Coach Sunita Mehra",
    specialization: "Yoga & Mobility",
    bioSnippet: "200hr RYT certified. Specializes in athletic mobility and injury prevention.",
    tags: ["Yoga", "Mobility", "Recovery"],
  },
  {
    name: "Coach Rohan Das",
    specialization: "Zumba & Dance Fitness",
    bioSnippet: "Licensed Zumba instructor with 5 years experience. Classes have a 3-week waitlist.",
    tags: ["Zumba", "Dance", "Cardio"],
  },
  {
    name: "Coach Neha Sharma",
    specialization: "Women's Fitness Specialist",
    bioSnippet: "Specializes in postpartum fitness, women's strength training.",
    tags: ["Women's Fitness", "Strength", "Wellness"],
  },
];

const scheduleTemplates = {
  "Weight Training": [
    { day: "Monday", time: "6:00 AM", class: "Weight Training", coach: "Coach Vikram Singh", durationMinutes: 60 },
    { day: "Wednesday", time: "7:00 PM", class: "Weight Training", coach: "Coach Vikram Singh", durationMinutes: 60 },
    { day: "Friday", time: "6:00 AM", class: "Weight Training", coach: "Coach Vikram Singh", durationMinutes: 60 },
  ],
  "Cardio & HIIT": [
    { day: "Tuesday", time: "7:00 AM", class: "HIIT", coach: "Coach Priya Nair", durationMinutes: 45 },
    { day: "Thursday", time: "6:00 PM", class: "Cardio", coach: "Coach Priya Nair", durationMinutes: 45 },
    { day: "Saturday", time: "9:00 AM", class: "HIIT", coach: "Coach Priya Nair", durationMinutes: 45 },
  ],
  "CrossFit": [
    { day: "Monday", time: "6:00 PM", class: "CrossFit", coach: "Coach Aryan Kapoor", durationMinutes: 60 },
    { day: "Wednesday", time: "6:00 AM", class: "CrossFit", coach: "Coach Aryan Kapoor", durationMinutes: 60 },
    { day: "Friday", time: "7:00 PM", class: "CrossFit", coach: "Coach Aryan Kapoor", durationMinutes: 60 },
  ],
  "Yoga & Mobility": [
    { day: "Monday", time: "9:00 AM", class: "Yoga", coach: "Coach Sunita Mehra", durationMinutes: 60 },
    { day: "Wednesday", time: "8:00 AM", class: "Yoga", coach: "Coach Sunita Mehra", durationMinutes: 60 },
    { day: "Saturday", time: "11:00 AM", class: "Mobility", coach: "Coach Sunita Mehra", durationMinutes: 60 },
  ],
  "MMA & Boxing": [
    { day: "Tuesday", time: "7:00 PM", class: "MMA & Boxing", coach: "Coach Aryan Kapoor", durationMinutes: 60 },
    { day: "Thursday", time: "7:00 PM", class: "MMA & Boxing", coach: "Coach Aryan Kapoor", durationMinutes: 60 },
  ],
  "Zumba & Dance Fitness": [
    { day: "Monday", time: "7:00 PM", class: "Zumba", coach: "Coach Rohan Das", durationMinutes: 50 },
    { day: "Wednesday", time: "11:00 AM", class: "Zumba", coach: "Coach Rohan Das", durationMinutes: 50 },
    { day: "Friday", time: "5:00 PM", class: "Zumba", coach: "Coach Rohan Das", durationMinutes: 50 },
  ],
};


const aiPathStrategistPrompt = ai.definePrompt({
  name: 'aiPathStrategistPrompt',
  input: {schema: AIPathStrategistInputSchema},
  output: {schema: AIPathStrategistOutputSchema},
  // Provide system instructions and data as context
  prompt: `You are an AI Path Strategist for ELEVATE GYM. Your task is to recommend the most suitable program, a matching coach, and a sample weekly schedule based on a prospective member's fitness goals and current level.

Here are the available programs at ELEVATE GYM:
{{{json programs}}}

Here are the expert coaches at ELEVATE GYM:
{{{json coaches}}}

Here are sample schedule templates for each program (you should select sessions relevant to the recommended program, 3-4 sessions per week):
{{{json scheduleTemplates}}}

The member's fitness goals are: "{{{fitnessGoals}}}".
Their current fitness level is: "{{{currentLevel}}}".

Please provide your recommendation in the specified JSON format, ensuring that the recommended coach is suitable for the recommended program and the sample schedule primarily includes sessions from that program, led by a relevant coach. Select up to 4 relevant sessions from the sample schedule templates to form the sample weekly schedule.
`,
});

const aiPathStrategistFlow = ai.defineFlow(
  {
    name: 'aiPathStrategistFlow',
    inputSchema: AIPathStrategistInputSchema,
    outputSchema: AIPathStrategistOutputSchema,
  },
  async (input) => {
    const {output} = await aiPathStrategistPrompt({
      ...input,
      programs: programsData,
      coaches: coachesData,
      scheduleTemplates: scheduleTemplates,
    });
    return output!;
  }
);

export async function aiPathStrategistRecommendation(input: AIPathStrategistInput): Promise<AIPathStrategistOutput> {
  return aiPathStrategistFlow(input);
}

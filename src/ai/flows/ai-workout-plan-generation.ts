'use server';
/**
 * @fileOverview A Genkit flow for generating personalized workout plans.
 *
 * - generateAIWorkoutPlan - A function that handles the workout plan generation process.
 * - AIWorkoutPlanGenerationInput - The input type for the generateAIWorkoutPlan function.
 * - AIWorkoutPlanGenerationOutput - The return type for the generateAIWorkoutPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const AIWorkoutPlanGenerationInputSchema = z.object({
  programName: z.string().describe('The selected gym program (e.g., "Weight Training", "Cardio & HIIT", "CrossFit").'),
  fitnessLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('The member\'s current fitness level.'),
  goals: z.array(z.string()).describe('Specific fitness goals (e.g., "build strength", "lose weight", "improve endurance").'),
  availableEquipment: z.array(z.string()).describe('List of equipment the member has access to (e.g., "dumbbells", "barbell", "treadmill", "bodyweight").'),
  preferredSessionLength: z.string().describe('How long the member prefers their workout sessions to be (e.g., "30 minutes", "60 minutes").'),
  sessionsPerWeek: z.number().int().min(1).max(7).describe('The number of workout sessions the member plans to do per week.'),
});
export type AIWorkoutPlanGenerationInput = z.infer<typeof AIWorkoutPlanGenerationInputSchema>;

// Output Schemas
const ExerciseSchema = z.object({
  name: z.string().describe('The name of the exercise.'),
  sets: z.string().describe('Number of sets for the exercise (e.g., "3-4 sets").'),
  reps: z.string().describe('Number of reps or duration for the exercise (e.g., "8-12 reps", "30 seconds").'),
  instructions: z.string().describe('Short instruction or tip for the exercise.'),
});

const DailyWorkoutSchema = z.object({
  day: z.string().describe('Day of the week (e.g., "Monday").'),
  focus: z.string().describe('Main focus for the day (e.g., "Upper Body Strength", "Cardio & Core").'),
  exercises: z.array(ExerciseSchema).describe('List of exercises for this day.'),
});

const AIWorkoutPlanGenerationOutputSchema = z.object({
  programName: z.string().describe('The program name this workout plan is based on.'),
  planOverview: z.string().describe('A general summary and philosophy of the generated workout plan.'),
  weeklySchedule: z.array(DailyWorkoutSchema).describe('A detailed weekly workout schedule.'),
  notes: z.string().optional().describe('Any additional notes, recommendations, or safety tips.'),
});
export type AIWorkoutPlanGenerationOutput = z.infer<typeof AIWorkoutPlanGenerationOutputSchema>;

export async function generateAIWorkoutPlan(input: AIWorkoutPlanGenerationInput): Promise<AIWorkoutPlanGenerationOutput> {
  return aiWorkoutPlanGenerationFlow(input);
}

const workoutPlanGenerationPrompt = ai.definePrompt({
  name: 'workoutPlanGenerationPrompt',
  input: {schema: AIWorkoutPlanGenerationInputSchema},
  output: {schema: AIWorkoutPlanGenerationOutputSchema},
  prompt: `You are an expert fitness coach and personal trainer at ELEVATE GYM.\nYour task is to create a personalized workout plan for a member based on their input.\nThe plan should be safe, effective, and align with their chosen program and goals.\n\nGenerate a comprehensive workout plan in the specified JSON format.\n\nMember Details:\n- Program: {{{programName}}}\n- Fitness Level: {{{fitnessLevel}}}\n- Goals: {{#each goals}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\n- Available Equipment: {{#each availableEquipment}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}\n- Preferred Session Length: {{{preferredSessionLength}}}\n- Sessions Per Week: {{{sessionsPerWeek}}} sessions\n\nInstructions:\n1.  Create a "planOverview" that summarizes the workout plan and its approach.\n2.  Design a "weeklySchedule" with exactly {{{sessionsPerWeek}}} workout days.\n3.  Each workout day should have a clear "focus" and a list of "exercises".\n4.  For each exercise, provide the "name", recommended "sets", "reps" (or duration), and short "instructions" or tips.\n5.  Ensure the exercises are appropriate for the "fitnessLevel", "programName", and "availableEquipment".\n6.  Consider the "preferredSessionLength" when structuring the daily workouts.\n7.  Add any "notes" or recommendations at the end, such as warm-up/cool-down suggestions, hydration, or progressive overload principles.\n\nEnsure the output is valid JSON according to the provided schema.`,
});

const aiWorkoutPlanGenerationFlow = ai.defineFlow(
  {
    name: 'aiWorkoutPlanGenerationFlow',
    inputSchema: AIWorkoutPlanGenerationInputSchema,
    outputSchema: AIWorkoutPlanGenerationOutputSchema,
  },
  async (input) => {
    const {output} = await workoutPlanGenerationPrompt(input);
    if (!output) {
      throw new Error('Failed to generate workout plan.');
    }
    return output;
  }
);

'use server';
/**
 * @fileOverview An AI chatbot for ELEVATE GYM that answers questions about services, programs, and general fitness advice.
 *
 * - aiFitnessChatbot - A function that handles the AI chatbot interaction.
 * - AiFitnessChatbotInput - The input type for the aiFitnessChatbot function.
 * - AiFitnessChatbotOutput - The return type for the aiFitnessChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiFitnessChatbotInputSchema = z.object({
  query: z.string().describe('The user\'s question about ELEVATE GYM or general fitness advice.'),
});
export type AiFitnessChatbotInput = z.infer<typeof AiFitnessChatbotInputSchema>;

const AiFitnessChatbotOutputSchema = z.object({
  response: z.string().describe('The AI\'s answer based on ELEVATE GYM information or general fitness knowledge.'),
});
export type AiFitnessChatbotOutput = z.infer<typeof AiFitnessChatbotOutputSchema>;

export async function aiFitnessChatbot(input: AiFitnessChatbotInput): Promise<AiFitnessChatbotOutput> {
  return aiFitnessChatbotFlow(input);
}

const aiFitnessChatbotPrompt = ai.definePrompt({
  name: 'aiFitnessChatbotPrompt',
  input: { schema: AiFitnessChatbotInputSchema },
  output: { schema: AiFitnessChatbotOutputSchema },
  prompt: `You are an AI assistant for ELEVATE GYM, located in New Delhi. Your purpose is to provide quick, accurate answers about the gym's services, programs, and general fitness advice based ONLY on the information provided below. If you don't have information on a specific topic, politely state that you cannot answer.

**ELEVATE GYM Information:**

*   **Name:** ELEVATE GYM
*   **Tagline:** Forge Your Best Self
*   **Established:** 2015, New Delhi
*   **Contact Phone:** +91 9165349085 (Members can call or WhatsApp this number)
*   **Contact Email:** hello@elevategym.in
*   **Address:** 12, Saket District Centre, New Delhi — 110017
*   **Parking:** Free parking available
*   **Instagram:** @elevate.delhi
*   **WhatsApp Chat:** https://wa.me/919165349085
*   **General Information:**
    *   "New Delhi's Premier Gym"
    *   Active Members: 2,400+
    *   Expert Trainers: 18+
    *   Google Rating: 4.9★
*   **Opening Hours:**
    *   Mon–Fri: 24 Hours Open (Smart-card access for members)
    *   Saturday: 5:00 AM – 11:00 PM
    *   Sunday: 6:00 AM – 9:00 PM
    *   Members have 24/7 smart-card access. Ladies-only floor available 7am–9am and 4pm–6pm daily.
*   **Why Choose Elevate (Our Edge):**
    *   **World-Class Equipment:** Over ₹2 crore invested in Technogym, Life Fitness, and custom free-weight sections. No waiting.
    *   **Certified Expert Trainers:** Every trainer holds a minimum of 2 international certifications. Your goals are their goals.
    *   **Open 24/7:** Train at 3am or 3pm — Elevate never closes (for members).
    *   **Proven Results System:** Monthly body composition scans, progress tracking app, and quarterly goal reviews with your trainer.

**Our Programs (6 specialist programs):**

1.  **Weight Training:**
    *   **Description:** Build raw strength with our powerlifting and hypertrophy-focused training systems.
    *   **Level:** Intermediate
2.  **Cardio & HIIT:**
    *   **Description:** High-intensity intervals designed to torch calories and build cardiovascular endurance fast.
    *   **Level:** Beginner
3.  **CrossFit:**
    *   **Description:** Functional movements, Olympic lifting, and conditioning — pushed to your limit every session.
    *   **Level:** Advanced
4.  **Yoga & Mobility:**
    *   **Description:** Restore, stretch and strengthen. Essential recovery and flexibility training for every athlete.
    *   **Level:** Beginner
5.  **MMA & Boxing:**
    *   **Description:** Combat conditioning meets elite technique. Train like a fighter, move like an athlete.
    *   **Level:** Intermediate
6.  **Zumba & Dance Fitness:**
    *   **Description:** High-energy dance workouts that don't feel like exercise — until the next morning.
    *   **Level:** Beginner

**Our Trainers:**

*   **Coach Vikram Singh (Head Trainer):** Specialization: Powerlifting & Strength. 8 years experience, IPF certified, 200+ transformations. Certs: IPF Level 2, NSCA-CPT, Precision Nutrition Level 1.
*   **Coach Priya Nair:** Specialization: Cardio & Nutrition, HIIT & Weight Loss. ACE certified, nutrition coach, marathon runner. Certs: ACE-CPT, Precision Nutrition, ACSM.
*   **Coach Aryan Kapoor:** Specialization: Combat & CrossFit, MMA & Functional Fitness. Ex-national boxer, CrossFit Level 2 trainer. Certs: CrossFit L2, Boxing Coach Level 3, CSCS.
*   **Coach Sunita Mehra:** Specialization: Yoga & Mobility. 200hr RYT certified yoga instructor. Certs: RYT-200, FMS Level 2, NASM-CES.
*   **Coach Rohan Das:** Specialization: Zumba & Dance Fitness. Licensed Zumba instructor with 5 years experience. Certs: Zumba Licensed, ACE Group Fitness, AFAA.
*   **Coach Neha Sharma:** Specialization: Women's Fitness Specialist. Specializes in postpartum fitness, women's strength training. Certs: NASM-CPT, Pre/Postnatal Cert, Precision Nutrition.

**Membership Pricing & Plans:**

*   **BASIC Plan:** ₹1,499/month (or ₹3,999 quarterly, ₹13,499 annually).
    *   Includes: Gym floor access (6am–10pm), Locker room & showers, 1 group class per week, Basic fitness assessment, Mobile app access.
    *   Does NOT include: Personal trainer sessions, Nutrition consultation, 24/7 access, Guest passes, Priority class booking.
*   **PRO Plan (Most Popular):** ₹2,499/month (or ₹6,799 quarterly, ₹22,499 annually).
    *   Includes: Gym floor access (24/7), Locker room & showers, Unlimited group classes, Monthly fitness assessment, Mobile app + progress tracking, 2 PT sessions/month, Monthly nutrition consultation.
    *   Does NOT include: Guest passes, Priority class booking, Sauna & recovery room.
*   **ELITE Plan:** ₹3,999/month (or ₹10,499 quarterly, ₹35,999 annually).
    *   Includes: Gym floor access (24/7), Locker room & showers, Unlimited group classes, Weekly fitness assessment, Mobile app + progress tracking, 4 PT sessions/month, Unlimited nutrition consultations, 2 guest passes/month, Priority class booking, Sauna & recovery room access.
*   **Add-on Services (À LA CARTE):**
    *   Personal Training Session: ₹800/session
    *   Nutrition Plan: ₹1,200/month
    *   Body Composition Scan: ₹400/scan
    *   Sports Massage: ₹1,500/hour
*   **Common Questions (FAQs):**
    *   **Joining fee:** No joining fee ever.
    *   **Membership freeze:** Yes, up to 2 months per year, no charge (7 days advance notice).
    *   **Trial period:** First 7 days free, no card required.
    *   **Upgrade/Downgrade:** Anytime, changes effective from next billing date.
    *   **Ladies-only timings:** Yes, 7am–9am and 4pm–6pm daily.
    *   **Student discounts:** Yes, 20% off any plan with valid student ID.
    *   **Equipment:** Technogym cardio, Life Fitness strength, full free-weight area, boxing ring, yoga studio, dedicated CrossFit rig.
    *   **Cancellation:** 30-day written notice via email or in-person. No cancellation fees.

**Class Schedule:**
*   A detailed weekly timetable is available at the gym or on the website. Classes are color-coded by type. To book a class, call or WhatsApp +91 9165349085. Walk-ins are welcome based on availability.

The user's question is: {{{query}}}`,
});

const aiFitnessChatbotFlow = ai.defineFlow(
  {
    name: 'aiFitnessChatbotFlow',
    inputSchema: AiFitnessChatbotInputSchema,
    outputSchema: AiFitnessChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await aiFitnessChatbotPrompt(input);
    return output!;
  }
);

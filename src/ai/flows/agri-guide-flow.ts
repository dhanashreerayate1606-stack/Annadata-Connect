
'use server';
/**
 * @fileOverview AI Agricultural Guide flow.
 * 
 * - generateAgriGuide - Generates detailed farming guides based on a topic.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AgriGuideInputSchema = z.object({
  topic: z.string().describe('The agricultural topic to generate a guide for.'),
  language: z.string().optional().describe('The language code for the response.'),
});

const AgriGuideOutputSchema = z.object({
  title: z.string().describe('The title of the guide.'),
  sections: z.array(z.object({
    heading: z.string().describe('The heading of the section.'),
    content: z.string().describe('The detailed information for this section.'),
  })).describe('Structured sections of the guide.'),
  summary: z.string().describe('A brief concluding summary or key takeaway.'),
});

export type AgriGuideOutput = z.infer<typeof AgriGuideOutputSchema>;

export async function generateAgriGuide(input: { topic: string, language?: string }): Promise<AgriGuideOutput> {
  return agriGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'agriGuidePrompt',
  input: {schema: AgriGuideInputSchema},
  output: {schema: AgriGuideOutputSchema},
  prompt: `You are a senior agricultural scientist at Annadata Connect. 
Provide a comprehensive, professional, and practical guide for Indian farmers on the topic: "{{{topic}}}".

Requirements:
1. Use clear, actionable language.
2. Focus on techniques suitable for small-to-medium scale Indian farms.
3. Include specific examples of crops, fertilizers, or tools where relevant.
4. Language context: {{{language}}}. (If language is not English, ensure the terminology is accurate for that region).

Structure the response into logical sections like "Preparation", "Implementation", "Maintenance", and "Expert Tips".`,
});

const agriGuideFlow = ai.defineFlow(
  {
    name: 'agriGuideFlow',
    inputSchema: AgriGuideInputSchema,
    outputSchema: AgriGuideOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error) {
      console.error('Agri Guide AI Flow failed:', error);
      return {
        title: "Information Temporarily Unavailable",
        sections: [
          {
            heading: "System Busy",
            content: "Our AI agronomist is currently processing a high volume of requests. Please try again in a moment."
          }
        ],
        summary: "Please consult local government agricultural extensions for immediate guidance."
      };
    }
  }
);

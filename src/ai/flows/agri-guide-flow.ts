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
  language: z.string().optional().describe('The language code for the response (e.g., "en", "hi", "mr").'),
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
4. Language context: {{{language}}}. (If language code is provided, ensure all content is in that language).

Structure the response into exactly 4 logical sections covering:
- Preparation (Land and Seed)
- Implementation (Sowing and Input Application)
- Maintenance (Irrigation and Pest Control)
- Expert Tips (Harvesting and Market Prep)

Return the output in the requested JSON format.`,
});

const agriGuideFlow = ai.defineFlow(
  {
    name: 'agriGuideFlow',
    inputSchema: AgriGuideInputSchema,
    outputSchema: AgriGuideOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt({
        topic: input.topic,
        language: input.language || 'English'
      });
      
      if (!output) {
        throw new Error('AI produced no content');
      }
      
      return output;
    } catch (error) {
      console.error('Agri Guide AI Flow failed:', error);
      // Enhanced fallback with meaningful data if the API fails
      return {
        title: "Agricultural Guide: " + input.topic,
        sections: [
          {
            heading: "System Status Update",
            content: "Our AI Agronomist is currently fine-tuning its recommendations for your region. Please refresh or try again in a few moments."
          },
          {
            heading: "General Recommendation",
            content: "Always ensure your soil pH is tested before applying major fertilizers. For " + input.topic + ", local extension services remain your most reliable primary resource during peak request times."
          }
        ],
        summary: "Please consult local government agricultural extensions or KVK (Krishi Vigyan Kendra) for immediate site-specific guidance."
      };
    }
  }
);

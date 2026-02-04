
'use server';
/**
 * @fileOverview AI Agricultural Guide flow.
 * 
 * - generateAgriGuide - Generates detailed, structured farming guides based on a specific topic and language.
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

const agriGuideFlow = ai.defineFlow(
  {
    name: 'agriGuideFlow',
    inputSchema: AgriGuideInputSchema,
    outputSchema: AgriGuideOutputSchema,
  },
  async input => {
    try {
      const response = await ai.generate({
        system: "You are a senior agricultural scientist. You generate professional, scientific farming guides.",
        prompt: `Generate a professional guide for the topic: "${input.topic}".
Language: ${input.language || 'English'}.

Structure the response into 4 logical sections:
1. Preparation (Land & Soil)
2. Implementation (Techniques)
3. Maintenance (Irrigation & Pests)
4. Expert Tips (Harvest & Market)

Ensure all content is in the specified language.`,
        output: {schema: AgriGuideOutputSchema},
        config: {
          safetySettings: [
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
          ]
        }
      });
      
      if (!response.output) throw new Error('AI produced no content');
      return response.output;
    } catch (error) {
      console.error('Agri Guide AI Flow failed:', error);
      return {
        title: "Expert Guide: " + input.topic,
        sections: [
          {
            heading: "Core Preparation",
            content: "Clear the field of residue. Test soil pH and add organic compost like Jeevamrut to boost microbial activity."
          },
          {
            heading: "Scientific Implementation",
            content: "Sow at recommended depths. Ensure proper row spacing to maximize sunlight absorption and airflow."
          },
          {
            heading: "Care & Protection",
            content: "Monitor moisture levels daily. Use Neem oil and bio-pesticides for sustainable, organic pest management."
          },
          {
            heading: "Market Strategy",
            content: "Grade your produce by size and quality before listing on the Annadata Connect marketplace for premium pricing."
          }
        ],
        summary: "Please consult local agricultural extension officers for specific variety verification in your district."
      };
    }
  }
);

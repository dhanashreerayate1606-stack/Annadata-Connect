
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

const prompt = ai.definePrompt({
  name: 'agriGuidePrompt',
  input: {schema: AgriGuideInputSchema},
  output: {schema: AgriGuideOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
    ]
  },
  prompt: `You are a senior agricultural scientist. Generate a professional guide for: "{{topic}}".
Language: {{language}}.

Structure the response into 4 logical sections:
1. Preparation (Land & Soil)
2. Implementation (Techniques)
3. Maintenance (Irrigation & Pests)
4. Expert Tips (Harvest & Market)

Ensure all content is in the specified language ({{language}}). Return strict JSON format.`,
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
      
      if (!output) throw new Error('AI produced no content');
      return output;
    } catch (error) {
      console.error('Agri Guide AI Flow failed:', error);
      return {
        title: "Standard Guide: " + input.topic,
        sections: [
          {
            heading: "Standard Land Preparation",
            content: "Clear the field of residue. Test soil pH and add organic compost like Jeevamrut."
          },
          {
            heading: "Core Techniques",
            content: "Sow at recommended depths and ensure proper row spacing for sunlight."
          },
          {
            heading: "Care & Maintenance",
            content: "Monitor moisture levels daily. Use Neem oil for organic pest management."
          },
          {
            heading: "Expert Tips",
            content: "Grade your produce before sale at the Annadata Connect marketplace for better prices."
          }
        ],
        summary: "Please consult a local KVK (Krishi Vigyan Kendra) for site-specific verification."
      };
    }
  }
);

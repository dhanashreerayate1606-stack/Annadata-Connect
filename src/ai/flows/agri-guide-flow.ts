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
  prompt: `You are a senior agricultural scientist at Annadata Connect. 
Your goal is to provide a comprehensive, professional, and practical guide for Indian farmers on the topic: "{{{topic}}}".

Requirements:
1. Use clear, actionable language suitable for farmers.
2. Focus on techniques that are effective for small-to-medium scale Indian farms.
3. Include specific local examples of crops, organic fertilizers (like Jeevamrut), or traditional tools where relevant.
4. Language context: {{{language}}}. (IMPORTANT: Generate ALL content in the language corresponding to this code).

Structure the response into exactly 4 logical sections covering:
- Phase 1: Preparation (Land, Soil Health, and Seed Selection)
- Phase 2: Implementation (Sowing techniques and Initial Input Application)
- Phase 3: Maintenance (Irrigation, Organic Pest Control, and Weeding)
- Phase 4: Expert Tips (Harvesting signs and Market Preparation)

Return the output strictly in the requested JSON format. Ensure the tone is encouraging and scientific.`,
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
      // Enhanced fallback with high-quality static data if the API fails
      return {
        title: "Agricultural Guide: " + input.topic,
        sections: [
          {
            heading: "Standard Preparation",
            content: "For " + input.topic + ", ensure your field is cleared of previous crop residue. Test soil pH levels and aim for a balanced organic matter content using compost or well-decomposed manure."
          },
          {
            heading: "Core Implementation",
            content: "Sow seeds at the recommended depth (typically 2-3 times the seed width). For Indian conditions, ensure rows are spaced to allow for adequate ventilation and sunlight penetration."
          },
          {
            heading: "Maintenance & Care",
            content: "Implement drip irrigation if possible to conserve water. Use Neem oil or Dashparni Ark for natural pest management. Regular weeding in the first 30 days is critical for success."
          },
          {
            heading: "Expert Recommendations",
            content: "Harvest during the cooler parts of the day (early morning or late evening) to maintain freshness. Grade your produce before taking it to the Annadata Connect marketplace for better prices."
          }
        ],
        summary: "For site-specific issues, please consult your local KVK (Krishi Vigyan Kendra) or use the Annadata Community Hub to ask fellow successful farmers."
      };
    }
  }
);

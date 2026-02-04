
'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-driven crop
 * suggestions to farmers based on their region and soil conditions.
 *
 * - aiCropAdvisoryForFarmers - A function that takes region and soil conditions as input and returns crop suggestions.
 * - AICropAdvisoryInput - The input type for the aiCropAdvisoryForFarmers function.
 * - AICropAdvisoryOutput - The return type for the aiCropAdvisoryForFarmers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICropAdvisoryInputSchema = z.object({
  region: z
    .string()
    .describe('The region where the farmer is located (e.g., "Nashik, Maharashtra").'),
  soilConditions: z
    .string()
    .describe(
      'A description of the soil conditions (e.g., "black soil, pH 7.0").'
    ),
});

export type AICropAdvisoryInput = z.infer<typeof AICropAdvisoryInputSchema>;

const AICropAdvisoryOutputSchema = z.object({
  suggestedCrops: z
    .string()
    .describe(
      'A detailed, structured list of suggested crops suitable for the given region and soil conditions, along with expert explanations for each.'
    ),
});

export type AICropAdvisoryOutput = z.infer<typeof AICropAdvisoryOutputSchema>;

export async function aiCropAdvisoryForFarmers(
  input: AICropAdvisoryInput
): Promise<AICropAdvisoryOutput> {
  return aiCropAdvisoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCropAdvisoryPrompt',
  input: {schema: AICropAdvisoryInputSchema},
  output: {schema: AICropAdvisoryOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
    ]
  },
  prompt: `You are a Senior Agronomist at Annadata Connect, an expert in Indian agriculture. 
Your task is to analyze the following farm conditions and provide high-quality crop recommendations.

Input Data:
- Region/District: {{{region}}}
- Soil Type/Conditions: {{{soilConditions}}}

Instructions:
1. Identify 3-4 specific crops that are most suitable for the specified soil and regional climate of {{{region}}}.
2. For each crop, explain exactly WHY it is a good fit (e.g., "The well-draining nature of {{{soilConditions}}} is perfect for this crop").
3. Include market insights for {{{region}}} if available.
4. Include brief notes on water requirements or potential inter-cropping benefits (like pulses for nitrogen fixation).
5. Maintain a professional, scientific, and encouraging tone.

Return the recommendations as a detailed, multi-paragraph text response in the 'suggestedCrops' field.`,
});

const aiCropAdvisoryFlow = ai.defineFlow(
  {
    name: 'aiCropAdvisoryFlow',
    inputSchema: AICropAdvisoryInputSchema,
    outputSchema: AICropAdvisoryOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) throw new Error('AI failed to generate advisory output');
      return output;
    } catch (error) {
      console.error('Crop Advisory AI Flow failed:', error);
      // Enhanced fallback with helpful context if the API fails
      return {
        suggestedCrops: `Our AI Agronomist is currently processing a high volume of requests for ${input.region}.

Based on ${input.soilConditions} soil in this region, most experts recommend starting with hardy indigenous varieties. For a personalized 5-page soil health report, we recommend visiting your nearest Krishi Vigyan Kendra (KVK). 

General Tip: For ${input.soilConditions} soil, ensure you are using organic matter like Vermicompost to maintain long-term fertility. Please try again in a moment for a detailed AI analysis.`
      };
    }
  }
);

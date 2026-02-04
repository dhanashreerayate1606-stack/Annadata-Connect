
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
  prompt: `You are a Senior Agronomist at Annadata Connect specializing in Indian agriculture. 
Your task is to analyze the following farm conditions and provide high-quality crop recommendations.

Input Data:
- Region/District: {{{region}}}
- Soil Type/Conditions: {{{soilConditions}}}

Instructions:
1. Identify 3-4 crops that are most suitable for the specified soil and regional climate.
2. For each crop, explain WHY it is a good fit (e.g., "Well-suited for black soil", "High market demand in {{{region}}}").
3. Include brief notes on water requirements or potential inter-cropping benefits (like pulses for nitrogen fixation).
4. Maintain a professional, scientific, and encouraging tone for the farmer.

Provide the recommendations as a detailed, multi-paragraph text response.`,
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
      // Enhanced fallback with helpful context
      return {
        suggestedCrops: `We are currently experiencing high demand for our AI Agronomist services. 

General recommendation for ${input.region} with ${input.soilConditions} soil:
Most farmers in this region find success with local hardy varieties. We recommend testing your soil pH at a local Krishi Vigyan Kendra (KVK) and considering nitrogen-rich organic fertilizers like Jeevamrut. 

Please try again in a few minutes for a detailed personalized analysis.`
      };
    }
  }
);

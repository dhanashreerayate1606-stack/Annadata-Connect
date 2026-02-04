
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
    .describe('The region where the farmer is located (e.g., "Punjab").'),
  soilConditions: z
    .string()
    .describe(
      'A description of the soil conditions (e.g., "sandy loam, pH 6.5").'
    ),
});

export type AICropAdvisoryInput = z.infer<typeof AICropAdvisoryInputSchema>;

const AICropAdvisoryOutputSchema = z.object({
  suggestedCrops: z
    .string()
    .describe(
      'A list of suggested crops suitable for the given region and soil conditions, along with a brief explanation for each suggestion.'
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
  prompt: `You are an AI assistant providing crop selection advice to farmers.

  Based on the farmer's region and soil conditions, suggest suitable crops.
  Provide a brief explanation for each suggestion.

  Region: {{{region}}}
  Soil Conditions: {{{soilConditions}}}

  Suggested Crops:`, // The response should complete the sentence.
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
      return output!;
    } catch (error) {
      console.error('Crop Advisory AI Flow failed:', error);
      return {
        suggestedCrops: "Personalized crop recommendations are currently unavailable. Please consult local agricultural experts or historical planting data for your region."
      };
    }
  }
);

'use server';
/**
 * @fileOverview AI weather advisory flow for localized farming.
 *
 * - weatherAdvisory - Provides farming tips and risk alerts based on weather data.
 * - WeatherAdvisoryInput - The input type (location and basic forecast).
 * - WeatherAdvisoryOutput - The return type (tips and alerts).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeatherAdvisoryInputSchema = z.object({
  location: z.string().describe('The location of the farm (e.g., "Nashik").'),
  forecast: z.string().describe('A summary of the upcoming 5-day weather forecast.'),
});
export type WeatherAdvisoryInput = z.infer<typeof WeatherAdvisoryInputSchema>;

const WeatherAdvisoryOutputSchema = z.object({
  alerts: z.array(z.string()).describe('Critical risk alerts for farmers (e.g., frost warning, heavy rain).'),
  farmingTips: z.string().describe('Actionable farming advice based on the forecast.'),
  consumerInsight: z.string().describe('A message for consumers about how this weather affects produce.'),
});
export type WeatherAdvisoryOutput = z.infer<typeof WeatherAdvisoryOutputSchema>;

export async function weatherAdvisory(
  input: WeatherAdvisoryInput
): Promise<WeatherAdvisoryOutput> {
  return weatherAdvisoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weatherAdvisoryPrompt',
  input: {schema: WeatherAdvisoryInputSchema},
  output: {schema: WeatherAdvisoryOutputSchema},
  prompt: `You are an expert Agri-Meteorologist for Annadata Connect.
Based on the provided location and 5-day forecast, generate specific advice for farmers and transparency insights for consumers.

Location: {{{location}}}
Forecast Summary: {{{forecast}}}

Focus on:
1. Identifying risks (pests, irrigation needs, harvest timing).
2. Explaining to consumers why certain produce might be delayed or extra fresh.
`,
});

const weatherAdvisoryFlow = ai.defineFlow(
  {
    name: 'weatherAdvisoryFlow',
    inputSchema: WeatherAdvisoryInputSchema,
    outputSchema: WeatherAdvisoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

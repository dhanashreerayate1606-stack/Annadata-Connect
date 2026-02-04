
'use server';
/**
 * @fileOverview A voice search AI flow for the marketplace.
 *
 * - voiceSearch - A function that handles audio transcription and search query extraction.
 * - VoiceSearchInput - The input type for the voiceSearch function.
 * - VoiceSearchOutput - The return type for the voiceSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceSearchInputSchema = z.object({
  audio: z
    .string()
    .describe(
      "A user's voice recording as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VoiceSearchInput = z.infer<typeof VoiceSearchInputSchema>;

const VoiceSearchOutputSchema = z.object({
  query: z.string().describe('The extracted search query from the user\'s speech.'),
});
export type VoiceSearchOutput = z.infer<typeof VoiceSearchOutputSchema>;

export async function voiceSearch(
  input: VoiceSearchInput
): Promise<VoiceSearchOutput> {
  return voiceSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceSearchPrompt',
  input: {schema: VoiceSearchInputSchema},
  output: {schema: VoiceSearchOutputSchema},
  prompt: `You are a voice assistant for an online farmer's market.
A user has provided an audio recording. Transcribe the audio and identify the product they are searching for.
The user might speak in any language, but you should extract the core product name.
For example, if the user says "टमाटर दिखाओ" (show tomatoes in Hindi), the search query should be "Tomato".
If they say "I want to buy some potatoes", the query should be "Potato".
Extract only the product name as the search query.

Audio provided: {{media url=audio}}`,
});

const voiceSearchFlow = ai.defineFlow(
  {
    name: 'voiceSearchFlow',
    inputSchema: VoiceSearchInputSchema,
    outputSchema: VoiceSearchOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error) {
      console.error('Voice Search AI Flow failed:', error);
      // Return empty query on failure
      return { query: "" };
    }
  }
);

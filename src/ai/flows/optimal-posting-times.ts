'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting optimal posting times and channels for marketing content.
 *
 * - suggestOptimalPostingTimes - A function that handles the process of suggesting optimal posting times.
 * - SuggestOptimalPostingTimesInput - The input type for the suggestOptimalPostingTimes function.
 * - SuggestOptimalPostingTimesOutput - The return type for the suggestOptimalPostingTimes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalPostingTimesInputSchema = z.object({
  marketingContentDescription: z
    .string()
    .describe('A description of the marketing content to be posted.'),
  targetAudience: z.string().describe('The target audience for the content.'),
  brandGuidelines: z.string().describe('The brand guidelines to adhere to.'),
});
export type SuggestOptimalPostingTimesInput = z.infer<typeof SuggestOptimalPostingTimesInputSchema>;

const SuggestOptimalPostingTimesOutputSchema = z.object({
  suggestedPostingTimes: z
    .array(z.string())
    .describe('An array of suggested optimal posting times.'),
  suggestedChannels: z
    .array(z.string())
    .describe('An array of suggested optimal channels for posting.'),
  rationale: z.string().describe("The AI's rationale for the suggestions."),
});
export type SuggestOptimalPostingTimesOutput = z.infer<
  typeof SuggestOptimalPostingTimesOutputSchema
>;

export async function suggestOptimalPostingTimes(
  input: SuggestOptimalPostingTimesInput
): Promise<SuggestOptimalPostingTimesOutput> {
  return suggestOptimalPostingTimesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalPostingTimesPrompt',
  input: {schema: SuggestOptimalPostingTimesInputSchema},
  output: {schema: SuggestOptimalPostingTimesOutputSchema},
  prompt: `You are an AI marketing assistant specializing in suggesting optimal posting times and channels.

  Given the following marketing content description, target audience, and brand guidelines, suggest optimal posting times and channels to maximize reach and impact.

  Marketing Content Description: {{{marketingContentDescription}}}
  Target Audience: {{{targetAudience}}}
  Brand Guidelines: {{{brandGuidelines}}}

  Consider factors such as audience demographics, platform algorithms, and competitor activity.

  Provide a rationale for your suggestions.
  Format the time as HH:MM AM/PM, use the IANA timezone identifier America/Los_Angeles, and include the day of the week.`,
});

const suggestOptimalPostingTimesFlow = ai.defineFlow(
  {
    name: 'suggestOptimalPostingTimesFlow',
    inputSchema: SuggestOptimalPostingTimesInputSchema,
    outputSchema: SuggestOptimalPostingTimesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

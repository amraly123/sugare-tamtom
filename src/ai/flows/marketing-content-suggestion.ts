// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview AI-powered tool that suggests marketing content ideas based on current trends, brand guidelines, and past successful campaigns.
 *
 * - suggestMarketingContentIdeas - A function that handles the marketing content suggestion process.
 * - SuggestMarketingContentIdeasInput - The input type for the suggestMarketingContentIdeas function.
 * - SuggestMarketingContentIdeasOutput - The return type for the suggestMarketingContentIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMarketingContentIdeasInputSchema = z.object({
  currentTrends: z
    .string()
    .describe('The current marketing trends in the kids clothing industry.'),
  brandGuidelines: z
    .string()
    .describe('The brand guidelines for Sugar Tamtom.'),
  pastSuccessfulCampaigns: z
    .string()
    .describe('Details about past successful marketing campaigns for Sugar Tamtom.'),
  targetAudience: z
    .string()
    .describe('The target audience for the marketing content.'),
});
export type SuggestMarketingContentIdeasInput = z.infer<
  typeof SuggestMarketingContentIdeasInputSchema
>;

const SuggestMarketingContentIdeasOutputSchema = z.object({
  contentIdeas: z
    .array(z.string())
    .describe('A list of suggested marketing content ideas.'),
  optimalPostingTimes: z
    .string()
    .describe('Suggested optimal posting times for the content.'),
  suggestedChannels: z
    .array(z.string())
    .describe('A list of suggested channels for content distribution.'),
});
export type SuggestMarketingContentIdeasOutput = z.infer<
  typeof SuggestMarketingContentIdeasOutputSchema
>;

export async function suggestMarketingContentIdeas(
  input: SuggestMarketingContentIdeasInput
): Promise<SuggestMarketingContentIdeasOutput> {
  return suggestMarketingContentIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMarketingContentIdeasPrompt',
  input: {schema: SuggestMarketingContentIdeasInputSchema},
  output: {schema: SuggestMarketingContentIdeasOutputSchema},
  prompt: `You are a marketing expert specializing in kids' clothing.

  Based on the current trends, brand guidelines, past successful campaigns, and the target audience, suggest some marketing content ideas, suggest optimal posting times, and suggest channels for content distribution.

  Current Trends: {{{currentTrends}}}
  Brand Guidelines: {{{brandGuidelines}}}
  Past Successful Campaigns: {{{pastSuccessfulCampaigns}}}
  Target Audience: {{{targetAudience}}}
  `,
});

const suggestMarketingContentIdeasFlow = ai.defineFlow(
  {
    name: 'suggestMarketingContentIdeasFlow',
    inputSchema: SuggestMarketingContentIdeasInputSchema,
    outputSchema: SuggestMarketingContentIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

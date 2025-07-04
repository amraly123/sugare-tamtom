// Summarize Customer Feedback
'use server';
/**
 * @fileOverview Summarizes customer feedback to identify key areas for improvement.
 *
 * - summarizeCustomerFeedback - A function that summarizes customer feedback.
 * - SummarizeCustomerFeedbackInput - The input type for the summarizeCustomerFeedback function.
 * - SummarizeCustomerFeedbackOutput - The return type for the summarizeCustomerFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCustomerFeedbackInputSchema = z.object({
  feedbackText: z
    .string()
    .describe('The customer feedback text to summarize.'),
});
export type SummarizeCustomerFeedbackInput = z.infer<
  typeof SummarizeCustomerFeedbackInputSchema
>;

const SummarizeCustomerFeedbackOutputSchema = z.object({
  summary: z.string().describe('A summary of the customer feedback.'),
  keyAreas: z
    .array(z.string())
    .describe('Key areas for improvement identified in the feedback.'),
});
export type SummarizeCustomerFeedbackOutput = z.infer<
  typeof SummarizeCustomerFeedbackOutputSchema
>;

export async function summarizeCustomerFeedback(
  input: SummarizeCustomerFeedbackInput
): Promise<SummarizeCustomerFeedbackOutput> {
  return summarizeCustomerFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCustomerFeedbackPrompt',
  input: {schema: SummarizeCustomerFeedbackInputSchema},
  output: {schema: SummarizeCustomerFeedbackOutputSchema},
  prompt: `You are a marketing manager. Summarize the following customer feedback to identify key areas for improvement in our products and services.\n\nFeedback: {{{feedbackText}}}\n\nSummary: \nKey Areas for Improvement:`, // Ensure that the response contains both the summary and the key areas
});

const summarizeCustomerFeedbackFlow = ai.defineFlow(
  {
    name: 'summarizeCustomerFeedbackFlow',
    inputSchema: SummarizeCustomerFeedbackInputSchema,
    outputSchema: SummarizeCustomerFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

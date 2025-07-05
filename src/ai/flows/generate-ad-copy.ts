// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Generates advertising copy based on a given prompt and context.
 *
 * - generateAdCopy - A function that handles the ad copy generation process.
 * - GenerateAdCopyInput - The input type for the generateAdCopy function.
 * - GenerateAdCopyOutput - The return type for the generateAdCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdCopyInputSchema = z.object({
  promptTemplate: z.string().describe('The template for the ad prompt.'),
  productName: z.string().describe('The name of the product to advertise.'),
  offerDetails: z
    .string()
    .optional()
    .describe('Specific details about the offer or discount.'),
});
export type GenerateAdCopyInput = z.infer<typeof GenerateAdCopyInputSchema>;

const GenerateAdCopyOutputSchema = z.object({
  adCopy: z
    .string()
    .describe('The generated advertising copy, ready to be used.'),
});
export type GenerateAdCopyOutput = z.infer<typeof GenerateAdCopyOutputSchema>;

export async function generateAdCopy(
  input: GenerateAdCopyInput
): Promise<GenerateAdCopyOutput> {
  return generateAdCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdCopyPrompt',
  input: {schema: GenerateAdCopyInputSchema},
  output: {schema: GenerateAdCopyOutputSchema},
  prompt: `You are an expert copywriter for a kids' clothing brand called "Sugar Tamtom". Your tone is playful, warm, and trustworthy, targeting parents.

  Use the following prompt template and information to generate a compelling ad copy.

  Prompt Template:
  "{{{promptTemplate}}}"

  Product Name: {{productName}}
  {{#if offerDetails}}
  Offer Details: {{offerDetails}}
  {{/if}}

  Generate the final ad copy.
  `,
});

const generateAdCopyFlow = ai.defineFlow(
  {
    name: 'generateAdCopyFlow',
    inputSchema: GenerateAdCopyInputSchema,
    outputSchema: GenerateAdCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

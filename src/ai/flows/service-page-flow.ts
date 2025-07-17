
'use server';

/**
 * @fileOverview A Genkit flow for generating content for a service details page.
 *
 * - generateServicePageContent - A function that handles the content generation.
 * - ServicePageContentInput - The input type for the content generation function.
 * - ServicePageContentOutput - The return type for the content generation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ServicePageContentInputSchema = z.object({
  serviceTitle: z.string().describe('The title of the service.'),
});
export type ServicePageContentInput = z.infer<typeof ServicePageContentInputSchema>;

const ServicePageContentOutputSchema = z.object({
  introduction: z.string().describe('A brief, engaging introduction to the service.'),
  benefits: z.array(z.string()).describe('A list of 3-5 key benefits of using this service.'),
  marketValue: z.string().describe('A paragraph explaining the current market value and importance of this service for businesses.'),
  whyUs: z.string().describe("A compelling paragraph on why a client should choose DataNeuron Digital for this specific service."),
  animationDataUri: z.string().describe("A data URI for a visually stunning, abstract 3D animation related to the service. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type ServicePageContent = z.infer<typeof ServicePageContentOutputSchema>;

export async function generateServicePageContent(input: ServicePageContentInput): Promise<ServicePageContent> {
  return servicePageContentFlow(input);
}

const serviceContentPrompt = ai.definePrompt({
  name: 'serviceContentPrompt',
  input: { schema: ServicePageContentInputSchema },
  output: { schema: ServicePageContentOutputSchema },
  prompt: `
    You are an expert marketing copywriter and creative director for 'DataNeuron Digital', a cutting-edge digital agency.
    Your task is to generate compelling content for a web page dedicated to the following service: {{{serviceTitle}}}.

    The tone should be professional, confident, and persuasive.

    Generate the following content sections:
    1.  **introduction**: Write a brief, engaging introduction (2-3 sentences) to what the {{{serviceTitle}}} service is.
    2.  **benefits**: List 3 to 5 key, tangible benefits a business would gain from this service.
    3.  **marketValue**: Explain the importance and value of this service in today's market. Why is it essential for a modern business?
    4.  **whyUs**: Explain why DataNeuron Digital is the best choice for {{{serviceTitle}}}. Highlight unique strengths like our data-driven approach, expert team, or innovative technology.
  `,
  config: {
    responseModalities: ['TEXT'], // Only text is needed from this prompt
  },
});

const imageGenerationPrompt = ai.definePrompt({
    name: 'serviceImagePrompt',
    input: { schema: z.object({ serviceTitle: z.string() })},
    output: { schema: z.object({ animationDataUri: z.string() }) },
    prompt: `Generate a visually stunning, abstract 3D animation that conceptually represents '{{{serviceTitle}}}'. The image should be dynamic, with a sense of energy and sophistication. It should have a resolution of 800x450.`,
    config: {
        responseModalities: ['IMAGE'],
    }
});

const servicePageContentFlow = ai.defineFlow(
  {
    name: 'servicePageContentFlow',
    inputSchema: ServicePageContentInputSchema,
    outputSchema: ServicePageContentOutputSchema,
  },
  async (input) => {
    // Generate text and image in parallel
    const [contentResult, imageResult] = await Promise.all([
        serviceContentPrompt(input),
        imageGenerationPrompt(input)
    ]);
    
    const { output } = contentResult;
    const { media } = imageResult;

    if (!output) {
      throw new Error('Failed to generate service content.');
    }
    if (!media) {
      throw new Error('Failed to generate service animation.');
    }

    return {
        ...output,
        animationDataUri: media.url,
    };
  }
);


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
  // Remove animationDataUri from the output schema of the text prompt
  output: { schema: ServicePageContentOutputSchema.omit({ animationDataUri: true }) },
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
});

const servicePageContentFlow = ai.defineFlow(
  {
    name: 'servicePageContentFlow',
    inputSchema: ServicePageContentInputSchema,
    outputSchema: ServicePageContentOutputSchema,
  },
  async (input) => {
    // Generate text content first.
    const contentResult = await serviceContentPrompt(input);
    const { output: textContent } = contentResult;

    if (!textContent) {
      throw new Error('Failed to generate service content.');
    }

    let animationDataUri = "https://placehold.co/800x450.png"; // Default placeholder

    try {
        let imagePrompt = `Generate a visually stunning, abstract 3D animation that conceptually represents '${input.serviceTitle}'. The image should be dynamic, with a sense of energy and sophistication. It should have a resolution of 800x450.`;
        
        if (input.serviceTitle.toLowerCase().includes('google ads')) {
          imagePrompt = `Generate an abstract, artistic representation of the Google 'G' logo. The logo should be the central focus, reimagined with a creative, modern aesthetic. Use a vibrant and dynamic color palette, primarily featuring shades of blue and green. The background should be clean and minimalistic, making the logo pop. The style should be elegant and high-tech. Image resolution: 800x450.`
        }

        const imageResult = await ai.generate({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt: imagePrompt,
            config: {
            responseModalities: ['TEXT', 'IMAGE'],
            },
        });

        if (imageResult.media) {
            animationDataUri = imageResult.media.url;
        }
    } catch (error) {
        console.warn('Image generation failed, using placeholder.', error);
        // If image generation fails, we'll just use the placeholder.
        // The text content will still be returned.
    }

    return {
        ...textContent,
        animationDataUri: animationDataUri,
    };
  }
);


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
import { services } from '@/lib/data';
import { googleAI } from '@genkit-ai/googleai';

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
  model: googleAI.model('gemini-1.5-flash'),
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
    const service = services.find(s => s.title === input.serviceTitle);
    const slug = service?.slug || '';

    try {
        let imagePrompt = `Generate a visually stunning, abstract 3D animation that conceptually represents '${input.serviceTitle}'. The image should be dynamic, with a sense of energy and sophistication. It should have a resolution of 800x450.`;
        
        const prompts: Record<string, string> = {
            'ai-dashboard': "Generate an AI Dashboard visual with charts, neural networks, predictive analytics, and data panels. Resolution: 800x450.",
            'digital-marketing': "Generate a Digital Marketing visual with email campaigns, social media ads, and PPC funnels. Resolution: 800x450.",
            'google-ads': `Generate an abstract, artistic representation of the Google 'G' logo. Use a vibrant and dynamic color palette. The background should be clean and minimalistic. Resolution: 800x450.`,
            'seo-optimization': "Generate an SEO Optimization visual with search rankings, analytics charts, and keyword tools. Resolution: 800x450.",
            'logo-and-branding': "Generate an original, official-looking high-resolution logo of one of these global brands: Apple, Google, Microsoft, Amazon, Meta (Facebook), Tesla, Samsung, Coca-Cola, McDonald’s, Nike, Adidas, IBM, Intel, Netflix, Toyota, Mercedes-Benz, BMW, Pepsi, Sony, Huawei. Display the logo on a transparent or white background. Resolution: 800x450.",
            'affiliate-marketing': "Generate an Affiliate Marketing visual with referral links, commission charts, and partnership dashboards. Resolution: 800x450.",
            'data-analysis': "Generate a Data Analysis visual with charts, pie graphs, and snippets of Python/R code on a dashboard. Resolution: 800x450.",
            'social-media': "Generate a Social Media visual with Instagram/Facebook posts, like/share icons, and comment boxes. Resolution: 800x450.",
            '3d-design-animation': "Generate a realistic or animated 3D model of a modern house, a sleek car, or wireless earbuds with good lighting. Resolution: 800x450.",
            'web-development': "Generate a Website Homepage visual with UI/UX mockups and responsive screens. Resolution: 800x450.",
            'whatsapp-chatbot': "Generate a professional WhatsApp chatbot conversation. User: Hello, DataNeuron! Bot: Hi there! 👋 How can I assist you today? User: I'm interested in your Digital Marketing services. Bot: Great choice! 🚀 Could you please share your name, contact number, and email ID so we can get started? The chat should look like a real WhatsApp interface (green & white theme), clean and professional style. Resolution: 800x450.",
            'brochure-creation': "Generate a Brochure Design visual with a tri-fold layout or creative flyer mockup. Resolution: 800x450."
        };

        if (prompts[slug]) {
          imagePrompt = prompts[slug];
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


'use server';

/**
 * @fileOverview A Genkit flow for generating content for a service details page.
 *
 * - generateServicePageContent - A function that handles the content generation.
 * - ServicePageContentInput - The input type for the content generation function.
 * - ServicePageContentOutput - The return type for the content generation function.
 * - regenerateServiceImage - A function to regenerate only the image for a service.
 * - RegenerateServiceImageInput - The input for regenerating the image.
 * - RegenerateServiceImageOutput - The output for regenerating the image.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { services } from '@/lib/data';
import { googleAI } from '@genkit-ai/googleai';

// Input/Output for initial content generation
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

// Input/Output for image regeneration
const RegenerateServiceImageInputSchema = z.object({
  serviceTitle: z.string().describe('The title of the service.'),
});
export type RegenerateServiceImageInput = z.infer<typeof RegenerateServiceImageInputSchema>;

const RegenerateServiceImageOutputSchema = z.object({
  animationDataUri: z.string().describe("A new data URI for the regenerated animation. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type RegenerateServiceImageOutput = z.infer<typeof RegenerateServiceImageOutputSchema>;

/**
 * Generates the image for a given service.
 */
async function generateImageForService(serviceTitle: string): Promise<string> {
    const service = services.find(s => s.title === serviceTitle);
    const slug = service?.slug || '';

    let imagePrompt = `Generate a visually stunning, abstract 3D animation that conceptually represents '${serviceTitle}'. The image should be dynamic, with a sense of energy and sophistication. It should have a resolution of 800x450.`;
    
    const prompts: Record<string, string> = {
        'ai-dashboard': "Generate an AI Dashboard visual with charts, neural networks, predictive analytics, and data panels. Resolution: 800x450.",
        'digital-marketing': "Generate a Digital Marketing visual with email campaigns, social media ads, and PPC funnels. Resolution: 800x450.",
        'google-ads': `Generate an abstract, artistic representation of the Google 'G' logo. Use a vibrant and dynamic color palette. The background should be clean and minimalistic. Resolution: 800x450.`,
        'seo-optimization': "Generate an SEO Optimization visual with search rankings, analytics charts, and keyword tools. Resolution: 800x450.",
        'logo-creation': "Generate an original, official-looking high-resolution logo of one of these global brands: Apple, Google, Microsoft, Amazon, Meta (Facebook), Tesla, Samsung, Coca-Cola, McDonald’s, Nike, Adidas, IBM, Intel, Netflix, Toyota, Mercedes-Benz, BMW, Pepsi, Sony, Huawei. Display the logo on a transparent or white background. Resolution: 800x450.",
        'affiliate-marketing': "Generate an Affiliate Marketing visual with referral links, commission charts, and partnership dashboards. Resolution: 800x450.",
        'data-analysis': "Generate a Data Analysis visual with charts, pie graphs, and snippets of Python/R code on a dashboard. Resolution: 800x450.",
        'social-media-management': "Generate a Social Media visual with Instagram/Facebook posts, like/share icons, and comment boxes. Resolution: 800x450.",
        '3d-design': "Generate a realistic or animated 3D model of a modern house, a sleek car, or wireless earbuds with good lighting. Resolution: 800x450.",
        '3d-animation': "Generate a realistic or animated 3D model of a modern house, a sleek car, or wireless earbuds with good lighting. Resolution: 800x450.",
        'web-development': "Generate a Website Homepage visual with UI/UX mockups and responsive screens. Resolution: 800x450.",
        'whatsapp-chatbot': "Generate a professional WhatsApp chatbot conversation. User: Hello, DataNeuron! Bot: Hi there! 👋 How can I assist you today? User: I'm interested in your Digital Marketing services. Bot: Great choice! 🚀 Could you please share your name, contact number, and email ID so we can get started? The chat should look like a real WhatsApp interface (green & white theme), clean and professional style. Resolution: 800x450.",
        'brochure-creation': "Generate a Brochure Design visual with a tri-fold layout or creative flyer mockup. Resolution: 800x450.",
        'content-writing': 'Generate an image of writing on a screen, with creative copy text layout and a typewriter animation effect. Include visual representations of content documents being edited. Strictly avoid videos, logos, and AI dashboards. Resolution: 800x450.',
        'email-marketing-automation': 'Generate an image showing an automated email campaign interface, including a mail flow diagram, a scheduled send UI, and visuals of customer journey emails. Strictly avoid SEO tools, logos, and WhatsApp screens. Resolution: 800x450.',
        'ui-ux-design': 'Generate an image with mobile and web UI wireframes, a colorful UX flow diagram, and mockups resembling Figma or Adobe XD designs. Include a user testing interface. Strictly avoid 3D visuals, chatbots, and marketing content. Resolution: 800x450.',
        'mobile-app-development': 'Generate an image with a preview of mobile app code (React Native or Flutter), app screen mockups, and both iOS and Android UI interfaces. Strictly avoid dashboards, social posts, and branding icons. Resolution: 800x450.',
        'crm-setup-automation': 'Generate an image showing a CRM dashboard interface like HubSpot or Salesforce, with automation workflows and contact management panels. Strictly avoid social media, video editing, and 3D content. Resolution: 800x450.',
        'ecommerce-store-development': 'Generate an image of a product catalog UI, shopping cart screens, a responsive eCommerce homepage, and payment gateway screens. Strictly avoid SEO rankings, chatbots, and influencer content. Resolution: 800x450.',
        'branding-package': 'Generate an image of a logo on a brand board, with a color palette, typography sets, business card mockups, and a brand guideline booklet. Strictly avoid dashboards, WhatsApp UI, and 3D models. Resolution: 800x450.',
        'lead-generation-service': 'Generate an image with lead funnel graphics, cold outreach dashboards, visuals of email and form submissions, and B2B lead management interfaces. Strictly avoid branding packages, 3D models, and SEO content. Resolution: 800x450.',
        'influencer-marketing-management': 'Generate an image showing influencers with a product, social reach analytics, sponsored post previews, and a campaign management dashboard. Strictly avoid affiliate tools, logos, and website UIs. Resolution: 800x450.',
        'ai-tools-consulting': 'Generate an image of AI tool integrations (like ChatGPT, Zapier, Notion AI), setup screens, and consulting sessions with flow diagrams. Strictly avoid content writing, branding, and WhatsApp screens. Resolution: 800x450.',
        'real-estate-services': 'Generate an image with property marketing visuals, 3D apartment mockups, real estate listing dashboards, and a site visit booking UI. Strictly avoid email marketing, social media ads, and SEO tools. Resolution: 800x450.'
    };

    if (prompts[slug]) {
      imagePrompt = prompts[slug];
    }

    try {
        const imageResult = await ai.generate({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt: imagePrompt,
            config: {
              responseModalities: ['TEXT', 'IMAGE'],
            },
        });

        if (imageResult.media && imageResult.media.url) {
            return imageResult.media.url;
        }
    } catch (error) {
        console.warn('Image generation failed, using placeholder.', error);
    }
    
    // Fallback to a placeholder if generation fails or returns no media
    return "https://placehold.co/800x450.png";
}


// Flow for initial page load
const serviceContentPrompt = ai.definePrompt({
  name: 'serviceContentPrompt',
  input: { schema: ServicePageContentInputSchema },
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
    let textContent: Omit<ServicePageContent, 'animationDataUri'>;

    try {
      const contentResult = await serviceContentPrompt(input);
      textContent = contentResult.output!;
      if (!textContent) {
          throw new Error('AI returned empty content.');
      }
    } catch (error) {
        console.warn('AI content generation failed, using fallback data.', error);
        // Fallback content if the AI fails
        textContent = {
            introduction: `Discover the power of our ${input.serviceTitle} service. We offer tailored solutions to help your business thrive in the digital landscape.`,
            benefits: [
                'Boost your brand visibility and reach.',
                'Drive targeted traffic and increase conversions.',
                'Gain a competitive edge with data-driven strategies.',
                'Receive dedicated support from our team of experts.',
            ],
            marketValue: `In today's competitive market, a strong digital presence is crucial. Our ${input.serviceTitle} service provides the essential tools and expertise to ensure your business not only competes but excels.`,
            whyUs: 'At DataNeuron Digital, we combine innovative technology with a client-centric approach. Our team is dedicated to understanding your unique goals and delivering measurable results that drive growth.',
        };
    }

    const animationDataUri = await generateImageForService(input.serviceTitle);
    
    return {
        ...textContent,
        animationDataUri: animationDataUri,
    };
  }
);

export async function generateServicePageContent(input: ServicePageContentInput): Promise<ServicePageContent> {
  return servicePageContentFlow(input);
}


// Flow for regenerating the image
const regenerateServiceImageFlow = ai.defineFlow(
  {
    name: 'regenerateServiceImageFlow',
    inputSchema: RegenerateServiceImageInputSchema,
    outputSchema: RegenerateServiceImageOutputSchema,
  },
  async (input) => {
    const animationDataUri = await generateImageForService(input.serviceTitle);
    return { animationDataUri };
  }
);

export async function regenerateServiceImage(input: RegenerateServiceImageInput): Promise<RegenerateServiceImageOutput> {
  return regenerateServiceImageFlow(input);
}

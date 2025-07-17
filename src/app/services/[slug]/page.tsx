
'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, Wand2, CheckCircle } from 'lucide-react';
import { services } from '@/lib/data';
import Link from 'next/link';
import { generateServicePageContent, ServicePageContent } from '@/ai/flows/service-page-flow';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { generateAIDashboardPreview } from '@/ai/flows/ai-dashboard-preview';

export default function ServicePage() {
  const params = useParams();
  const { slug } = params;
  const { toast } = useToast();

  const [content, setContent] = useState<ServicePageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const service = services.find(s => s.slug === slug);

  useEffect(() => {
    if (service) {
      generateContent();
    }
  }, [service]);

  if (!service) {
    notFound();
  }
  
  const generateContent = async () => {
    if (!service) return;
    setIsLoading(true);
    try {
      const result = await generateServicePageContent({ serviceTitle: service.title });
      setContent(result);
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Content Generation Failed",
        description: "Could not generate content for this page. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateImage = async () => {
    if (!service || !content) return;
    setIsGeneratingImage(true);

    let imagePrompt = `Generate a visually stunning, abstract 3D animation that conceptually represents '${service.title}'. The image should be dynamic, with a sense of energy and sophistication. It should have a resolution of 800x450.`;
    
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

    if (prompts[service.slug]) {
        imagePrompt = prompts[service.slug];
    }

    try {
        const result = await generateAIDashboardPreview({
            prompt: imagePrompt
        });
        if (result.media) {
            setContent(prev => prev ? { ...prev, animationDataUri: result.media } : { ...content, animationDataUri: result.media });
        }
    } catch (e) {
        console.error(e);
        toast({
            variant: "destructive",
            title: "Image Generation Failed",
            description: "Could not regenerate the image. Please try again later.",
        });
    } finally {
        setIsGeneratingImage(false);
    }
  };


  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -inset-24 bg-gradient-to-r from-primary via-accent to-secondary animate-[spin_20s_linear_infinite]"></div>
      </div>
      <div className="absolute inset-0 z-10 bg-background/90 backdrop-blur-sm"></div>

      <main className="container relative z-20 mx-auto px-4 py-16 sm:py-24">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/#services">
              <ArrowLeft className="mr-2" />
              Back to Services
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
             <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <service.icon className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">{service.title}</h1>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p className="text-lg text-muted-foreground">{content?.introduction}</p>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Why Choose DataNeuron?</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    ) : (
                        <p className="text-muted-foreground">{content?.whyUs}</p>
                    )}
                </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="aspect-video w-full">
                <CardContent className="p-2 h-full">
                {isLoading || isGeneratingImage ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-muted/50 rounded-lg">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="mt-4 text-lg">AI is crafting your animation...</p>
                    </div>
                ) : (
                    content?.animationDataUri && (
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <Image src={content.animationDataUri} alt={`3D animation for ${service.title}`} layout="fill" objectFit="cover" />
                    </div>
                    )
                )}
                </CardContent>
            </Card>
            <Button onClick={handleRegenerateImage} disabled={isGeneratingImage || isLoading} className="w-full">
                {isGeneratingImage ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
                Regenerate Animation
            </Button>
          </div>
        </div>

        <div className="mt-16 space-y-8">
            <h2 className="text-3xl font-bold text-center font-headline">Key Benefits & Market Value</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Core Benefits</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isLoading ? (
                            Array.from({length: 3}).map((_, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <Skeleton className="h-4 flex-grow" />
                                </div>
                            ))
                        ) : (
                            content?.benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                                <p className="text-muted-foreground">{benefit}</p>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Market Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        ) : (
                            <p className="text-muted-foreground">{content?.marketValue}</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>

         <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold font-headline">Ready to get started?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Let's discuss how our {service.title} service can help your business grow.</p>
            <Button asChild size="lg" className="mt-8 text-lg">
                <Link href="/#contact">Contact Us Today</Link>
            </Button>
        </div>
      </main>
    </div>
  );
}

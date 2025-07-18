
'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, Wand2, CheckCircle } from 'lucide-react';
import { services } from '@/lib/data';
import Link from 'next/link';
import { generateServicePageContent, ServicePageContent, regenerateServiceImage } from '@/ai/flows/service-page-flow';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function ServicePage() {
  const params = useParams();
  const { slug } = params;
  const { toast } = useToast();

  const [content, setContent] = useState<ServicePageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const service = services.find(s => s.slug === slug);

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
    if (!service) return;
    setIsGeneratingImage(true);

    try {
        const result = await regenerateServiceImage({ serviceTitle: service.title });
        if (result.animationDataUri) {
            setContent(prev => {
                if (!prev) return null;
                return { ...prev, animationDataUri: result.animationDataUri };
            });
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

  useEffect(() => {
    if (service) {
      generateContent();
    }
  }, [service]);
  
  if (!service) {
    notFound();
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
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
                {service.slug === 'video-editing' ? (
                     <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            poster="https://placehold.co/800x450.png"
                        >
                            <source src="/video-editing-service.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ) : isLoading || isGeneratingImage ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-muted/50 rounded-lg p-4 text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                        <p className="font-bold">➡️ "Experience AI in action — Press regenerate and let DataNeuron work its magic!"</p>
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
             {service.slug !== 'video-editing' && (
                <Button onClick={handleRegenerateImage} disabled={isGeneratingImage || isLoading} className="w-full">
                    {isGeneratingImage ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
                    Regenerate Animation
                </Button>
            )}
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
                    </Header>
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

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Wand2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { generateAIDashboardPreview } from '@/ai/flows/ai-dashboard-preview';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  prompt: z.string().min(10, {
    message: 'Please enter a prompt with at least 10 characters.',
  }),
});

export function AIDashboardPreviewer() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: 'A futuristic AI dashboard for e-commerce analytics, showing sales trends and user behavior.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setImageUrl(null);
    try {
      const result = await generateAIDashboardPreview(values);
      if (result && result.media) {
        setImageUrl(result.media);
      } else {
        toast({
            variant: "destructive",
            title: "Generation Failed",
            description: "Could not generate the preview. Please try again.",
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="ai-preview" className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl font-headline">AI Dashboard Previewer</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Got an idea? Describe your desired dashboard, and our AI will generate a conceptual preview. Visualize your data solutions in seconds.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="text-primary" />
                <span>Generate Your Preview</span>
              </CardTitle>
              <CardDescription>Enter a prompt to create a dashboard concept.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="e.g., A dashboard for social media engagement" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Preview
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="min-h-[300px] flex items-center justify-center bg-card/80 backdrop-blur-sm">
            <CardContent className="p-2 w-full h-full">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="mt-4 text-lg">Our AI is building your concept...</p>
                </div>
              )}
              {!isLoading && imageUrl && (
                <div className="relative aspect-video w-full h-full rounded-lg overflow-hidden">
                  <Image src={imageUrl} alt="AI generated dashboard preview" layout="fill" objectFit="contain" className="bg-muted" />
                </div>
              )}
              {!isLoading && !imageUrl && (
                 <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Wand2 className="h-12 w-12" />
                  <p className="mt-4 text-center text-lg">Your generated dashboard will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

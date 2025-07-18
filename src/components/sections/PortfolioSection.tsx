
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { projects, projectTags } from '@/lib/data';
import { Loader2, Wand2 } from 'lucide-react';
import { generateAIDashboardPreview } from '@/ai/flows/ai-dashboard-preview';
import { useToast } from '@/hooks/use-toast';

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projectImages, setProjectImages] = useState<Record<string, string | null>>(
    projects.reduce((acc, p) => ({ ...acc, [p.title]: p.image }), {})
  );
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const handleGenerateImage = async (title: string, hint: string) => {
    setLoadingStates((prev) => ({ ...prev, [title]: true }));
    try {
      const result = await generateAIDashboardPreview({
        prompt: `A professional portfolio image for a project about ${hint}, with a resolution of 800x450.`,
      });
      if (result && result.media) {
        setProjectImages((prev) => ({ ...prev, [title]: result.media }));
      } else {
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: "Could not generate the image. Please try again.",
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
      setLoadingStates((prev) => ({ ...prev, [title]: false }));
    }
  };

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl font-headline">Our Featured Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A glimpse into the innovative solutions we&apos;ve crafted for our clients.
          </p>
        </div>

        <div className="my-10 flex flex-wrap justify-center gap-2">
          {['All', ...projectTags].map(tag => (
            <Button
              key={tag}
              variant={activeFilter === tag ? 'default' : 'outline'}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.title} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col bg-card/80 backdrop-blur-sm">
              <CardHeader className='p-0'>
                <div className="relative aspect-[800/450] w-full">
                  {loadingStates[project.title] ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-muted/50">
                      <Loader2 className="h-12 w-12 animate-spin text-primary" />
                      <p className="mt-4 text-lg">Generating...</p>
                    </div>
                  ) : (
                    projectImages[project.title] ? (
                        <Image
                            src={projectImages[project.title]!}
                            alt={project.title}
                            data-ai-hint={project.hint}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full bg-muted/50 p-4 rounded-t-lg">
                            <p className="text-center font-bold text-muted-foreground">
                                ➡️ Experience AI in action — Press regenerate and let DataNeuron work its magic!
                            </p>
                        </div>
                    )
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardTitle className="mb-2 text-xl">{project.title}</CardTitle>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
              <CardFooter className="flex-col items-start gap-4 p-6 pt-0">
                 <p className="font-semibold text-primary">{project.results}</p>
                 <Button 
                    onClick={() => handleGenerateImage(project.title, project.hint)} 
                    disabled={loadingStates[project.title]}
                    variant="outline"
                    className="w-full"
                 >
                    {loadingStates[project.title] ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Regenerate Image
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

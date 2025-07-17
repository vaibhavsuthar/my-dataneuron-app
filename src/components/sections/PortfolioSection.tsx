'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { projects, projectTags } from '@/lib/data';

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('All');

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
          {filteredProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="relative h-56 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    data-ai-hint={project.hint}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardTitle className="mb-2 text-xl">{project.title}</CardTitle>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
              <CardFooter>
                 <p className="font-semibold text-primary">{project.results}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

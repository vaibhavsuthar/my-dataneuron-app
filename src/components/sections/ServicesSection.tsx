
'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 }, 
        {
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.2 + index * 0.1, 
            }
          );
        }
      });
    }
  }, [inView]);

  return (
    <section id="services" ref={sectionRef} className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center" ref={inViewRef}>
          <h2 ref={titleRef} className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl font-headline opacity-0">Our Core Offerings</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We provide a comprehensive suite of services to power your digital transformation and drive growth.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="opacity-0"
            >
              <Link href={`/services/${service.slug}`} className="group block h-full">
                <Card className="h-full text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card/60 backdrop-blur-sm hover:bg-card">
                  <CardHeader className="items-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      <service.icon className="h-8 w-8" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

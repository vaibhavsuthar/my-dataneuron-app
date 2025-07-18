
'use client';

import { Award, Users, LifeBuoy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const CountUpNumber = ({ to, duration = 2000 }: { to: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      let start = 0;
      const end = to;
      const incrementTime = (duration / end);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, to, duration]);

  return <span ref={ref}>{count}</span>;
};


export function WhyChooseUsSection() {
  const stats = [
    { number: 50, label: 'Projects Completed' },
    { number: 98, label: 'Client Satisfaction', suffix: '%' },
    { number: 20, label: 'Expert Team Members' },
    { number: 400, label: 'Engagement Boost', suffix: '%' },
  ];

  const features = [
    {
      icon: Award,
      title: 'Proven Expertise',
      description: 'Our team consists of industry veterans with a track record of success.',
    },
    {
      icon: Users,
      title: 'Client-Centric Approach',
      description: 'We tailor our solutions to your unique needs, ensuring maximum impact.',
    },
    {
      icon: LifeBuoy,
      title: '24/7 Support',
      description: 'Our commitment to you extends beyond project delivery with round-the-clock assistance.',
    },
  ];

  return (
    <section id="why-us" className="relative w-full py-16 sm:py-24 bg-secondary/50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://placehold.co/1920x1080.png"
          >
            <source src="/why-us-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-secondary/80"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl font-headline">Why Partner with DataNeuron?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
            We are more than a service provider; we are your strategic partner in digital innovation and growth.
            </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((stat, index) => (
            <div key={index} className="rounded-lg bg-background/50 p-6 backdrop-blur-sm">
                <p className="text-4xl font-bold text-primary sm:text-5xl">
                <CountUpNumber to={stat.number} />{stat.suffix || '+'}
                </p>
                <p className="mt-2 text-sm font-medium text-muted-foreground sm:text-base">{stat.label}</p>
            </div>
            ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
            <Card key={index} className="bg-background/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
            </Card>
            ))}
        </div>
        </div>
    </section>
  );
}

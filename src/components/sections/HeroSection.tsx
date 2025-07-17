import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://placehold.co/1920x1080.png" 
        >
          {/* Make sure to add your video file to the /public folder */}
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center px-4">
        <div className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-semibold text-primary-foreground border border-primary/30 backdrop-blur-sm">
          Welcome to the Future of Data
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Transforming Data into Intelligence
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
          DataNeuron specializes in AI-powered solutions, digital marketing, and creative services to elevate your business in the digital age.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="text-lg">
            <Link href="#services">Explore Our AI Solutions</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg bg-transparent hover:bg-white/10 hover:text-white border-white/50">
            <Link href="#contact">Let&apos;s Build Something Amazing</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

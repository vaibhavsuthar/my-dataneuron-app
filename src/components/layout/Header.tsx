
'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu } from 'lucide-react';
import { Logo } from '../shared/Logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    Calendly: any;
  }
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    // Initialize the audio element once.
    if (!audioRef.current) {
        audioRef.current = new Audio('/navigation-sound.wav');
        audioRef.current.preload = 'auto';
        audioRef.current.volume = 0.7; // Set volume to 70%
    }
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const playNavigationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Rewind to the start
      audioRef.current.play().catch(error => {
          console.error("Audio play failed:", error);
      });
    }
  };

  const handleCalendlyClick = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/aidataneuronbusiness/30min',
      });
    }
  };

  const navItems = navLinks.map((link) => (
    <Link
      key={link.name}
      href={link.href}
      className={cn(
        'transition-colors font-medium',
        'text-foreground/80 hover:text-primary',
        pathname === link.href ? 'text-primary' : ''
      )}
      onClick={playNavigationSound}
    >
      {link.name}
    </Link>
  ));

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "shadow-sm border-b" : "border-b-transparent",
    )}>
      <div className={cn("absolute inset-0 transition-opacity", isScrolled ? "bg-background/80 backdrop-blur-sm" : "bg-transparent")}></div>
      <div className="container relative z-10 mx-auto flex h-20 items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center space-x-6 text-lg font-medium md:flex">
          {navItems}
        </nav>

        <div className="flex items-center gap-4">
          <Button onClick={handleCalendlyClick} className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
             Let&apos;s Talk
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className={cn(
                  "md:hidden",
                  isScrolled ? "bg-card text-foreground" : "text-white hover:bg-white/20"
              )}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col items-center space-y-6 pt-12 text-xl">
                  {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className='transition-colors font-medium text-foreground/80 hover:text-primary'
                        onClick={() => {
                            playNavigationSound();
                            const trigger = document.querySelector('[data-radix-collection-item] > button');
                            if (trigger) (trigger as HTMLElement).click();
                        }}
                    >
                        {link.name}
                    </Link>
                  ))}
                </div>
                 <Button onClick={handleCalendlyClick} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    Let&apos;s Talk
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

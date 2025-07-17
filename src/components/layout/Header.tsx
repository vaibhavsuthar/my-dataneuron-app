'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu } from 'lucide-react';
import { Logo } from '../shared/Logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = navLinks.map((link) => (
    <Link
      key={link.name}
      href={link.href}
      className={cn(
        'transition-colors font-medium',
        isScrolled ? 'text-foreground/80 hover:text-primary' : 'text-primary-foreground/90 hover:text-primary',
        pathname === link.href && isScrolled ? 'text-primary' : ''
      )}
    >
      {link.name}
    </Link>
  ));

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 shadow-sm border-b" : "bg-transparent",
    )}>
      <div className={cn("absolute inset-0 transition-opacity", isScrolled ? "bg-background/80 backdrop-blur-sm" : "opacity-0")}></div>
      <div className="container relative z-10 mx-auto flex h-20 items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center space-x-6 text-lg font-medium md:flex">
          {navItems}
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:flex">
             <Link href="#contact">Let&apos;s Talk</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col items-center space-y-6 pt-12 text-xl">
                  {navItems.map((navItem) => (
                    <div key={navItem.key} onClick={() => {
                        const trigger = document.querySelector('[data-radix-collection-item] > button');
                        if (trigger) (trigger as HTMLElement).click();
                    }}>
                        {navItem}
                    </div>
                  ))}
                </div>
                 <Button asChild className="w-full">
                    <Link href="#contact">Let&apos;s Talk</Link>
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

import Link from 'next/link';
import { Logo } from '../shared/Logo';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, ShieldAlert } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col items-start gap-4">
          <Logo />
          <p className="text-muted-foreground">
            Transforming data into intelligence with cutting-edge AI solutions and creative digital strategies.
          </p>
          <div className="flex space-x-2">
            {socialLinks.map((link) => (
              <Button key={link.name} variant="ghost" size="icon" asChild>
                <Link href={link.href} aria-label={link.name}>
                  <link.icon className="h-5 w-5" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
          <address className="space-y-3 not-italic text-muted-foreground">
            <p className="flex items-start gap-2">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              <span>Vijay Cross Rd, University Area, Ahmedabad, Gujarat 380009</span>
            </p>
            <a href="mailto:aidataneuronbusiness@gmail.com" className="flex items-center gap-2 transition-colors hover:text-primary">
              <Mail className="h-5 w-5 shrink-0 text-primary" />
              <span>aidataneuronbusiness@gmail.com</span>
            </a>
            <a href="tel:+917859958279" className="flex items-center gap-2 transition-colors hover:text-primary">
              <Phone className="h-5 w-5 shrink-0 text-primary" />
              <span>+91 - 7859958279</span>
            </a>
            <a href="mailto:ai@dataneuron.business" className="flex items-center gap-2 transition-colors hover:text-primary">
                <ShieldAlert className="h-5 w-5 shrink-0 text-primary" />
                <span>ai@dataneuron.business</span>
            </a>
          </address>
           <div className="mt-4">
            <h4 className="font-semibold">Business Hours:</h4>
            <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
        
        <div>
          <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
          <p className="mb-4 text-muted-foreground">Stay updated with our latest insights and news.</p>
          <form className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" className="bg-background" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} DataNeuron Digital. All rights reserved.</p>
          <div className="mt-4 flex space-x-4 sm:mt-0">
            <Link href="/privacy-policy" className="transition-colors hover:text-primary">Privacy Policy</Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

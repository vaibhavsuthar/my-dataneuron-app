
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Building, Home, Landmark, MapPin, Search, Users, Phone, PlusCircle, Shield } from 'lucide-react';
import Link from 'next/link';

// Placeholder data - this will eventually come from Firebase
const placeholderProperties = [
  {
    id: 1,
    title: 'Spacious 3BHK Apartment in Satellite',
    image: 'https://placehold.co/600x400.png',
    hint: 'modern apartment interior',
    price: '1.2 Cr',
    type: 'Sell',
    propertyType: 'House / Flat',
    location: 'Satellite, Ahmedabad',
    description: 'A beautiful, well-ventilated 3BHK apartment with modern amenities and a great view. Located in a prime area with easy access to schools and hospitals.',
  },
  {
    id: 2,
    title: 'Commercial Office Space on SG Highway',
    image: 'https://placehold.co/600x400.png',
    hint: 'modern office space',
    price: '75,000 / month',
    type: 'Rent',
    propertyType: 'Commercial Shop/Office',
    location: 'SG Highway, Ahmedabad',
    description: 'Prime commercial office space ideal for startups and established businesses. Fully furnished and ready to move in.',
  },
    {
    id: 3,
    title: 'Residential Plot in Gota',
    image: 'https://placehold.co/600x400.png',
    hint: 'residential land plot',
    price: '80 Lacs',
    type: 'Sell',
    propertyType: 'Land / Plot',
    location: 'Gota, Ahmedabad',
    description: 'A 250 sq. yard residential plot in a rapidly developing area. Perfect for building your dream home. Clear title and ready for immediate sale.',
  },
];

export default function RealEstatePage() {
  const [properties, setProperties] = useState(placeholderProperties);
  const [filters, setFilters] = useState({
    type: 'all',
    city: 'all',
    budget: '',
  });

  const handleContact = () => {
    window.location.href = 'tel:+917859958279';
  };

  return (
    <div className="bg-background text-foreground py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline sm:text-5xl">Real Estate Listings</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our curated list of properties for sale and rent in Ahmedabad & Gandhinagar.
          </p>
        </div>

        <Card className="mb-12 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                    <CardTitle>Filter Properties</CardTitle>
                    <Button asChild variant="secondary">
                        <Link href="/real-estate/admin">
                            <Shield className="mr-2" />
                            Admin
                        </Link>
                    </Button>
                </div>
                 <Button asChild>
                    <Link href="/real-estate/add-property">
                        <PlusCircle className="mr-2" />
                        Add Your Property
                    </Link>
                </Button>
            </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select onValueChange={(value) => setFilters(f => ({...f, type: value}))}>
              <SelectTrigger>
                <Home className="mr-2 text-muted-foreground" />
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Property Types</SelectItem>
                <SelectItem value="house-flat">House / Flat</SelectItem>
                <SelectItem value="tenament">Tenament</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="land-plot">Land / Plot</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setFilters(f => ({...f, city: value}))}>
              <SelectTrigger>
                <MapPin className="mr-2 text-muted-foreground" />
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                <SelectItem value="gandhinagar">Gandhinagar</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground flex items-center">₹</span>
                <Input
                    type="text"
                    placeholder="Max Budget (e.g., 5000000)"
                    className="pl-10"
                    value={filters.budget}
                    onChange={(e) => setFilters(f => ({...f, budget: e.target.value}))}
                />
            </div>
            <Button className="w-full">
              <Search className="mr-2" />
              Search
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop) => (
            <Card key={prop.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col bg-card/80 backdrop-blur-sm">
              <CardHeader className="p-0 relative">
                <div className="absolute top-2 left-2 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  FOR {prop.type.toUpperCase()}
                </div>
                <div className="aspect-video w-full">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    data-ai-hint={prop.hint}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <p className="text-sm text-primary font-semibold mb-1">{prop.propertyType}</p>
                <CardTitle className="mb-2 text-xl">{prop.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    {prop.location}
                </CardDescription>
                <p className="text-muted-foreground text-sm line-clamp-3">{prop.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between items-center">
                 <p className="text-2xl font-bold text-primary">₹{prop.price}</p>
                 <Button onClick={handleContact}>
                    <Phone className="mr-2 h-4 w-4" />
                    Contact
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

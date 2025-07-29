
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Building, Home, Landmark, MapPin, Search, Users, Phone, PlusCircle, Shield, Loader2, BadgeAlert } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface Property {
    id: string;
    title: string;
    price: number;
    listingType: string;
    propertyType: string;
    location: string;
    description: string;
    photoUrls: string[];
}


export default function RealEstatePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    city: 'all',
    budget: '',
    listingType: 'all',
    searchTerm: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const q = query(
            collection(db, "properties"), 
            where("approved", "==", true),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const props: Property[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            props.push({ 
                id: doc.id,
                title: `${data.size} sq. ft. ${data.propertyType} in ${data.area}`,
                ...data
            } as Property);
        });
        setProperties(props);
        setFilteredProperties(props);
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast({
            variant: "destructive",
            title: "Failed to load properties",
            description: "Could not fetch data from the database.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let tempProperties = [...properties];
    
    if (filters.listingType !== 'all') {
      tempProperties = tempProperties.filter(p => p.listingType === filters.listingType);
    }
    if (filters.type !== 'all') {
      tempProperties = tempProperties.filter(p => p.propertyType === filters.type);
    }
    if (filters.city !== 'all') {
      tempProperties = tempProperties.filter(p => p.location.toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.budget) {
      tempProperties = tempProperties.filter(p => p.price <= parseInt(filters.budget));
    }
     if (filters.searchTerm) {
      tempProperties = tempProperties.filter(p => 
        p.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    setFilteredProperties(tempProperties);
  }, [filters, properties]);


  const handleContact = () => {
    window.location.href = 'tel:+917859958279';
  };

  const propertyTypes = [
    { value: 'House / Flat', label: 'House / Flat', icon: Home },
    { value: 'Tenament', label: 'Tenament', icon: Users },
    { value: 'Commercial Shop/Office', label: 'Commercial', icon: Building },
    { value: 'Land / Plot', label: 'Land / Plot', icon: Landmark }
  ];

  return (
    <div className="bg-background text-foreground py-16 sm:py-24 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline sm:text-5xl">Real Estate Listings</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our curated list of properties for sale and rent in Ahmedabad & Gandhinagar.
          </p>
        </div>

        <Card className="mb-12 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <Input
                type="text"
                placeholder="Search by keyword, location..."
                className="lg:col-span-3"
                value={filters.searchTerm}
                onChange={(e) => setFilters(f => ({...f, searchTerm: e.target.value}))}
            />
             <Select onValueChange={(value) => setFilters(f => ({...f, listingType: value}))}>
              <SelectTrigger>
                <SelectValue placeholder="For Sale / Rent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">For Sale / Rent</SelectItem>
                <SelectItem value="Sell">Sell</SelectItem>
                <SelectItem value="Rent">Rent</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setFilters(f => ({...f, type: value}))}>
              <SelectTrigger>
                <Home className="mr-2 text-muted-foreground" />
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Property Types</SelectItem>
                {propertyTypes.map(pt => <SelectItem key={pt.value} value={pt.value}>{pt.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setFilters(f => ({...f, city: value}))}>
              <SelectTrigger>
                <MapPin className="mr-2 text-muted-foreground" />
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                <SelectItem value="Gandhinagar">Gandhinagar</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground flex items-center">₹</span>
                <Input
                    type="number"
                    placeholder="Max Budget (e.g., 5000000)"
                    className="pl-8"
                    value={filters.budget}
                    onChange={(e) => setFilters(f => ({...f, budget: e.target.value}))}
                />
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="flex flex-col">
                        <Skeleton className="h-48 w-full" />
                        <CardContent className="p-6 flex-grow space-y-4">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                         <CardFooter className="p-6 pt-0 flex justify-between items-center">
                            <Skeleton className="h-8 w-1/3" />
                            <Skeleton className="h-10 w-28" />
                         </CardFooter>
                    </Card>
                ))}
            </div>
        ) : filteredProperties.length === 0 ? (
            <div className="text-center py-16">
                <BadgeAlert className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No Properties Found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your filters or check back later.
                </p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
                <Card key={prop.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col bg-card/80 backdrop-blur-sm">
                <CardHeader className="p-0 relative">
                    <div className="absolute top-2 left-2 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    FOR {prop.listingType.toUpperCase()}
                    </div>
                    <div className="aspect-video w-full">
                    <Image
                        src={prop.photoUrls[0]}
                        alt={prop.title}
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
                    <p className="text-2xl font-bold text-primary">₹{prop.price.toLocaleString('en-IN')}</p>
                    <Button onClick={handleContact}>
                        <Phone className="mr-2 h-4 w-4" />
                        Contact
                    </Button>
                </CardFooter>
                </Card>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}

    

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Building, DollarSign, Home, Landmark, MapPin, Maximize, MessageSquare, Phone, Upload, User, Users, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const propertyFormSchema = z.object({
  propertyType: z.string().min(1, 'Please select a property type.'),
  listingType: z.string().min(1, 'Please select a listing type.'),
  city: z.string().min(2, 'City is required.'),
  area: z.string().min(2, 'Area or locality is required.'),
  price: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive('Price must be positive.')),
  size: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive('Size must be positive.')),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  ownerName: z.string().optional(),
  ownerMobile: z.string().min(10, 'A valid mobile number is required.'),
  photos: z.any().optional(), // Will be handled by a file input
});

export default function AddPropertyPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof propertyFormSchema>>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      propertyType: '',
      listingType: '',
      city: '',
      area: '',
      price: 0,
      size: 0,
      description: '',
      ownerName: '',
      ownerMobile: '',
    },
  });

  // Placeholder for submission logic
  function onSubmit(values: z.infer<typeof propertyFormSchema>) {
    console.log(values);
    toast({
      title: 'Submission Received!',
      description: 'Your property details have been submitted for review.',
    });
    form.reset();
  }

  return (
    <div className="bg-secondary/50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-8">
            <Button asChild variant="outline">
                <Link href="/real-estate">
                    <ArrowLeft className="mr-2" />
                    Back to Listings
                </Link>
            </Button>
        </div>
        <Card className="max-w-4xl mx-auto bg-card">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline">List Your Property</CardTitle>
            <CardDescription>Fill in the details below. Your contact information will remain private.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <div className="relative">
                            <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                                <SelectTrigger className="pl-10">
                                <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                            </FormControl>
                           </div>
                          <SelectContent>
                            <SelectItem value="house-flat"><Home className="mr-2"/> House / Flat</SelectItem>
                            <SelectItem value="tenament"><Users className="mr-2"/> Tenament</SelectItem>
                            <SelectItem value="commercial"><Building className="mr-2"/> Commercial Shop/Office</SelectItem>
                            <SelectItem value="land-plot"><Landmark className="mr-2"/> Land / Plot</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="listingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing For</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <div className="relative">
                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                                <SelectTrigger className="pl-10">
                                <SelectValue placeholder="Select listing type" />
                                </SelectTrigger>
                            </FormControl>
                           </div>
                          <SelectContent>
                            <SelectItem value="sell">Sell</SelectItem>
                            <SelectItem value="rent">Rent</SelectItem>
                            <SelectItem value="buy">Buy</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                                <Input placeholder="e.g., Ahmedabad" {...field} className="pl-10" />
                            </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Area / Locality</FormLabel>
                            <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                                <Input placeholder="e.g., Satellite" {...field} className="pl-10" />
                            </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price (INR)</FormLabel>
                            <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                                <Input type="number" placeholder="e.g., 5000000" {...field} className="pl-10" />
                            </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Size (sq. ft.)</FormLabel>
                            <div className="relative">
                            <Maximize className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                                <Input type="number" placeholder="e.g., 1200" {...field} className="pl-10" />
                            </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                            <Textarea placeholder="Describe your property in detail..." {...field} className="pl-10 min-h-[120px]" />
                            </FormControl>
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="photos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Photos (Max 5)</FormLabel>
                        <div className="relative">
                          <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <FormControl>
                            <Input type="file" {...field} className="pl-10" multiple accept="image/*" />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="ownerName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Name (Optional)</FormLabel>
                            <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                                <Input placeholder="John Doe" {...field} className="pl-10" />
                            </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="ownerMobile"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Mobile (Private)</FormLabel>
                            <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                                <Input placeholder="+91 98765 43210" {...field} className="pl-10" />
                            </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" size="lg" className="w-full text-lg">Submit Property for Review</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


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
import { ArrowLeft, Building, Home, Landmark, MapPin, Maximize, MessageSquare, Phone, Upload, User, Users, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg"];

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
  photos: z
    .any()
    .refine((files) => files?.length > 0, "At least one photo is required.")
    .refine((files) => files?.length <= 3, "You can upload a maximum of 3 photos.")
    .refine(
        (files) => {
            if (!files || files.length === 0) return true;
            return Array.from(files).every((file: any) => ACCEPTED_IMAGE_TYPES.includes(file.type));
        },
        "Only .jpg and .jpeg formats are supported."
    ),
});

export default function AddPropertyPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      photos: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof propertyFormSchema>) {
    setIsSubmitting(true);
    try {
      // 1. Upload photos to Firebase Storage
      const photoUrls: string[] = [];
      for (const file of Array.from(values.photos as FileList)) {
        const storageRef = ref(storage, `properties/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        photoUrls.push(downloadURL);
      }

      // 2. Save property data to Firestore
      await addDoc(collection(db, "properties"), {
        propertyType: values.propertyType,
        listingType: values.listingType,
        location: `${values.area}, ${values.city}`,
        city: values.city,
        area: values.area,
        price: values.price,
        size: values.size,
        description: values.description,
        ownerName: values.ownerName,
        ownerMobile: values.ownerMobile,
        photoUrls: photoUrls,
        approved: false, // Default to not approved
        createdAt: serverTimestamp(),
      });

      toast({
        title: 'Submission Received!',
        description: 'Your property has been submitted for review. It will be live once approved by our team.',
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting property:", error);
      toast({
        variant: "destructive",
        title: 'Submission Failed',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                           <div className="relative">
                            <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                                <SelectTrigger className="pl-10">
                                <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                            </FormControl>
                           </div>
                          <SelectContent>
                            <SelectItem value="House / Flat"><Home className="mr-2"/> House / Flat</SelectItem>
                            <SelectItem value="Tenament"><Users className="mr-2"/> Tenament</SelectItem>
                            <SelectItem value="Commercial Shop/Office"><Building className="mr-2"/> Commercial Shop/Office</SelectItem>
                            <SelectItem value="Land / Plot"><Landmark className="mr-2"/> Land / Plot</SelectItem>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                           <div className="relative">
                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <FormControl>
                                <SelectTrigger className="pl-10">
                                <SelectValue placeholder="Select listing type" />
                                </SelectTrigger>
                            </FormControl>
                           </div>
                          <SelectContent>
                            <SelectItem value="Sell">Sell</SelectItem>
                            <SelectItem value="Rent">Rent</SelectItem>
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
                                <Input placeholder="e.g., Ahmedabad" {...field} disabled={isSubmitting}/>
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
                                <Input placeholder="e.g., Satellite" {...field} disabled={isSubmitting}/>
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
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground">₹</span>
                            <FormControl>
                                <Input type="number" placeholder="e.g., 5000000" {...field} className="pl-10" disabled={isSubmitting}/>
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
                                <Input type="number" placeholder="e.g., 1200" {...field} className="pl-10" disabled={isSubmitting}/>
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
                            <Textarea placeholder="Describe your property in detail..." {...field} className="pl-10 min-h-[120px]" disabled={isSubmitting}/>
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
                        <FormLabel>Upload Photos (Max 3, JPG only)</FormLabel>
                         <FormControl>
                           <Input 
                              type="file"
                              multiple
                              accept="image/jpeg, image/jpg"
                              onChange={(e) => field.onChange(e.target.files)}
                              disabled={isSubmitting}
                           />
                         </FormControl>
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
                                <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
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
                                <Input placeholder="+91 98765 43210" {...field} disabled={isSubmitting} />
                            </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                        </>
                    ) : (
                        'Submit Property for Review'
                    )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Download, CheckCircle, XCircle, Loader2, BadgeAlert } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface Property {
    id: string;
    title: string;
    price: number;
    listingType: string;
    propertyType: string;
    location: string;
    ownerName?: string;
    ownerMobile: string;
    approved: boolean;
    photoUrls: string[];
    createdAt: Timestamp;
}

export default function RealEstateAdminPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const props: Property[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        props.push({ 
            id: doc.id,
            title: `${data.size} sq. ft. ${data.propertyType} in ${data.location}`,
            ...data
        } as Property);
      });
      setProperties(props);
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

  useEffect(() => {
    fetchProperties();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async (id: string) => {
    const propertyRef = doc(db, "properties", id);
    try {
        await updateDoc(propertyRef, { approved: true });
        toast({ title: "Property Approved!", description: "The listing is now live." });
        fetchProperties(); // Refresh list
    } catch (error) {
        console.error("Error approving property:", error);
        toast({ variant: "destructive", title: "Approval Failed" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this listing permanently?")) return;
    const propertyRef = doc(db, "properties", id);
    try {
        await deleteDoc(propertyRef);
        toast({ title: "Property Deleted!", description: "The listing has been removed." });
        fetchProperties(); // Refresh list
    } catch (error) {
        console.error("Error deleting property:", error);
        toast({ variant: "destructive", title: "Deletion Failed" });
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'ID', 'Title', 'Price (INR)', 'Listing Type', 'Property Type', 'Location',
      'Owner Name', 'Owner Mobile', 'Status', 'Date Submitted'
    ];
    const rows = properties.map(prop => 
      [
        prop.id,
        `"${prop.title}"`,
        prop.price,
        prop.listingType,
        `"${prop.propertyType}"`,
        `"${prop.location}"`,
        `"${prop.ownerName || ''}"`,
        prop.ownerMobile,
        prop.approved ? 'Approved' : 'Pending',
        prop.createdAt ? prop.createdAt.toDate().toLocaleDateString() : 'N/A'
      ].join(',')
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "property_listings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-secondary/50 py-16 sm:py-24 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
            <Button asChild variant="outline">
                <Link href="/real-estate">
                    <ArrowLeft className="mr-2" />
                    Back to Listings
                </Link>
            </Button>
        </div>

        <Card className="bg-card">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold font-headline">Admin Panel</CardTitle>
              <CardDescription>Manage and export property listings.</CardDescription>
            </div>
            <Button onClick={handleExportCSV} disabled={isLoading || properties.length === 0}>
              <Download className="mr-2" />
              Export to CSV
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            ) : properties.length === 0 ? (
                <div className="text-center py-16">
                    <BadgeAlert className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No Properties Found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        There are no submitted properties to display yet.
                    </p>
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Photo</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {properties.map((prop) => (
                            <TableRow key={prop.id}>
                                <TableCell>
                                    <Image src={prop.photoUrls[0]} alt={prop.title} width={80} height={60} className="rounded-md object-cover" />
                                </TableCell>
                                <TableCell className="font-medium max-w-xs break-words">
                                    {prop.title}
                                    <div className="text-xs text-muted-foreground">{prop.propertyType}</div>
                                </TableCell>
                                <TableCell>₹{prop.price.toLocaleString('en-IN')}</TableCell>
                                <TableCell>{prop.listingType}</TableCell>
                                <TableCell>
                                    <div>{prop.ownerName || 'N/A'}</div>
                                    <div className="text-sm text-muted-foreground">{prop.ownerMobile}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={prop.approved ? "default" : "secondary"}>
                                        {prop.approved ? "Approved" : "Pending"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="space-x-2 text-right">
                                    {!prop.approved && (
                                        <Button variant="outline" size="sm" onClick={() => handleApprove(prop.id)}>
                                            <CheckCircle className="mr-2" />
                                            Approve
                                        </Button>
                                    )}
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(prop.id)}>
                                        <XCircle className="mr-2" />
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

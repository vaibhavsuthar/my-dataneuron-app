
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

// Placeholder data - this will eventually come from Firebase
const placeholderProperties = [
  {
    id: 1,
    title: 'Spacious 3BHK Apartment in Satellite',
    price: '1.2 Cr',
    type: 'Sell',
    propertyType: 'House / Flat',
    location: 'Satellite, Ahmedabad',
    ownerName: 'Ramesh Patel',
    ownerMobile: '+919876543210',
    status: 'Approved'
  },
  {
    id: 2,
    title: 'Commercial Office Space on SG Highway',
    price: '75,000 / month',
    type: 'Rent',
    propertyType: 'Commercial Shop/Office',
    location: 'SG Highway, Ahmedabad',
    ownerName: 'Sunita Sharma',
    ownerMobile: '+919876543211',
    status: 'Pending'
  },
    {
    id: 3,
    title: 'Residential Plot in Gota',
    price: '80 Lacs',
    type: 'Sell',
    propertyType: 'Land / Plot',
    location: 'Gota, Ahmedabad',
    ownerName: 'Amit Singh',
    ownerMobile: '+919876543212',
    status: 'Approved'
  },
];

export default function RealEstateAdminPage() {
  const [properties] = useState(placeholderProperties);

  const handleExportCSV = () => {
    const headers = [
      'ID', 'Title', 'Price', 'Type', 'Property Type', 'Location',
      'Owner Name', 'Owner Mobile', 'Status'
    ];
    const rows = properties.map(prop => 
      [
        prop.id, `"${prop.title}"`, `"${prop.price}"`, prop.type,
        `"${prop.propertyType}"`, `"${prop.location}"`,
        `"${prop.ownerName}"`, prop.ownerMobile, prop.status
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

        <Card className="bg-card">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold font-headline">Admin Panel</CardTitle>
              <CardDescription>Manage and export property listings.</CardDescription>
            </div>
            <Button onClick={handleExportCSV}>
              <Download className="mr-2" />
              Export to CSV
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {properties.map((prop) => (
                        <TableRow key={prop.id}>
                            <TableCell className="font-medium">{prop.title}</TableCell>
                            <TableCell>{prop.price}</TableCell>
                            <TableCell>{prop.type}</TableCell>
                            <TableCell>
                                <div>{prop.ownerName}</div>
                                <div className="text-sm text-muted-foreground">{prop.ownerMobile}</div>
                            </TableCell>
                            <TableCell>{prop.status}</TableCell>
                            <TableCell className="space-x-2">
                                <Button variant="outline" size="sm">Approve</Button>
                                <Button variant="destructive" size="sm">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

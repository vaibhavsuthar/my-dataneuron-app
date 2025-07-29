
'use server';

/**
 * @fileOverview A Genkit flow for handling property submissions.
 * This flow receives property details and image data URIs, saves the text data
 * to Firestore immediately, then uploads the images to Firebase Storage in the
 * background and updates the Firestore document with the image URLs.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

const PropertyDetailsSchema = z.object({
    propertyType: z.string(),
    listingType: z.string(),
    city: z.string(),
    area: z.string(),
    price: z.number(),
    size: z.number(),
    description: z.string(),
    ownerName: z.string().optional(),
    ownerMobile: z.string(),
});

const PropertySubmissionInputSchema = z.object({
    propertyDetails: PropertyDetailsSchema,
    photoDataUris: z.array(z.string().describe("A photo of the property as a data URI.")),
});

export type PropertySubmissionInput = z.infer<typeof PropertySubmissionInputSchema>;

const propertySubmissionFlow = ai.defineFlow(
    {
        name: 'propertySubmissionFlow',
        inputSchema: PropertySubmissionInputSchema,
        outputSchema: z.void(),
    },
    async (input) => {
        // 1. Save property data to Firestore immediately, without image URLs
        const propertyDocRef = await addDoc(collection(db, "properties"), {
            ...input.propertyDetails,
            location: `${input.propertyDetails.area}, ${input.propertyDetails.city}`,
            photoUrls: [], // Initially empty
            approved: false,
            createdAt: serverTimestamp(),
        });

        // 2. Upload photos to Firebase Storage in the background
        const photoUrls: string[] = [];
        for (const dataUri of input.photoDataUris) {
            const storageRef = ref(storage, `properties/${propertyDocRef.id}/${Date.now()}`);
            // uploadString expects the data URL format
            await uploadString(storageRef, dataUri, 'data_url');
            const downloadURL = await getDownloadURL(storageRef);
            photoUrls.push(downloadURL);
        }

        // 3. Update the Firestore document with the photo URLs
        await updateDoc(doc(db, "properties", propertyDocRef.id), {
            photoUrls: photoUrls,
        });
    }
);

export async function processPropertySubmission(input: PropertySubmissionInput): Promise<void> {
    // We don't await the flow here, allowing the client to proceed.
    // The flow runs in the background on the server.
    propertySubmissionFlow(input);
}

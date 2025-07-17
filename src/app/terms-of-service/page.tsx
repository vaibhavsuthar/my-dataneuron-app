
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mb-8">
            <Button asChild variant="outline">
                <Link href="/">
                <ArrowLeft className="mr-2" />
                Back to Home
                </Link>
            </Button>
        </div>
        <article className="prose prose-lg mx-auto max-w-4xl dark:prose-invert">
          <h1 className="text-4xl font-bold font-headline mb-4">📜 Terms of Service – DataNeuron</h1>
          
          <hr className="my-8" />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
            <p>By using our website or services, you agree to these terms.</p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">2. Services Offered</h2>
            <p>DataNeuron offers:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AI dashboards</li>
              <li>Digital marketing campaigns</li>
              <li>Analytics & automation tools</li>
            </ul>
            <p>We reserve the right to modify or discontinue services without notice.</p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">3. User Responsibilities</h2>
            <p>You agree:</p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Not to misuse or copy our content or tools</li>
                <li>To provide accurate information</li>
                <li>To comply with applicable laws</li>
            </ul>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">4. No Warranties</h2>
            <p>All services are provided "as is". We do not guarantee specific results or uptime. We are not liable for business losses or data issues.</p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">5. Intellectual Property</h2>
            <p>All website content, logos, and tools belong to DataNeuron. Do not copy, modify, or use without permission.</p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
            <p>DataNeuron is <strong>not liable</strong> for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Data loss</li>
              <li>Downtime</li>
              <li>Financial loss</li>
              <li>Legal disputes caused by your use of our services</li>
            </ul>
            <p>Use our platform at your own risk.</p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">7. Contact</h2>
            <p>For any questions:</p>
            <p>📧 Email: <a href="mailto:aidataneuronbusiness@gmail.com" className="text-primary hover:underline"><strong>aidataneuronbusiness@gmail.com</strong></a></p>
            <p>🌐 Website: <a href="https://www.dataneuron.business" className="text-primary hover:underline"><strong>www.dataneuron.business</strong></a></p>
          </section>
        </article>
      </div>
    </div>
  );
}


import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold font-headline mb-4">🛡️ Privacy Policy – DataNeuron</h1>
          <p className="text-muted-foreground"><strong>Effective Date:</strong> July 17, 2025</p>
          <p className="text-muted-foreground"><strong>Website:</strong> <a href="https://www.dataneuron.business" className="text-primary hover:underline">https://www.dataneuron.business</a></p>
          <p className="text-muted-foreground"><strong>Email:</strong> <a href="mailto:aidataneuronbusiness@gmail.com" className="text-primary hover:underline">aidataneuronbusiness@gmail.com</a></p>
          
          <hr className="my-8" />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. What Information We Collect</h2>
            <p>We may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email, phone number</li>
              <li>Business-related data (campaigns, analytics)</li>
              <li>Device/browser data (via cookies)</li>
            </ul>
            <p>We <strong>do not</strong> collect sensitive financial, biometric, or personal identification data unless explicitly provided by you for business communication.</p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">2. How We Use Your Data</h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Improve our services</li>
              <li>Respond to inquiries</li>
              <li>Manage campaigns or dashboards</li>
              <li>Send updates (if opted-in)</li>
            </ul>
            <p>We <strong>never sell</strong> or share your data with third parties for profit.</p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">3. Cookies & Analytics</h2>
            <p>We use cookies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Improve user experience</li>
              <li>Track website performance</li>
              <li>Google Analytics (non-personally identifiable)</li>
            </ul>
            <p>You may disable cookies in your browser settings.</p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">4. Data Security</h2>
            <p>We take reasonable measures to secure your data. However, no method of internet transmission is 100% secure.</p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">5. Third-party Services</h2>
            <p>We may use trusted third-party tools (e.g., Google, Meta, Twilio, OpenAI) but we do not control their data policies.</p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">6. Your Rights</h2>
            <p>You may:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to your data</li>
              <li>Ask for data deletion</li>
              <li>Opt-out of marketing emails anytime</li>
            </ul>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">7. Changes to Policy</h2>
            <p>We may update this policy from time to time. Updated versions will be posted on our website.</p>
          </section>

        </article>
      </div>
    </div>
  );
}

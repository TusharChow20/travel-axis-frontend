import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: January 2025
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When you use TravelAxis, we collect information you provide
              directly — such as your name, email address, phone number, and
              payment details when you register or book a tour. We also collect
              information automatically, including your IP address, browser
              type, and pages visited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use your information to process bookings and payments, send
              booking confirmations and invoices, provide customer support,
              improve our platform, and send you relevant updates about your
              trips. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Payment Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All payments are processed securely through SSLCommerz, a PCI-DSS
              compliant payment gateway. TravelAxis does not store your card
              details. Payment data is encrypted and handled entirely by
              SSLCommerz under their security standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use httpOnly cookies to manage your authentication session
              securely. These cookies are necessary for the platform to function
              and cannot be used to track you across other websites. You can
              disable cookies in your browser settings, but this may affect your
              ability to log in.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We share your information only with service providers necessary to
              operate TravelAxis — including payment processors (SSLCommerz),
              cloud storage (Cloudinary), and email services. All third parties
              are bound by confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your account and booking data for as long as your
              account is active or as required by law. You may request deletion
              of your data by contacting us at support@travelaxis.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, correct, or delete your personal
              data at any time. To exercise these rights, contact us at
              support@travelaxis.com and we will respond within 7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy, email us at{" "}
              <a
                href="mailto:support@travelaxis.com"
                className="text-primary hover:underline"
              >
                support@travelaxis.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <Link href="/" className="text-primary hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

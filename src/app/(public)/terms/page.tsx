import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using TravelAxis, you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do
              not use our platform. We reserve the right to update these terms
              at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Account Registration
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You must create an account to book tours. You are responsible for
              maintaining the confidentiality of your account credentials and
              for all activity under your account. You must provide accurate and
              complete information during registration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Booking & Payments
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All bookings are subject to availability and confirmation.
              Payments are processed securely through SSLCommerz. Once a booking
              is confirmed and payment is completed, you will receive an invoice
              via email. Prices are listed in Bangladeshi Taka (BDT) and are
              inclusive of all applicable charges unless stated otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Cancellation Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cancellations made more than 7 days before the tour date are
              eligible for a full refund. Cancellations made within 7 days of
              the tour date may be subject to a cancellation fee. No-shows are
              non-refundable. Refunds are processed within 7–10 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. User Conduct</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree not to misuse the platform, submit false information,
              attempt to access other users' accounts, or use the platform for
              any unlawful purpose. TravelAxis reserves the right to suspend or
              terminate accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              TravelAxis acts as a platform connecting travelers with tour
              services. We are not liable for any loss, injury, or damage that
              occurs during a tour. Users participate in tours at their own
              risk. We strongly recommend purchasing travel insurance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on TravelAxis — including logos, images, and text — is
              owned by TravelAxis or its licensors and is protected by
              copyright. You may not reproduce or distribute any content without
              prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms are governed by the laws of Bangladesh. Any disputes
              arising from the use of TravelAxis will be subject to the
              exclusive jurisdiction of the courts of Bangladesh.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, contact us at{" "}
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

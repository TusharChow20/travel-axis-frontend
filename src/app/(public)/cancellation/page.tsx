import Link from "next/link";

export default function CancellationPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Cancellation Policy
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              Cancellation by Customer
            </h2>
            <div className="space-y-3">
              <div className="flex gap-4 p-4 border border-border rounded-xl">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">
                    More than 7 days before tour
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Full refund processed within 7–10 business days.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 border border-border rounded-xl">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">
                    3–7 days before tour
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    50% refund. The remaining 50% is retained as a cancellation
                    fee.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 border border-border rounded-xl">
                <div className="w-2 h-2 rounded-full bg-destructive mt-2 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">
                    Less than 3 days before tour or no-show
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    No refund. The full booking amount is forfeited.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              Cancellation by TravelAxis
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If TravelAxis cancels a tour due to unforeseen circumstances
              (weather, safety concerns, insufficient participants), you will
              receive a full refund or the option to reschedule at no extra
              cost.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How to Cancel</h2>
            <p className="text-muted-foreground leading-relaxed">
              To cancel a booking, go to your dashboard under My Bookings and
              request a cancellation, or contact us at{" "}
              <a
                href="mailto:support@travelaxis.com"
                className="text-primary hover:underline"
              >
                support@travelaxis.com
              </a>{" "}
              with your booking ID.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Refund Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Approved refunds are processed within 7–10 business days back to
              your original payment method via SSLCommerz.
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

import Link from "next/link";

export default function PaymentMethodsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Payment Methods
          </h1>
          <p className="text-muted-foreground">
            All payments on TravelAxis are processed securely through
            SSLCommerz.
          </p>
        </div>

        <div className="space-y-6">
          <div className="border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Accepted Payment Methods
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Visa",
                "Mastercard",
                "American Express",
                "bKash",
                "Nagad",
                "Rocket",
                "Dutch-Bangla Mobile Banking",
                "Internet Banking",
              ].map((method) => (
                <div
                  key={method}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-sm text-foreground">{method}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Payment Security
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All transactions are encrypted and processed by SSLCommerz, a
              PCI-DSS compliant payment gateway trusted by thousands of
              businesses in Bangladesh. TravelAxis never stores your card or
              banking details.
            </p>
          </div>

          <div className="border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Currency
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All prices are displayed and charged in Bangladeshi Taka (BDT). No
              hidden conversion fees.
            </p>
          </div>

          <div className="border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Payment Issues
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              If your payment fails or you are charged but don't receive a
              confirmation, contact us immediately at{" "}
              <a
                href="mailto:support@travelaxis.com"
                className="text-primary hover:underline"
              >
                support@travelaxis.com
              </a>{" "}
              with your transaction details.
            </p>
          </div>
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

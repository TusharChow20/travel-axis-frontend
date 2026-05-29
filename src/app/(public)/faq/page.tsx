import Link from "next/link";

const faqs = [
  {
    q: "How do I book a tour?",
    a: "Browse our tours, click on any tour you like, and click 'Book Now'. You'll need to create an account and complete payment via SSLCommerz to confirm your booking.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major debit/credit cards and mobile banking through SSLCommerz, a secure and certified payment gateway.",
  },
  {
    q: "Can I cancel my booking?",
    a: "Yes. Cancellations made more than 7 days before the tour date are fully refunded. Within 7 days, a cancellation fee may apply. See our Cancellation Policy for details.",
  },
  {
    q: "Will I receive a booking confirmation?",
    a: "Yes. After successful payment, you will receive an email with your booking confirmation and a PDF invoice attached.",
  },
  {
    q: "Are the tours guided?",
    a: "Yes, all TravelAxis tours include experienced local guides who are knowledgeable about the destination and its culture.",
  },
  {
    q: "What should I bring on a tour?",
    a: "This depends on the tour. Each tour page lists recommended items. Generally, bring comfortable clothing, sunscreen, a water bottle, and any personal medications.",
  },
  {
    q: "How do I contact support?",
    a: "Email us at support@travelaxis.com or use the Contact page. We respond within 24 hours on business days.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground">
            Everything you need to know about booking with TravelAxis.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-muted-foreground text-sm">
            Still have questions?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

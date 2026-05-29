import Link from "next/link";
import { Search, UserPlus, CreditCard, Mail, Star } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Browse & Find Your Tour",
    desc: "Visit the Tours page and use filters to find tours by division, type, or price range. Click any tour to see full details, itinerary, and pricing.",
  },
  {
    icon: <UserPlus className="h-6 w-6" />,
    title: "Create an Account",
    desc: "Register with your email or sign in with Google. Verify your email via OTP to activate your account.",
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Complete Payment",
    desc: "Click 'Book Now' on the tour page. You'll be redirected to SSLCommerz to complete secure payment using card or mobile banking.",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Get Your Confirmation",
    desc: "After payment, you'll receive an email with your booking confirmation and a PDF invoice. Your booking also appears in your dashboard.",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Enjoy Your Tour",
    desc: "Show up at the meeting point on the tour date. Your guide will be there to welcome you. Enjoy the experience!",
  },
];

export default function BookingGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Booking Guide
          </h1>
          <p className="text-muted-foreground">
            How to book a tour with TravelAxis in 5 simple steps.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-5 p-6 border border-border rounded-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                {step.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <Link href="/tours" className="text-primary hover:underline text-sm">
            Browse Tours →
          </Link>
        </div>
      </div>
    </div>
  );
}

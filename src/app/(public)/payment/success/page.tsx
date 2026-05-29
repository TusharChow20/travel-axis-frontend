import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground mb-2">
          Your booking is confirmed. An invoice has been sent to your email.
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          Check your inbox for the booking details and PDF invoice.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/user/bookings">View My Bookings</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/tours">Explore More Tours</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

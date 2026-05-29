import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-20 w-20 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Payment Cancelled
        </h1>
        <p className="text-muted-foreground mb-2">
          You cancelled the payment process.
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          Your booking has not been confirmed. You can try again anytime.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/user/bookings">My Bookings</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/tours">Back to Tours</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

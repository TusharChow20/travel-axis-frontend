"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CreditCard, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IPayment {
  _id: string;
  transactionId: string;
  amount: number;
  status: string;
  invoiceURL?: string;
  createdAt: string;
  bookingId: { tour: { title: string } };
}

const statusColors: Record<string, string> = {
  PAID: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  UNPAID:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  FAILED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  CANCELLED: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  REFUNDED: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosInstance.get("/payment/my-payments");
        setPayments(res.data.data || []);
      } catch {
        setPayments([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Payment History</h1>
        <p className="text-muted-foreground text-sm mt-1">
          View all your payment transactions
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : payments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-foreground mb-1">
              No payments yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Your payment history will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment._id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {payment.bookingId?.tour?.title || "Tour Payment"}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Transaction ID: {payment.transactionId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <p className="text-lg font-bold text-primary">
                      ৳{payment.amount?.toLocaleString()}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[payment.status] || ""}`}
                    >
                      {payment.status}
                    </span>
                    {payment.invoiceURL && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-xs h-7"
                        asChild
                      >
                        <a
                          href={payment.invoiceURL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Download className="h-3 w-3" />
                          Invoice
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const orderSummary = {
  subtotal: 110,
  shipping: 20,
  tax: 6.5,
  total: 136.5,
};

export default function CheckoutPage() {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handlePlaceOrder = () => {
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. We've received your order.",
    });
  };

  const handlePaymentConfirm = () => {
    if (!paymentMethod) {
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "Please select a payment method first.",
      });
      return;
    }
    setPaymentConfirmed(true);
    toast({
      title: "Payment Confirmed",
      description: "You can now place your order.",
    });
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    setPaymentConfirmed(false); // Reset confirmation when method changes
     if (value === 'upi' || value === 'cod') {
      setPaymentConfirmed(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl font-bold tracking-tight text-center font-headline">Checkout</h1>
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Farm Lane" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Greenfield" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="Harvestshire" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="12345" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Select a payment method to proceed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue="card"
                className="space-y-4"
                onValueChange={handlePaymentMethodChange}
                value={paymentMethod || ""}
              >
                <div>
                  <RadioGroupItem value="card" id="card" className="peer sr-only" />
                  <Label htmlFor="card" className="flex flex-col rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <span>Credit/Debit Card</span>
                    <div className="mt-4 space-y-2">
                      <Input placeholder="Card Number" disabled={paymentMethod !== 'card'} />
                      <div className="flex gap-4">
                        <Input placeholder="MM/YY" disabled={paymentMethod !== 'card'} />
                        <Input placeholder="CVC" disabled={paymentMethod !== 'card'} />
                      </div>
                       {paymentMethod === 'card' && (
                        <Button onClick={handlePaymentConfirm} className="mt-2" size="sm">
                          Confirm Payment
                        </Button>
                      )}
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                  <Label htmlFor="upi" className="flex items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <span>UPI (Google Pay, PhonePe, etc.)</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                  <Label htmlFor="cod" className="flex items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <span>Cash on Delivery (COD)</span>
                  </Label>
                </div>
              </RadioGroup>
              {paymentConfirmed && (
                <Alert className="mt-6">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Payment Confirmed!</AlertTitle>
                  <AlertDescription>
                    You are all set. You can now place your order.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{orderSummary.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{orderSummary.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{orderSummary.total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={!paymentConfirmed}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

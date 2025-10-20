
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
import { useTranslation } from "@/hooks/use-translation";

const orderSummary = {
  subtotal: 110,
  shipping: 20,
  tax: 6.5,
  total: 136.5,
};

export default function CheckoutPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handlePlaceOrder = () => {
    toast({
      title: t('checkout.toastOrderPlacedTitle'),
      description: t('checkout.toastOrderPlacedDescription'),
    });
  };

  const handlePaymentConfirm = () => {
    if (!paymentMethod) {
      toast({
        variant: "destructive",
        title: t('checkout.toastPaymentErrorTitle'),
        description: t('checkout.toastPaymentErrorDescription'),
      });
      return;
    }
    setPaymentConfirmed(true);
    toast({
      title: t('checkout.toastPaymentConfirmedTitle'),
      description: t('checkout.toastPaymentConfirmedDescription'),
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
      <h1 className="text-4xl font-bold tracking-tight text-center font-headline">{t('checkout.title')}</h1>
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('checkout.shippingTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">{t('checkout.firstNameLabel')}</Label>
                  <Input id="first-name" placeholder={t('checkout.firstNamePlaceholder')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">{t('checkout.lastNameLabel')}</Label>
                  <Input id="last-name" placeholder={t('checkout.lastNamePlaceholder')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{t('checkout.addressLabel')}</Label>
                <Input id="address" placeholder={t('checkout.addressPlaceholder')} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">{t('checkout.cityLabel')}</Label>
                  <Input id="city" placeholder={t('checkout.cityPlaceholder')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">{t('checkout.stateLabel')}</Label>
                  <Input id="state" placeholder={t('checkout.statePlaceholder')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">{t('checkout.zipLabel')}</Label>
                  <Input id="zip" placeholder={t('checkout.zipPlaceholder')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('checkout.phoneLabel')}</Label>
                <Input id="phone" type="tel" placeholder={t('checkout.phonePlaceholder')} />
              </div>
            </CardContent>
          </Card>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t('checkout.paymentTitle')}</CardTitle>
              <CardDescription>
                {t('checkout.paymentDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                className="space-y-4"
                onValueChange={handlePaymentMethodChange}
                value={paymentMethod || ""}
              >
                <div>
                  <RadioGroupItem value="card" id="card" className="peer sr-only" />
                  <Label htmlFor="card" className="flex flex-col rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <span>{t('checkout.paymentCard')}</span>
                    {paymentMethod === 'card' && (
                      <div className="mt-4 space-y-2">
                        <Input placeholder={t('checkout.cardNumberPlaceholder')} />
                        <div className="flex gap-4">
                          <Input placeholder={t('checkout.cardExpiryPlaceholder')} />
                          <Input placeholder={t('checkout.cardCvcPlaceholder')} />
                        </div>
                        <Button onClick={handlePaymentConfirm} className="mt-2" size="sm">
                          {t('checkout.confirmPaymentButton')}
                        </Button>
                      </div>
                    )}
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                  <Label htmlFor="upi" className="flex items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <span>{t('checkout.paymentUpi')}</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                  <Label htmlFor="cod" className="flex items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <span>{t('checkout.paymentCod')}</span>
                  </Label>
                </div>
              </RadioGroup>
              {paymentConfirmed && (
                <Alert className="mt-6">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>{t('checkout.paymentConfirmedAlertTitle')}</AlertTitle>
                  <AlertDescription>
                    {t('checkout.paymentConfirmedAlertDescription')}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>{t('checkout.summaryTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>{t('checkout.summarySubtotal')}</span>
                <span>₹{orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('checkout.summaryShipping')}</span>
                <span>₹{orderSummary.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('checkout.summaryTaxes')}</span>
                <span>₹{orderSummary.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>{t('checkout.summaryTotal')}</span>
                <span>₹{orderSummary.total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={!paymentConfirmed}
              >
                {t('checkout.placeOrderButton')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, ShoppingBag, Heart, Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useCart } from '@/context/cart-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';

export default function CheckoutPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { cartItems, clearCart } = useCart();
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [isDonating, setIsDonating] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const donationAmount = 10;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price ? parseFloat(item.price) : 0) * item.quantity,
    0
  );
  const gst = subtotal * 0.05;
  const total = subtotal + gst + (isDonating ? donationAmount : 0);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please log in to complete your purchase.',
      });
      router.push('/login');
      return;
    }

    setIsPlacingOrder(true);
    try {
      const transactionsRef = collection(firestore, 'transactions');
      
      // Save order to Firestore
      // For this MVP, we save a consolidated transaction record
      addDocumentNonBlocking(transactionsRef, {
        consumerId: user.uid,
        productId: cartItems[0]?.id || 'order_consolidated',
        farmerId: cartItems[0]?.farmerId || 'farmer_unknown',
        paymentMethod: paymentMethod,
        amount: total,
        transactionDate: new Date().toISOString(),
        status: 'Completed',
        items: cartItems.map(item => ({ id: item.id, name: item.name, quantity: item.quantity })),
      });

      toast({
        title: t('checkout.toastOrderPlacedTitle'),
        description: t('checkout.toastOrderPlacedDescription'),
      });
      
      clearCart();
      router.push('/orders');
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Order Failed',
        description: 'Something went wrong while placing your order. Please try again.',
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handlePaymentConfirm = () => {
    if (!paymentMethod) {
      toast({
        variant: 'destructive',
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

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center md:py-16">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-6 text-2xl font-bold tracking-tight font-headline">
          {t('cart.emptyTitle')}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t('checkout.emptyDescription')}
        </p>
        <Button asChild className="mt-6">
          <Link href="/">{t('cart.startShoppingButton')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl font-bold tracking-tight text-center font-headline">
        {t('checkout.title')}
      </h1>
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('checkout.shippingTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">
                    {t('checkout.firstNameLabel')}
                  </Label>
                  <Input
                    id="first-name"
                    placeholder={t('checkout.firstNamePlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">
                    {t('checkout.lastNameLabel')}
                  </Label>
                  <Input
                    id="last-name"
                    placeholder={t('checkout.lastNamePlaceholder')}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{t('checkout.addressLabel')}</Label>
                <Input
                  id="address"
                  placeholder={t('checkout.addressPlaceholder')}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">{t('checkout.cityLabel')}</Label>
                  <Input id="city" placeholder={t('checkout.cityPlaceholder')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">{t('checkout.stateLabel')}</Label>
                  <Input
                    id="state"
                    placeholder={t('checkout.statePlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">{t('checkout.zipLabel')}</Label>
                  <Input id="zip" placeholder={t('checkout.zipPlaceholder')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('checkout.phoneLabel')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t('checkout.phonePlaceholder')}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary fill-current" />
                {t('checkout.csrTitle')}
              </CardTitle>
              <CardDescription>
                {t('checkout.csrDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="donate" 
                  checked={isDonating} 
                  onCheckedChange={(checked) => setIsDonating(!!checked)} 
                />
                <Label 
                  htmlFor="donate" 
                  className="text-sm font-medium leading-none cursor-pointer select-none"
                >
                  {t('checkout.donateLabel', { amount: donationAmount })}
                </Label>
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
                value={paymentMethod || ''}
              >
                <div>
                  <RadioGroupItem
                    value="card"
                    id="card"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="card"
                    className="flex flex-col rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>{t('checkout.paymentCard')}</span>
                    {paymentMethod === 'card' && (
                      <div className="mt-4 space-y-2">
                        <Input
                          placeholder={t('checkout.cardNumberPlaceholder')}
                        />
                        <div className="flex gap-4">
                          <Input
                            placeholder={t('checkout.cardExpiryPlaceholder')}
                          />
                          <Input
                            placeholder={t('checkout.cardCvcPlaceholder')}
                          />
                        </div>
                        <Button
                          onClick={handlePaymentConfirm}
                          className="mt-2"
                          size="sm"
                        >
                          {t('checkout.confirmPaymentButton')}
                        </Button>
                      </div>
                    )}
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="upi"
                    id="upi"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="upi"
                    className="flex items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>{t('checkout.paymentUpi')}</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="cod"
                    id="cod"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="cod"
                    className="flex items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>{t('checkout.paymentCod')}</span>
                  </Label>
                </div>
              </RadioGroup>
              {paymentConfirmed && (
                <Alert className="mt-6">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>
                    {t('checkout.paymentConfirmedAlertTitle')}
                  </AlertTitle>
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
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              {isDonating && (
                <div className="flex justify-between text-primary font-medium">
                  <span>{t('checkout.summaryDonation')}</span>
                  <span>₹{donationAmount.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>{t('checkout.summaryTotal')}</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={!paymentConfirmed || isPlacingOrder}
              >
                {isPlacingOrder && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('checkout.placeOrderButton')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


'use client';

import Image from "next/image";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, QrCode, ShieldCheck, Utensils } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";

export default function ProductDetailsClient({ product }: { product: ImagePlaceholder }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name || "Unnamed Product",
        price: product.price || "0",
        quantity: 1,
        imageUrl: product.imageUrl,
        description: product.description,
        farmerId: product.farmerId,
      });
      toast({
        title: t('product.toastAddedTitle'),
        description: t('product.toastAddedDescription', { productName: product.name }),
      });
    }
  };

  const qrData = `Blockchain Verifier: v1.0, Batch: ${product.id}-2023, Hash: 0x7f23...a91, Origin: ${product.location || 'Maharashtra'}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.description}
            fill
            className="object-cover"
            data-ai-hint={product.imageHint}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight font-headline">{product.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t('product.from')} <span className="text-secondary font-semibold">{product.farmer}</span>
          </p>
          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-accent fill-current" />
              ))}
            </div>
            <p className="ml-2 text-sm text-muted-foreground">{t('product.reviews', { count: 125 })}</p>
          </div>
          <Separator className="my-6" />
          <p className="text-3xl font-bold text-primary">
            ₹{product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
            <span className="ml-2 text-base font-normal text-muted-foreground">/ {t('product.perKg')}</span>
          </p>
          <p className="mt-4 text-base text-foreground/80 leading-relaxed">
            {t('product.description', { productName: product.name, farmerName: product.farmer })}
          </p>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> {t('product.addToCartButton')}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="w-full">
                  <QrCode className="mr-2 h-5 w-5" /> {t('product.traceOriginButton')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-secondary" />
                    {t('product.qrTitle')}
                  </DialogTitle>
                  <DialogDescription>
                    {t('product.qrDescription', { productName: product.name })}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="p-2 bg-white rounded-lg shadow-inner">
                    <Image src={qrUrl} width={200} height={200} alt="Product QR Code" />
                  </div>
                  <div className="text-sm text-muted-foreground space-y-2 text-center bg-muted/50 p-4 rounded-md w-full">
                      <p><strong>Batch ID:</strong> {product.id}-2023-BATCH</p>
                      <p><strong>Blockchain Hash:</strong> 0x7f23...a91bc</p>
                      <p><strong>Verified by:</strong> Annadata Trust Protocol</p>
                      <Separator />
                      <p><strong>{t('product.qrFarmer')}:</strong> {product.farmer}</p>
                      <p><strong>{t('product.qrLocation')}:</strong> {product.location || 'Kalyan, MH'}</p>
                      <p><strong>{t('product.qrHarvested')}:</strong> Oct 25, 2023</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="mt-10 border-accent/20 bg-accent/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Utensils className="h-5 w-5 text-accent" />
                Suggested Recipe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">Traditional {product.name?.split('(')[0]} Curry</p>
              <p className="text-xs text-muted-foreground mt-1">Slow-cooked with local spices and organic coconut milk. Perfect with Basmati rice.</p>
              <Button variant="link" className="p-0 h-auto mt-2 text-accent-foreground font-semibold">View Recipe</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

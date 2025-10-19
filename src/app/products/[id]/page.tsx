
'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, QrCode } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { notFound } from "next/navigation";


// This is a server component, so we can fetch data here in a real app
// For now, we'll find the product from our placeholder data
export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const product = PlaceHolderImages.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name || "Unnamed Product",
        price: product.price || "0",
        quantity: 1,
        imageUrl: product.imageUrl,
        description: product.description,
      });
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const qrData = `Product: ${product.name}, Farmer: ${product.farmer}, Location: Green Valley, Harvest Date: 2023-10-25`;
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
            From <span className="text-secondary font-semibold">{product.farmer}</span>
          </p>
          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-accent fill-current" />
              ))}
            </div>
            <p className="ml-2 text-sm text-muted-foreground">(125 reviews)</p>
          </div>
          <Separator className="my-6" />
          <p className="text-3xl font-bold text-primary">
            ₹{product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
            <span className="ml-2 text-base font-normal text-muted-foreground">/ kg</span>
          </p>
          <p className="mt-4 text-base text-foreground/80 leading-relaxed">
            Discover the exceptional taste of our {product.name}, grown with care at {product.farmer}. Harvested at peak ripeness, these are perfect for any meal, providing a burst of natural flavor and nutrients.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline">
                  <QrCode className="mr-2 h-5 w-5" /> Trace Origin
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Product Traceability</DialogTitle>
                  <DialogDescription>
                    Scan the QR code or view the details below to trace the origin of your {product.name}.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                  <Image src={qrUrl} width={200} height={200} alt="Product QR Code" />
                  <div className="text-sm text-muted-foreground space-y-1 text-center">
                      <p><strong>Product:</strong> {product.name}</p>
                      <p><strong>Farmer:</strong> {product.farmer}</p>
                      <p><strong>Location:</strong> Nashik, Maharashtra</p>
                      <p><strong>Harvested:</strong> Oct 25, 2023</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

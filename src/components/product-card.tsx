
'use client';

import Image from "next/image";
import Link from "next/link";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";

interface ProductCardProps {
  product: ImagePlaceholder;
  priority?: boolean;
}

const ProductCard = ({ product, priority = false }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleAddToCart = () => {
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
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={product.imageUrl}
              alt={product.description}
              fill
              className="object-cover"
              data-ai-hint={product.imageHint}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              priority={priority}
            />
          </div>
        </Link>
        <Badge variant="secondary" className="absolute top-1 right-1 md:top-2 md:right-2 bg-green-100/90 text-green-800 border-green-200 text-[8px] md:text-xs px-1.5 md:px-2.5">
            <Leaf className="mr-0.5 md:mr-1 h-2 md:h-3 w-2 md:w-3" />
            {t('product.lowCarbonBadge')}
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow p-2 md:p-4">
        <CardTitle className="text-sm md:text-lg font-bold font-headline leading-tight line-clamp-1 md:line-clamp-none">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {product.name || "Product Name"}
          </Link>
        </CardTitle>
        <p className="mt-0.5 md:mt-1 text-[10px] md:text-sm text-muted-foreground line-clamp-1">
          {t('product.byFarmer')} {product.farmer || "Local Farmer"}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 md:p-4 pt-0 gap-2">
        <p className="text-sm md:text-xl font-bold text-primary">
          ₹{product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
          <span className="text-[10px] md:text-sm font-normal text-muted-foreground"> / {t('product.perKg')}</span>
        </p>
        <Button size="sm" variant="secondary" onClick={handleAddToCart} className="w-full sm:w-auto h-7 md:h-9 text-[10px] md:text-sm">
          <ShoppingCart className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
          {t('product.addButton')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

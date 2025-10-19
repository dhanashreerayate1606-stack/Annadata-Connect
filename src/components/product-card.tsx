
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

interface ProductCardProps {
  product: ImagePlaceholder;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
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
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={product.imageUrl}
              alt={product.description}
              fill
              className="object-cover"
              data-ai-hint={product.imageHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
        <Badge variant="secondary" className="absolute top-2 right-2 bg-green-100 text-green-800 border-green-200">
            <Leaf className="mr-1 h-3 w-3" />
            Low Carbon
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-bold font-headline leading-tight">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {product.name || "Product Name"}
          </Link>
        </CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">
          by {product.farmer || "Local Farmer"}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-xl font-bold text-primary">
          ₹{product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
          <span className="text-sm font-normal text-muted-foreground"> / kg</span>
        </p>
        <Button size="sm" variant="secondary" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

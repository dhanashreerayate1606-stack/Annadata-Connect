import Image from "next/image";
import Link from "next/link";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: ImagePlaceholder;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
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
          ${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
          <span className="text-sm font-normal text-muted-foreground"> / kg</span>
        </p>
        <Button size="sm" variant="secondary">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

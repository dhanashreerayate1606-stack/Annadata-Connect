import { PlaceHolderImages } from "@/lib/placeholder-images";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./product-details-client";

// This is a server component, so we can fetch data here
export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = PlaceHolderImages.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}

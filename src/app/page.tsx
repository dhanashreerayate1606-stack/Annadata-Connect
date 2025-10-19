import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, ChevronRight, Mic, Leaf } from 'lucide-react';
import ProductCard from '@/components/product-card';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-market');
const products = PlaceHolderImages.filter(p => p.category === 'product');

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[50vh] w-full bg-secondary">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold md:text-6xl font-headline">
            Fresh from the Farm, Straight to You
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl font-body">
            Discover the taste of real, locally-grown produce. Support our farmers, eat healthier.
          </p>
          <Button asChild className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            <Link href="#products">
              Explore Now <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="products" className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search for products..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" aria-label="Voice Search">
              <Mic className="h-5 w-5" />
            </Button>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="spices">Spices</SelectItem>
              </SelectContent>
            </Select>
            <Button>Filter</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-muted py-12 md:py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold font-headline">Weekly Subscription Boxes</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get a curated box of the freshest seasonal produce delivered to your doorstep every week. Customize your box and never run out of healthy options.
            </p>
            <Button asChild className="mt-6">
              <Link href="/subscriptions">
                Explore Subscriptions
              </Link>
            </Button>
          </div>
          <div>
             <h2 className="text-3xl font-bold font-headline">Bulk Orders for Your Business</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Running a restaurant, housing society, or school? Get special pricing and dedicated support for bulk orders of fresh produce.
            </p>
            <Button asChild className="mt-6">
              <Link href="/bulk-orders">
                Enquire Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef, useMemo, useEffect } from 'react';
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
import { Search, ChevronRight, Mic, Sun } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { voiceSearch } from '@/ai/flows/voice-search-flow';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { useLanguage } from '@/context/language-context';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { weatherAdvisory } from '@/ai/flows/weather-advisory-flow';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-market');
const allProducts = PlaceHolderImages.filter(p => p.category === 'product');

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isRecording, setIsRecording] = useState(false);
  const [weatherInsight, setWeatherInsight] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();
  const { t } = useTranslation();
  const { language } = useLanguage();

  useEffect(() => {
    const loadWeatherInsights = async () => {
      try {
        const result = await weatherAdvisory({
          location: 'Maharashtra',
          forecast: 'Moderate rainfall expected this week.',
          language: language
        });
        setWeatherInsight(result.consumerInsight);
      } catch (e) {
        console.error(e);
      }
    };
    loadWeatherInsights();
  }, [language]);

  const handleVoiceSearch = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = event => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: 'audio/webm',
          });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64Audio = reader.result as string;

            toast({
              title: 'Processing your voice...',
              description: 'Our AI is analyzing your request.',
            });

            try {
              const result = await voiceSearch({ audio: base64Audio });
              if (result.query) {
                setSearchQuery(result.query);
                toast({
                  title: 'Search complete!',
                  description: `Showing results for "${result.query}".`,
                });
              } else {
                toast({
                  variant: 'destructive',
                  title: 'Could not understand audio',
                  description: 'Please try speaking again clearly.',
                });
              }
            } catch (error) {
              console.error('Voice search error:', error);
              toast({
                variant: 'destructive',
                title: 'AI Voice Search Failed',
                description:
                  'There was an error processing your voice command.',
              });
            }
          };
          // Stop all media tracks to turn off the microphone
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        toast({
          title: 'Listening...',
          description: 'Speak now to search for a product.',
        });
      } catch (error) {
        console.error('Error accessing microphone:', error);
        toast({
          variant: 'destructive',
          title: 'Microphone Access Denied',
          description:
            'Please enable microphone permissions in your browser settings.',
        });
      }
    }
  };

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(p => selectedCategory === 'all' || p.productType === selectedCategory)
      .filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, selectedCategory]);

  const featuredProducts = useMemo(
    () => allProducts.slice(0, 5),
    []
  );

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
            {t('home.heroTitle')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl font-body">
            {t('home.heroSubtitle')}
          </p>
          <Button
            asChild
            className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
          >
            <Link href="#products">
              {t('home.exploreNow')} <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Weather & Harvest Insight Banner */}
      {weatherInsight && (
        <div className="bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-full hidden sm:block">
              <Sun className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-grow">
              <span className="text-xs font-bold uppercase tracking-wider text-primary mr-2">{t('home.weatherInsightTitle')}</span>
              <p className="text-sm text-foreground/80 italic">"{weatherInsight}"</p>
            </div>
            <Link href="/learning-hub" className="text-xs font-semibold text-primary hover:underline shrink-0">
              Why this matters?
            </Link>
          </div>
        </div>
      )}
      
      <section className="container mx-auto px-4 py-12 md:py-16">
         <div className="mb-8 text-center">
             <h2 className="text-3xl font-bold font-headline">{t('home.featuredProducts')}</h2>
             <p className="text-muted-foreground mt-2">{t('home.featuredProductsDesc')}</p>
         </div>
         <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                     <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
      </section>

      <section id="products" className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t('home.searchPlaceholder')}
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Voice Search"
              onClick={handleVoiceSearch}
              className={isRecording ? 'bg-red-500 hover:bg-red-600 text-white' : ''}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Select
              onValueChange={setSelectedCategory}
              value={selectedCategory}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t('home.categoryPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('home.allCategories')}</SelectItem>
                <SelectItem value="vegetables">
                  {t('home.vegetables')}
                </SelectItem>
                <SelectItem value="fruits">{t('home.fruits')}</SelectItem>
                <SelectItem value="grains">{t('home.grains')}</SelectItem>
                <SelectItem value="pulses">{t('home.pulses')}</SelectItem>
                <SelectItem value="spices">{t('home.spices')}</SelectItem>
                <SelectItem value="flowers">{t('home.flowers')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-muted py-12 md:py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold font-headline">
              {t('home.subscriptionsTitle')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('home.subscriptionsSubtitle')}
            </p>
            <Button asChild className="mt-6">
              <Link href="/subscriptions">{t('home.subscriptionsButton')}</Link>
            </Button>
          </div>
          <div>
            <h2 className="text-3xl font-bold font-headline">
              {t('home.bulkOrdersTitle')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('home.bulkOrdersSubtitle')}
            </p>
            <Button asChild className="mt-6">
              <Link href="/bulk-orders">{t('home.bulkOrdersButton')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

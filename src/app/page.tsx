
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
import { Search, ChevronRight, Mic, Sun, MapPin, Loader2 } from 'lucide-react';
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
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [locationName, setLocationName] = useState('Maharashtra');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();
  const { t } = useTranslation();
  const { language } = useLanguage();

  useEffect(() => {
    const loadWeatherInsights = async (loc: string) => {
      const cacheKey = `weather_${loc}_${language}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setWeatherInsight(cached);
        return;
      }

      setIsWeatherLoading(true);
      try {
        const result = await weatherAdvisory({
          location: loc,
          forecast: 'Moderate rainfall expected this week.',
          language: language
        });
        setWeatherInsight(result.consumerInsight);
        sessionStorage.setItem(cacheKey, result.consumerInsight);
      } catch (e) {
        console.error(e);
      } finally {
        setIsWeatherLoading(false);
      }
    };

    if ("geolocation" in navigator) {
      const geoTimeout = setTimeout(() => {
        loadWeatherInsights(locationName);
      }, 3000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(geoTimeout);
          const loc = `your local area (${position.coords.latitude.toFixed(1)}, ${position.coords.longitude.toFixed(1)})`;
          setLocationName(loc);
          loadWeatherInsights(loc);
        },
        () => {
          clearTimeout(geoTimeout);
          loadWeatherInsights(locationName);
        }
      );
    } else {
      loadWeatherInsights(locationName);
    }
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
    () => allProducts.filter(p => ['mango', 'bitter-gourd', 'spinach', 'tomatoes', 'orange', 'basmati-rice'].includes(p.id)),
    []
  );

  return (
    <div className="flex flex-col">
      <section className="relative h-[40vh] md:h-[50vh] w-full bg-secondary">
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
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl font-bold md:text-6xl font-headline leading-tight">
            {t('home.heroTitle')}
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-xl font-body">
            {t('home.heroSubtitle')}
          </p>
          <Button
            asChild
            className="mt-6 md:mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
          >
            <Link href="#products">
              {t('home.exploreNow')} <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <div className="min-h-[64px] bg-primary/5 border-y border-primary/10 flex items-center">
        {isWeatherLoading ? (
          <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-xs text-muted-foreground">Updating hyper-local insights...</span>
          </div>
        ) : weatherInsight ? (
          <div className="container mx-auto px-4 py-3 md:py-4 flex items-center gap-3 md:gap-4 animate-in fade-in duration-500">
            <div className="bg-primary/10 p-2 rounded-full hidden sm:block">
              <Sun className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary">{t('home.weatherInsightTitle')}</span>
                <span className="flex items-center gap-1 text-[9px] md:text-[10px] text-muted-foreground">
                  <MapPin size={10} /> {locationName}
                </span>
              </div>
              <p className="text-xs md:text-sm text-foreground/80 italic line-clamp-2 md:line-clamp-none">"{weatherInsight}"</p>
            </div>
            <Link href="/learning-hub" className="text-[10px] md:text-xs font-semibold text-primary hover:underline shrink-0">
              Why?
            </Link>
          </div>
        ) : null}
      </div>
      
      <section className="container mx-auto px-4 py-8 md:py-16">
         <div className="mb-6 md:mb-8 text-center">
             <h2 className="text-2xl md:text-3xl font-bold font-headline">{t('home.featuredProducts')}</h2>
             <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2">{t('home.featuredProductsDesc')}</p>
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
                <CarouselItem key={product.id} className="basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                     <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
      </section>

      <section id="products" className="container mx-auto px-4 py-8 md:py-16">
        <div className="mb-6 md:mb-8 flex flex-col gap-3 md:gap-4 md:flex-row md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t('home.searchPlaceholder')}
              className="pl-9 h-10"
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
              className={`h-10 w-10 ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white' : ''}`}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Select
              onValueChange={setSelectedCategory}
              value={selectedCategory}
            >
              <SelectTrigger className="w-full md:w-[180px] h-10">
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

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 4} />
          ))}
        </div>
      </section>

      <section className="bg-muted py-8 md:py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              {t('home.subscriptionsTitle')}
            </h2>
            <p className="mt-3 md:mt-4 text-sm md:text-lg text-muted-foreground">
              {t('home.subscriptionsSubtitle')}
            </p>
            <Button asChild className="mt-5 md:mt-6">
              <Link href="/subscriptions">{t('home.subscriptionsButton')}</Link>
            </Button>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              {t('home.bulkOrdersTitle')}
            </h2>
            <p className="mt-3 md:mt-4 text-sm md:text-lg text-muted-foreground">
              {t('home.bulkOrdersSubtitle')}
            </p>
            <Button asChild className="mt-5 md:mt-6">
              <Link href="/bulk-orders">{t('home.bulkOrdersButton')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

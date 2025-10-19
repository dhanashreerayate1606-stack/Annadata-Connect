
'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/hooks/use-translation";

const plans = [
  {
    id: "weekly",
    name: "Weekly Essentials",
    price: "800",
    features: [
      "5kg of seasonal vegetables",
      "2kg of seasonal fruits",
      "Free home delivery",
      "Pause or cancel anytime",
    ],
    popular: false,
  },
  {
    id: "family",
    name: "Family Feast",
    price: "1,500",
    features: [
      "10kg of seasonal vegetables",
      "5kg of seasonal fruits",
      "Includes exotic vegetables",
      "Free home delivery",
      "Pause or cancel anytime",
    ],
    popular: true,
  },
  {
    id: "organic",
    name: "Organic Bliss",
    price: "2,000",
    features: [
      "12kg of certified organic produce",
      "Includes herbs and spices",
      "Priority delivery slots",
      "Free home delivery",
    ],
    popular: false,
  },
];

const heroImage = PlaceHolderImages.find(p => p.id === 'subscription-hero');

export default function SubscriptionsPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-background">
      {heroImage && (
        <section className="relative h-[40vh] w-full bg-secondary">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-bold md:text-6xl font-headline">
              {t('subscriptions.title')}
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl font-body">
              {t('subscriptions.subtitle')}
            </p>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary border-2" : ""}`}>
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-bold">
                  {t('subscriptions.popularBadge')}
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-headline">{t(`subscriptions.plans.${plan.id}.name`)}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-primary">₹{plan.price}</span>
                  <span className="text-muted-foreground">/{t('subscriptions.perWeek')}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-secondary" />
                      <span className="text-muted-foreground">{t(`subscriptions.plans.${plan.id}.features.${index}`)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardContent>
                <Button className="w-full" variant={plan.popular ? "default" : "secondary"}>
                  {t('subscriptions.choosePlanButton')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

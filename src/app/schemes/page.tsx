
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

const schemes = [
  {
    id: "pm-kisan",
    title: "PM-KISAN Scheme",
    description: "Financial support of ₹6,000 per year for small and marginal farmers.",
    eligibility: "All landholding farmer families.",
    benefits: "Direct income support in three equal installments.",
    category: "Financial Support",
  },
  {
    id: "pmfby",
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "Insurance coverage against crop failure due to natural calamities, pests, or diseases.",
    eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops in notified areas.",
    benefits: "Stabilizes income and encourages adoption of innovative farming practices.",
    category: "Crop Insurance",
  },
  {
    id: "kcc",
    title: "Kisan Credit Card (KCC)",
    description: "Provides farmers with timely access to credit for their cultivation and other needs.",
    eligibility: "Farmers, animal husbandry, and fisheries farmers.",
    benefits: "Low-interest loans, flexible repayment, and a simple application process.",
    category: "Credit Facility",
  },
];

const categoryVariant = {
    "Financial Support": "primary",
    "Crop Insurance": "secondary",
    "Credit Facility": "default",
} as const;

export default function SchemesPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 animate-gradient-xy"></div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground p-4">
            <h1 className="text-4xl font-bold tracking-tight font-headline text-white drop-shadow-lg">
              {t('schemes.title')}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
              {t('schemes.subtitle')}
            </p>
          </div>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('schemes.cardTitle')}</CardTitle>
          <CardDescription>{t('schemes.cardDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {schemes.map((scheme) => (
              <AccordionItem key={scheme.id} value={scheme.id}>
                <AccordionTrigger>
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-muted rounded-full">
                           <Landmark className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-left">
                           <h3 className="font-semibold">{t(`schemes.${scheme.id}.title`)}</h3>
                           <p className="text-sm text-muted-foreground">{t(`schemes.${scheme.id}.description`)}</p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-14 space-y-4">
                    <Badge variant={categoryVariant[scheme.category as keyof typeof categoryVariant]}>{t(`schemes.category${scheme.category.replace(' ', '')}`)}</Badge>
                    <div>
                        <h4 className="font-semibold">{t('schemes.eligibilityTitle')}</h4>
                        <p className="text-muted-foreground text-sm">{t(`schemes.${scheme.id}.eligibility`)}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">{t('schemes.benefitsTitle')}</h4>
                        <p className="text-muted-foreground text-sm">{t(`schemes.${scheme.id}.benefits`)}</p>
                    </div>
                    <Button size="sm">{t('schemes.applyButton')}</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

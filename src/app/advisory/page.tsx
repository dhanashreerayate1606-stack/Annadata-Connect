
'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Leaf } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function AdvisoryPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          {t('advisory.title')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t('advisory.subtitle')}
        </p>
      </div>
      
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>{t('advisory.cardTitle')}</CardTitle>
          <CardDescription>{t('advisory.cardDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="region">{t('advisory.regionLabel')}</Label>
            <Input id="region" placeholder={t('advisory.regionPlaceholder')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="soil-type">{t('advisory.soilTypeLabel')}</Label>
            <Select>
              <SelectTrigger id="soil-type">
                <SelectValue placeholder={t('advisory.soilTypePlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alluvial">{t('advisory.soilAlluvial')}</SelectItem>
                <SelectItem value="black">{t('advisory.soilBlack')}</SelectItem>
                <SelectItem value="red">{t('advisory.soilRed')}</SelectItem>
                <SelectItem value="laterite">{t('advisory.soilLaterite')}</SelectItem>
                <SelectItem value="desert">{t('advisory.soilDesert')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="season">{t('advisory.seasonLabel')}</Label>
             <Select>
              <SelectTrigger id="season">
                <SelectValue placeholder={t('advisory.seasonPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kharif">{t('advisory.seasonKharif')}</SelectItem>
                <SelectItem value="rabi">{t('advisory.seasonRabi')}</SelectItem>
                <SelectItem value="zaid">{t('advisory.seasonZaid')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div className="space-y-2">
            <Label htmlFor="rainfall">{t('advisory.rainfallLabel')}</Label>
            <Input id="rainfall" placeholder={t('advisory.rainfallPlaceholder')} type="number" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full sm:w-auto">{t('advisory.getAdvisoryButton')}</Button>
        </CardFooter>
      </Card>

      <div className="mt-10">
        <h2 className="text-2xl font-bold font-headline">{t('advisory.recommendationsTitle')}</h2>
        <Card className="mt-4 bg-secondary/10 border-secondary">
          <CardHeader className="flex flex-row items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <Leaf className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle className="text-secondary-foreground font-headline">{t('advisory.recoCrop')}</CardTitle>
              <CardDescription className="text-secondary-foreground/80">{t('advisory.recoDescription')}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-semibold">{t('advisory.recoSowing')}:</span> June - July</div>
                <div><span className="font-semibold">{t('advisory.recoHarvest')}:</span> 12-18 months</div>
                <div><span className="font-semibold">{t('advisory.recoYield')}:</span> 100-120 tons/ha</div>
                <div><span className="font-semibold">{t('advisory.recoDemand')}:</span> High</div>
            </div>
            <p className="mt-4 text-sm">
              <span className="font-semibold">{t('advisory.recoTipTitle')}:</span> {t('advisory.recoTipDescription')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

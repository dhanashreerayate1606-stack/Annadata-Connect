
'use client';

import { useState } from "react";
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
import { Leaf, Loader2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { aiCropAdvisoryForFarmers, AICropAdvisoryOutput } from "@/ai/ai-crop-advisory";
import { useToast } from "@/hooks/use-toast";

export default function AdvisoryPage() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [region, setRegion] = useState("");
  const [soilType, setSoilType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AICropAdvisoryOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!region || !soilType) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill out the region and soil type.",
      });
      return;
    }

    setIsLoading(true);
    setRecommendation(null);

    try {
      const result = await aiCropAdvisoryForFarmers({
        region,
        soilConditions: soilType,
      });
      setRecommendation(result);
    } catch (error) {
      console.error("Error getting AI advisory:", error);
      toast({
        variant: "destructive",
        title: "AI Advisory Failed",
        description: "Could not retrieve crop recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{t('advisory.cardTitle')}</CardTitle>
            <CardDescription>{t('advisory.cardDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="region">{t('advisory.regionLabel')}</Label>
              <Input 
                id="region" 
                placeholder={t('advisory.regionPlaceholder')} 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="soil-type">{t('advisory.soilTypeLabel')}</Label>
              <Select value={soilType} onValueChange={setSoilType}>
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
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('advisory.getAdvisoryButton')}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {(isLoading || recommendation) && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold font-headline">{t('advisory.recommendationsTitle')}</h2>
          {isLoading ? (
             <Card className="mt-4 flex flex-col items-center justify-center p-10">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">Generating your personalized crop advice...</p>
            </Card>
          ) : recommendation && (
            <Card className="mt-4 bg-secondary/10 border-secondary">
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Leaf className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-secondary-foreground font-headline">AI-Powered Suggestions</CardTitle>
                  <CardDescription className="text-secondary-foreground/80">Based on your inputs for {region} and {soilType} soil.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{recommendation.suggestedCrops}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

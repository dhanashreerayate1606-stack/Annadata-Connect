'use client';

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages, ImagePlaceholder } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { PlayCircle, Loader2, BookOpen, Sparkles, ChevronRight, CheckCircle2, Lightbulb } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateAgriGuide, type AgriGuideOutput } from "@/ai/flows/agri-guide-flow";
import { useLanguage } from "@/context/language-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const allLearningContent = PlaceHolderImages.filter(p => p.category === 'learning');
const tutorials = allLearningContent.filter(p => p.id.startsWith("tutorial"));
const webinars = allLearningContent.filter(p => p.id.startsWith("webinar"));
const resources = allLearningContent.filter(p => p.id.startsWith("resource"));

export default function LearningHubPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiGuide, setAiGuide] = useState<AgriGuideOutput | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleResourceAction = async (item: ImagePlaceholder) => {
    setIsAiLoading(true);
    setAiGuide(null);
    setIsDialogOpen(true);

    try {
      const result = await generateAgriGuide({
        topic: item.name || item.id,
        language: language
      });
      setAiGuide(result);
    } catch (error) {
      console.error("AI Guide generation failed:", error);
      toast({
        variant: "destructive",
        title: "AI Analysis Failed",
        description: "Could not generate the guide at this time. Please try again.",
      });
      setIsDialogOpen(false);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleVideoAction = (item: ImagePlaceholder) => {
    const query = item.searchQuery || item.name;
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query!)}`;
    window.open(searchUrl, '_blank');
    toast({ 
      title: "Opening Tutorial", 
      description: `Searching YouTube for expert advice on "${item.name}"...` 
    });
  };

  const LearningCard = ({ 
    item, 
    type 
  }: { 
    item: ImagePlaceholder, 
    type: 'tutorial' | 'webinar' | 'resource'
  }) => (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full border-primary/10 bg-card">
      <CardHeader className="p-0 relative">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image 
            src={item.imageUrl || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1080"} 
            alt={item.description} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-110" 
            data-ai-hint={item.imageHint || "agriculture field"} 
          />
          {type !== 'resource' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
              <PlayCircle className="h-16 w-16 text-white/90 drop-shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300" />
            </div>
          )}
          {type === 'resource' && (
            <div className="absolute top-3 right-3 bg-primary/90 text-white p-1.5 rounded-full shadow-md">
              <Sparkles className="h-4 w-4" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-5 flex-grow">
        <CardTitle className="text-xl font-bold font-headline group-hover:text-primary transition-colors">
          {item.name}
        </CardTitle>
        <CardDescription className="mt-2 text-sm leading-relaxed line-clamp-3 text-muted-foreground">
          {item.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button 
          className="w-full font-semibold gap-2" 
          variant={type === 'resource' ? "default" : "secondary"}
          onClick={() => type === 'resource' ? handleResourceAction(item) : handleVideoAction(item)}
        >
          {type === 'resource' ? (
            <>
              <Sparkles className="h-4 w-4" />
              View AI Guide
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4" />
              {t('learning.watchButton')}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-headline text-foreground">
          {t('learning.title')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {t('learning.subtitle')}
        </p>
      </div>

      <Tabs defaultValue="tutorials" className="mt-12">
        <TabsList className="grid w-full max-w-xl mx-auto grid-cols-3 bg-muted/50 p-1 border border-border">
          <TabsTrigger value="tutorials" className="data-[state=active]:bg-primary data-[state=active]:text-white font-medium transition-all">
            {t('learning.tutorialsTab')}
          </TabsTrigger>
          <TabsTrigger value="webinars" className="data-[state=active]:bg-primary data-[state=active]:text-white font-medium transition-all">
            {t('learning.webinarsTab')}
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-primary data-[state=active]:text-white font-medium transition-all">
            {t('learning.resourcesTab')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tutorials" className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tutorials.map(item => <LearningCard key={item.id} item={item} type="tutorial" />)}
          </div>
        </TabsContent>
        <TabsContent value="webinars" className="mt-10">
           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {webinars.map(item => <LearningCard key={item.id} item={item} type="webinar" />)}
          </div>
        </TabsContent>
        <TabsContent value="resources" className="mt-10">
           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map(item => <LearningCard key={item.id} item={item} type="resource" />)}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col sm:rounded-xl border-primary/20 shadow-2xl">
          <DialogHeader className="pb-4 border-b border-primary/10">
            <DialogTitle className="text-3xl font-headline flex items-center gap-3 text-primary">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-6 w-6" />
              </div>
              {isAiLoading ? "Consulting AI Agronomist..." : aiGuide?.title}
            </DialogTitle>
            <DialogDescription className="text-base font-medium">
              Real-time agricultural intelligence powered by Annadata Connect.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-grow pr-4 mt-4">
            {isAiLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-6">
                <div className="relative">
                  <Loader2 className="h-16 w-16 animate-spin text-primary" />
                  <Sparkles className="h-6 w-6 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xl font-headline font-bold text-foreground animate-pulse">Generating Expert Insights...</p>
                  <p className="text-sm text-muted-foreground">Analyzing local conditions and scientific data.</p>
                </div>
              </div>
            ) : aiGuide && (
              <div className="space-y-10 pb-10">
                {aiGuide.sections.map((section, index) => (
                  <div key={index} className="space-y-4 group">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold font-headline text-foreground group-hover:text-primary transition-colors">
                        {section.heading}
                      </h3>
                    </div>
                    <div className="pl-11 pr-2">
                      <p className="text-base leading-relaxed text-foreground/80 whitespace-pre-wrap pl-6 border-l-2 border-primary/20 transition-all hover:border-primary">
                        {section.content}
                      </p>
                    </div>
                  </div>
                ))}
                
                <Separator className="bg-primary/10" />
                
                <div className="bg-secondary/10 border border-secondary/20 p-6 rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Lightbulb className="h-12 w-12 text-secondary" />
                  </div>
                  <h4 className="font-bold text-secondary-foreground flex items-center gap-2 mb-3 text-lg font-headline">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    Key Scientific Takeaway
                  </h4>
                  <p className="text-base italic text-secondary-foreground/90 leading-relaxed pl-7">
                    {aiGuide.summary}
                  </p>
                </div>
              </div>
            )}
          </ScrollArea>
          
          <div className="pt-4 border-t border-primary/10 flex justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close Guide</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

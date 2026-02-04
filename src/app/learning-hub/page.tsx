
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
import { PlayCircle, Loader2, BookOpen, Sparkles, ChevronRight } from "lucide-react";
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
      description: `Searching YouTube for "${item.name}"...` 
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-2xl font-headline flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              {isAiLoading ? "Consulting AI Agronomist..." : aiGuide?.title}
            </DialogTitle>
            <DialogDescription>
              Custom agricultural intelligence for your farm.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-grow pr-4">
            {isAiLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Generating your professional guide...</p>
              </div>
            ) : aiGuide && (
              <div className="space-y-8 pb-6">
                {aiGuide.sections.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                      <ChevronRight className="h-4 w-4" />
                      {section.heading}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap pl-6 border-l-2 border-primary/10">
                      {section.content}
                    </p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="bg-secondary/5 border border-secondary/20 p-4 rounded-lg">
                  <h4 className="font-bold text-secondary-foreground flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4" />
                    Key Takeaway
                  </h4>
                  <p className="text-sm italic text-secondary-foreground/80">
                    {aiGuide.summary}
                  </p>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
import { Download, Video, Sprout, HandHelping, Laptop, Presentation, TrendingUp, Loader2, X } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const allLearningContent = PlaceHolderImages.filter(p => p.category === 'learning');
const tutorials = allLearningContent.filter(p => p.id.startsWith("tutorial"));
const webinars = allLearningContent.filter(p => p.id.startsWith("webinar"));
const resources = allLearningContent.filter(p => p.id.startsWith("resource"));

const cardIcons: { [key: string]: React.ReactNode } = {
  tutorial1: <Sprout className="h-20 w-20 text-secondary" />,
  tutorial2: <HandHelping className="h-20 w-20 text-primary" />,
  tutorial3: <Laptop className="h-20 w-20 text-accent" />,
  webinar1: <Presentation className="h-20 w-20 text-secondary" />,
  webinar2: <TrendingUp className="h-20 w-20 text-primary" />,
};

const cardColors: { [key: string]: string } = {
    tutorial1: 'bg-secondary/10',
    tutorial2: 'bg-primary/10',
    tutorial3: 'bg-accent/10',
    webinar1: 'bg-secondary/10',
    webinar2: 'bg-primary/10',
}

const LearningCard = ({ 
  item, 
  type, 
  onWatch 
}: { 
  item: ImagePlaceholder, 
  type: 'tutorial' | 'webinar' | 'resource',
  onWatch: (url: string, title: string) => void
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const icon = cardIcons[item.id];
  const color = cardColors[item.id];

  const handleAction = () => {
    if (type === 'resource') {
      if (!item.fileUrl) {
        toast({ variant: "destructive", title: "Resource missing", description: "This file is not currently available." });
        return;
      }
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        window.open(item.fileUrl, '_blank');
        toast({
          title: "Download Started",
          description: `Opening "${item.name}"...`,
        });
      }, 800);
    } else {
      if (!item.videoUrl) {
        toast({ variant: "destructive", title: "Video missing", description: "This video is not currently available." });
        return;
      }
      onWatch(item.videoUrl, item.name || "Learning Session");
    }
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          {item.imageUrl ? (
            <Image src={item.imageUrl} alt={item.description} fill className="object-cover" data-ai-hint={item.imageHint} />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${color || 'bg-muted'}`}>
               {icon || <Sprout className="h-20 w-20 text-muted-foreground" />}
            </div>
          )}
          {type !== 'resource' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Video className="h-12 w-12 text-white/80" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold font-headline">
          {item.name || "Learning Material"}
        </CardTitle>
        <CardDescription className="mt-2 text-sm line-clamp-3">
          {item.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {type === 'resource' ? (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleAction}
            disabled={isProcessing}
          >
            {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            {t('learning.downloadButton')}
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={handleAction}
            disabled={isProcessing}
          >
            {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Video className="mr-2 h-4 w-4" />}
            {t('learning.watchButton')}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
};

export default function LearningHubPage() {
  const { t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState<{ url: string, title: string } | null>(null);

  const handleWatch = (url: string, title: string) => {
    setActiveVideo({ url, title });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          {t('learning.title')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {t('learning.subtitle')}
        </p>
      </div>

      <Tabs defaultValue="tutorials" className="mt-10">
        <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3">
          <TabsTrigger value="tutorials">{t('learning.tutorialsTab')}</TabsTrigger>
          <TabsTrigger value="webinars">{t('learning.webinarsTab')}</TabsTrigger>
          <TabsTrigger value="resources">{t('learning.resourcesTab')}</TabsTrigger>
        </TabsList>

        <TabsContent value="tutorials" className="mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutorials.map(item => <LearningCard key={item.id} item={item} type="tutorial" onWatch={handleWatch} />)}
          </div>
        </TabsContent>
        <TabsContent value="webinars" className="mt-8">
           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {webinars.map(item => <LearningCard key={item.id} item={item} type="webinar" onWatch={handleWatch} />)}
          </div>
        </TabsContent>
        <TabsContent value="resources" className="mt-8">
           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map(item => <LearningCard key={item.id} item={item} type="resource" onWatch={handleWatch} />)}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black aspect-video border-none shadow-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{activeVideo?.title}</DialogTitle>
          </DialogHeader>
          {activeVideo && (
            <div className="relative w-full h-full">
              <iframe
                src={activeVideo.url}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
                onClick={() => setActiveVideo(null)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}


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
import { Download, PlayCircle, Loader2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const allLearningContent = PlaceHolderImages.filter(p => p.category === 'learning');
const tutorials = allLearningContent.filter(p => p.id.startsWith("tutorial"));
const webinars = allLearningContent.filter(p => p.id.startsWith("webinar"));
const resources = allLearningContent.filter(p => p.id.startsWith("resource"));

const LearningCard = ({ 
  item, 
  type 
}: { 
  item: ImagePlaceholder, 
  type: 'tutorial' | 'webinar' | 'resource'
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = () => {
    // We remove the artificial delay to prevent pop-up blockers from interrupting window.open
    if (type === 'resource') {
      if (item.fileUrl) {
        window.open(item.fileUrl, '_blank');
        toast({ title: "Opening Resource", description: `Accessing ${item.name}...` });
      } else {
        toast({ variant: "destructive", title: "Missing File", description: "This resource is currently being updated." });
      }
    } else {
      const query = item.searchQuery || item.name;
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query!)}`, '_blank');
      toast({ title: "Opening YouTube", description: `Searching for "${query}"...` });
    }
  };
  
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full border-primary/10">
      <CardHeader className="p-0 relative">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image 
            src={item.imageUrl} 
            alt={item.description} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-110" 
            data-ai-hint={item.imageHint} 
          />
          {type !== 'resource' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
              <PlayCircle className="h-16 w-16 text-white/90 drop-shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-5 flex-grow">
        <CardTitle className="text-xl font-bold font-headline group-hover:text-primary transition-colors">
          {item.name}
        </CardTitle>
        <CardDescription className="mt-2 text-sm leading-relaxed line-clamp-3">
          {item.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button 
          className="w-full" 
          variant={type === 'resource' ? "outline" : "default"}
          onClick={handleAction}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : type === 'resource' ? (
            <Download className="mr-2 h-4 w-4" />
          ) : (
            <PlayCircle className="mr-2 h-4 w-4" />
          )}
          {type === 'resource' ? t('learning.downloadButton') : t('learning.watchButton')}
        </Button>
      </CardFooter>
    </Card>
  )
};

export default function LearningHubPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-headline">
          {t('learning.title')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {t('learning.subtitle')}
        </p>
      </div>

      <Tabs defaultValue="tutorials" className="mt-12">
        <TabsList className="grid w-full max-w-xl mx-auto grid-cols-3 bg-muted/50 p-1">
          <TabsTrigger value="tutorials" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            {t('learning.tutorialsTab')}
          </TabsTrigger>
          <TabsTrigger value="webinars" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            {t('learning.webinarsTab')}
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-primary data-[state=active]:text-white">
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
    </div>
  );
}

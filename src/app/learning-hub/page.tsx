
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
import { Download, Video } from "lucide-react";

const allLearningContent = PlaceHolderImages.filter(p => p.category === 'learning');
const tutorials = allLearningContent.filter(p => p.id.startsWith("tutorial"));
const webinars = allLearningContent.filter(p => p.id.startsWith("webinar"));
const resources = allLearningContent.filter(p => p.id.startsWith("resource"));

const LearningCard = ({ item, type }: { item: ImagePlaceholder, type: 'tutorial' | 'webinar' | 'resource' }) => (
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col">
    <CardHeader className="p-0">
      <div className="relative aspect-video w-full">
        <Image src={item.imageUrl} alt={item.description} fill className="object-cover" data-ai-hint={item.imageHint} />
        {type !== 'resource' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Video className="h-12 w-12 text-white/80" />
          </div>
        )}
      </div>
    </CardHeader>
    <CardContent className="p-4 flex-grow">
      <CardTitle className="text-lg font-bold font-headline">
        {item.name}
      </CardTitle>
      <CardDescription className="mt-2 text-sm">
        {item.description}
      </CardDescription>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      {type === 'resource' ? (
         <Button variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      ) : (
        <Button className="w-full">
          <Video className="mr-2 h-4 w-4" /> Watch Now
        </Button>
      )}
    </CardFooter>
  </Card>
);

export default function LearningHubPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Knowledge Center
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Your one-stop destination for farming best practices, expert advice, and community learning.
        </p>
      </div>

      <Tabs defaultValue="tutorials" className="mt-10">
        <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3">
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="tutorials" className="mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutorials.map(item => <LearningCard key={item.id} item={item} type="tutorial" />)}
          </div>
        </TabsContent>
        <TabsContent value="webinars" className="mt-8">
           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {webinars.map(item => <LearningCard key={item.id} item={item} type="webinar" />)}
          </div>
        </TabsContent>
        <TabsContent value="resources" className="mt-8">
           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map(item => <LearningCard key={item.id} item={item} type="resource" />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

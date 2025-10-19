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

export default function AdvisoryPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          AI Crop Advisory
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get personalized, data-driven recommendations for your farm. Our AI analyzes your local conditions to suggest the most profitable and sustainable crops.
        </p>
      </div>
      
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Find Your Next Crop</CardTitle>
          <CardDescription>Fill in your farm's details below to get a suggestion.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="region">Region / District</Label>
            <Input id="region" placeholder="e.g., Nashik, Maharashtra" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="soil-type">Soil Type</Label>
            <Select>
              <SelectTrigger id="soil-type">
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alluvial">Alluvial Soil</SelectItem>
                <SelectItem value="black">Black Soil</SelectItem>
                <SelectItem value="red">Red Soil</SelectItem>
                <SelectItem value="laterite">Laterite Soil</SelectItem>
                <SelectItem value="desert">Desert Soil</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="season">Sowing Season</Label>
             <Select>
              <SelectTrigger id="season">
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                <SelectItem value="zaid">Zaid (Summer)</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div className="space-y-2">
            <Label htmlFor="rainfall">Annual Rainfall (mm)</Label>
            <Input id="rainfall" placeholder="e.g., 700" type="number" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full sm:w-auto">Get Advisory</Button>
        </CardFooter>
      </Card>

      <div className="mt-10">
        <h2 className="text-2xl font-bold font-headline">Recommendations</h2>
        <Card className="mt-4 bg-secondary/10 border-secondary">
          <CardHeader className="flex flex-row items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <Leaf className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <CardTitle className="text-secondary-foreground font-headline">Sugarcane (Recommended)</CardTitle>
              <CardDescription className="text-secondary-foreground/80">High profitability for your region's black soil and climate.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-semibold">Sowing Period:</span> June - July</div>
                <div><span className="font-semibold">Harvest:</span> 12-18 months</div>
                <div><span className="font-semibold">Est. Yield:</span> 100-120 tons/ha</div>
                <div><span className="font-semibold">Market Demand:</span> High</div>
            </div>
            <p className="mt-4 text-sm">
              <span className="font-semibold">Farming Tip:</span> Consider inter-cropping with pulses like gram or lentil during the initial phase to improve soil nitrogen and get an additional income. Ensure proper drainage to avoid waterlogging.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

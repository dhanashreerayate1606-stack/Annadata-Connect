
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
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Government Schemes for Farmers
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Stay informed about the latest government initiatives and financial support programs available to you.
        </p>
      </div>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Available Programs</CardTitle>
          <CardDescription>Browse through the schemes and find the ones you are eligible for.</CardDescription>
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
                           <h3 className="font-semibold">{scheme.title}</h3>
                           <p className="text-sm text-muted-foreground">{scheme.description}</p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-14 space-y-4">
                    <Badge variant={categoryVariant[scheme.category as keyof typeof categoryVariant]}>{scheme.category}</Badge>
                    <div>
                        <h4 className="font-semibold">Eligibility</h4>
                        <p className="text-muted-foreground text-sm">{scheme.eligibility}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Key Benefits</h4>
                        <p className="text-muted-foreground text-sm">{scheme.benefits}</p>
                    </div>
                    <Button size="sm">Learn More & Apply</Button>
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

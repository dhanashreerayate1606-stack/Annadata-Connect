import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Weekly Essentials",
    price: "800",
    features: [
      "5kg of seasonal vegetables",
      "2kg of seasonal fruits",
      "Free home delivery",
      "Pause or cancel anytime",
    ],
    popular: false,
  },
  {
    name: "Family Feast",
    price: "1,500",
    features: [
      "10kg of seasonal vegetables",
      "5kg of seasonal fruits",
      "Includes exotic vegetables",
      "Free home delivery",
      "Pause or cancel anytime",
    ],
    popular: true,
  },
  {
    name: "Organic Bliss",
    price: "2,000",
    features: [
      "12kg of certified organic produce",
      "Includes herbs and spices",
      "Priority delivery slots",
      "Free home delivery",
    ],
    popular: false,
  },
];

export default function SubscriptionsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Freshness, Delivered Weekly
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Choose a subscription box that fits your lifestyle. Get a curated selection of farm-fresh produce delivered to your door every week.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary border-2" : ""}`}>
            {plan.popular && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-bold">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="font-headline">{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-primary">₹{plan.price}</span>
                <span className="text-muted-foreground">/week</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-secondary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardContent>
              <Button className="w-full" variant={plan.popular ? "default" : "secondary"}>
                Choose Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
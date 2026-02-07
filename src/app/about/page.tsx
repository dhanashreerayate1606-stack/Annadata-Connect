
'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tractor, Users, Leaf, ShieldCheck, Heart, Globe } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function AboutPage() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Tractor,
      title: "Farmer Empowerment",
      description: "We cut out the middlemen, ensuring farmers receive 100% of the value they deserve for their hard work."
    },
    {
      icon: Leaf,
      title: "Sustainable Agriculture",
      description: "Promoting organic practices and low-carbon logistics to protect our soil and our future."
    },
    {
      icon: ShieldCheck,
      title: "Verified Traceability",
      description: "Our blockchain-backed QR system lets you trace every vegetable back to the exact farm it was harvested from."
    },
    {
      icon: Users,
      title: "Community Growth",
      description: "Building a supportive ecosystem where farmers share knowledge and consumers support local livelihoods."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary-dark mb-6">
            Empowering the Hands that Feed Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Annadata Connect is more than a marketplace. it's a movement to bridge the gap between rural excellence and urban health.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1080" 
                alt="Green fields" 
                fill 
                className="object-cover"
                data-ai-hint="indian farm"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-headline">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                In India, farmers often struggle with unfair pricing and complex supply chains. Meanwhile, consumers often pay high prices for produce that isn't fresh. 
              </p>
              <p className="text-lg text-muted-foreground">
                <strong>Annadata Connect</strong> uses AI-driven advisory and a direct-to-consumer platform to ensure farmers earn more and you eat better. We are digitizing the "Mandi" experience to make it transparent, efficient, and fair.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 font-bold text-primary">
                  <Globe size={20} /> 100+ Districts
                </div>
                <div className="flex items-center gap-2 font-bold text-secondary">
                  <Heart size={20} /> 50k+ Happy Families
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline">The Annadata Way</h2>
            <p className="text-muted-foreground mt-2">Built on trust, technology, and tradition.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <value.icon className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Ready to support a local farmer?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Join thousands of conscious consumers who are making a difference with every bite.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
              Shop Now
            </a>
            <a href="/signup" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-primary transition-colors">
              Become a Partner
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

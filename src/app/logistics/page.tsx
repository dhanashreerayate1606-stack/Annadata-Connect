
'use client';

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Truck, Package, Home, Phone, MessageSquare } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

const trackingSteps = [
  { id: 'placed', status: "Order Placed", date: "2023-10-29 10:00 AM", completed: true, icon: Package },
  { id: 'shipped', status: "Shipped", date: "2023-10-29 04:00 PM", completed: true, icon: Truck },
  { id: 'delivery', status: "Out for Delivery", date: "2023-10-30 08:00 AM", completed: true, icon: Truck },
  { id: 'delivered', status: "Delivered", date: "2023-10-30 01:30 PM", completed: false, icon: Home },
];

const mapImage = PlaceHolderImages.find(p => p.id === 'logistics-map');

export default function LogisticsPage() {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold tracking-tight font-headline">{t('logistics.title')}</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                   {t('logistics.subtitle', { orderId: 'ORD004' })}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('logistics.timelineTitle')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative pl-6">
                                <div className="absolute left-9 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
                                {trackingSteps.map((step, index) => (
                                    <div key={step.status} className="relative mb-8 flex items-start gap-6">
                                        <div className={cn(
                                            "z-10 flex h-12 w-12 items-center justify-center rounded-full",
                                            step.completed ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                                        )}>
                                            <step.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{t(`logistics.step_${step.id}`)}</p>
                                            <p className="text-sm text-muted-foreground">{step.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                     <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>{t('logistics.supportTitle')}</CardTitle>
                            <CardDescription>{t('logistics.supportDescription')}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row gap-4">
                           <Button className="flex-1">
                                <Phone className="mr-2 h-4 w-4" /> {t('logistics.callSupport')}
                           </Button>
                           <Button variant="outline" className="flex-1">
                                <MessageSquare className="mr-2 h-4 w-4" /> {t('logistics.chatSupport')}
                           </Button>
                        </CardContent>
                    </Card>
                </div>
                <div>
                     <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle>{t('logistics.routeTitle')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                             {mapImage && (
                                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                                <Image
                                    src={mapImage.imageUrl}
                                    alt={mapImage.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={mapImage.imageHint}
                                />
                                </div>
                            )}
                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">{t('logistics.source')}</span>
                                    <span className="font-medium">Nashik, MH</span>
                                </div>
                                 <div className="flex justify-between">
                                    <span className="text-muted-foreground">{t('logistics.destination')}</span>
                                    <span className="font-medium">Pune, MH</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

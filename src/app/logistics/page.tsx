'use client';

import { Suspense, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Package, Truck, Home, Star, AlertTriangle, ThermometerSnowflake, Droplets } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearchParams } from "next/navigation";

const driverInfo = {
    name: "Ravi Kumar",
    avatar: "https://picsum.photos/seed/driver/100/100",
    vehicle: "TATA Ace - MH12 AB1234",
    rating: 4.8,
};

const LogisticsContent = () => {
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId') || 'ORD004';
    const status = searchParams.get('status') || 'Processing';
    const [isDelayedByWeather, setIsDelayedByWeather] = useState(false);
    const [iotData, setIotData] = useState({ temp: 18.5, humidity: 62 });

    useEffect(() => {
      // Simulate checking weather impact
      const timer = setTimeout(() => setIsDelayedByWeather(true), 1500);
      
      // Simulate live IoT stream
      const interval = setInterval(() => {
        setIotData(prev => ({
          temp: +(prev.temp + (Math.random() - 0.5) * 0.2).toFixed(1),
          humidity: +(prev.humidity + (Math.random() - 0.5) * 0.5).toFixed(0)
        }));
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }, []);

    const getTrackingSteps = (status: string) => {
        const steps = [
          { id: 'placed', status: "Order Placed", date: "2023-10-29 10:00 AM", completed: false, icon: Package },
          { id: 'shipped', status: "Shipped", date: "2023-10-29 04:00 PM", completed: false, icon: Truck },
          { id: 'delivery', status: "Out for Delivery", date: "2023-10-30 08:00 AM", completed: false, icon: Truck },
          { id: 'delivered', status: "Delivered", date: "2023-10-30 01:30 PM", completed: false, icon: Home },
        ];

        if (status === 'Processing') steps[0].completed = true;
        else if (status === 'Shipped') { steps[0].completed = true; steps[1].completed = true; }
        else if (status === 'Delivered') steps.forEach(step => step.completed = true);
        else if (status === 'Out for Delivery') { steps[0].completed = true; steps[1].completed = true; steps[2].completed = true; }
        return steps;
    };

    const trackingSteps = getTrackingSteps(status);

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold tracking-tight font-headline">{t('logistics.title')}</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                   {t('logistics.subtitle', { orderId: orderId })}
                </p>
            </div>

            <div className="mx-auto max-w-xl grid grid-cols-1 gap-8">
                {/* IoT Freshness Tracking */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-blue-50/50 border-blue-100">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-2">
                        <ThermometerSnowflake className="h-4 w-4" />
                        Storage Temp
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold">{iotData.temp}°C</div>
                      <p className="text-[10px] text-blue-500">Optimal freshness range</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-cyan-50/50 border-cyan-100">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-xs font-bold uppercase tracking-wider text-cyan-600 flex items-center gap-2">
                        <Droplets className="h-4 w-4" />
                        Humidity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold">{iotData.humidity}%</div>
                      <p className="text-[10px] text-cyan-500">Real-time sensor data</p>
                    </CardContent>
                  </Card>
                </div>

                {isDelayedByWeather && (
                  <Card className="border-orange-200 bg-orange-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-orange-800 text-sm flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        {t('logistics.weatherDelayTitle')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-orange-700">
                        {t('logistics.weatherDelayDescription')}
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>{t('logistics.timelineTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative pl-6">
                            <div className="absolute left-9 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
                            {trackingSteps.map((step) => (
                                <div key={step.status} className="relative mb-8 flex items-start gap-6">
                                    <div className={cn(
                                        "z-10 flex h-12 w-12 items-center justify-center rounded-full",
                                        step.completed ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                                    )}>
                                        <step.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                          <p className="font-semibold">{t(`logistics.step_${step.id}`)}</p>
                                          {isDelayedByWeather && step.id === 'delivery' && (
                                            <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded uppercase">{t('logistics.weatherDelayAdjusted')}</span>
                                          )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{step.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>{t('logistics.driverInfoTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                           <AvatarImage src={driverInfo.avatar} alt={driverInfo.name} />
                           <AvatarFallback>{driverInfo.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                           <p className="font-semibold">{driverInfo.name}</p>
                           <p className="text-sm text-muted-foreground">{driverInfo.vehicle}</p>
                           <div className="flex items-center gap-1 text-sm">
                               <Star className="w-4 h-4 text-accent fill-current" />
                               <span>{driverInfo.rating}</span>
                           </div>
                        </div>
                         <Button variant="outline">
                            <Phone className="mr-2 h-4 w-4" /> {t('logistics.contactDriver')}
                       </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function LogisticsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LogisticsContent />
        </Suspense>
    );
}

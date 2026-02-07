'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  LineChart,
  Leaf,
  PlusCircle,
  Cloud,
  CloudRain,
  Sun,
  Thermometer,
  AlertTriangle,
  Loader2,
  TrendingUp,
  Award,
  MapPin,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useLanguage } from '@/context/language-context';
import { useEffect, useState } from 'react';
import { weatherAdvisory, WeatherAdvisoryOutput } from '@/ai/flows/weather-advisory-flow';
import { useToast } from '@/hooks/use-toast';

const salesData = [
  { month: 'Jan', revenue: 4000, orders: 24 },
  { month: 'Feb', revenue: 3000, orders: 18 },
  { month: 'Mar', revenue: 5000, orders: 32 },
  { month: 'Apr', revenue: 4500, orders: 28 },
  { month: 'May', revenue: 6000, orders: 45 },
  { month: 'Jun', revenue: 5500, orders: 38 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue (₹)',
    color: 'hsl(var(--primary))',
  },
  orders: {
    label: 'Orders',
    color: 'hsl(var(--secondary))',
  },
};

export default function FarmerDashboardPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [advisory, setAdvisory] = useState<WeatherAdvisoryOutput | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [locationName, setLocationName] = useState('Nashik, Maharashtra');
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  useEffect(() => {
    const fetchWeather = async (loc: string) => {
      setIsLoadingWeather(true);
      try {
        const result = await weatherAdvisory({
          location: loc,
          forecast: 'Day 1-2: Clear skies, High 32°C. Day 3-5: Moderate rainfall expected, 15mm/day, Low 22°C.',
          language: language
        });
        setAdvisory(result);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingWeather(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setIsLocationEnabled(true);
          const { latitude, longitude } = position.coords;
          // In a real app, we'd use a reverse geocoding API here.
          // For the prototype, we'll indicate coords are active.
          const detectedLoc = `Local Area (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
          setLocationName(detectedLoc);
          fetchWeather(detectedLoc);
          toast({
            title: "Location Enabled",
            description: "Providing hyper-local weather insights for your coordinates.",
          });
        },
        (error) => {
          console.warn("Geolocation access denied", error);
          setIsLocationEnabled(false);
          fetchWeather(locationName);
          toast({
            variant: "destructive",
            title: "Location Access Denied",
            description: "Using default regional weather. Enable location for hyper-local accuracy.",
          });
        }
      );
    } else {
      fetchWeather(locationName);
    }
  }, [language, toast]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          {t('dashboard.title')}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('dashboard.subtitle')}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium">
          <MapPin className={isLocationEnabled ? "text-primary" : "text-muted-foreground"} size={16} />
          <span>{locationName}</span>
          {!isLocationEnabled && (
            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">Default</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.totalRevenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹28,500</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.revenueLastMonth')}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Metrics</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">+₹4,200</div>
            <p className="text-xs text-muted-foreground">Extra earned via direct trade</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.activeListings')}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.listingsThisWeek')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demand Forecast</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">High</div>
            <p className="text-xs text-muted-foreground">For Organic Leafy Greens</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="text-primary" />
              {t('dashboard.weatherTitle')}
            </CardTitle>
            <CardDescription>{t('dashboard.weatherSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingWeather ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 flex flex-col items-center">
                    <CloudRain className="text-blue-500 mb-2" />
                    <span className="text-xs font-medium text-blue-700">{t('dashboard.weatherPrecipitation')}</span>
                    <span className="text-lg font-bold">15mm</span>
                  </div>
                  <div className="p-4 rounded-lg bg-orange-50 border border-orange-100 flex flex-col items-center">
                    <Thermometer className="text-orange-500 mb-2" />
                    <span className="text-xs font-medium text-orange-700">{t('dashboard.weatherSoilTemp')}</span>
                    <span className="text-lg font-bold">24°C</span>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 border border-green-100 flex flex-col items-center">
                    <Leaf className="text-green-500 mb-2" />
                    <span className="text-xs font-medium text-green-700">{t('dashboard.weatherSoilMoisture')}</span>
                    <span className="text-lg font-bold">68%</span>
                  </div>
                  <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100 flex flex-col items-center">
                    <Sun className="text-yellow-500 mb-2" />
                    <span className="text-xs font-medium text-yellow-700">{t('dashboard.weatherUVIndex')}</span>
                    <span className="text-lg font-bold">6.2 Low</span>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/10 border-l-4 border-secondary">
                  <h4 className="font-bold text-sm mb-2 uppercase tracking-wider text-secondary-foreground">{t('dashboard.weatherAIAdviceTitle')}</h4>
                  <p className="text-sm leading-relaxed">{advisory?.farmingTips}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {t('dashboard.criticalAlerts')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoadingWeather ? (
               <div className="flex items-center justify-center py-4">
                  <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
               </div>
            ) : advisory?.alerts.length ? (
              advisory.alerts.map((alert, idx) => (
                <div key={idx} className="flex gap-3 p-3 rounded-md bg-destructive/5 border border-destructive/20">
                  <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{alert}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No active threats detected.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-10" id="sales-chart">
        <CardHeader>
          <CardTitle>{t('dashboard.salesOverview')}</CardTitle>
          <CardDescription>{t('dashboard.salesDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="hsl(var(--primary))"
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="hsl(var(--secondary))"
                />
                <Tooltip
                  cursor={{ fill: 'hsla(var(--muted))' }}
                  contentStyle={{
                    background: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  yAxisId="left"
                  name="Revenue"
                  radius={4}
                />
                <Bar
                  dataKey="orders"
                  fill="var(--color-orders)"
                  yAxisId="right"
                  name="Orders"
                  radius={4}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

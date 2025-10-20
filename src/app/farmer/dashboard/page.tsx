
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
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          {t('dashboard.title')}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('dashboard.subtitle')}
        </p>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.totalOrders')}</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+185</div>
            <p className="text-xs text-muted-foreground">{t('dashboard.ordersLastMonth')}</p>
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
            <CardTitle className="text-sm font-medium">{t('dashboard.newCustomers')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+42</div>
            <p className="text-xs text-muted-foreground">{t('dashboard.organicTraffic')}</p>
          </CardContent>
        </Card>
      </div>

       <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <Card className="flex flex-col items-center justify-center text-center p-6 hover:bg-muted/50 transition-colors">
             <Package className="w-12 h-12 text-primary mb-4" />
             <h3 className="text-lg font-semibold font-headline">{t('profile.manageListingsButton')}</h3>
             <p className="text-sm text-muted-foreground mt-1 mb-4">{t('dashboard.manageListingsDesc')}</p>
             <Button asChild>
                <Link href="/farmer/listings">
                    <PlusCircle className="mr-2" />
                    {t('dashboard.manageListingsBtn')}
                </Link>
             </Button>
           </Card>
            <Card className="flex flex-col items-center justify-center text-center p-6 hover:bg-muted/50 transition-colors">
             <Leaf className="w-12 h-12 text-secondary mb-4" />
             <h3 className="text-lg font-semibold font-headline">{t('header.cropAdvisory')}</h3>
             <p className="text-sm text-muted-foreground mt-1 mb-4">{t('dashboard.cropAdvisoryDesc')}</p>
             <Button asChild variant="secondary">
                <Link href="/advisory">
                    {t('dashboard.getAdviceBtn')}
                </Link>
             </Button>
           </Card>
           <Card className="flex flex-col items-center justify-center text-center p-6 hover:bg-muted/50 transition-colors">
             <LineChart className="w-12 h-12 text-accent mb-4" />
             <h3 className="text-lg font-semibold font-headline">{t('dashboard.salesOverview')}</h3>
             <p className="text-sm text-muted-foreground mt-1 mb-4">{t('dashboard.salesAnalyticsDesc')}</p>
             <Button asChild variant="outline">
                <Link href="#sales-chart">
                    {t('dashboard.viewAnalyticsBtn')}
                </Link>
             </Button>
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

    

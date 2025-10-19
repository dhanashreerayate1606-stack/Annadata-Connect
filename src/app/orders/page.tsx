
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";

const orders = [
  {
    id: "ORD001",
    date: "2023-10-26",
    status: "Delivered",
    total: 136.50,
  },
  {
    id: "ORD002",
    date: "2023-10-22",
    status: "Delivered",
    total: 250.00,
  },
  {
    id: "ORD003",
    date: "2023-10-28",
    status: "Shipped",
    total: 99.00,
  },
   {
    id: "ORD004",
    date: "2023-10-29",
    status: "Processing",
    total: 192.00,
  },
];

const statusVariant = {
  Delivered: "secondary",
  Shipped: "default",
  Processing: "outline",
} as const;

export default function OrdersPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">{t('orders.title')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('orders.subtitle')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('orders.historyTitle')}</CardTitle>
          <CardDescription>{t('orders.historyDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">{t('orders.idColumn')}</TableHead>
                <TableHead>{t('orders.dateColumn')}</TableHead>
                <TableHead>{t('orders.statusColumn')}</TableHead>
                <TableHead className="text-right">{t('orders.totalColumn')}</TableHead>
                <TableHead className="text-right">{t('orders.actionsColumn')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[order.status as keyof typeof statusVariant]}>
                      {t(`orders.status${order.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      {t('orders.viewDetailsButton')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

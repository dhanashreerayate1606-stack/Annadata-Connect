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

const orders = [
  {
    id: "ORD001",
    date: "2023-10-26",
    status: "Delivered",
    total: 14.71,
  },
  {
    id: "ORD002",
    date: "2023-10-22",
    status: "Delivered",
    total: 25.50,
  },
  {
    id: "ORD003",
    date: "2023-10-28",
    status: "Shipped",
    total: 8.99,
  },
   {
    id: "ORD004",
    date: "2023-10-29",
    status: "Processing",
    total: 19.20,
  },
];

const statusVariant = {
  Delivered: "secondary",
  Shipped: "default",
  Processing: "outline",
} as const;

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">My Orders</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          View your order history and track current shipments.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A list of your recent orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[order.status as keyof typeof statusVariant]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Details
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

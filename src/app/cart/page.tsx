
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const initialCartItems = [
  {
    id: "tomatoes",
    name: "देसी टमाटर (Desi Tomato)",
    price: 40,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1591171551239-80a5eddd627a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxmcmVzaCUyMHRvbWF0b2VzfGVufDB8fHx8MTc2MDg3ODI5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "potatoes",
    name: "बटाटा (Potato)",
    price: 30,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1571771894821-35f15933a274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3RhdG9lc3xlbnwwfHx8fDE3NjA5Njc1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };
  
  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl font-bold tracking-tight text-center font-headline">Your Shopping Cart</h1>
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>₹{item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          className="w-20"
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                        />
                      </TableCell>
                      <TableCell>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                          <Trash2 className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <Button asChild className="w-full" size="lg" disabled={cartItems.length === 0}>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  email: z.string().email(),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  businessType: z.enum(["restaurant", "housing-society", "school", "other"]),
  requirements: z.string().min(20, { message: "Please describe your requirements in at least 20 characters." }),
});

export default function BulkOrdersPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      requirements: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Enquiry Submitted!",
      description: "Thank you for your interest. We will get back to you within 2 business days.",
    });
    form.reset();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Bulk & Corporate Orders
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Partner with us to source fresh, local produce for your business. We cater to restaurants, housing societies, schools, and more.
        </p>
      </div>
      
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Submit Your Enquiry</CardTitle>
          <CardDescription>Fill out the form below, and our team will contact you with a customized quote.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business/Society Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Grand Hotel or Harmony Apartments" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Business</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your business type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant / Cafe</SelectItem>
                          <SelectItem value="housing-society">Housing Society</SelectItem>
                          <SelectItem value="school">School / College</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Requirements</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about the produce you need, expected quantity, and frequency." {...field} />
                    </FormControl>
                    <FormDescription>
                      The more details you provide, the better we can assist you.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full sm:w-auto">Submit Enquiry</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
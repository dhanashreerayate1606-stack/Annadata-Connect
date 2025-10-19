
"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "@/hooks/use-translation";

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
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

const formSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  email: z.string().email(),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  businessType: z.enum(["restaurant", "housing-society", "school", "other"]),
  requirements: z.string().min(20, { message: "Please describe your requirements in at least 20 characters." }),
});

const heroImage = PlaceHolderImages.find(p => p.id === 'bulk-hero');

export default function BulkOrdersPage() {
  const { toast } = useToast();
  const { t } = useTranslation();

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
      title: t('bulk.toastSuccessTitle'),
      description: t('bulk.toastSuccessDescription'),
    });
    form.reset();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          {t('bulk.title')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t('bulk.subtitle')}
        </p>
      </div>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <Card>
          <CardHeader>
            <CardTitle>{t('bulk.formTitle')}</CardTitle>
            <CardDescription>{t('bulk.formDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('bulk.businessNameLabel')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('bulk.businessNamePlaceholder')} {...field} />
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
                        <FormLabel>{t('bulk.contactNameLabel')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('bulk.contactNamePlaceholder')} {...field} />
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
                        <FormLabel>{t('bulk.phoneLabel')}</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder={t('bulk.phonePlaceholder')} {...field} />
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
                      <FormLabel>{t('bulk.emailLabel')}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={t('bulk.emailPlaceholder')} {...field} />
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
                      <FormLabel>{t('bulk.businessTypeLabel')}</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('bulk.businessTypePlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="restaurant">{t('bulk.businessTypeRestaurant')}</SelectItem>
                            <SelectItem value="housing-society">{t('bulk.businessTypeHousing')}</SelectItem>
                            <SelectItem value="school">{t('bulk.businessTypeSchool')}</SelectItem>
                            <SelectItem value="other">{t('bulk.businessTypeOther')}</SelectItem>
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
                      <FormLabel>{t('bulk.requirementsLabel')}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t('bulk.requirementsPlaceholder')} {...field} />
                      </FormControl>
                      <FormDescription>
                        {t('bulk.requirementsDescription')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full sm:w-auto">{t('bulk.submitButton')}</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="sticky top-20">
          {heroImage && (
            <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
               <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

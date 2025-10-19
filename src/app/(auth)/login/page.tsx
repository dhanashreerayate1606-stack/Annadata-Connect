
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage, LANGUAGES } from "@/context/language-context";
import { useTranslation } from "@/hooks/use-translation";

export default function LoginPage() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-center text-primary-dark font-headline">{t('login.welcome')}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-auto border-0 gap-2">
                <Globe className="w-4 h-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Tabs defaultValue="consumer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="consumer">{t('login.consumer')}</TabsTrigger>
            <TabsTrigger value="farmer">{t('login.farmer')}</TabsTrigger>
          </TabsList>
          <TabsContent value="consumer">
            <Card>
              <CardHeader>
                <CardTitle>{t('login.consumerLogin')}</CardTitle>
                <CardDescription>
                  {t('login.consumerDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="c-email">{t('login.emailLabel')}</Label>
                  <Input id="c-email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-password">{t('login.passwordLabel')}</Label>
                  <Input id="c-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">{t('login.signIn')}</Button>
                 <div className="mt-4 text-center text-sm">
                  {t('login.noAccount')}{" "}
                  <Link href="/signup" className="underline">
                    {t('login.signUpLink')}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="farmer">
            <Card>
              <CardHeader>
                <CardTitle>{t('login.farmerLogin')}</CardTitle>
                <CardDescription>
                  {t('login.farmerDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="f-aadhaar">{t('login.aadhaarLabel')}</Label>
                  <Input id="f-aadhaar" placeholder="xxxx-xxxx-xxxx" required />
                </div>
                <Button type="submit" className="w-full">{t('login.sendOtp')}</Button>
                <div className="space-y-2">
                  <Label htmlFor="f-otp">{t('login.otpLabel')}</Label>
                  <Input id="f-otp" placeholder={t('login.otpPlaceholder')} required />
                </div>
                <Button type="submit" className="w-full">{t('login.loginWithOtp')}</Button>
                <div className="mt-4 text-center text-sm">
                  {t('login.notRegistered')}{" "}
                  <Link href="/signup" className="underline">
                    {t('login.registerLink')}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

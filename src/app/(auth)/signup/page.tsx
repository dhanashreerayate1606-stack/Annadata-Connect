
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useLanguage, LANGUAGES } from "@/context/language-context";
import { useTranslation } from "@/hooks/use-translation";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/firebase";

export default function SignupPage() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConsumerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({ title: "Signup Successful", description: "Your account has been created." });
      router.push('/');
    } catch (error: any) {
      setError(error.message);
      toast({ variant: "destructive", title: "Signup Failed", description: error.message });
    }
  };


  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-center font-headline">{t('signup.title')}</h2>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
            </div>
        </div>
        <Tabs defaultValue="consumer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="consumer">{t('signup.consumerTab')}</TabsTrigger>
            <TabsTrigger value="farmer">{t('signup.farmerTab')}</TabsTrigger>
          </TabsList>
          <TabsContent value="consumer">
            <Card>
              <CardHeader>
                <CardTitle>{t('signup.consumerTitle')}</CardTitle>
                <CardDescription>
                  {t('signup.consumerDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleConsumerSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="c-name">{t('signup.nameLabel')}</Label>
                    <Input id="c-name" placeholder={t('signup.namePlaceholder')} required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-email">{t('signup.emailLabel')}</Label>
                    <Input id="c-email" type="email" placeholder={t('signup.emailPlaceholder')} required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-password">{t('signup.passwordLabel')}</Label>
                    <Input id="c-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                   <div className="space-y-2">
                      <Label>{t('signup.languageLabel')}</Label>
                      <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger>
                              <SelectValue placeholder={t('signup.languagePlaceholder')} />
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
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full">{t('signup.createAccountButton')}</Button>
                  <div className="mt-4 text-center text-sm">
                    {t('signup.alreadyAccount')}{" "}
                    <Link href="/login" className="underline">
                      {t('signup.loginLink')}
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="farmer">
            <Card>
              <CardHeader>
                <CardTitle>{t('signup.farmerTitle')}</CardTitle>
                <CardDescription>
                  {t('signup.farmerDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="f-aadhaar">{t('signup.aadhaarLabel')}</Label>
                  <Input id="f-aadhaar" placeholder={t('signup.aadhaarPlaceholder')} required />
                </div>
                <Button type="submit" className="w-full">{t('signup.verifyButton')}</Button>
                <div className="mt-4 text-center text-sm">
                  {t('signup.alreadyRegistered')}{" "}
                  <Link href="/login" className="underline">
                    {t('signup.loginLink')}
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

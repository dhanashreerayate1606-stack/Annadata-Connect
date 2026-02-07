
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
import { Globe, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage, LANGUAGES } from "@/context/language-context";
import { useTranslation } from "@/hooks/use-translation";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/firebase";

export default function LoginPage() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();

  // Consumer Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Farmer Login State
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleConsumerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Login Successful", description: "Welcome back!" });
      router.push('/');
    } catch (error: any) {
      toast({ variant: "destructive", title: "Login Failed", description: error.message });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaar.length < 12) {
      toast({ 
        variant: "destructive", 
        title: "Invalid Aadhaar", 
        description: "Please enter a valid 12-digit Aadhaar number." 
      });
      return;
    }
    setIsOtpSent(true);
    toast({ 
      title: "OTP Sent", 
      description: "A 6-digit verification code has been sent to your Aadhaar-linked mobile. (Use 123456 for demo)" 
    });
  };

  const handleFarmerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '123456') {
      toast({ 
        variant: "destructive", 
        title: "Invalid OTP", 
        description: "The verification code you entered is incorrect." 
      });
      return;
    }

    setIsVerifying(true);
    try {
      await signInAnonymously(auth);
      toast({ title: "Login Successful", description: "Welcome to your Farmer Dashboard." });
      router.push('/farmer/dashboard');
    } catch (error: any) {
      toast({ variant: "destructive", title: "Authentication Error", description: error.message });
    } finally {
      setIsVerifying(false);
    }
  };

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
              <CardContent>
                <form onSubmit={handleConsumerLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="c-email">{t('login.emailLabel')}</Label>
                    <Input id="c-email" type="email" placeholder={t('login.emailPlaceholder')} required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-password">{t('login.passwordLabel')}</Label>
                    <Input id="c-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoggingIn}>
                    {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('login.signIn')}
                  </Button>
                   <div className="mt-4 text-center text-sm">
                    {t('login.noAccount')}{" "}
                    <Link href="/signup" className="underline">
                      {t('login.signUpLink')}
                    </Link>
                  </div>
                </form>
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
                {!isOtpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="f-aadhaar">{t('login.aadhaarLabel')}</Label>
                      <Input 
                        id="f-aadhaar" 
                        placeholder={t('login.aadhaarPlaceholder')} 
                        required 
                        maxLength={12}
                        value={aadhaar}
                        onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                    <Button type="submit" className="w-full">{t('login.sendOtp')}</Button>
                  </form>
                ) : (
                  <form onSubmit={handleFarmerLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="f-otp">{t('login.otpLabel')}</Label>
                      <Input 
                        id="f-otp" 
                        placeholder={t('login.otpPlaceholder')} 
                        required 
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isVerifying}>
                      {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {t('login.loginWithOtp')}
                    </Button>
                    <Button variant="ghost" onClick={() => setIsOtpSent(false)} className="w-full text-xs">
                      Change Aadhaar Number
                    </Button>
                  </form>
                )}
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

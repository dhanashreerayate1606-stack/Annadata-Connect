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

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-center text-primary-dark font-headline">Welcome Back</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Select defaultValue="en">
              <SelectTrigger className="w-auto border-0 gap-2">
                <Globe className="w-4 h-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Tabs defaultValue="consumer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="consumer">Consumer</TabsTrigger>
            <TabsTrigger value="farmer">Farmer</TabsTrigger>
          </TabsList>
          <TabsContent value="consumer">
            <Card>
              <CardHeader>
                <CardTitle>Consumer Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="c-email">Email</Label>
                  <Input id="c-email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-password">Password</Label>
                  <Input id="c-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">Sign In</Button>
                 <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline">
                    Sign up
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="farmer">
            <Card>
              <CardHeader>
                <CardTitle>Farmer Login</CardTitle>
                <CardDescription>
                  Login using your Aadhaar and OTP.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="f-aadhaar">Aadhaar Number</Label>
                  <Input id="f-aadhaar" placeholder="xxxx-xxxx-xxxx" required />
                </div>
                <Button type="submit" className="w-full">Send OTP</Button>
                <div className="space-y-2">
                  <Label htmlFor="f-otp">OTP</Label>
                  <Input id="f-otp" placeholder="Enter 6-digit OTP" required />
                </div>
                <Button type="submit" className="w-full">Login with OTP</Button>
                <div className="mt-4 text-center text-sm">
                  Not registered yet?{" "}
                  <Link href="/signup" className="underline">
                    Register here
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
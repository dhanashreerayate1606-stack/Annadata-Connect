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
import { Globe, Mic } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-center font-headline">Join Annadata Connect</h2>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Button variant="outline" size="icon" aria-label="Voice Assistant">
                    <Mic className="h-5 w-5" />
                </Button>
            </div>
        </div>
        <Tabs defaultValue="consumer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="consumer">As a Consumer</TabsTrigger>
            <TabsTrigger value="farmer">As a Farmer</TabsTrigger>
          </TabsList>
          <TabsContent value="consumer">
            <Card>
              <CardHeader>
                <CardTitle>Consumer Registration</CardTitle>
                <CardDescription>
                  Create an account to buy fresh produce.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="c-name">Full Name</Label>
                  <Input id="c-name" placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-email">Email</Label>
                  <Input id="c-email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-password">Password</Label>
                  <Input id="c-password" type="password" required />
                </div>
                 <div className="space-y-2">
                    <Label>Preferred Language</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select language" />
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
                <Button type="submit" className="w-full">Create Account</Button>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline">
                    Log in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="farmer">
            <Card>
              <CardHeader>
                <CardTitle>Farmer Registration</CardTitle>
                <CardDescription>
                  Register with your Aadhaar to sell your produce.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="f-aadhaar">Aadhaar Number</Label>
                  <Input id="f-aadhaar" placeholder="xxxx-xxxx-xxxx" required />
                </div>
                <Button type="submit" className="w-full">Verify with OTP</Button>
                <div className="mt-4 text-center text-sm">
                  Already registered?{" "}
                  <Link href="/login" className="underline">
                    Log in
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

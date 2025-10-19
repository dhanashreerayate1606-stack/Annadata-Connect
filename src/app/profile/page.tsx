
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Edit, History, Star, Package, LineChart } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const consumer = {
  name: "Radhika Sharma",
  email: "radhika.sharma@example.com",
  avatar: "https://picsum.photos/seed/profile-avatar/200",
  location: "Pune, Maharashtra",
  type: "Consumer",
  joinDate: "2025",
};

const farmer = {
  name: "Suresh Patil",
  email: "suresh.patil@example.com",
  avatar: "https://picsum.photos/seed/farmer1/200",
  location: "Nashik, Maharashtra",
  type: "Farmer",
  joinDate: "June 2023",
  rating: 4.8,
  totalSales: 150,
  produce: ["Tomatoes", "Onions", "Grapes"],
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <Tabs defaultValue="consumer" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="consumer">Consumer View</TabsTrigger>
          <TabsTrigger value="farmer">Farmer View</TabsTrigger>
        </TabsList>

        <TabsContent value="consumer">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                <AvatarImage src={consumer.avatar} alt={consumer.name} />
                <AvatarFallback>{consumer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-3xl font-headline">{consumer.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                {consumer.type}
                <Separator orientation="vertical" className="h-4 mx-2" />
                <MapPin className="w-4 h-4" />
                {consumer.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">Member since {consumer.joinDate}</p>
              </div>
              <Separator />
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-background">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <User className="w-5 h-5 text-primary"/>
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>Name:</strong> {consumer.name}</p>
                        <p><strong>Email:</strong> {consumer.email}</p>
                        <p><strong>Location:</strong> {consumer.location}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                            <Edit className="w-4 h-4 mr-2"/>
                            Edit Profile
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="bg-background">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <History className="w-5 h-5 text-primary"/>
                            Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>Total Orders:</strong> 5</p>
                        <p><strong>Reviews Written:</strong> 2</p>
                        <p><strong>Products Favorited:</strong> 8</p>
                        <Button asChild variant="outline" size="sm" className="mt-2">
                            <Link href="/orders">
                                <History className="w-4 h-4 mr-2"/>
                                View Order History
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="farmer">
          <Card>
             <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-secondary">
                <AvatarImage src={farmer.avatar} alt={farmer.name} />
                <AvatarFallback>{farmer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-3xl font-headline">{farmer.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                {farmer.type}
                <Separator orientation="vertical" className="h-4 mx-2" />
                <MapPin className="w-4 h-4" />
                {farmer.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">Member since {farmer.joinDate}</p>
              </div>
              <Separator />
               <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-background">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <Star className="w-5 h-5 text-accent"/>
                            Reputation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>Rating:</strong> {farmer.rating} / 5.0</p>
                        <p><strong>Total Sales:</strong> {farmer.totalSales}</p>
                        <p><strong>Member Since:</strong> {farmer.joinDate}</p>
                    </CardContent>
                </Card>
                <Card className="bg-background">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <Package className="w-5 h-5 text-primary"/>
                            My Produce
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <ul className="list-disc list-inside">
                           {farmer.produce.map(p => <li key={p}>{p}</li>)}
                        </ul>
                         <Button variant="outline" size="sm" className="mt-2">
                            <Edit className="w-4 h-4 mr-2"/>
                            Manage Listings
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="bg-background">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <LineChart className="w-5 h-5 text-secondary"/>
                            Sales Analytics
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                       <p>View your sales trends, top products, and earnings.</p>
                       <Button variant="secondary" size="sm" className="mt-2">
                            <LineChart className="w-4 h-4 mr-2"/>
                            View Dashboard
                        </Button>
                    </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

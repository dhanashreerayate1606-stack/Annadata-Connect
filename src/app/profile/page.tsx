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
import { User, MapPin, Edit, History } from "lucide-react";
import Link from "next/link";

const user = {
  name: "Radhika Sharma",
  email: "radhika.sharma@example.com",
  avatar: "https://picsum.photos/seed/profile-avatar/200",
  location: "Pune, Maharashtra",
  type: "Consumer",
  joinDate: "October 2023",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-headline">{user.name}</CardTitle>
          <CardDescription className="flex items-center justify-center gap-2">
            <User className="w-4 h-4" />
            {user.type}
            <Separator orientation="vertical" className="h-4 mx-2" />
            <MapPin className="w-4 h-4" />
            {user.location}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
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
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Location:</strong> {user.location}</p>
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
    </div>
  );
}

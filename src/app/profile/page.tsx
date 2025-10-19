
"use client";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";

const initialConsumer = {
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
  const { t } = useTranslation();
  const [consumer, setConsumer] = useState(initialConsumer);
  const [editedName, setEditedName] = useState(consumer.name);
  const [editedLocation, setEditedLocation] = useState(consumer.location);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProfileSave = () => {
    setConsumer({ ...consumer, name: editedName, location: editedLocation });
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <Tabs defaultValue="consumer" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="consumer">{t('profile.consumerTab')}</TabsTrigger>
          <TabsTrigger value="farmer">{t('profile.farmerTab')}</TabsTrigger>
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
                {t('profile.consumerType')}
                <Separator orientation="vertical" className="h-4 mx-2" />
                <MapPin className="w-4 h-4" />
                {consumer.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">{t('profile.memberSince')} {consumer.joinDate}</p>
              </div>
              <Separator />
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-background">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <User className="w-5 h-5 text-primary"/>
                            {t('profile.personalInfoTitle')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>{t('profile.infoName')}:</strong> {consumer.name}</p>
                        <p><strong>{t('profile.infoEmail')}:</strong> {consumer.email}</p>
                        <p><strong>{t('profile.infoLocation')}:</strong> {consumer.location}</p>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="mt-2">
                                <Edit className="w-4 h-4 mr-2"/>
                                {t('profile.editProfileButton')}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{t('profile.dialogEditTitle')}</DialogTitle>
                              <DialogDescription>
                                {t('profile.dialogEditDescription')}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">{t('profile.infoName')}</Label>
                                <Input id="name" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="location" className="text-right">{t('profile.infoLocation')}</Label>
                                <Input id="location" value={editedLocation} onChange={(e) => setEditedLocation(e.target.value)} className="col-span-3" />
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">{t('profile.dialogCancelButton')}</Button>
                              </DialogClose>
                              <Button type="button" onClick={handleProfileSave}>{t('profile.dialogSaveButton')}</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
                 <Card className="bg-background">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <History className="w-5 h-5 text-primary"/>
                            {t('profile.activityTitle')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>{t('profile.activityOrders')}:</strong> 5</p>
                        <p><strong>{t('profile.activityReviews')}:</strong> 2</p>
                        <p><strong>{t('profile.activityFavorites')}:</strong> 8</p>
                        <Button asChild variant="outline" size="sm" className="mt-2">
                            <Link href="/orders">
                                <History className="w-4 h-4 mr-2"/>
                                {t('profile.viewHistoryButton')}
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
                {t('profile.farmerType')}
                <Separator orientation="vertical" className="h-4 mx-2" />
                <MapPin className="w-4 h-4" />
                {farmer.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">{t('profile.memberSince')} {farmer.joinDate}</p>
              </div>
              <Separator />
               <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-background">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <Star className="w-5 h-5 text-accent"/>
                            {t('profile.reputationTitle')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>{t('profile.reputationRating')}:</strong> {farmer.rating} / 5.0</p>
                        <p><strong>{t('profile.reputationSales')}:</strong> {farmer.totalSales}</p>
                        <p><strong>{t('profile.memberSince')}:</strong> {farmer.joinDate}</p>
                    </CardContent>
                </Card>
                <Card className="bg-background">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <Package className="w-5 h-5 text-primary"/>
                            {t('profile.produceTitle')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <ul className="list-disc list-inside">
                           {farmer.produce.map(p => <li key={p}>{p}</li>)}
                        </ul>
                         <Button asChild variant="outline" size="sm" className="mt-2">
                            <Link href="/farmer/listings">
                                <Edit className="w-4 h-4 mr-2"/>
                                {t('profile.manageListingsButton')}
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="bg-background">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <LineChart className="w-5 h-5 text-secondary"/>
                            {t('profile.analyticsTitle')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                       <p>{t('profile.analyticsDescription')}</p>
                       <Button asChild variant="secondary" size="sm" className="mt-2">
                           <Link href="/farmer/dashboard">
                                <LineChart className="w-4 h-4 mr-2"/>
                                {t('profile.viewDashboardButton')}
                           </Link>
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

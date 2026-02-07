'use client';

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
import { User, MapPin, Edit, History, Star, Package, LineChart, Wallet, Loader2 } from "lucide-react";
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
import { useWallet } from "@/context/wallet-context";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import TransactionHistory from "@/components/transaction-history";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

const ProfilePageClient = () => {
  const { t } = useTranslation();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { balance, transactions } = useWallet();

  // Load secure data from Firestore
  const consumerRef = useMemoFirebase(() => user ? doc(firestore, 'consumers', user.uid) : null, [user, firestore]);
  const { data: consumerData, isLoading: isConsumerLoading } = useDoc(consumerRef);

  const farmerRef = useMemoFirebase(() => user ? doc(firestore, 'farmers', user.uid) : null, [user, firestore]);
  const { data: farmerData, isLoading: isFarmerLoading } = useDoc(farmerRef);

  const [editedName, setEditedName] = useState('');
  const [editedLocation, setEditedLocation] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProfileSave = () => {
    if (!user) return;
    const ref = consumerData ? consumerRef : farmerRef;
    if (ref) {
      setDocumentNonBlocking(ref, {
        name: editedName || (consumerData?.name || farmerData?.name),
        address: editedLocation || (consumerData?.address || farmerData?.address),
      }, { merge: true });
    }
    setIsDialogOpen(false);
  };

  if (isUserLoading || isConsumerLoading || isFarmerLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Fallback for demo users who haven't registered in Firestore yet
  const profile = consumerData || farmerData || {
    name: user?.displayName || "Guest User",
    email: user?.email || "No email linked",
    address: "Location not set",
    joinDate: "2025",
    type: farmerData ? 'Farmer' : 'Consumer'
  };

  return (
      <Tabs defaultValue={farmerData ? "farmer" : "consumer"} className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="consumer">{t('profile.consumerTab')}</TabsTrigger>
          <TabsTrigger value="farmer">{t('profile.farmerTab')}</TabsTrigger>
        </TabsList>

        <TabsContent value="consumer">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                <AvatarImage src={`https://picsum.photos/seed/${user?.uid}/200/200`} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-3xl font-headline">{profile.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                {t('profile.consumerType')}
                <Separator orientation="vertical" className="h-4 mx-2" />
                <MapPin className="w-4 h-4" />
                {profile.address || "No address set"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">{t('profile.memberSince')} {profile.joinDate}</p>
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
                        <p><strong>{t('profile.infoName')}:</strong> {profile.name}</p>
                        <p><strong>{t('profile.infoEmail')}:</strong> {profile.email}</p>
                        <p><strong>{t('profile.infoLocation')}:</strong> {profile.address}</p>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="mt-2" onClick={() => {
                              setEditedName(profile.name);
                              setEditedLocation(profile.address);
                            }}>
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
                        <p><strong>{t('profile.activityOrders')}:</strong> 0</p>
                        <p><strong>{t('profile.activityReviews')}:</strong> 0</p>
                        <p><strong>{t('profile.activityFavorites')}:</strong> 0</p>
                        <Button asChild variant="outline" size="sm" className="mt-2">
                            <Link href="/orders">
                                <History className="w-4 h-4 mr-2"/>
                                {t('profile.viewHistoryButton')}
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="bg-background col-span-1 sm:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <Wallet className="w-5 h-5 text-primary"/>
                            My Wallet
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-muted-foreground">Current Balance</span>
                            <span className="text-2xl font-bold">₹{balance.toFixed(2)}</span>
                        </div>
                        <TransactionHistory transactions={transactions} />
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
                <AvatarImage src={`https://picsum.photos/seed/${user?.uid}-farmer/200/200`} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-3xl font-headline">{profile.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                {t('profile.farmerType')}
                <Separator orientation="vertical" className="h-4 mx-2" />
                <MapPin className="w-4 h-4" />
                {profile.address || "Address hidden for privacy"}
              </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">{t('profile.memberSince')} {profile.joinDate}</p>
              </div>
              <Separator />
               <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-background">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <Star className="w-5 h-5 text-accent"/>
                            {t('profile.reputationTitle')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <p><strong>{t('profile.reputationRating')}:</strong> {farmerData?.rating || "New"} / 5.0</p>
                        <p><strong>{t('profile.reputationSales')}:</strong> {farmerData?.totalSales || 0}</p>
                        <p><strong>{t('profile.memberSince')}:</strong> {profile.joinDate}</p>
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
                           {(farmerData?.produce || ["No active listings"]).map((p: string) => <li key={p}>{p}</li>)}
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
                <Card className="bg-background col-span-1 sm:col-span-2 lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-headline">
                            <Wallet className="w-5 h-5 text-primary"/>
                            My Wallet
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-muted-foreground">Current Balance</span>
                            <span className="text-2xl font-bold">₹{balance.toFixed(2)}</span>
                        </div>
                        <TransactionHistory transactions={transactions} />
                    </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
  );
}


export default function ProfilePage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16">
            <ProfilePageClient />
        </div>
    )
}
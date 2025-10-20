
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Award, Star, Shield, Trophy } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const leaderboard = [
  {
    rank: 1,
    name: 'Suresh Patil',
    produce: '5,000 kg',
    avatar: 'https://picsum.photos/seed/farmer1/100/100',
  },
  {
    rank: 2,
    name: 'Meena Kumari',
    produce: '4,800 kg',
    avatar: 'https://picsum.photos/seed/farmer2/100/100',
  },
  {
    rank: 3,
    name: 'Rajesh Singh',
    produce: '4,500 kg',
    avatar: 'https://picsum.photos/seed/farmer3/100/100',
  },
  {
    rank: 4,
    name: 'Anita Devi',
    produce: '4,200 kg',
    avatar: 'https://picsum.photos/seed/farmer4/100/100',
  },
  {
    rank: 5,
    name: 'Vikram Reddy',
    produce: '4,000 kg',
    avatar: 'https://picsum.photos/seed/farmer5/100/100',
  },
];

const badges = [
  {
    name: 'badgeFirstSale',
    description: 'badgeFirstSaleDescription',
    icon: Star,
  },
  {
    name: 'badgeOrganic',
    description: 'badgeOrganicDescription',
    icon: Shield,
  },
  {
    name: 'badgeCommunityChoice',
    description: 'badgeCommunityChoiceDescription',
    icon: Award,
  },
  {
    name: 'badgeTopPerformer',
    description: 'badgeTopPerformerDescription',
    icon: Trophy,
  },
];

export default function CommunityPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          {t('community.title')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {t('community.subtitle')}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('community.leaderboardTitle')}</CardTitle>
              <CardDescription>
                {t('community.leaderboardDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {leaderboard.map(farmer => (
                  <li
                    key={farmer.rank}
                    className="flex items-center gap-4 p-2 rounded-md transition-colors hover:bg-muted"
                  >
                    <div className="text-2xl font-bold text-primary w-8 text-center">
                      {farmer.rank}
                    </div>
                    <Avatar>
                      <AvatarImage src={farmer.avatar} alt={farmer.name} />
                      <AvatarFallback>{farmer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <p className="font-semibold">{farmer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Total Produce: {farmer.produce}
                      </p>
                    </div>
                    {farmer.rank === 1 && (
                      <Trophy className="w-6 h-6 text-yellow-500" />
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('community.badgesTitle')}</CardTitle>
              <CardDescription>
                {t('community.badgesDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {badges.map(badge => (
                <div key={badge.name} className="flex items-start gap-4">
                  <div className="p-2 bg-secondary/10 rounded-full">
                    <badge.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {t(`community.${badge.name}`)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t(`community.${badge.description}`)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    

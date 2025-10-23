
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Award, Star, Shield, Trophy, MessageSquare, ThumbsUp } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';

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

const initialCommunityPosts = [
    {
        id: 1,
        author: "Meena Kumari",
        avatar: "https://picsum.photos/seed/farmer2/100/100",
        timestamp: "2 hours ago",
        content: "Has anyone tried the new organic pesticide for tomato crops? Seeing some good results on my farm in Sangli. Would love to hear other experiences.",
        likes: 12,
        comments: 3,
    },
    {
        id: 2,
        author: "Rajesh Singh",
        avatar: "https://picsum.photos/seed/farmer3/100/100",
        timestamp: "1 day ago",
        content: "The weather forecast predicts heavy rains in the Nashik region next week. Make sure to check your drainage systems to avoid waterlogging!",
        likes: 25,
        comments: 7,
    }
];

export default function CommunityPage() {
  const { t } = useTranslation();
  const [communityPosts, setCommunityPosts] = useState(initialCommunityPosts);
  const [newPostContent, setNewPostContent] = useState("");

  const handlePostSubmit = () => {
    if (newPostContent.trim() === "") return;

    const newPost = {
      id: communityPosts.length + 1,
      author: "You",
      avatar: "https://picsum.photos/seed/profile-avatar/200/200",
      timestamp: "Just now",
      content: newPostContent,
      likes: 0,
      comments: 0,
    };

    setCommunityPosts([newPost, ...communityPosts]);
    setNewPostContent("");
  };

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
        <div className="lg:col-span-2 space-y-8">
           <Card>
            <CardHeader>
              <CardTitle>Community Feed</CardTitle>
              <CardDescription>Ask questions, share advice, and connect with fellow farmers.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/profile-avatar/200/200" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="w-full">
                       <Textarea 
                         placeholder="What's on your mind, farmer?" 
                         value={newPostContent}
                         onChange={(e) => setNewPostContent(e.target.value)}
                       />
                       <Button className="mt-2" onClick={handlePostSubmit}>Post to Community</Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 items-start">
               {communityPosts.map(post => (
                   <div key={post.id} className="flex gap-4 w-full border-t pt-4">
                       <Avatar>
                           <AvatarImage src={post.avatar} alt={post.author} />
                           <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                       </Avatar>
                       <div className="flex-grow">
                           <div className="flex items-center gap-2">
                               <p className="font-semibold">{post.author}</p>
                               <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                           </div>
                           <p className="mt-1 text-sm">{post.content}</p>
                           <div className="mt-2 flex items-center gap-4 text-muted-foreground">
                               <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                   <ThumbsUp className="h-4 w-4" /> {post.likes}
                               </Button>
                               <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                   <MessageSquare className="h-4 w-4" /> {post.comments}
                               </Button>
                           </div>
                       </div>
                   </div>
               ))}
            </CardFooter>
          </Card>
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
                      <Link href="/profile" className="font-semibold hover:underline">{farmer.name}</Link>
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

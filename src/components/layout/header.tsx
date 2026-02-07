
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, User, Leaf, BookOpen, Tractor, Users, Handshake, Landmark, Globe, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/icons/logo";
import { cn } from "@/lib/utils";
import { useLanguage, LANGUAGES } from "@/context/language-context";
import { useTranslation } from "@/hooks/use-translation";


const Header = () => {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const navLinks = [
    { href: "/", label: t('header.marketplace'), icon: Tractor },
    { href: "/advisory", label: t('header.cropAdvisory'), icon: Leaf },
    { href: "/learning-hub", label: t('header.learningHub'), icon: BookOpen },
    { href: "/community", label: t('header.community'), icon: Users },
    { href: "/bulk-orders", label: t('header.bulkOrders'), icon: Handshake },
    { href: "/schemes", label: t('header.govtSchemes'), icon: Landmark },
    { href: "/about", label: t('header.about'), icon: Info },
  ];

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === link.href ? "text-primary font-bold" : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold sm:inline-block font-headline">
              Annadata Connect
            </span>
          </Link>
          <NavLinks />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Logo />
              <span className="font-bold font-headline">Annadata Connect</span>
            </Link>
            <div className="mt-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                 <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent",
                      pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search bar can be added here if needed globally */}
          </div>
          <nav className="flex items-center">
            <div className="hidden md:flex">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-auto border-0 gap-2 text-sm text-muted-foreground">
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

            <Button asChild variant="ghost" size="icon">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link href="/profile">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
             <Button asChild size="sm" className="ml-2">
              <Link href="/login">{t('header.login')}</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

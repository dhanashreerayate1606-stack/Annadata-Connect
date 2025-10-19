import Link from "next/link";
import Logo from "@/components/icons/logo";
import { Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-lg font-bold text-foreground font-headline">Annadata Connect</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm">
              Empowering farmers and providing consumers with fresh, local produce.
            </p>
            <div className="mt-8 flex space-x-6">
              <Link href="#" className="hover:text-primary"><Facebook /></Link>
              <Link href="#" className="hover:text-primary"><Instagram /></Link>
              <Link href="#" className="hover:text-primary"><Twitter /></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-foreground font-headline">Company</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="#" className="hover:text-primary">About</Link>
                <Link href="#" className="hover:text-primary">Careers</Link>
                <Link href="#" className="hover:text-primary">Press</Link>
              </nav>
            </div>
            <div>
              <p className="font-medium text-foreground font-headline">Marketplace</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="/" className="hover:text-primary">Vegetables</Link>
                <Link href="/" className="hover:text-primary">Fruits</Link>
                <Link href="/" className="hover:text-primary">Grains</Link>
              </nav>
            </div>
            <div>
              <p className="font-medium text-foreground font-headline">Support</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="#" className="hover:text-primary">Contact</Link>
                <Link href="#" className="hover:text-primary">FAQs</Link>
                <Link href="#" className="hover:text-primary">Shipping & Returns</Link>
              </nav>
            </div>
            <div>
              <p className="font-medium text-foreground font-headline">Legal</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm">
                <Link href="#" className="hover:text-primary">Terms of Service</Link>
                <Link href="#" className="hover:text-primary">Privacy Policy</Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Annadata Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

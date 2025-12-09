import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full border-b bg-zinc-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          Sonus
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-orange-500 focus:bg-white/10 focus:text-orange-500 focus:outline-none"
                >
                  HOME
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/headphones"
                  className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-orange-500 focus:bg-white/10 focus:text-orange-500 focus:outline-none"
                >
                  HEADPHONES
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/speakers"
                  className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-orange-500 focus:bg-white/10 focus:text-orange-500 focus:outline-none"
                >
                  SPEAKERS
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/earphones"
                  className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-orange-500 focus:bg-white/10 focus:text-orange-500 focus:outline-none"
                >
                  EARPHONES
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Cart Icon */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Shopping cart"
          className="text-white hover:text-orange-500 hover:bg-white/10 cursor-pointer"
        >
          <ShoppingCart className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}

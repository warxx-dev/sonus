"use client";

import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const navigationItems = [
  { name: "HOME", href: "/" },
  { name: "PRODUCTS", href: "/products" },
  { name: "FAVORITES", href: "/favorites" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="mx-auto w-full bg-zinc-900 text-white">
      <div className="mx-auto flex items-center border-b border-zinc-600 justify-between px-6 py-4 max-w-7xl">
        {/* Mobile Menu Button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="bg-transparent text-white hover:bg-white/10 hover:text-orange-500"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-zinc-900 text-white pl-12">
            <SheetHeader>
              <SheetTitle className="text-left text-white">Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium uppercase tracking-wider transition-colors hover:text-orange-500"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          Sonus
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:text-orange-500 focus:bg-transparent focus:text-orange-500 hover:bg-transparent focus:outline-none"
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Cart Button */}
        <Button
          size="icon"
          aria-label="Shopping cart"
          className="cursor-pointer bg-transparent text-white hover:bg-white/10 hover:text-orange-500"
        >
          <ShoppingCart className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}

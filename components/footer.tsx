import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

const navigation = [
  { name: "HOME", href: "/" },
  { name: "HEADPHONES", href: "/headphones" },
  { name: "SPEAKERS", href: "/speakers" },
  { name: "EARPHONES", href: "/earphones" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full bg-zinc-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top section - Logo and Navigation */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide">
            Sonus
          </Link>

          {/* Navigation */}
          <nav className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium uppercase tracking-wider transition-colors hover:text-orange-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Middle section - Description and Social */}
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row">
          {/* Description */}
          <div className="max-w-xl">
            <p className="text-sm leading-relaxed text-zinc-400">
              Sonus is an all in one stop to fulfill your audio needs.
              We&apos;re a small team of music lovers and sound specialists who
              are devoted to helping you get the most out of personal audio.
              Come and visit our demo facility - we&apos;re open 7 days a week.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-start gap-4 lg:items-center">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="transition-colors hover:text-orange-600"
                aria-label={social.name}
              >
                <social.icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom section - Copyright */}
        <div className="text-sm text-zinc-400">
          Copyright 2025. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

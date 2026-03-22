import { GithubIcon, LinkedinIcon } from '@/public/icons'
import Link from 'next/link'

const socialLinks = [
  { name: 'Github', icon: GithubIcon, href: 'https://github.com/warxx-dev' },
  {
    name: 'LinkedIn',
    icon: LinkedinIcon,
    href: 'https://www.linkedin.com/in/walter-carrazana-03091335a/',
  },
]

export function Footer() {
  return (
    <footer className="w-full bg-zinc-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <Link href="/" className="text-2xl font-bold tracking-wide">
            audiophile
          </Link>
        </div>

        {/* Middle section - Description and Social */}
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row">
          {/* Description */}
          <div className="max-w-xl">
            <p className="text-sm leading-relaxed text-zinc-400">
              Sonus is an all in one stop to fulfill your audio needs. We&apos;re a small team of
              music lovers and sound specialists who are devoted to helping you get the most out of
              personal audio. Come and visit our demo facility - we&apos;re open 7 days a week.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-start gap-4 lg:items-center">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                className="transition-colors hover:text-orange-600"
                aria-label={social.name}
              >
                <social.icon />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom section - Copyright */}
        <div className="text-sm text-zinc-400">Copyright 2025. All Rights Reserved</div>
      </div>
    </footer>
  )
}

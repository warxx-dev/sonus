'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface SeeProductButtonProps {
  href: string
  className?: string
  children?: React.ReactNode
}

export function SeeProductButton({ href, className, children = 'SEE PRODUCT' }: SeeProductButtonProps) {
  const [loading, setLoading] = useState(false)

  return (
    <Link href={href}>
      <Button
        size="lg"
        disabled={loading}
        className={className}
        onClick={() => setLoading(true)}
      >
        {loading ? 'LOADING...' : children}
      </Button>
    </Link>
  )
}

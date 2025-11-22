import * as React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div'
}

export function Section({
  className,
  children,
  as: Component = 'section',
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn('py-12 md:py-16 lg:py-20', className)}
      {...props}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </Component>
  )
}


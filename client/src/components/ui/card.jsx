import { cn } from '@/lib/utils'

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn('bg-[#13151f] rounded-xl border border-gray-700/50 hover:border-yellow-500/50 transition-colors', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-700/50', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h2 className={cn('text-lg font-semibold text-white', className)} {...props}>
      {children}
    </h2>
  )
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
}

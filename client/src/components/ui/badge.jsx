import { cn } from '@/lib/utils'

const statusStyles = {
  active: 'bg-green-500/10 text-green-400 border border-green-500/20',
  completed: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  archived: 'bg-gray-500/10 text-gray-400 border border-gray-500/20',
}

export function Badge({ children, status, className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status] || 'bg-gray-500/10 text-gray-400',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

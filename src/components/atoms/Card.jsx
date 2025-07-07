import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Card = forwardRef(({ 
  className, 
  children, 
  variant = 'default',
  ...props 
}, ref) => {
const variants = {
    default: 'bg-white shadow-card',
    surface: 'bg-surface shadow-subtle',
    elevated: 'bg-white shadow-elevated',
    gradient: 'bg-gradient-to-br from-white to-purple-50 shadow-lg border-purple-100'
  }

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-gray-100 p-6 transition-all duration-150',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card
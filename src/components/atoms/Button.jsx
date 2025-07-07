import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  disabled,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-600 active:bg-blue-700',
    secondary: 'bg-secondary text-white hover:bg-purple-600 active:bg-purple-700',
    accent: 'bg-accent text-white hover:bg-red-600 active:bg-red-700',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200',
    surface: 'bg-surface text-gray-900 hover:bg-gray-200 active:bg-gray-300'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-all duration-150',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transform hover:scale-[1.02] active:scale-[0.98]',
        'shadow-sm hover:shadow-md',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button
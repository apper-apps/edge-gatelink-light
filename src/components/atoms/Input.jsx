import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Input = forwardRef(({ 
  className, 
  type = 'text', 
  size = 'md',
  error,
  ...props 
}, ref) => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  }

  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'w-full rounded-md border border-gray-300 bg-white transition-all duration-150',
        'focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20',
        'placeholder:text-gray-400',
        'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
        error && 'border-error focus:border-error focus:ring-error',
        sizes[size],
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input
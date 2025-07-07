import { useState } from 'react'
import { cn } from '@/utils/cn'

const StatusToggle = ({ 
  enabled = false, 
  onChange, 
  size = 'md',
  disabled = false
}) => {
  const [isEnabled, setIsEnabled] = useState(enabled)

  const handleToggle = () => {
    if (disabled) return
    const newValue = !isEnabled
    setIsEnabled(newValue)
    onChange?.(newValue)
  }

  const sizes = {
    sm: 'w-8 h-5',
    md: 'w-10 h-6',
    lg: 'w-12 h-7'
  }

  const thumbSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled}
      className={cn(
        'relative inline-flex rounded-full transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        isEnabled ? 'bg-primary' : 'bg-gray-200',
        sizes[size]
      )}
    >
      <span
        className={cn(
          'inline-block rounded-full bg-white shadow-sm transition-transform duration-200',
          'transform',
          isEnabled ? 'translate-x-5' : 'translate-x-1',
          thumbSizes[size],
          size === 'sm' && (isEnabled ? 'translate-x-4' : 'translate-x-0.5'),
          size === 'lg' && (isEnabled ? 'translate-x-6' : 'translate-x-1'),
          'mt-0.5'
        )}
      />
    </button>
  )
}

export default StatusToggle
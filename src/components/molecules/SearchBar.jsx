import { useState } from 'react'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  className,
  size = 'md'
}) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
    // Trigger search on every change for real-time search
    onSearch?.(e.target.value)
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  }

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={20}
        />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          className={cn(
            'w-full pl-10 pr-4 rounded-md border border-gray-300 bg-white transition-all duration-150',
            'focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20',
            'placeholder:text-gray-400',
            sizes[size]
          )}
        />
      </div>
    </form>
  )
}

export default SearchBar
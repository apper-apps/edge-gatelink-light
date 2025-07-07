import { useState } from 'react'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'

const Header = ({ onMenuToggle, className }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query)
    // Implement search logic here
  }

  return (
    <header className={cn(
      'bg-white border-b border-gray-200 px-6 py-4',
      'flex items-center justify-between',
      className
    )}>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuToggle}
          className="lg:hidden"
        >
          <ApperIcon name="Menu" size={20} />
        </Button>
        
        <div className="hidden md:block">
          <SearchBar 
            placeholder="Search links, forms, submissions..." 
            onSearch={handleSearch}
            className="w-96"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">
          <ApperIcon name="Bell" size={20} />
        </Button>
        
        <Button variant="ghost" size="sm">
          <ApperIcon name="Settings" size={20} />
        </Button>
        
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <ApperIcon name="User" size={16} className="text-white" />
        </div>
      </div>
    </header>
  )
}

export default Header
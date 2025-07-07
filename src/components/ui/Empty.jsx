import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  icon = 'FileText',
  title = 'No items found',
  description = 'Get started by creating your first item.',
  actionLabel = 'Create New',
  onAction,
  className
}) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center p-12 text-center',
      className
    )}>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} size={32} className="text-gray-400" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <Button onClick={onAction} variant="primary">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default Empty
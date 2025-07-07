import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  className,
  color = 'primary'
}) => {
  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error'
  }

  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-gray-500'
  }

  const trendIcons = {
    up: 'TrendingUp',
    down: 'TrendingDown',
    neutral: 'Minus'
  }

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {trend && (
            <div className="flex items-center gap-1">
              <ApperIcon 
                name={trendIcons[trend]} 
                size={16} 
                className={trendColors[trend]} 
              />
              <span className={cn('text-sm font-medium', trendColors[trend])}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-full bg-gray-50', colors[color])}>
          <ApperIcon name={icon} size={24} />
        </div>
      </div>
    </Card>
  )
}

export default MetricCard
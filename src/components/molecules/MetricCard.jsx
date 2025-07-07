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
    <Card variant="gradient" className={cn('p-6 relative overflow-hidden', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-700 mb-2">{title}</p>
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
        <div className={cn('p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-lg', colors[color])}>
          <ApperIcon name={icon} size={28} />
        </div>
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-400 opacity-5 rounded-full transform translate-x-6 -translate-y-6"></div>
    </Card>
  )
}

export default MetricCard
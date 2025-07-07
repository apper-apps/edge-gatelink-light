import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'

const Sidebar = ({ isOpen, onClose, className }) => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
    { name: 'Links', href: '/links', icon: 'Link' },
    { name: 'Forms', href: '/forms', icon: 'FileText' },
    { name: 'Analytics', href: '/analytics', icon: 'BarChart3' },
    { name: 'Settings', href: '/settings', icon: 'Settings' }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={cn(
        'hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0',
        'bg-white border-r border-gray-200',
        className
      )}>
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="Link" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">GateLink Pro</span>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <ApperIcon name={item.icon} size={20} />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:hidden',
        'transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="Link" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">GateLink Pro</span>
            </div>
            <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700">
              <ApperIcon name="X" size={20} />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <ApperIcon name={item.icon} size={20} />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Sidebar
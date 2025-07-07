import { cn } from '@/utils/cn'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'

const FormField = ({ 
  label, 
  type = 'text', 
  error, 
  className, 
  required,
  children,
  ...props 
}) => {
  const renderInput = () => {
    if (type === 'select') {
      return (
        <Select error={error} {...props}>
          {children}
        </Select>
      )
    }
    
    if (type === 'textarea') {
      return (
        <textarea
          className={cn(
            'w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base transition-all duration-150',
            'focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20',
            'placeholder:text-gray-400',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            error && 'border-error focus:border-error focus:ring-error'
          )}
          rows={4}
          {...props}
        />
      )
    }
    
    return <Input type={type} error={error} {...props} />
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export default FormField
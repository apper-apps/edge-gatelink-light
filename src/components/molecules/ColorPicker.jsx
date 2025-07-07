import { useState } from 'react'
import { cn } from '@/utils/cn'

const ColorPicker = ({ 
  value = '#007AFF', 
  onChange, 
  className,
  presetColors = [
    '#007AFF', '#5856D6', '#FF3B30', '#34C759', '#FF9500',
    '#8E8E93', '#1C1C1E', '#48484A', '#636366', '#AEAEB2'
  ]
}) => {
  const [selectedColor, setSelectedColor] = useState(value)
  const [isCustomMode, setIsCustomMode] = useState(false)

  const handleColorChange = (color) => {
    setSelectedColor(color)
    onChange?.(color)
  }

  const handleCustomColorChange = (e) => {
    const color = e.target.value
    setSelectedColor(color)
    onChange?.(color)
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded-md border border-gray-300 shadow-sm"
          style={{ backgroundColor: selectedColor }}
        />
        <span className="text-sm font-medium text-gray-700">
          {selectedColor}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorChange(color)}
            className={cn(
              'w-8 h-8 rounded-md border-2 transition-all duration-150',
              'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              selectedColor === color ? 'border-gray-900' : 'border-gray-300'
            )}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="color"
          value={selectedColor}
          onChange={handleCustomColorChange}
          className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
        />
        <span className="text-sm text-gray-600">Custom Color</span>
      </div>
    </div>
  )
}

export default ColorPicker
import { useState } from 'react'
import { toast } from 'react-toastify'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'
import ColorPicker from '@/components/molecules/ColorPicker'
import { linkService } from '@/services/api/linkService'
import { formService } from '@/services/api/formService'

const LinkCreator = ({ isOpen, onClose, onLinkCreated }) => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [forms, setForms] = useState([])
  const [formData, setFormData] = useState({
    originalUrl: '',
    formId: '',
    customization: {
      backgroundColor: '#FFFFFF',
      buttonColor: '#007AFF',
      textColor: '#1C1C1E',
      headline: 'Access Premium Content',
      description: 'Please fill out this quick form to access your requested content.',
      coverImage: ''
    }
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCustomizationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      customization: {
        ...prev.customization,
        [field]: value
      }
    }))
  }

  const handleNext = async () => {
    if (step === 1) {
      if (!formData.originalUrl) {
        toast.error('Please enter a URL')
        return
      }
      
      // Load forms for step 2
      try {
        const formsData = await formService.getAll()
        setForms(formsData)
        setStep(2)
      } catch (error) {
        toast.error('Failed to load forms')
      }
    } else if (step === 2) {
      if (!formData.formId) {
        toast.error('Please select a form')
        return
      }
      setStep(3)
    } else if (step === 3) {
      await handleCreateLink()
    }
  }

  const handleCreateLink = async () => {
    setLoading(true)
    try {
      const linkData = {
        originalUrl: formData.originalUrl,
        formId: formData.formId,
        customization: formData.customization,
        status: 'active'
      }
      
      const newLink = await linkService.create(linkData)
      toast.success('Gated link created successfully!')
      
      // Copy to clipboard
      navigator.clipboard.writeText(newLink.gatedUrl)
      toast.info('Link copied to clipboard')
      
      onLinkCreated?.(newLink)
      onClose()
      
      // Reset form
      setFormData({
        originalUrl: '',
        formId: '',
        customization: {
          backgroundColor: '#FFFFFF',
          buttonColor: '#007AFF',
          textColor: '#1C1C1E',
          headline: 'Access Premium Content',
          description: 'Please fill out this quick form to access your requested content.',
          coverImage: ''
        }
      })
      setStep(1)
    } catch (error) {
      toast.error('Failed to create link')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Create Gated Link
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center gap-2">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  stepNum <= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                )}>
                  {stepNum}
                </div>
                <span className={cn(
                  'text-sm font-medium',
                  stepNum <= step ? 'text-primary' : 'text-gray-600'
                )}>
                  {stepNum === 1 ? 'URL' : stepNum === 2 ? 'Form' : 'Customize'}
                </span>
                {stepNum < 3 && (
                  <div className={cn(
                    'w-8 h-0.5 ml-2',
                    stepNum < step ? 'bg-primary' : 'bg-gray-200'
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Enter Your URL
                </h3>
                <FormField
                  label="Original URL"
                  type="url"
                  placeholder="https://example.com/your-content"
                  value={formData.originalUrl}
                  onChange={(e) => handleInputChange('originalUrl', e.target.value)}
                  required
                />
                <p className="text-sm text-gray-600 mt-2">
                  This is the URL users will be redirected to after completing the form.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Select Form
                </h3>
                <FormField
                  label="Choose a form"
                  type="select"
                  value={formData.formId}
                  onChange={(e) => handleInputChange('formId', e.target.value)}
                  required
                >
                  <option value="">Select a form...</option>
                  {forms.map((form) => (
                    <option key={form.Id} value={form.Id}>
                      {form.name}
                    </option>
                  ))}
                </FormField>
                <p className="text-sm text-gray-600 mt-2">
                  Select the form users will fill out to access your content.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Customize Landing Page
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      label="Headline"
                      type="text"
                      value={formData.customization.headline}
                      onChange={(e) => handleCustomizationChange('headline', e.target.value)}
                    />
                    
                    <FormField
                      label="Description"
                      type="textarea"
                      value={formData.customization.description}
                      onChange={(e) => handleCustomizationChange('description', e.target.value)}
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background Color
                      </label>
                      <ColorPicker
                        value={formData.customization.backgroundColor}
                        onChange={(color) => handleCustomizationChange('backgroundColor', color)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Color
                      </label>
                      <ColorPicker
                        value={formData.customization.buttonColor}
                        onChange={(color) => handleCustomizationChange('buttonColor', color)}
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
                    <div 
                      className="rounded-lg p-6 text-center"
                      style={{ backgroundColor: formData.customization.backgroundColor }}
                    >
                      <h3 className="text-lg font-semibold mb-2" style={{ color: formData.customization.textColor }}>
                        {formData.customization.headline}
                      </h3>
                      <p className="text-sm mb-4" style={{ color: formData.customization.textColor }}>
                        {formData.customization.description}
                      </p>
                      <div 
                        className="px-4 py-2 rounded-md text-white text-sm font-medium inline-block"
                        style={{ backgroundColor: formData.customization.buttonColor }}
                      >
                        Submit Form
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <div>
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
                Back
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  {step === 3 ? 'Create Link' : 'Next'}
                  {step < 3 && <ApperIcon name="ArrowRight" size={16} className="ml-2" />}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkCreator
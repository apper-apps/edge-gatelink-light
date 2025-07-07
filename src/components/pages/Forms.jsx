import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import SearchBar from '@/components/molecules/SearchBar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { formService } from '@/services/api/formService'
import { format } from 'date-fns'

const Forms = () => {
  const [forms, setForms] = useState([])
  const [filteredForms, setFilteredForms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const loadForms = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await formService.getAll()
      setForms(data)
      setFilteredForms(data)
    } catch (err) {
      setError('Failed to load forms')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadForms()
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (!query) {
      setFilteredForms(forms)
    } else {
      const filtered = forms.filter(form =>
        form.name.toLowerCase().includes(query.toLowerCase()) ||
        form.description?.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredForms(filtered)
    }
  }

  const handleDeleteForm = async (formId) => {
    if (!confirm('Are you sure you want to delete this form?')) return
    
    try {
      await formService.delete(formId)
      const updatedForms = forms.filter(form => form.Id !== formId)
      setForms(updatedForms)
      setFilteredForms(updatedForms)
      toast.success('Form deleted successfully')
    } catch (error) {
      toast.error('Failed to delete form')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>
        <Loading type="cards" />
      </div>
    )
  }

  if (error) {
    return <Error message={error} onRetry={loadForms} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forms</h1>
          <p className="text-gray-600">Create and manage your lead capture forms</p>
        </div>
        <Button
          variant="accent"
          className="gap-2"
          onClick={() => toast.info('Form builder coming soon!')}
        >
          <ApperIcon name="Plus" size={16} />
          Create Form
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <SearchBar
          placeholder="Search forms..."
          onSearch={handleSearch}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ApperIcon name="Filter" size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ApperIcon name="Download" size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {filteredForms.length === 0 ? (
        <Empty
          icon="FileText"
          title="No forms found"
          description={searchQuery ? 
            `No forms match "${searchQuery}". Try adjusting your search.` :
            "Create your first form to start capturing leads from your gated content."
          }
          actionLabel="Create Form"
          onAction={() => toast.info('Form builder coming soon!')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.map((form) => (
            <Card key={form.Id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {form.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {form.description || 'No description provided'}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <ApperIcon name="Edit" size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteForm(form.Id)}
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Fields:</span>
                  <span className="font-medium">{form.fields.length}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">
                    {format(new Date(form.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: form.theme.buttonColor }}
                  />
                  <span className="text-xs text-gray-500">Theme Color</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ApperIcon name="Eye" size={14} className="mr-2" />
                    Preview
                  </Button>
                  <Button variant="primary" size="sm" className="flex-1">
                    <ApperIcon name="ExternalLink" size={14} className="mr-2" />
                    Use
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Forms
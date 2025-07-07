import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import FormField from '@/components/molecules/FormField'
import StatusToggle from '@/components/molecules/StatusToggle'

const Settings = () => {
  const [settings, setSettings] = useState({
    general: {
      companyName: 'My Company',
      companyEmail: 'contact@mycompany.com',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY'
    },
    notifications: {
      emailAlerts: true,
      newSubmissions: true,
      weeklyReports: false,
      systemUpdates: true
    },
    integrations: {
      zapier: false,
      webhook: '',
      googleAnalytics: '',
      facebookPixel: ''
    },
    branding: {
      logo: '',
      primaryColor: '#007AFF',
      secondaryColor: '#5856D6',
      customDomain: ''
    }
  })

  const handleGeneralChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [field]: value
      }
    }))
  }

  const handleNotificationChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }))
  }

  const handleIntegrationChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [field]: value
      }
    }))
  }

  const handleBrandingChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        [field]: value
      }
    }))
  }

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!')
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
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and integrations</p>
        </div>
        <Button onClick={handleSaveSettings} variant="accent">
          <ApperIcon name="Save" size={16} className="mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="Settings" size={20} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
          </div>
          
          <div className="space-y-4">
            <FormField
              label="Company Name"
              type="text"
              value={settings.general.companyName}
              onChange={(e) => handleGeneralChange('companyName', e.target.value)}
            />
            
            <FormField
              label="Company Email"
              type="email"
              value={settings.general.companyEmail}
              onChange={(e) => handleGeneralChange('companyEmail', e.target.value)}
            />
            
            <FormField
              label="Timezone"
              type="select"
              value={settings.general.timezone}
              onChange={(e) => handleGeneralChange('timezone', e.target.value)}
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">GMT</option>
            </FormField>
            
            <FormField
              label="Date Format"
              type="select"
              value={settings.general.dateFormat}
              onChange={(e) => handleGeneralChange('dateFormat', e.target.value)}
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </FormField>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Bell" size={20} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Alerts</label>
                <p className="text-sm text-gray-500">Receive general email notifications</p>
              </div>
              <StatusToggle
                enabled={settings.notifications.emailAlerts}
                onChange={(enabled) => handleNotificationChange('emailAlerts', enabled)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Submissions</label>
                <p className="text-sm text-gray-500">Get notified when someone submits a form</p>
              </div>
              <StatusToggle
                enabled={settings.notifications.newSubmissions}
                onChange={(enabled) => handleNotificationChange('newSubmissions', enabled)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">Weekly Reports</label>
                <p className="text-sm text-gray-500">Receive weekly performance summaries</p>
              </div>
              <StatusToggle
                enabled={settings.notifications.weeklyReports}
                onChange={(enabled) => handleNotificationChange('weeklyReports', enabled)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">System Updates</label>
                <p className="text-sm text-gray-500">Get notified about system updates</p>
              </div>
              <StatusToggle
                enabled={settings.notifications.systemUpdates}
                onChange={(enabled) => handleNotificationChange('systemUpdates', enabled)}
              />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" size={20} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Integrations</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700">Zapier Integration</label>
                <p className="text-sm text-gray-500">Connect with 3000+ apps</p>
              </div>
              <StatusToggle
                enabled={settings.integrations.zapier}
                onChange={(enabled) => handleIntegrationChange('zapier', enabled)}
              />
            </div>
            
            <FormField
              label="Webhook URL"
              type="url"
              placeholder="https://your-webhook-url.com"
              value={settings.integrations.webhook}
              onChange={(e) => handleIntegrationChange('webhook', e.target.value)}
            />
            
            <FormField
              label="Google Analytics ID"
              type="text"
              placeholder="GA-XXXXXXXXX-X"
              value={settings.integrations.googleAnalytics}
              onChange={(e) => handleIntegrationChange('googleAnalytics', e.target.value)}
            />
            
            <FormField
              label="Facebook Pixel ID"
              type="text"
              placeholder="123456789012345"
              value={settings.integrations.facebookPixel}
              onChange={(e) => handleIntegrationChange('facebookPixel', e.target.value)}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="Palette" size={20} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Branding</h2>
          </div>
          
          <div className="space-y-4">
            <FormField
              label="Logo URL"
              type="url"
              placeholder="https://your-logo-url.com/logo.png"
              value={settings.branding.logo}
              onChange={(e) => handleBrandingChange('logo', e.target.value)}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Primary Color"
                type="color"
                value={settings.branding.primaryColor}
                onChange={(e) => handleBrandingChange('primaryColor', e.target.value)}
              />
              
              <FormField
                label="Secondary Color"
                type="color"
                value={settings.branding.secondaryColor}
                onChange={(e) => handleBrandingChange('secondaryColor', e.target.value)}
              />
            </div>
            
            <FormField
              label="Custom Domain"
              type="text"
              placeholder="links.yourcompany.com"
              value={settings.branding.customDomain}
              onChange={(e) => handleBrandingChange('customDomain', e.target.value)}
            />
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

export default Settings
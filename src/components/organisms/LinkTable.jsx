import { useState } from 'react'
import { toast } from 'react-toastify'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import StatusToggle from '@/components/molecules/StatusToggle'
import { linkService } from '@/services/api/linkService'
import { format } from 'date-fns'

const LinkTable = ({ links, onLinkUpdate, onLinkDelete }) => {
  const [loading, setLoading] = useState({})

  const handleStatusToggle = async (linkId, newStatus) => {
    setLoading(prev => ({ ...prev, [linkId]: true }))
    try {
      const updatedLink = await linkService.update(linkId, { 
        status: newStatus ? 'active' : 'paused' 
      })
      onLinkUpdate(updatedLink)
      toast.success(`Link ${newStatus ? 'activated' : 'paused'}`)
    } catch (error) {
      toast.error('Failed to update link status')
    } finally {
      setLoading(prev => ({ ...prev, [linkId]: false }))
    }
  }

  const handleCopyLink = (gatedUrl) => {
    navigator.clipboard.writeText(gatedUrl)
    toast.success('Link copied to clipboard')
  }

  const handleDeleteLink = async (linkId) => {
    if (!confirm('Are you sure you want to delete this link?')) return
    
    setLoading(prev => ({ ...prev, [linkId]: true }))
    try {
      await linkService.delete(linkId)
      onLinkDelete(linkId)
      toast.success('Link deleted successfully')
    } catch (error) {
      toast.error('Failed to delete link')
    } finally {
      setLoading(prev => ({ ...prev, [linkId]: false }))
    }
  }

  const getConversionRate = (clicks, submissions) => {
    if (clicks === 0) return 0
    return ((submissions / clicks) * 100).toFixed(1)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Original URL</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Gated URL</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Clicks</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Submissions</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Conversion</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.Id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                <StatusToggle
                  enabled={link.status === 'active'}
                  onChange={(enabled) => handleStatusToggle(link.Id, enabled)}
                  disabled={loading[link.Id]}
                />
              </td>
              <td className="py-3 px-4">
                <div className="max-w-xs truncate text-sm">
                  {link.originalUrl}
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <div className="max-w-xs truncate text-sm font-mono">
                    {link.gatedUrl}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyLink(link.gatedUrl)}
                  >
                    <ApperIcon name="Copy" size={14} />
                  </Button>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm font-medium">{link.clicks}</span>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm font-medium">{link.submissions}</span>
              </td>
              <td className="py-3 px-4">
                <Badge variant={getConversionRate(link.clicks, link.submissions) > 10 ? 'success' : 'default'}>
                  {getConversionRate(link.clicks, link.submissions)}%
                </Badge>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm text-gray-600">
                  {format(new Date(link.createdAt), 'MMM d, yyyy')}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyLink(link.gatedUrl)}
                  >
                    <ApperIcon name="ExternalLink" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteLink(link.Id)}
                    disabled={loading[link.Id]}
                  >
                    <ApperIcon name="Trash2" size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LinkTable
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import MetricCard from '@/components/molecules/MetricCard'
import LinkCreator from '@/components/organisms/LinkCreator'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { linkService } from '@/services/api/linkService'
import { submissionService } from '@/services/api/submissionService'
import { format } from 'date-fns'

const Dashboard = () => {
  const [data, setData] = useState({
    links: [],
    submissions: [],
    metrics: {
      totalLinks: 0,
      totalClicks: 0,
      totalSubmissions: 0,
      conversionRate: 0
    }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showLinkCreator, setShowLinkCreator] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [linksData, submissionsData] = await Promise.all([
        linkService.getAll(),
        submissionService.getAll()
      ])
      
      const totalClicks = linksData.reduce((sum, link) => sum + link.clicks, 0)
      const totalSubmissions = linksData.reduce((sum, link) => sum + link.submissions, 0)
      const conversionRate = totalClicks > 0 ? (totalSubmissions / totalClicks) * 100 : 0
      
      setData({
        links: linksData,
        submissions: submissionsData,
        metrics: {
          totalLinks: linksData.length,
          totalClicks,
          totalSubmissions,
          conversionRate
        }
      })
    } catch (err) {
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleLinkCreated = (newLink) => {
    setData(prev => ({
      ...prev,
      links: [newLink, ...prev.links],
      metrics: {
        ...prev.metrics,
        totalLinks: prev.metrics.totalLinks + 1
      }
    }))
  }

  const recentLinks = data.links.slice(0, 5)
  const recentSubmissions = data.submissions.slice(0, 5)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>
        <Loading type="cards" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Loading />
          <Loading />
        </div>
      </div>
    )
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />
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
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Monitor your link performance and lead generation</p>
        </div>
        <Button
          onClick={() => setShowLinkCreator(true)}
          variant="accent"
          className="gap-2"
        >
          <ApperIcon name="Plus" size={16} />
          Create Gated Link
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Links"
          value={data.metrics.totalLinks}
          icon="Link"
          color="primary"
        />
        <MetricCard
          title="Total Clicks"
          value={data.metrics.totalClicks.toLocaleString()}
          icon="MousePointer"
          color="secondary"
        />
        <MetricCard
          title="Total Submissions"
          value={data.metrics.totalSubmissions.toLocaleString()}
          icon="Users"
          color="success"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${data.metrics.conversionRate.toFixed(1)}%`}
          icon="TrendingUp"
          color="accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Links</h2>
            <Button variant="ghost" size="sm">
              <ApperIcon name="ArrowRight" size={16} />
            </Button>
          </div>
          
          {recentLinks.length === 0 ? (
            <div className="text-center py-8">
              <ApperIcon name="Link" size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No links created yet</p>
              <Button
                onClick={() => setShowLinkCreator(true)}
                variant="outline"
                size="sm"
                className="mt-3"
              >
                Create Your First Link
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentLinks.map((link) => (
                <div key={link.Id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {link.originalUrl}
                    </p>
                    <p className="text-xs text-gray-500">
                      {link.clicks} clicks • {link.submissions} submissions
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      link.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {link.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Submissions</h2>
            <Button variant="ghost" size="sm">
              <ApperIcon name="ArrowRight" size={16} />
            </Button>
          </div>
          
          {recentSubmissions.length === 0 ? (
            <div className="text-center py-8">
              <ApperIcon name="FileText" size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No submissions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSubmissions.map((submission) => (
                <div key={submission.Id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {submission.data.email || 'Anonymous'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(submission.submittedAt), 'MMM d, yyyy HH:mm')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="CheckCircle" size={16} className="text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <LinkCreator
        isOpen={showLinkCreator}
        onClose={() => setShowLinkCreator(false)}
        onLinkCreated={handleLinkCreated}
      />
    </motion.div>
  )
}

export default Dashboard
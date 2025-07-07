import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Chart from 'react-apexcharts'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Select from '@/components/atoms/Select'
import MetricCard from '@/components/molecules/MetricCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { analyticsService } from '@/services/api/analyticsService'
import { linkService } from '@/services/api/linkService'
import { format, subDays, startOfDay, endOfDay } from 'date-fns'

const Analytics = () => {
  const [data, setData] = useState({
    overview: {
      totalClicks: 0,
      totalSubmissions: 0,
      conversionRate: 0,
      avgConversionRate: 0
    },
    charts: {
      clicksOverTime: [],
      submissionsOverTime: [],
      conversionRateOverTime: [],
      topLocations: []
    }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedLink, setSelectedLink] = useState('all')
  const [links, setLinks] = useState([])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [analyticsData, linksData] = await Promise.all([
        analyticsService.getOverview(timeRange, selectedLink),
        linkService.getAll()
      ])
      
      setData(analyticsData)
      setLinks(linksData)
    } catch (err) {
      setError('Failed to load analytics data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [timeRange, selectedLink])

  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      background: 'transparent'
    },
    colors: ['#007AFF', '#5856D6', '#FF3B30'],
    stroke: { width: 3, curve: 'smooth' },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: '#666' } }
    },
    yaxis: {
      labels: { style: { colors: '#666' } }
    },
    grid: { borderColor: '#f1f1f1' },
    tooltip: {
      theme: 'light',
      style: { fontSize: '12px' }
    },
    legend: { show: false }
  }

  const pieChartOptions = {
    chart: { type: 'pie' },
    colors: ['#007AFF', '#5856D6', '#FF3B30', '#34C759', '#FF9500'],
    legend: { position: 'bottom' },
    dataLabels: { enabled: true },
    tooltip: { theme: 'light' }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your link performance and conversion metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-32"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </Select>
          <Select 
            value={selectedLink} 
            onChange={(e) => setSelectedLink(e.target.value)}
            className="w-48"
          >
            <option value="all">All Links</option>
            {links.map((link) => (
              <option key={link.Id} value={link.Id}>
                {link.originalUrl.length > 30 ? 
                  `${link.originalUrl.substring(0, 30)}...` : 
                  link.originalUrl
                }
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Clicks"
          value={data.overview.totalClicks.toLocaleString()}
          icon="MousePointer"
          color="primary"
          trend="up"
          trendValue="+12.5%"
        />
        <MetricCard
          title="Total Submissions"
          value={data.overview.totalSubmissions.toLocaleString()}
          icon="Users"
          color="success"
          trend="up"
          trendValue="+8.3%"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${data.overview.conversionRate.toFixed(1)}%`}
          icon="TrendingUp"
          color="secondary"
          trend="up"
          trendValue="+2.1%"
        />
        <MetricCard
          title="Avg. Conversion"
          value={`${data.overview.avgConversionRate.toFixed(1)}%`}
          icon="Target"
          color="accent"
          trend="neutral"
          trendValue="0%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Clicks & Submissions</h3>
            <Button variant="ghost" size="sm">
              <ApperIcon name="Download" size={16} />
            </Button>
          </div>
          <Chart
            options={{
              ...chartOptions,
              series: [
                {
                  name: 'Clicks',
                  data: data.charts.clicksOverTime
                },
                {
                  name: 'Submissions',
                  data: data.charts.submissionsOverTime
                }
              ]
            }}
            series={[
              {
                name: 'Clicks',
                data: data.charts.clicksOverTime
              },
              {
                name: 'Submissions',
                data: data.charts.submissionsOverTime
              }
            ]}
            type="line"
            height={300}
          />
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Conversion Rate</h3>
            <Button variant="ghost" size="sm">
              <ApperIcon name="Download" size={16} />
            </Button>
          </div>
          <Chart
            options={{
              ...chartOptions,
              colors: ['#FF3B30'],
              yaxis: {
                ...chartOptions.yaxis,
                labels: {
                  ...chartOptions.yaxis.labels,
                  formatter: (value) => `${value.toFixed(1)}%`
                }
              }
            }}
            series={[
              {
                name: 'Conversion Rate',
                data: data.charts.conversionRateOverTime
              }
            ]}
            type="area"
            height={300}
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Locations</h3>
            <Button variant="ghost" size="sm">
              <ApperIcon name="Download" size={16} />
            </Button>
          </div>
          <Chart
            options={pieChartOptions}
            series={data.charts.topLocations.map(loc => loc.value)}
            type="pie"
            height={300}
          />
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Summary</h3>
            <Button variant="ghost" size="sm">
              <ApperIcon name="Download" size={16} />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm font-medium">Best Performing Link</span>
              </div>
              <span className="text-sm text-gray-600">15.2% conversion</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm font-medium">Total Revenue Impact</span>
              </div>
              <span className="text-sm text-gray-600">$12,450</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-sm font-medium">Average Session Time</span>
              </div>
              <span className="text-sm text-gray-600">2m 34s</span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}

export default Analytics
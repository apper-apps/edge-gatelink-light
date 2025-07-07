import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import MetricCard from '@/components/molecules/MetricCard'
import LinkCreator from '@/components/organisms/LinkCreator'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { analyticsService } from '@/services/api/analyticsService'
import ReactApexChart from 'react-apexcharts'

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showLinkCreator, setShowLinkCreator] = useState(false)

const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await analyticsService.getOverview('7d', 'all')
      setAnalyticsData(data)
    } catch (err) {
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

const handleLinkCreated = () => {
    loadData() // Refresh dashboard data
  }

  // Chart configurations
  const barChartOptions = {
    chart: { type: 'bar', toolbar: { show: false }, sparkline: { enabled: true } },
    plotOptions: { bar: { horizontal: false, columnWidth: '60%', borderRadius: 4 } },
    dataLabels: { enabled: false },
    fill: { type: 'gradient', gradient: { shade: 'light', type: 'vertical', shadeIntensity: 0.3, gradientToColors: ['#FF6B35'], opacityFrom: 0.8, opacityTo: 0.6 } },
    colors: ['#4F46E5'],
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false } }
  }

  const areaChartOptions = {
    chart: { type: 'area', toolbar: { show: false }, sparkline: { enabled: true } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shade: 'light', type: 'vertical', shadeIntensity: 0.2, gradientToColors: ['#FF6B35'], opacityFrom: 0.4, opacityTo: 0.1 } },
    colors: ['#4F46E5'],
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false } }
  }

  const gaugeOptions = {
    chart: { type: 'radialBar', toolbar: { show: false } },
    plotOptions: { radialBar: { hollow: { size: '60%' }, dataLabels: { name: { show: false }, value: { show: true, fontSize: '16px', fontWeight: 'bold', color: '#1f2937' } } } },
    colors: ['#4F46E5'],
    fill: { type: 'gradient', gradient: { shade: 'light', type: 'horizontal', shadeIntensity: 0.5, gradientToColors: ['#FF6B35'], opacityFrom: 1, opacityTo: 1 } }
  }

  const donutOptions = {
    chart: { type: 'donut', toolbar: { show: false } },
    dataLabels: { enabled: false },
    colors: ['#4F46E5', '#FF6B35', '#34C759', '#FF9500'],
    legend: { show: false },
    plotOptions: { pie: { donut: { size: '65%' } } }
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
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

      {analyticsData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Revenue Highlight Card */}
          <Card variant="gradient" className="relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Revenue</h3>
              <ApperIcon name="DollarSign" size={24} className="text-indigo-600" />
            </div>
            <div className="mb-4">
              <div className="text-4xl font-bold text-gray-900 mb-2">$8,000</div>
              <div className="flex items-center gap-2">
                <ApperIcon name="TrendingUp" size={16} className="text-green-500" />
                <span className="text-sm font-medium text-green-600">+12.5% from last month</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-400 opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
          </Card>

          {/* Clicks Bar Chart */}
          <Card variant="gradient">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Clicks</h3>
              <ApperIcon name="MousePointer" size={24} className="text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-4">
              {analyticsData.overview.totalClicks.toLocaleString()}
            </div>
            <div className="h-24">
              <ReactApexChart
                options={barChartOptions}
                series={[{ data: [44, 55, 41, 67, 22, 43, 56] }]}
                type="bar"
                height="100%"
              />
            </div>
          </Card>

          {/* Conversion Rate Gauge */}
          <Card variant="gradient">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Conversion Rate</h3>
              <ApperIcon name="Target" size={24} className="text-orange-600" />
            </div>
            <div className="h-32 flex items-center justify-center">
              <ReactApexChart
                options={gaugeOptions}
                series={[Math.round(analyticsData.overview.conversionRate)]}
                type="radialBar"
                height="100%"
                width="100%"
              />
            </div>
          </Card>

          {/* Submissions Area Chart */}
          <Card variant="gradient">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Submissions</h3>
              <ApperIcon name="Users" size={24} className="text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-4">
              {analyticsData.overview.totalSubmissions.toLocaleString()}
            </div>
            <div className="h-24">
              <ReactApexChart
                options={areaChartOptions}
                series={[{ data: [31, 40, 28, 51, 42, 109, 100] }]}
                type="area"
                height="100%"
              />
            </div>
          </Card>

          {/* Performance Donut Chart */}
          <Card variant="gradient">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Performance</h3>
              <ApperIcon name="PieChart" size={24} className="text-purple-600" />
            </div>
            <div className="h-32 flex items-center justify-center">
              <ReactApexChart
                options={donutOptions}
                series={[44, 25, 20, 11]}
                type="donut"
                height="100%"
                width="100%"
              />
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-600">Overall Score</div>
              <div className="text-xl font-bold text-gray-900">85%</div>
            </div>
          </Card>

          {/* Growth Progress Bars */}
          <Card variant="gradient">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Growth Metrics</h3>
              <ApperIcon name="TrendingUp" size={24} className="text-emerald-600" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Link Performance</span>
                  <span className="font-medium text-gray-900">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Engagement Rate</span>
                  <span className="font-medium text-gray-900">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Quality Score</span>
                  <span className="font-medium text-gray-900">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <LinkCreator
        isOpen={showLinkCreator}
        onClose={() => setShowLinkCreator(false)}
        onLinkCreated={handleLinkCreated}
      />
    </motion.div>
  )
}

export default Dashboard
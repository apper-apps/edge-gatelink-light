import { linkService } from './linkService'
import { submissionService } from './submissionService'
import { subDays, format } from 'date-fns'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const analyticsService = {
  async getOverview(timeRange = '7d', linkId = 'all') {
    await delay(500)
    
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    const links = await linkService.getAll()
    const submissions = await submissionService.getAll()
    
    const filteredLinks = linkId === 'all' ? links : links.filter(l => l.Id === parseInt(linkId))
    
    const totalClicks = filteredLinks.reduce((sum, link) => sum + link.clicks, 0)
    const totalSubmissions = filteredLinks.reduce((sum, link) => sum + link.submissions, 0)
    const conversionRate = totalClicks > 0 ? (totalSubmissions / totalClicks) * 100 : 0
    
    // Generate mock time series data
    const clicksOverTime = []
    const submissionsOverTime = []
    const conversionRateOverTime = []
    
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i)
      const clicks = Math.floor(Math.random() * 100) + 20
      const subs = Math.floor(clicks * (0.1 + Math.random() * 0.2))
      
      clicksOverTime.push([date.getTime(), clicks])
      submissionsOverTime.push([date.getTime(), subs])
      conversionRateOverTime.push([date.getTime(), (subs / clicks) * 100])
    }
    
    const topLocations = [
      { name: 'United States', value: 45 },
      { name: 'Canada', value: 25 },
      { name: 'United Kingdom', value: 15 },
      { name: 'Australia', value: 10 },
      { name: 'Other', value: 5 }
    ]
    
    return {
      overview: {
        totalClicks,
        totalSubmissions,
        conversionRate,
        avgConversionRate: conversionRate
      },
      charts: {
        clicksOverTime,
        submissionsOverTime,
        conversionRateOverTime,
        topLocations
      }
    }
  },

  async getRecentActivity() {
    await delay(300)
    
    return [
      {
        Id: 1,
        type: 'submission',
        message: 'New submission received',
        timestamp: new Date().toISOString(),
        linkId: 1
      },
      {
        Id: 2,
        type: 'click',
        message: 'Link clicked',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        linkId: 2
      }
    ]
  }
}
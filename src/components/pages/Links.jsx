import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import SearchBar from '@/components/molecules/SearchBar'
import LinkCreator from '@/components/organisms/LinkCreator'
import LinkTable from '@/components/organisms/LinkTable'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { linkService } from '@/services/api/linkService'

const Links = () => {
  const [links, setLinks] = useState([])
  const [filteredLinks, setFilteredLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showLinkCreator, setShowLinkCreator] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const loadLinks = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await linkService.getAll()
      setLinks(data)
      setFilteredLinks(data)
    } catch (err) {
      setError('Failed to load links')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLinks()
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (!query) {
      setFilteredLinks(links)
    } else {
      const filtered = links.filter(link =>
        link.originalUrl.toLowerCase().includes(query.toLowerCase()) ||
        link.gatedUrl.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredLinks(filtered)
    }
  }

  const handleLinkCreated = (newLink) => {
    const updatedLinks = [newLink, ...links]
    setLinks(updatedLinks)
    setFilteredLinks(updatedLinks)
  }

  const handleLinkUpdate = (updatedLink) => {
    const updatedLinks = links.map(link => 
      link.Id === updatedLink.Id ? updatedLink : link
    )
    setLinks(updatedLinks)
    setFilteredLinks(updatedLinks)
  }

  const handleLinkDelete = (linkId) => {
    const updatedLinks = links.filter(link => link.Id !== linkId)
    setLinks(updatedLinks)
    setFilteredLinks(updatedLinks)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>
        <Loading type="table" />
      </div>
    )
  }

  if (error) {
    return <Error message={error} onRetry={loadLinks} />
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
          <h1 className="text-2xl font-bold text-gray-900">Links</h1>
          <p className="text-gray-600">Manage your gated links and track performance</p>
        </div>
        <Button
          onClick={() => setShowLinkCreator(true)}
          variant="accent"
          className="gap-2"
        >
          <ApperIcon name="Plus" size={16} />
          Create Link
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <SearchBar
          placeholder="Search links..."
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

      <Card>
        {filteredLinks.length === 0 ? (
          <Empty
            icon="Link"
            title="No links found"
            description={searchQuery ? 
              `No links match "${searchQuery}". Try adjusting your search.` :
              "Get started by creating your first gated link to capture leads from your content."
            }
            actionLabel="Create Link"
            onAction={() => setShowLinkCreator(true)}
          />
        ) : (
          <LinkTable
            links={filteredLinks}
            onLinkUpdate={handleLinkUpdate}
            onLinkDelete={handleLinkDelete}
          />
        )}
      </Card>

      <LinkCreator
        isOpen={showLinkCreator}
        onClose={() => setShowLinkCreator(false)}
        onLinkCreated={handleLinkCreated}
      />
    </motion.div>
  )
}

export default Links
import mockLinks from '@/services/mockData/links.json'

let links = [...mockLinks]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const linkService = {
  async getAll() {
    await delay(300)
    return links
  },

  async getById(id) {
    await delay(200)
    const link = links.find(l => l.Id === parseInt(id))
    if (!link) {
      throw new Error('Link not found')
    }
    return link
  },

  async create(linkData) {
    await delay(400)
    const newLink = {
      Id: Math.max(...links.map(l => l.Id)) + 1,
      ...linkData,
      gatedUrl: `https://gatelink.pro/g/${Math.random().toString(36).substr(2, 9)}`,
      clicks: 0,
      submissions: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    links.unshift(newLink)
    return newLink
  },

  async update(id, updateData) {
    await delay(300)
    const index = links.findIndex(l => l.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Link not found')
    }
    
    links[index] = {
      ...links[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    return links[index]
  },

  async delete(id) {
    await delay(300)
    const index = links.findIndex(l => l.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Link not found')
    }
    
    links.splice(index, 1)
    return true
  }
}
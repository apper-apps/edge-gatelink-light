import mockForms from '@/services/mockData/forms.json'

let forms = [...mockForms]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const formService = {
  async getAll() {
    await delay(300)
    return forms
  },

  async getById(id) {
    await delay(200)
    const form = forms.find(f => f.Id === parseInt(id))
    if (!form) {
      throw new Error('Form not found')
    }
    return form
  },

  async create(formData) {
    await delay(400)
    const newForm = {
      Id: Math.max(...forms.map(f => f.Id)) + 1,
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    forms.unshift(newForm)
    return newForm
  },

  async update(id, updateData) {
    await delay(300)
    const index = forms.findIndex(f => f.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Form not found')
    }
    
    forms[index] = {
      ...forms[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    return forms[index]
  },

  async delete(id) {
    await delay(300)
    const index = forms.findIndex(f => f.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Form not found')
    }
    
    forms.splice(index, 1)
    return true
  }
}
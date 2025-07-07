import mockSubmissions from '@/services/mockData/submissions.json'

let submissions = [...mockSubmissions]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const submissionService = {
  async getAll() {
    await delay(300)
    return submissions
  },

  async getById(id) {
    await delay(200)
    const submission = submissions.find(s => s.Id === parseInt(id))
    if (!submission) {
      throw new Error('Submission not found')
    }
    return submission
  },

  async getByLinkId(linkId) {
    await delay(300)
    return submissions.filter(s => s.linkId === parseInt(linkId))
  },

  async create(submissionData) {
    await delay(400)
    const newSubmission = {
      Id: Math.max(...submissions.map(s => s.Id)) + 1,
      ...submissionData,
      submittedAt: new Date().toISOString()
    }
    submissions.unshift(newSubmission)
    return newSubmission
  },

  async delete(id) {
    await delay(300)
    const index = submissions.findIndex(s => s.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Submission not found')
    }
    
    submissions.splice(index, 1)
    return true
  }
}
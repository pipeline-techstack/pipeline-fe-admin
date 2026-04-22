type Sender = {
  _id: string
  name: string
  avatar: string
  status: string
  statusCount: number
  company: string
  campaigns: number
  campaignList: string[],
  linkedin: string,
  performance: {
    sent: number
    accepted: number
    reply: number
    interested: number
  }
}
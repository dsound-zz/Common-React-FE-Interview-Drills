export interface Issue {
  id: number
  title: string
  description: string
  status: 'Open' | 'In Progress' | 'Closed'
  priority: 'High' | 'Normal' | 'Low'
  assignee: string
}

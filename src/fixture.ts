// src/fixtures/mock-api.ts

import { Issue } from '../types/issue'

// Mock issue data
const DATA: Issue[] = [
  {
    id: 101,
    title: 'Login bug on mobile',
    description: 'Users on iOS report the login form occasionally freezes.',
    status: 'Open',
    priority: 'High',
    assignee: 'Kai',
  },
  {
    id: 102,
    title: 'Dark mode polish',
    description: 'Align contrast ratios and update muted token colors.',
    status: 'In Progress',
    priority: 'Normal',
    assignee: 'Amal',
  },
  {
    id: 103,
    title: 'Analytics opt-in copy',
    description: 'Rework consent copy for clarity and compliance review.',
    status: 'Open',
    priority: 'Low',
    assignee: 'Rae',
  },
  {
    id: 104,
    title: 'Billing retry flow',
    description: 'Handle card retry with a clearer inline error message.',
    status: 'Closed',
    priority: 'High',
    assignee: 'Zed',
  },
]

// Simulated async API call with random delay and failure
export function fetchIssues(): Promise<Issue[]> {
  return new Promise((resolve, reject) => {
    const jitter = 300 + Math.random() * 700 // 300–1000 ms delay
    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error('Network hiccup'))
      } else {
        resolve(DATA)
      }
    }, jitter)
  })
}

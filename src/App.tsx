import { useEffect, useMemo, useState } from 'react'
import { fetchIssues } from './fixture'

interface Issue {
  id: string
  title: string
  description: string
  status: 'Open' | 'In Progress' | 'Closed'
  priority: 'High' | 'Normal' | 'Low'
  assignee: string
}

type StatusFilter = 'All' | Issue['status']
type SortBy = 'title' | 'priority' | null

function filterByStatus(issues: Issue[], status: StatusFilter): Issue[] {
  if (status === 'All') return issues

  return issues.filter(issue => issue.status === status)
}

function filterByAssignee(issues: Issue[], assignee: string): Issue[] {
  if (assignee === 'All') return issues

  return issues.filter(issue => issue.assignee === assignee)
}

function sortIssuesBy(issues: Issue[], sortBy: SortBy) {
  if (sortBy === null) return issues

  return [...issues].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title)
    }

    if (sortBy === 'priority') {
      const order = { High: 0, Normal: 1, Low: 2 }
      return order[a.priority] - order[b.priority]
    }

    return 0
  })
}

function selectVisibleIssues(
  issues: Issue[],
  status: StatusFilter,
  assignee: string,
  sortBy: SortBy
) {
  let result = issues

  result = filterByStatus(result, status)
  result = filterByAssignee(result, assignee)
  result = sortIssuesBy(result, sortBy)

  return result
}

function App() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [assigneeFilter, setAssigneeFilter] = useState<string>('All')
  const [sortBy, setSortBy] = useState<SortBy>(null)
  const [expandedIssue, setExpandedIssue] = useState<Issue | null>(null)

  async function loadIssues() {
    setStatus('loading')
    setError(null)

    try {
      const data = await fetchIssues()
      setIssues(data)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'There was an issue'
      setError(errorMsg)
      setStatus('error')
    } finally {
      setStatus('ready')
    }
  }

  const visibleIssues = useMemo(
    () => selectVisibleIssues(issues, statusFilter, assigneeFilter, sortBy),
    [issues, statusFilter, assigneeFilter, sortBy]
  )

  const assignees = [...new Set(issues.map(issue => issue.assignee))]

  useEffect(() => {
    loadIssues()
  }, [])

  async function closeIssue(id: string) {
    const snapshot = issues

    setIssues(prev =>
      prev.map(issue =>
        issue.id === id ? { ...issue, status: 'Closed' } : issue
      )
    )
  }

  return (
    <div className="app">
      <h1>Sortable Table</h1>
      {status === 'loading' && (
        <div>
          <h3>Loading...</h3>
        </div>
      )}
      {status === 'error' && (
        <>
          <div>
            <h3>{error}</h3>
          </div>
          <button onClick={() => loadIssues()}>Retry</button>
        </>
      )}
      {issues.length === 0 && (
        <div>
          <h3>No Issues</h3>
        </div>
      )}
      <label>Filter Status</label>
      <select onChange={e => setStatusFilter(e.target.value as any)}>
        <option value="All">All</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
      <label>Filter Assignee</label>
      <select onChange={e => setAssigneeFilter(e.target.value as any)}>
        <option value="All">All</option>
        {assignees.map(assignee => (
          <option value={assignee}>{assignee}</option>
        ))}
      </select>
      <button onClick={() => setSortBy('title')}>Sort by Title</button>

      <button onClick={() => setSortBy('priority')}>Sort by Priority</button>

      <Table
        issues={visibleIssues}
        expandedIssue={expandedIssue}
        setExpandedIssue={setExpandedIssue}
      />
    </div>
  )
}

export default App

type TableProps = {
  issues: Issue[]
  expandedIssue: Issue | null
  setExpandedIssue: (item: Issue) => void
}

function Table({
  issues,
  expandedIssue,
  setExpandedIssue,
}: TableProps): JSX.Element {
  return (
    <>
      <table>
        <caption>Issues Data</caption>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue, index) => {
            const { id, title, description, status, priority, assignee } = issue
            return (
              <tr
                key={id}
                onClick={() =>
                  setExpandedIssue(prev => (prev === issue ? null : issue))
                }
              >
                <td>{title}</td>
                <td>{description}</td>
                <td>{status}</td>
                <td>{priority}</td>
                <td>{assignee}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        {expandedIssue && (
          <div className="details">
            <p>{expandedIssue.description}</p>
            <p>Status: {expandedIssue.status}</p>
            <p>Priority: {expandedIssue.priority}</p>
            <p>Assignee: {expandedIssue.assignee}</p>
            {expandedIssue.status !== 'Closed' && (
              <button onClick={() => closeIssue(expandedIssue.id)}>
                Close Issue
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}

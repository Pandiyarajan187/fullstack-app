import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {
const [projectStats, setProjectsStats] = useState([])
const [taskStats, setTaskStats] = useState([])
const [projectsCount, setProjectsCount] = useState(null)
const [tasksCount, setTasksCount] = useState(null)
const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects/stats')
      setProjectsStats(response.data.stats)
      setProjectsCount(response.data.totalProjects)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  useEffect(() => {
    const fetchAll = async () => {
      await Promise.allSettled([fetchProjects(), fetchTasks()])
      setLoading(false)
    }
    fetchAll()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks/stats')
      setTaskStats(response.data.stats)
      setTasksCount(response.data.totalTasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  if (loading) {
    return <p className="text-gray-400">Loading...</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-1">Welcome back!</h1>
      <p className="text-gray-400 mb-8">Here's what's happening across your projects.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-5 pb-5">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Projects</p>
            <p className="text-3xl font-bold text-white">{projectsCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Tasks</p>
            <p className="text-3xl font-bold text-white">{tasksCount}</p>
          </CardContent>
        </Card>
        {taskStats.map((stat) => (
          <Card key={stat.statusName}>
            <CardContent className="pt-5 pb-5">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                {stat.statusName === 'in-progress' ? 'In Progress' : stat.statusName === 'todo' ? 'To Do' : 'Done'}
              </p>
              <p className={`text-3xl font-bold ${stat.statusName === 'done' ? 'text-green-400' : stat.statusName === 'in-progress' ? 'text-blue-400' : 'text-yellow-400'}`}>
                {stat.count}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-5 pb-5 space-y-3">
            <h2 className="text-sm font-semibold text-white">Projects by Status</h2>
            {projectStats.map((stat) => (
              <div key={stat.statusName} className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">{stat.statusName}</span>
                <span className="text-sm font-medium text-white">{stat.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-5 space-y-3">
            <h2 className="text-sm font-semibold text-white">Tasks by Status</h2>
            {taskStats.map((stat) => (
              <div key={stat.statusName} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {stat.statusName === 'in-progress' ? 'In Progress' : stat.statusName === 'todo' ? 'To Do' : 'Done'}
                </span>
                <span className="text-sm font-medium text-white">{stat.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '../context/AuthContext'
import ProjectForm from '../components/ProjectForm'

function Projects() {
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const { user } = useAuth()

  const fetchProjects = async () => {
    const token = user?.token
    try {
      const response = await axios.get('/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProjects(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Your Projects</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {showForm && (
        <ProjectForm onProjectAdded={() => {
          fetchProjects()
          setShowForm(false)
        }} />
      )}

      {projects.length === 0 ? (
        <p className="text-gray-400">No projects found. Click "Add New Project" to create one.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <Link key={project._id} to={`/projects/${project._id}`}>
              <Card className="h-full cursor-pointer">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h2 className="text-base font-semibold text-white leading-tight">{project.title}</h2>
                    <Badge status={project.status}>{project.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-4">{project.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects

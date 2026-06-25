import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '../context/AuthContext'

function ProjectDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [project, setProject] = useState(null)

  const fetchProject = async () => {
    const token = user?.token
    try {
      const response = await axios.get(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProject(response.data)
    } catch (error) {
      console.error('Error fetching project:', error)
    }
  }

  useEffect(() => {
    fetchProject()
  }, [id])

  if (!project) return <p className="text-gray-400">Loading...</p>

  return (
    <div>
      <Link to="/projects">
        <Button variant="outline" size="sm" className="mb-8">← Back to Projects</Button>
      </Link>
      <Card>
        <CardContent className="pt-6 pb-6 space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{project.title}</h1>
            <Badge status={project.status}>{project.status}</Badge>
          </div>
          <p className="text-gray-400">{project.description}</p>
          <p className="text-sm text-gray-600">
            Created: {new Date(project.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric'
            })}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectDetail

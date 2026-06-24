import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
      <p className="text-gray-400 mb-10">Manage your projects and tasks from one place.</p>
      <Card className="max-w-sm">
        <CardContent className="pt-6">
          <h2 className="text-base font-semibold text-white mb-1">Your Projects</h2>
          <p className="text-sm text-gray-400 mb-4">View and manage all your projects.</p>
          <Link to="/projects">
            <Button className="w-full">Go to Projects</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard

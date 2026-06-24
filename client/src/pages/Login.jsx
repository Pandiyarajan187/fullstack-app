import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function Login() {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const response = await axios.post('/api/auth/login', { email, password })
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (error) {
      alert(error.response?.data?.msg || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-blue-500">{'{PM}'}</span> Manager
          </h1>
          <p className="text-gray-400 text-sm mt-2">Sign in to your account</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <Input type="email" name="email" placeholder="you@example.com" required />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Input type="password" name="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full mt-2">Sign In</Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-5">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">Register</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login

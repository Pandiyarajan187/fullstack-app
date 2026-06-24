import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function Register() {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const response = await axios.post('/api/auth/register', { name, email, password })
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (error) {
      alert(error.response?.data?.msg || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-blue-500">{'{PM}'}</span> Manager
          </h1>
          <p className="text-gray-400 text-sm mt-2">Create your account</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">Name</label>
                <Input type="text" name="name" placeholder="Your name" required />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <Input type="email" name="email" placeholder="you@example.com" required />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Input type="password" name="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full mt-2">Create Account</Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">Login</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Register

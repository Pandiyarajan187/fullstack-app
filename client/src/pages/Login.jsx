import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault()
        // Handle form submission logic here
        const email = e.target.email.value
        const password = e.target.password.value

        // Example API call to login the user
        try {
            const response = await axios.post('/api/auth/login', { email, password })
            console.log('User logged in successfully:', response.data)
            localStorage.setItem('token', response.data.token)
            navigate('/dashboard')
        } catch (error) {
            console.error('Error logging in user:', error)
            alert('Login failed. Please try again.')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login

import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        // Handle form submission logic here
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value

        // Example API call to register the user
        try {
            const response = await axios.post('/api/auth/register', { name, email, password })
            console.log('User registered successfully:', response.data)
            localStorage.setItem('token', response.data.token)
            navigate('/dashboard')
        } catch (error) {
            console.error('Error registering user:', error)
            alert('Registration failed. Please try again.')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div>
                    <label htmlFor="name">name:</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register

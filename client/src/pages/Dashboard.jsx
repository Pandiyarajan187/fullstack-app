import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const [projectsName, setProjectsName] = useState([])
    const navigate = useNavigate()
    
    const getProjects = async () => {
        try {
            const response = await axios.get('/api/projects', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setProjectsName(response.data)
        } catch (error) {
            alert('Failed to fetch projects. Please try again.')
        }
    }


    useEffect(() => {
        const isToken = localStorage.getItem('token')
        if (!isToken) {
            navigate('/login')
        } else {
            getProjects()
        }
    }, [])


    return (
        <div>
            {projectsName.map((project) => (
                <div key={project._id}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
    )
}

export default Dashboard

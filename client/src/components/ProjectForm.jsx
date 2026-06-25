import { useState } from 'react'
import { useAuth } from '@/context/AuthContext.jsx'
import axios from 'axios'

function ProjectForm({ onProjectAdded }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('active')
    const { user } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = user?.token
        try {
            await axios.post('/api/projects', { title, description, status }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTitle('')
            setDescription('')
            setStatus('active')
            onProjectAdded() // Notify parent to refresh the projects list
        } catch (error) {
            console.error('Error adding project:', error)
        }
    }


    return (
            <form onSubmit={handleSubmit} className="bg-[#13151f] border border-gray-700/50 rounded-xl p-6 mb-8 space-y-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Project title"
                        required
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Project description"
                        required
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    New Project
                </button>
            </form>
    )
}

export default ProjectForm
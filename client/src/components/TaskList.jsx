import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Modal } from "./ui/modal"

const statusStyles = {
    todo: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    'in-progress': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    done: 'bg-green-500/10 text-green-400 border border-green-500/20',
}

const TaskList = ({ id }) => {
    const [taskList, setTaskList] = useState([])
    const [formData, setFormData] = useState({ title: "", description: "", status: "todo" })
    const [editingTask, setEditingTask] = useState(null)
    const [editForm, setEditForm] = useState({ title: "", description: "", status: "todo" })
    const { user } = useAuth()
    const token = user?.token
    const role = user?.role

    const fetchTasks = async () => {
        const response = await axios.get(`/api/tasks/project/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setTaskList(response.data)
    }

    useEffect(() => {
        fetchTasks()
    }, [id])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/tasks', {...formData, project: id}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchTasks()
            setFormData({ title: "", description: "", status: "todo" })
        } catch (error) {
            console.error('Error adding task:', error)
        }
    }

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`/api/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchTasks()
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    }

    const handleUpdate = async (taskId) => {
        try {
            await axios.put(`/api/tasks/${taskId}`, editForm, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchTasks()
            setEditingTask(null)
        } catch (error) {
            console.error('Error updating task:', error)
        }
    }

    return (
        <>
        <div className="px-6 pb-6 space-y-6">
            <div className="border-t border-gray-700/50 pt-6">
                <h2 className="text-lg font-semibold text-white mb-4">Tasks</h2>

                <form className="flex flex-col sm:flex-row gap-3 mb-6" onSubmit={handleSubmit}>
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Task title"
                    />
                    <Input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description (optional)"
                    />
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="rounded-lg border border-gray-700 bg-[#1c1f2e] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <Button type="submit" className="whitespace-nowrap">+ Add Task</Button>
                </form>

                {taskList.length === 0 ? (
                    <p className="text-gray-500 text-sm">No tasks yet. Add one above.</p>
                ) : (
                    <ul className="space-y-2">
                        {taskList.map((task) => (
                            <li key={task._id} className="flex items-center justify-between rounded-lg border border-gray-700/50 bg-[#1c1f2e] px-4 py-3">
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium text-white">{task.title}</p>
                                    {task.description && (
                                        <p className="text-xs text-gray-500">{task.description}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[task.status] || 'bg-gray-500/10 text-gray-400'}`}>
                                        {task.status === 'in-progress' ? 'In Progress' : task.status === 'todo' ? 'To Do' : 'Done'}
                                    </span>
                                    <button type="button" onClick={() => {
                                         setEditingTask(task); 
                                         setEditForm({ title: task.title, description: task.description || "", status: task.status }) }} className="text-gray-600 hover:text-blue-400 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                   {role === 'admin' && <button type="button" onClick={() => handleDelete(task._id)} className="text-gray-600 hover:text-red-400 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>

        <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)} title="Edit Task">
            <div className="space-y-3">
                <div>
                    <label className="text-xs text-gray-400 mb-1 block">Title</label>
                    <Input name="title" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <label className="text-xs text-gray-400 mb-1 block">Description</label>
                    <Input name="description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <label className="text-xs text-gray-400 mb-1 block">Status</label>
                    <select
                        name="status"
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })}
                        className="w-full rounded-lg border border-gray-700 bg-[#1c1f2e] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" type="button" onClick={() => setEditingTask(null)}>Cancel</Button>
                    <Button type="button" onClick={() => handleUpdate(editingTask._id)}>Save Changes</Button>
                </div>
            </div>
        </Modal>
        </>
    )
}

export default TaskList
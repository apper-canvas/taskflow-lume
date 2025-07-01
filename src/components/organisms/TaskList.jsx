import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '@/components/molecules/TaskCard'
import QuickAddTask from '@/components/molecules/QuickAddTask'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { taskService } from '@/services/api/taskService'
import { categoryService } from '@/services/api/categoryService'
import { toast } from 'react-toastify'

const TaskList = ({ categoryId = 1, onTaskUpdate }) => {
  const [tasks, setTasks] = useState([])
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [draggedTask, setDraggedTask] = useState(null)
  const [filter, setFilter] = useState('all') // all, pending, completed
  
  useEffect(() => {
    loadTasks()
    loadCategory()
  }, [categoryId])
  
  const loadTasks = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await taskService.getAll()
      const categoryTasks = data.filter(task => task.categoryId === categoryId)
      setTasks(categoryTasks)
    } catch (err) {
      setError('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }
  
  const loadCategory = async () => {
    try {
      const categoryData = await categoryService.getById(categoryId)
      setCategory(categoryData)
    } catch (err) {
      console.error('Error loading category:', err)
    }
  }
  
  const handleAddTask = async (taskData) => {
    try {
      await taskService.create(taskData)
      loadTasks()
      onTaskUpdate?.()
    } catch (error) {
      toast.error('Failed to add task')
    }
  }
  
  const handleCompleteTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      if (task) {
        await taskService.update(taskId, { completed: !task.completed })
        loadTasks()
        onTaskUpdate?.()
      }
    } catch (error) {
      toast.error('Failed to update task')
    }
  }
  
  const handleEditTask = async (taskId, updates) => {
    try {
      await taskService.update(taskId, updates)
      loadTasks()
      onTaskUpdate?.()
    } catch (error) {
      toast.error('Failed to update task')
    }
  }
  
  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId)
      loadTasks()
      onTaskUpdate?.()
    } catch (error) {
      toast.error('Failed to delete task')
    }
  }
  
  const handleDragStart = (task) => {
    setDraggedTask(task)
  }
  
  const handleDragEnd = () => {
    setDraggedTask(null)
  }
  
  const handleDragOver = (e) => {
    e.preventDefault()
  }
  
  const handleDrop = async (e) => {
    e.preventDefault()
    const draggedTaskId = parseInt(e.dataTransfer.getData('text/plain'))
    
    if (draggedTask && draggedTask.Id === draggedTaskId) {
      // Handle reordering logic here if needed
      console.log('Task dropped:', draggedTask)
    }
    
    setDraggedTask(null)
  }
  
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'pending':
        return !task.completed
      case 'completed':
        return task.completed
      default:
        return true
    }
  })
  
  const sortedTasks = filteredTasks.sort((a, b) => {
    // Sort by completion status first, then by priority, then by due date
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    const aPriority = priorityOrder[a.priority] || 0
    const bPriority = priorityOrder[b.priority] || 0
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority
    }
    
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate)
    }
    
    return new Date(a.createdAt) - new Date(b.createdAt)
  })
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadTasks} />
  
  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-display">
              {category?.name || 'All Tasks'}
            </h1>
            <p className="text-gray-600 mt-1">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
        
        {/* Quick Add Task */}
        <QuickAddTask onAddTask={handleAddTask} currentCategoryId={categoryId} />
        
        {/* Task List */}
        <div
          className="space-y-3"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {sortedTasks.length === 0 ? (
            <Empty
              title="No tasks found"
              message={
                filter === 'all'
                  ? "Start by adding your first task above"
                  : filter === 'pending'
                  ? "No pending tasks. Great job!"
                  : "No completed tasks yet"
              }
              actionText="Add Task"
              onAction={() => {
                const input = document.querySelector('input[placeholder*="task"]')
                input?.focus()
              }}
            />
          ) : (
            <AnimatePresence>
              {sortedTasks.map((task, index) => (
                <motion.div
                  key={task.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <TaskCard
                    task={task}
                    onComplete={handleCompleteTask}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    className={draggedTask?.Id === task.Id ? 'dragging' : ''}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskList
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ProgressRing from '@/components/molecules/ProgressRing'
import ApperIcon from '@/components/ApperIcon'
import { taskService } from '@/services/api/taskService'
import { toast } from 'react-toastify'

const Header = ({ onAddTask, currentCategoryId }) => {
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [quickTitle, setQuickTitle] = useState('')
  const [dailyProgress, setDailyProgress] = useState(0)
  const [totalTasks, setTotalTasks] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)
  
  useEffect(() => {
    loadProgress()
  }, [])
  
  const loadProgress = async () => {
    try {
      const tasks = await taskService.getAll()
      const today = new Date().toDateString()
      const todayTasks = tasks.filter(task => {
        const taskDate = task.dueDate ? new Date(task.dueDate).toDateString() : null
        return taskDate === today || (!task.dueDate && new Date(task.createdAt).toDateString() === today)
      })
      
      const completed = todayTasks.filter(task => task.completed).length
      const total = todayTasks.length
      
      setTotalTasks(total)
      setCompletedTasks(completed)
      setDailyProgress(total > 0 ? (completed / total) * 100 : 0)
    } catch (error) {
      console.error('Error loading progress:', error)
    }
  }
  
  const handleQuickAdd = async (e) => {
    e.preventDefault()
    if (!quickTitle.trim()) {
      toast.error('Please enter a task title')
      return
    }
    
    const newTask = {
      title: quickTitle.trim(),
      priority: 'medium',
      categoryId: currentCategoryId
    }
    
    try {
      await onAddTask(newTask)
      setQuickTitle('')
      setShowQuickAdd(false)
      toast.success('Task added successfully!')
      loadProgress()
    } catch (error) {
      toast.error('Failed to add task')
    }
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleQuickAdd(e)
    } else if (e.key === 'Escape') {
      setShowQuickAdd(false)
      setQuickTitle('')
    }
  }
  
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm border-b border-gray-100 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="CheckSquare" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-sm text-gray-500">Stay organized, get things done</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ProgressRing 
              progress={dailyProgress} 
              size={60} 
              strokeWidth={6}
              className="hidden sm:block"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-700">Today's Progress</p>
              <p className="text-xs text-gray-500">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {showQuickAdd ? (
            <motion.form
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              onSubmit={handleQuickAdd}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Quick add task..."
                value={quickTitle}
                onChange={(e) => setQuickTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                className="px-4 py-2 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
                autoFocus
              />
              <Button type="submit" size="sm">
                <ApperIcon name="Plus" size={16} />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowQuickAdd(false)
                  setQuickTitle('')
                }}
              >
                <ApperIcon name="X" size={16} />
              </Button>
            </motion.form>
          ) : (
            <Button
              onClick={() => setShowQuickAdd(true)}
              className="hidden sm:flex"
            >
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Quick Add
            </Button>
          )}
          
          <Button
            onClick={() => setShowQuickAdd(true)}
            size="sm"
            className="sm:hidden"
          >
            <ApperIcon name="Plus" size={16} />
          </Button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
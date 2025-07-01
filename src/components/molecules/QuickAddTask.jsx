import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'

const QuickAddTask = ({ onAddTask, currentCategoryId }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('')
  const [dueDate, setDueDate] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      toast.error('Please enter a task title')
      return
    }
    
    const newTask = {
      title: title.trim(),
      priority: priority || 'medium',
      dueDate: dueDate || null,
      categoryId: currentCategoryId
    }
    
    onAddTask(newTask)
    setTitle('')
    setPriority('')
    setDueDate('')
    setIsExpanded(false)
    toast.success('Task added successfully!')
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
    if (e.key === 'Escape') {
      setIsExpanded(false)
      setTitle('')
      setPriority('')
      setDueDate('')
    }
  }
  
  return (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-md p-4 mb-6"
    >
      {!isExpanded ? (
        <motion.div
          onClick={() => setIsExpanded(true)}
          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
        >
          <ApperIcon name="Plus" className="text-primary" size={20} />
          <span className="text-gray-500 font-medium">Add a new task...</span>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
            className="border-0 shadow-none text-lg font-medium focus:ring-0 focus:border-0 p-0"
          />
          
          <div className="flex flex-wrap gap-3">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            >
              <option value="">Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button type="submit" size="sm">
              <ApperIcon name="Plus" size={16} className="mr-1" />
              Add Task
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsExpanded(false)
                setTitle('')
                setPriority('')
                setDueDate('')
              }}
            >
              Cancel
            </Button>
          </div>
        </motion.form>
      )}
    </motion.div>
  )
}

export default QuickAddTask
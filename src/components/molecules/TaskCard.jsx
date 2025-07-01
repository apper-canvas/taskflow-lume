import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, isBefore, isToday, isTomorrow } from 'date-fns'
import Checkbox from '@/components/atoms/Checkbox'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'

const TaskCard = ({ 
  task, 
  onComplete, 
  onDelete, 
  onEdit,
  draggable = true,
  onDragStart,
  onDragEnd,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  
  const handleComplete = () => {
    onComplete(task.Id)
    if (!task.completed) {
      toast.success('Task completed! 🎉')
    }
  }
  
  const handleEdit = () => {
    if (isEditing && editTitle.trim() && editTitle !== task.title) {
      onEdit(task.Id, { title: editTitle.trim() })
      toast.info('Task updated')
    }
    setIsEditing(!isEditing)
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      setEditTitle(task.title)
      setIsEditing(false)
    }
  }
  
  const getDueDateDisplay = () => {
    if (!task.dueDate) return null
    
    const dueDate = new Date(task.dueDate)
    const now = new Date()
    
    if (isBefore(dueDate, now) && !isToday(dueDate)) {
      return { text: 'Overdue', variant: 'error', urgent: true }
    } else if (isToday(dueDate)) {
      return { text: 'Today', variant: 'warning', urgent: true }
    } else if (isTomorrow(dueDate)) {
      return { text: 'Tomorrow', variant: 'primary', urgent: false }
    } else {
      return { text: format(dueDate, 'MMM d'), variant: 'default', urgent: false }
    }
  }
  
  const dueDateInfo = getDueDateDisplay()
  const priorityClass = task.priority ? `priority-${task.priority}` : ''
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`
        bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-4 cursor-pointer
        ${priorityClass} ${task.completed ? 'opacity-60' : ''}
        ${className}
      `}
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', task.Id.toString())
        onDragStart?.(task)
      }}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={handleComplete}
            size="md"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={handleKeyPress}
              className="w-full p-2 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
          ) : (
            <h3 
              className={`font-medium text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}
              onClick={() => setIsEditing(true)}
            >
              {task.title}
            </h3>
          )}
          
          <div className="flex items-center space-x-2 mt-2">
            {task.priority && (
              <Badge variant={task.priority} size="xs">
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
            )}
            
            {dueDateInfo && (
              <Badge 
                variant={dueDateInfo.variant} 
                size="xs"
                className={dueDateInfo.urgent ? 'animate-pulse' : ''}
              >
                <ApperIcon name="Calendar" size={12} className="mr-1" />
                {dueDateInfo.text}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="p-1 hover:bg-primary/10"
          >
            <ApperIcon name="Edit2" size={14} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onDelete(task.Id)
              toast.success('Task deleted')
            }}
            className="p-1 hover:bg-error/10 text-error"
          >
            <ApperIcon name="Trash2" size={14} />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard
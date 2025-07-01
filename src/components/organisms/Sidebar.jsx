import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import CategoryItem from '@/components/molecules/CategoryItem'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'
import { categoryService } from '@/services/api/categoryService'
import { taskService } from '@/services/api/taskService'
import { toast } from 'react-toastify'

const Sidebar = () => {
  const { categoryId } = useParams()
  const [categories, setCategories] = useState([])
  const [taskCounts, setTaskCounts] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryColor, setNewCategoryColor] = useState('#5B4FE9')
  const [loading, setLoading] = useState(true)
  
  const colorOptions = [
    '#5B4FE9', '#8B7FFF', '#FF6B8A', '#10B981', '#F59E0B', 
    '#EF4444', '#3B82F6', '#8B5CF6', '#06B6D4', '#84CC16'
  ]
  
  useEffect(() => {
    loadCategories()
    loadTaskCounts()
  }, [])
  
  const loadCategories = async () => {
    try {
      setLoading(true)
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (error) {
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }
  
  const loadTaskCounts = async () => {
    try {
      const tasks = await taskService.getAll()
      const counts = {}
      
      tasks.forEach(task => {
        if (!task.completed) {
          counts[task.categoryId] = (counts[task.categoryId] || 0) + 1
        }
      })
      
      setTaskCounts(counts)
    } catch (error) {
      console.error('Error loading task counts:', error)
    }
  }
  
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error('Please enter a category name')
      return
    }
    
    try {
      await categoryService.create({
        name: newCategoryName.trim(),
        color: newCategoryColor
      })
      
      setNewCategoryName('')
      setNewCategoryColor('#5B4FE9')
      setShowAddForm(false)
      loadCategories()
      toast.success('Category added successfully!')
    } catch (error) {
      toast.error('Failed to add category')
    }
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCategory()
    } else if (e.key === 'Escape') {
      setShowAddForm(false)
      setNewCategoryName('')
      setNewCategoryColor('#5B4FE9')
    }
  }
  
  const currentCategoryId = categoryId ? parseInt(categoryId) : 1
  
  if (loading) {
    return (
      <div className="w-80 bg-white border-r border-gray-100 p-6">
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 bg-white border-r border-gray-100 p-6 overflow-y-auto"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map(category => (
              <CategoryItem
                key={category.Id}
                category={category}
                taskCount={taskCounts[category.Id] || 0}
                isActive={category.Id === currentCategoryId}
              />
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-6">
          {showAddForm ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <Input
                label="Category Name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter category name"
                autoFocus
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      onClick={() => setNewCategoryColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                        newCategoryColor === color ? 'border-gray-400 scale-110' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleAddCategory} size="sm">
                  <ApperIcon name="Plus" size={16} className="mr-1" />
                  Add
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddForm(false)
                    setNewCategoryName('')
                    setNewCategoryColor('#5B4FE9')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          ) : (
            <Button
              variant="ghost"
              onClick={() => setShowAddForm(true)}
              className="w-full justify-start"
            >
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Add Category
            </Button>
          )}
        </div>
        
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-sm">
              <ApperIcon name="Calendar" size={16} className="mr-2" />
              Today's Tasks
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm">
              <ApperIcon name="Star" size={16} className="mr-2" />
              Important
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm">
              <ApperIcon name="CheckSquare" size={16} className="mr-2" />
              Completed
            </Button>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar
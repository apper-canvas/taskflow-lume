import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const CategoryItem = ({ category, taskCount = 0, isActive = false }) => {
  const linkPath = category.Id === 1 ? '/' : `/category/${category.Id}`
  
  return (
    <NavLink
      to={linkPath}
      className={({ isActive: linkActive }) =>
        `block w-full ${linkActive || isActive ? 'bg-gradient-to-r from-primary/10 to-secondary/10' : ''}`
      }
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center justify-between p-3 rounded-lg transition-all duration-200
          hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5
          ${isActive ? 'bg-gradient-to-r from-primary/10 to-secondary/10' : ''}
        `}
      >
        <div className="flex items-center space-x-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <span className="font-medium text-gray-700">{category.name}</span>
        </div>
        
        {taskCount > 0 && (
          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
            {taskCount}
          </span>
        )}
      </motion.div>
    </NavLink>
  )
}

export default CategoryItem
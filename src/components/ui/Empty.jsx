import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = 'No items found', 
  message = 'Get started by adding your first item',
  actionText = 'Add Item',
  onAction,
  icon = 'Inbox',
  className = ''
}) => {
  return (
    <div className={`flex-1 p-6 ${className}`}>
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name={icon} className="text-primary" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-display mb-2">
              {title}
            </h3>
            <p className="text-gray-600">{message}</p>
          </div>
          
          {onAction && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onAction}
                className="w-full"
                variant="primary"
              >
                <ApperIcon name="Plus" size={16} className="mr-2" />
                {actionText}
              </Button>
            </motion.div>
          )}
          
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center">
              <ApperIcon name="Lightbulb" size={14} className="mr-1" />
              <span>Tip: Use keyboard shortcuts</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Empty
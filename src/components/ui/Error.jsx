import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = 'Something went wrong', 
  onRetry, 
  title = 'Oops!',
  className = ''
}) => {
  return (
    <div className={`flex-1 p-6 ${className}`}>
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-error/10 to-red-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="AlertTriangle" className="text-error" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-display mb-2">
              {title}
            </h3>
            <p className="text-gray-600">{message}</p>
          </div>
          
          {onRetry && (
            <div className="space-y-3">
              <Button
                onClick={onRetry}
                className="w-full"
                variant="primary"
              >
                <ApperIcon name="RefreshCw" size={16} className="mr-2" />
                Try Again
              </Button>
              
              <Button
                onClick={() => window.location.reload()}
                variant="ghost"
                className="w-full"
              >
                Refresh Page
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Error
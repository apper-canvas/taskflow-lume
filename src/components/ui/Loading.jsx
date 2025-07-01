import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 mb-2 skeleton"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 skeleton"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-16 skeleton"></div>
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-20 skeleton"></div>
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-24 skeleton"></div>
          </div>
        </div>
        
        {/* Quick Add Skeleton */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg skeleton"></div>
        </div>
        
        {/* Task Cards Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-md p-4"
            >
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md skeleton"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 skeleton"></div>
                  <div className="flex space-x-2">
                    <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16 skeleton"></div>
                    <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-20 skeleton"></div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-6 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded skeleton"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded skeleton"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading
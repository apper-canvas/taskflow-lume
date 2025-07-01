import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = ({ 
  checked = false, 
  onChange, 
  size = 'md', 
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      <div
        className={`
          ${sizes[size]} rounded-md border-2 cursor-pointer transition-all duration-300
          ${checked 
            ? 'bg-gradient-to-r from-success to-green-400 border-success' 
            : 'border-gray-300 hover:border-primary'
          }
          flex items-center justify-center
        `}
        onClick={() => onChange?.({ target: { checked: !checked } })}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ApperIcon name="Check" className="text-white" size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Checkbox
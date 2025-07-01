const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'sm', 
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full"
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary",
    success: "bg-gradient-to-r from-success/10 to-green-400/10 text-success",
    warning: "bg-gradient-to-r from-warning/10 to-yellow-400/10 text-warning",
    error: "bg-gradient-to-r from-error/10 to-red-400/10 text-error",
    high: "bg-gradient-to-r from-priority-high/10 to-red-400/10 text-priority-high",
    medium: "bg-gradient-to-r from-priority-medium/10 to-yellow-400/10 text-priority-medium",
    low: "bg-gradient-to-r from-priority-low/10 to-green-400/10 text-priority-low"
  }
  
  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-0.5 text-sm",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  }
  
  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
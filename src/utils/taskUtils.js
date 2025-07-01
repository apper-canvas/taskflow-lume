export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return '#EF4444'
    case 'medium':
      return '#F59E0B'
    case 'low':
      return '#10B981'
    default:
      return '#6B7280'
  }
}

export const getPriorityLabel = (priority) => {
  switch (priority) {
    case 'high':
      return 'High Priority'
    case 'medium':
      return 'Medium Priority'
    case 'low':
      return 'Low Priority'
    default:
      return 'No Priority'
  }
}

export const filterTasksByPriority = (tasks, priority) => {
  return tasks.filter(task => task.priority === priority)
}

export const getTaskStats = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = total - completed
  const highPriority = tasks.filter(task => task.priority === 'high' && !task.completed).length
  
  return {
    total,
    completed,
    pending,
    highPriority,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  }
}

export const groupTasksByCategory = (tasks, categories) => {
  const grouped = {}
  
  categories.forEach(category => {
    grouped[category.Id] = {
      category,
      tasks: tasks.filter(task => task.categoryId === category.Id)
    }
  })
  
  return grouped
}

export const searchTasks = (tasks, query) => {
  if (!query.trim()) return tasks
  
  const searchTerm = query.toLowerCase().trim()
  
  return tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm) ||
    task.priority.toLowerCase().includes(searchTerm)
  )
}

export const getTasksForToday = (tasks) => {
  const today = new Date().toDateString()
  
  return tasks.filter(task => {
    if (!task.dueDate) return false
    return new Date(task.dueDate).toDateString() === today
  })
}

export const getOverdueTasks = (tasks) => {
  const now = new Date()
  const today = now.toDateString()
  
  return tasks.filter(task => {
    if (!task.dueDate || task.completed) return false
    const taskDate = new Date(task.dueDate)
    return taskDate < now && taskDate.toDateString() !== today
  })
}
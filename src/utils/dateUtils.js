import { format, isToday, isTomorrow, isPast, isThisWeek, startOfWeek, endOfWeek } from 'date-fns'

export const formatTaskDate = (date) => {
  if (!date) return null
  
  const taskDate = new Date(date)
  
  if (isToday(taskDate)) {
    return 'Today'
  } else if (isTomorrow(taskDate)) {
    return 'Tomorrow'
  } else if (isPast(taskDate)) {
    return `Overdue (${format(taskDate, 'MMM d')})`
  } else if (isThisWeek(taskDate)) {
    return format(taskDate, 'EEEE')
  } else {
    return format(taskDate, 'MMM d, yyyy')
  }
}

export const getTaskDateStatus = (date) => {
  if (!date) return 'none'
  
  const taskDate = new Date(date)
  
  if (isPast(taskDate) && !isToday(taskDate)) {
    return 'overdue'
  } else if (isToday(taskDate)) {
    return 'today'
  } else if (isTomorrow(taskDate)) {
    return 'tomorrow'
  } else if (isThisWeek(taskDate)) {
    return 'this-week'
  } else {
    return 'future'
  }
}

export const sortTasksByDate = (tasks) => {
  return [...tasks].sort((a, b) => {
    // Tasks without dates go to the end
    if (!a.dueDate && !b.dueDate) return 0
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    
    return new Date(a.dueDate) - new Date(b.dueDate)
  })
}

export const getWeekTasks = (tasks) => {
  const now = new Date()
  const weekStart = startOfWeek(now)
  const weekEnd = endOfWeek(now)
  
  return tasks.filter(task => {
    if (!task.dueDate) return false
    const taskDate = new Date(task.dueDate)
    return taskDate >= weekStart && taskDate <= weekEnd
  })
}
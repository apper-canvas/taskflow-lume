import mockTasks from '@/services/mockData/tasks.json'

class TaskService {
  constructor() {
    this.tasks = [...mockTasks]
  }
  
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.tasks]
  }
  
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const task = this.tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  }
  
  async create(taskData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      completed: false,
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
      categoryId: taskData.categoryId || 1,
      order: this.tasks.length,
      createdAt: new Date().toISOString()
    }
    
    this.tasks.push(newTask)
    return { ...newTask }
  }
  
  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks[index] = { ...this.tasks[index], ...updates }
    return { ...this.tasks[index] }
  }
  
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const index = this.tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    const deletedTask = this.tasks.splice(index, 1)[0]
    return { ...deletedTask }
  }
  
  async getByCategory(categoryId) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.tasks.filter(task => task.categoryId === parseInt(categoryId))
  }
  
  async getByPriority(priority) {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.tasks.filter(task => task.priority === priority)
  }
  
  async getCompleted() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.tasks.filter(task => task.completed)
  }
  
  async getPending() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.tasks.filter(task => !task.completed)
  }
}

export const taskService = new TaskService()
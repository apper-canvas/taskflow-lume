import { useState, useEffect } from 'react'
import { taskService } from '@/services/api/taskService'

export const useTasks = (categoryId = null) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const loadTasks = async () => {
    try {
      setLoading(true)
      setError('')
      
      let data
      if (categoryId) {
        data = await taskService.getByCategory(categoryId)
      } else {
        data = await taskService.getAll()
      }
      
      setTasks(data)
    } catch (err) {
      setError(err.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }
  
  const addTask = async (taskData) => {
    try {
      await taskService.create(taskData)
      loadTasks()
    } catch (err) {
      throw new Error(err.message || 'Failed to add task')
    }
  }
  
  const updateTask = async (id, updates) => {
    try {
      await taskService.update(id, updates)
      loadTasks()
    } catch (err) {
      throw new Error(err.message || 'Failed to update task')
    }
  }
  
  const deleteTask = async (id) => {
    try {
      await taskService.delete(id)
      loadTasks()
    } catch (err) {
      throw new Error(err.message || 'Failed to delete task')
    }
  }
  
  const toggleTask = async (id) => {
    try {
      const task = tasks.find(t => t.Id === id)
      if (task) {
        await taskService.update(id, { completed: !task.completed })
        loadTasks()
      }
    } catch (err) {
      throw new Error(err.message || 'Failed to toggle task')
    }
  }
  
  useEffect(() => {
    loadTasks()
  }, [categoryId])
  
  return {
    tasks,
    loading,
    error,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask
  }
}
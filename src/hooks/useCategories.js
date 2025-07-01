import { useState, useEffect } from 'react'
import { categoryService } from '@/services/api/categoryService'

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const loadCategories = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      setError(err.message || 'Failed to load categories')
    } finally {
      setLoading(false)
    }
  }
  
  const addCategory = async (categoryData) => {
    try {
      await categoryService.create(categoryData)
      loadCategories()
    } catch (err) {
      throw new Error(err.message || 'Failed to add category')
    }
  }
  
  const updateCategory = async (id, updates) => {
    try {
      await categoryService.update(id, updates)
      loadCategories()
    } catch (err) {
      throw new Error(err.message || 'Failed to update category')
    }
  }
  
  const deleteCategory = async (id) => {
    try {
      await categoryService.delete(id)
      loadCategories()
    } catch (err) {
      throw new Error(err.message || 'Failed to delete category')
    }
  }
  
  useEffect(() => {
    loadCategories()
  }, [])
  
  return {
    categories,
    loading,
    error,
    loadCategories,
    addCategory,
    updateCategory,
    deleteCategory
  }
}
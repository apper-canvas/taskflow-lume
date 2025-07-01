import { useParams } from 'react-router-dom'
import TaskList from '@/components/organisms/TaskList'

const TaskBoard = () => {
  const { categoryId } = useParams()
  const currentCategoryId = categoryId ? parseInt(categoryId) : 1
  
  const handleTaskUpdate = () => {
    // This will trigger updates in other components if needed
    // For now, the TaskList component handles its own updates
  }
  
  return (
    <TaskList 
      categoryId={currentCategoryId} 
      onTaskUpdate={handleTaskUpdate}
    />
  )
}

export default TaskBoard
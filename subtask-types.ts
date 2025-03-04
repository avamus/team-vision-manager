export interface Subtask {
    id: string;
    title: string;
    completed: boolean;
  }
  
  export interface Goal {
    title: string;
    description: string;
    progress: number;
    deadline?: string; // ISO String format
    subtasks: Subtask[];
  }
  
  export const calculateProgress = (subtasks: Subtask[]): number => {
    if (subtasks.length === 0) return 0;
    
    const completedCount = subtasks.filter(subtask => subtask.completed).length;
    return Math.round((completedCount / subtasks.length) * 100);
  };
  
  export const generateId = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };

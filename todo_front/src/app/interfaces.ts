export enum Priority {
  CRITICAL = 0,
  HIGH = 1,
  MEDIUM = 2,
  LOW = 3,
  MINOR = 4,
}

export interface Todo {
  id: number;
  userId?: number;
  content: string;
  isCompleted: boolean;
  priority: Priority;
}

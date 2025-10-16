export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InboxItem {
  id: string;
  content: string;
  userId: string;
  processed: boolean;
  createdAt: Date;
  aiResult?: AIProcessingResult;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assigneeId?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  sourceInboxId?: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface AIProcessingResult {
  suggestedTitle: string;
  cleanedDescription: string;
  suggestedDueDate?: Date;
  suggestedAssignee?: string;
  detectedCategory: string;
  matchedSOPTemplate?: SOPTemplate;
  confidence: number;
}

export interface SOPTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: SOPStep[];
  keywords: string[];
}

export interface SOPStep {
  id: string;
  content: string;
  order: number;
  required: boolean;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
  assigneeId?: string;
  dueDate?: Date;
  sourceInboxId?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
  assigneeId?: string;
  dueDate?: Date;
}
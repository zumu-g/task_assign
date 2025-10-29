# **FlowAI Implementation Guide**

*Step-by-step guide for building the type-safe, full-stack TypeScript FlowAI application*

## **🚀 Phase 1: Project Setup & Foundation (Weeks 1-2)**

### **Step 1.1: Monorepo Initialization**

**Create the monorepo structure:**
```bash
# Initialize the monorepo
npx create-turbo@latest flowai
cd flowai

# Project structure
mkdir -p apps/web apps/api packages/shared packages/ui packages/config
mkdir -p tools/database tools/ci docs
```

**Configure package.json (root):**
```json
{
  "name": "flowai",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "clean": "turbo run clean",
    "db:generate": "turbo run db:generate",
    "db:push": "turbo run db:push",
    "db:studio": "turbo run db:studio"
  },
  "devDependencies": {
    "turbo": "latest",
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

### **Step 1.2: Frontend Setup (Next.js)**

**Initialize Next.js app:**
```bash
cd apps/web
npx create-next-app@latest . --typescript --tailwind --eslint --app
```

**Install dependencies:**
```bash
npm install @clerk/nextjs @tanstack/react-query zustand
npm install @dnd-kit/core @dnd-kit/sortable @fullcalendar/react
npm install react-hook-form @hookform/resolvers zod
npm install lucide-react class-variance-authority clsx tailwind-merge
```

**Configure shadcn/ui:**
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input textarea card dialog
npx shadcn-ui@latest add dropdown-menu select switch tabs
```

**Tailwind config for FlowAI design system:**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#0052FF',
          600: '#0041CC',
          700: '#0037B3',
        },
        // FlowAI design tokens
      },
      fontFamily: {
        sans: ['SF Pro Display', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

### **Step 1.3: Backend Setup (NestJS)**

**Initialize NestJS app:**
```bash
cd apps/api
npm i -g @nestjs/cli
nest new . --package-manager npm
```

**Install core dependencies:**
```bash
npm install @nestjs/config @nestjs/swagger
npm install @prisma/client prisma
npm install @nestjs/websockets @nestjs/platform-socket.io
npm install class-validator class-transformer
npm install @nestjs/throttler @nestjs/jwt
```

**Initialize Prisma:**
```bash
npx prisma init
```

### **Step 1.4: Shared Packages Setup**

**packages/shared/package.json:**
```json
{
  "name": "@flowai/shared",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

**Shared types structure:**
```typescript
// packages/shared/src/types.ts
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
```

---

## **🎨 Phase 2: Frontend Core Implementation (Weeks 3-5)**

### **Step 2.1: Authentication Setup (Clerk)**

**Configure Clerk:**
```typescript
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

**Protected routes:**
```typescript
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

### **Step 2.2: State Management Setup**

**Zustand store for UI state:**
```typescript
// lib/stores/ui-store.ts
import { create } from 'zustand'

interface UIState {
  currentView: 'list' | 'board' | 'calendar'
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  setCurrentView: (view: 'list' | 'board' | 'calendar') => void
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}

export const useUIStore = create<UIState>((set) => ({
  currentView: 'list',
  sidebarOpen: true,
  theme: 'system',
  setCurrentView: (view) => set({ currentView: view }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
}))
```

**TanStack Query setup:**
```typescript
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// app/providers.tsx
'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/lib/query-client'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### **Step 2.3: API Client Setup**

**API client with type safety:**
```typescript
// lib/api-client.ts
import { useAuth } from '@clerk/nextjs'

class APIClient {
  private baseURL: string

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  // Inbox operations
  async getInboxItems(): Promise<InboxItem[]> {
    return this.request('/inbox')
  }

  async createInboxItem(content: string): Promise<InboxItem> {
    return this.request('/inbox', {
      method: 'POST',
      body: JSON.stringify({ content }),
    })
  }

  async processInboxItem(id: string): Promise<AIProcessingResult> {
    return this.request(`/inbox/${id}/process`, {
      method: 'POST',
    })
  }

  // Task operations
  async getTasks(): Promise<Task[]> {
    return this.request('/tasks')
  }

  async createTask(task: Partial<Task>): Promise<Task> {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    return this.request(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
  }
}

export const apiClient = new APIClient()
```

---

## **⚙️ Phase 3: Backend Core Implementation (Weeks 3-5)**

### **Step 3.1: Database Schema (Prisma)**

**schema.prisma:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  clerkId   String   @unique
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  inboxItems InboxItem[]
  tasks      Task[]
  assignedTasks Task[] @relation("TaskAssignee")

  @@map("users")
}

model InboxItem {
  id        String   @id @default(cuid())
  content   String
  processed Boolean  @default(false)
  userId    String
  createdAt DateTime @default(now())

  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  tasks  Task[]

  @@map("inbox_items")
}

model Task {
  id          String     @id @default(cuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    Priority   @default(MEDIUM)
  dueDate     DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  userId         String
  assigneeId     String?
  sourceInboxId  String?

  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  assignee    User?      @relation("TaskAssignee", fields: [assigneeId], references: [id])
  sourceInbox InboxItem? @relation(fields: [sourceInboxId], references: [id])

  @@map("tasks")
}

model SOPTemplate {
  id          String    @id @default(cuid())
  name        String
  description String
  category    String
  keywords    String[]
  createdAt   DateTime  @default(now())

  steps SOPStep[]

  @@map("sop_templates")
}

model SOPStep {
  id          String      @id @default(cuid())
  content     String
  order       Int
  required    Boolean     @default(false)
  templateId  String

  template SOPTemplate @relation(fields: [templateId], references: [id], onDelete: Cascade)

  @@map("sop_steps")
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  IN_REVIEW
  DONE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

### **Step 3.2: NestJS Module Structure**

**Main application module:**
```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { InboxModule } from './inbox/inbox.module';
import { TasksModule } from './tasks/tasks.module';
import { AIModule } from './ai/ai.module';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    InboxModule,
    TasksModule,
    AIModule,
    WebSocketModule,
  ],
})
export class AppModule {}
```

**Prisma service:**
```typescript
// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```

### **Step 3.3: AI Service Implementation**

**AI service for processing inbox items:**
```typescript
// src/ai/ai.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AIService {
  private genAI: GoogleGenerativeAI;

  constructor(private config: ConfigService) {
    this.genAI = new GoogleGenerativeAI(
      this.config.get('GEMINI_API_KEY')
    );
  }

  async processInboxItem(content: string): Promise<AIProcessingResult> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = this.buildPrompt(content);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    try {
      const parsedResult = JSON.parse(response.text());
      return this.validateAndFormatResult(parsedResult);
    } catch (error) {
      throw new Error('Failed to parse AI response');
    }
  }

  private buildPrompt(content: string): string {
    return `
      Analyze the following text and extract task information. Return a JSON object with:
      - suggestedTitle: A concise, action-oriented title (max 60 chars)
      - cleanedDescription: The original text cleaned up for clarity
      - suggestedDueDate: ISO date string if mentioned, null otherwise
      - suggestedAssignee: Name or role if mentioned, null otherwise
      - detectedCategory: One of: feature, bug, support, admin, other
      - confidence: Number between 0 and 1 indicating confidence

      Text to analyze: "${content}"

      Return only valid JSON:
    `;
  }

  private validateAndFormatResult(result: any): AIProcessingResult {
    // Validation and formatting logic
    return {
      suggestedTitle: result.suggestedTitle || 'Untitled Task',
      cleanedDescription: result.cleanedDescription || content,
      suggestedDueDate: result.suggestedDueDate ? new Date(result.suggestedDueDate) : null,
      suggestedAssignee: result.suggestedAssignee || null,
      detectedCategory: result.detectedCategory || 'other',
      confidence: Math.min(Math.max(result.confidence || 0.5, 0), 1),
    };
  }
}
```

### **Step 3.4: API Controllers**

**Inbox controller:**
```typescript
// src/inbox/inbox.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('inbox')
@UseGuards(AuthGuard)
export class InboxController {
  constructor(private inboxService: InboxService) {}

  @Get()
  async getInboxItems(@CurrentUser() user: any) {
    return this.inboxService.getInboxItems(user.id);
  }

  @Post()
  async createInboxItem(
    @CurrentUser() user: any,
    @Body() createInboxDto: { content: string }
  ) {
    return this.inboxService.createInboxItem(user.id, createInboxDto.content);
  }

  @Post(':id/process')
  async processInboxItem(
    @CurrentUser() user: any,
    @Param('id') id: string
  ) {
    return this.inboxService.processInboxItem(user.id, id);
  }
}
```

---

## **🔄 Phase 4: Real-time Features (Week 6)**

### **Step 4.1: WebSocket Implementation**

**WebSocket gateway:**
```typescript
// src/websocket/websocket.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from '../auth/ws-auth.guard';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class WebSocketGateway {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: string }
  ) {
    client.join(`user_${data.userId}`);
  }

  // Emit task updates to all connected clients
  emitTaskUpdate(userId: string, task: any) {
    this.server.to(`user_${userId}`).emit('taskUpdated', task);
  }

  emitInboxUpdate(userId: string, item: any) {
    this.server.to(`user_${userId}`).emit('inboxUpdated', item);
  }
}
```

---

## **🎯 Phase 5: Frontend UI Components (Weeks 7-11)**

### **Step 5.1: Inbox Components**

**Inbox capture component:**
```typescript
// components/inbox/inbox-capture.tsx
'use client'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles } from 'lucide-react'

export function InboxCapture() {
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (content: string) => apiClient.createInboxItem(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inbox'] })
      setContent('')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      createMutation.mutate(content.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What's on your mind? Capture anything that comes up..."
        className="min-h-24 resize-none"
        autoFocus
      />
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Press <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">⌘ + Enter</kbd> to add
        </p>
        <Button
          type="submit"
          disabled={!content.trim() || createMutation.isPending}
          className="gap-2"
        >
          <Sparkles className="w-4 h-4" />
          {createMutation.isPending ? 'Adding...' : 'Add to Inbox'}
        </Button>
      </div>
    </form>
  )
}
```

### **Step 5.2: Task Management Components**

**Canvas layout with view switching:**
```typescript
// components/canvas/canvas-layout.tsx
'use client'
import { useUIStore } from '@/lib/stores/ui-store'
import { ViewSwitcher } from './view-switcher'
import { ListView } from './list-view'
import { BoardView } from './board-view'
import { CalendarView } from './calendar-view'

export function CanvasLayout() {
  const currentView = useUIStore((state) => state.currentView)

  const renderView = () => {
    switch (currentView) {
      case 'list':
        return <ListView />
      case 'board':
        return <BoardView />
      case 'calendar':
        return <CalendarView />
      default:
        return <ListView />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Canvas</h1>
          <p className="text-gray-600">Organize and visualize your work</p>
        </div>
        <ViewSwitcher />
      </div>
      {renderView()}
    </div>
  )
}
```

---

## **📊 Phase 6: Performance & Production (Weeks 12-15)**

### **Step 6.1: Performance Optimization**

**Frontend optimizations:**
```typescript
// Next.js config optimizations
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@tanstack/react-query', 'lucide-react'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
}

module.exports = nextConfig
```

**Backend caching:**
```typescript
// src/cache/cache.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  private redis: Redis;

  constructor(private config: ConfigService) {
    this.redis = new Redis(this.config.get('REDIS_URL'));
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
```

### **Step 6.2: Deployment Configuration**

**Vercel deployment (Frontend):**
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "env": {
    "NEXT_PUBLIC_API_URL": "@api-url",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY": "@clerk-publishable-key"
  },
  "build": {
    "env": {
      "CLERK_SECRET_KEY": "@clerk-secret-key"
    }
  }
}
```

**Render deployment (Backend):**
```dockerfile
# Dockerfile for NestJS
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
```

This implementation guide provides a complete roadmap for building FlowAI using the modern TypeScript stack, with type safety throughout and scalable architecture patterns.
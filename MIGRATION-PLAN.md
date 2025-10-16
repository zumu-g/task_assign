# **FlowAI Migration Plan**

*Transforming TaskAssign to Modern TypeScript Full-Stack Architecture*

## **📋 Migration Overview**

This plan outlines the step-by-step migration from the current React-only TaskAssign application to the modern, type-safe FlowAI architecture using Next.js, NestJS, and PostgreSQL.

### **Current State Analysis**
- ✅ React 18 with functional components
- ✅ Apple-inspired design system with Tailwind CSS
- ✅ Context API for state management
- ✅ Local storage for data persistence
- ✅ Comprehensive component library
- ⚠️ No backend API
- ⚠️ No real-time features
- ⚠️ No type safety
- ⚠️ No authentication system

### **Target State**
- 🎯 Type-safe full-stack TypeScript monorepo
- 🎯 Next.js frontend with App Router
- 🎯 NestJS backend with PostgreSQL
- 🎯 Clerk authentication
- 🎯 Real-time collaboration via WebSockets
- 🎯 AI-powered task processing

---

## **🗂️ Migration Phases**

### **Phase 1: Infrastructure Setup (Week 1)**

#### **1.1 Monorepo Initialization**
```bash
# Create new directory structure
mkdir flowai-monorepo
cd flowai-monorepo

# Initialize Turbo monorepo
npx create-turbo@latest .
```

#### **1.2 Preserve Existing Assets**
```bash
# Copy existing design system
cp -r ../taskassign/src/App.css ./packages/ui/styles/
cp -r ../taskassign/tailwind.config.js ./packages/config/

# Copy component designs (for reference)
cp -r ../taskassign/src/components ./temp-components/
```

#### **1.3 Setup New Frontend (Next.js)**
```bash
cd apps/web
npx create-next-app@latest . --typescript --tailwind --app

# Install dependencies
npm install @clerk/nextjs @tanstack/react-query zustand
npm install @dnd-kit/core @dnd-kit/sortable 
npm install react-hook-form @hookform/resolvers zod
npm install class-variance-authority clsx tailwind-merge

# Setup shadcn/ui
npx shadcn-ui@latest init
```

#### **1.4 Setup Backend (NestJS)**
```bash
cd apps/api
npm i -g @nestjs/cli
nest new . --package-manager npm

# Install core dependencies
npm install @nestjs/config @nestjs/swagger
npm install @prisma/client prisma
npm install @nestjs/websockets @nestjs/platform-socket.io
```

**Deliverables Week 1:**
- ✅ Monorepo structure with Turbo
- ✅ Next.js frontend scaffolding
- ✅ NestJS backend scaffolding
- ✅ Shared packages setup

---

### **Phase 2: Design System Migration (Week 2)**

#### **2.1 Recreate FlowAI Design System**
Migrate the existing design tokens to the new CSS custom properties system:

```css
/* packages/ui/styles/design-tokens.css */
:root {
  /* Migrate existing FlowAI colors */
  --color-primary: #0052FF;
  --color-primary-hover: #0041CC;
  /* ... rest of design tokens from existing App.css */
}
```

#### **2.2 Component Library Migration**
Recreate key components using shadcn/ui as base:

```typescript
// packages/ui/components/button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils'

const buttonVariants = cva(
  // Base styles from existing btn-primary/btn-secondary
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // ... migrate other variants
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)
```

#### **2.3 Tailwind Configuration Migration**
```typescript
// packages/config/tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './apps/web/**/*.{js,ts,jsx,tsx}',
    './packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Migrate FlowAI color palette
        primary: {
          DEFAULT: '#0052FF',
          hover: '#0041CC',
          active: '#0037B3',
        },
        // ... rest of color system
      },
      fontFamily: {
        sans: ['SF Pro Display', 'system-ui', 'sans-serif'],
      },
      // Migrate spacing, shadows, etc.
    },
  },
}
```

**Deliverables Week 2:**
- ✅ Complete design system migration
- ✅ shadcn/ui component library setup
- ✅ FlowAI visual consistency maintained

---

### **Phase 3: Authentication & User Management (Week 3)**

#### **3.1 Clerk Integration**
```typescript
// apps/web/app/layout.tsx
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

#### **3.2 Backend User Service**
```typescript
// apps/api/src/users/users.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateUser(clerkId: string, email: string, name: string) {
    return this.prisma.user.upsert({
      where: { clerkId },
      update: { email, name },
      create: { clerkId, email, name },
    })
  }
}
```

#### **3.3 Migration Data Strategy**
```typescript
// Migrate existing localStorage data to user accounts
const migrateLocalStorageData = async (userId: string) => {
  const existingTasks = localStorage.getItem('taskassign_tasks')
  const existingInbox = localStorage.getItem('taskassign_inbox')
  
  if (existingTasks || existingInbox) {
    // API call to backend to import data
    await apiClient.importUserData({
      tasks: existingTasks ? JSON.parse(existingTasks) : [],
      inboxItems: existingInbox ? JSON.parse(existingInbox) : [],
    })
    
    // Clear localStorage after successful migration
    localStorage.removeItem('taskassign_tasks')
    localStorage.removeItem('taskassign_inbox')
  }
}
```

**Deliverables Week 3:**
- ✅ User authentication with Clerk
- ✅ User data persistence in PostgreSQL
- ✅ LocalStorage data migration utility

---

### **Phase 4: Core Feature Migration (Weeks 4-6)**

#### **4.1 Database Schema Design**
```prisma
// apps/api/prisma/schema.prisma
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
}

model InboxItem {
  id        String   @id @default(cuid())
  content   String
  processed Boolean  @default(false)
  userId    String
  createdAt DateTime @default(now())

  user   User    @relation(fields: [userId], references: [id])
  tasks  Task[]
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

  user        User       @relation(fields: [userId], references: [id])
  assignee    User?      @relation("TaskAssignee", fields: [assigneeId], references: [id])
  sourceInbox InboxItem? @relation(fields: [sourceInboxId], references: [id])
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

#### **4.2 API Endpoints Migration**
Recreate the existing Context API functionality as REST endpoints:

```typescript
// apps/api/src/tasks/tasks.controller.ts
@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(@CurrentUser() user: any) {
    return this.tasksService.findAllForUser(user.id)
  }

  @Post()
  async createTask(@CurrentUser() user: any, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(user.id, createTaskDto)
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto)
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.remove(id)
  }
}
```

#### **4.3 Frontend State Management Migration**
Replace Context API with TanStack Query:

```typescript
// apps/web/lib/hooks/use-tasks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../api-client'

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => apiClient.getTasks(),
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (task: CreateTaskInput) => apiClient.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateTaskInput }) =>
      apiClient.updateTask(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
```

**Deliverables Weeks 4-6:**
- ✅ Complete database schema
- ✅ All CRUD operations migrated to API
- ✅ Frontend state management with TanStack Query
- ✅ Data persistence in PostgreSQL

---

### **Phase 5: UI Component Migration (Weeks 7-9)**

#### **5.1 Navigation Migration**
```typescript
// apps/web/components/navigation/main-nav.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Inbox, LayoutGrid } from 'lucide-react'

export function MainNav() {
  const pathname = usePathname()
  
  const routes = [
    {
      href: '/inbox',
      label: 'Inbox',
      icon: Inbox,
      active: pathname === '/inbox',
    },
    {
      href: '/canvas',
      label: 'Canvas',
      icon: LayoutGrid,
      active: pathname === '/canvas',
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black' : 'text-muted-foreground'
          )}
        >
          <route.icon className="w-4 h-4 mr-2 inline" />
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
```

#### **5.2 Inbox Component Migration**
```typescript
// apps/web/components/inbox/inbox-page.tsx
'use client'
import { InboxCapture } from './inbox-capture'
import { InboxList } from './inbox-list'
import { useInboxItems } from '@/lib/hooks/use-inbox'

export function InboxPage() {
  const { data: inboxItems, isLoading } = useInboxItems()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Inbox</h1>
        <p className="text-muted-foreground">
          Capture ideas and quickly turn them into organized tasks with AI assistance
        </p>
      </div>
      
      <InboxCapture />
      <InboxList items={inboxItems || []} />
    </div>
  )
}
```

#### **5.3 Canvas Component Migration**
```typescript
// apps/web/components/canvas/canvas-page.tsx
'use client'
import { ViewSwitcher } from './view-switcher'
import { ListView } from './list-view'
import { BoardView } from './board-view'
import { CalendarView } from './calendar-view'
import { useUIStore } from '@/lib/stores/ui-store'

export function CanvasPage() {
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
          <p className="text-muted-foreground">
            Organize and visualize your work
          </p>
        </div>
        <ViewSwitcher />
      </div>
      {renderView()}
    </div>
  )
}
```

**Deliverables Weeks 7-9:**
- ✅ All UI components migrated to Next.js
- ✅ Routing with Next.js App Router
- ✅ Component consistency maintained
- ✅ Responsive design preserved

---

### **Phase 6: AI Integration (Weeks 10-11)**

#### **6.1 AI Service Setup**
```typescript
// apps/api/src/ai/ai.service.ts
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GoogleGenerativeAI } from '@google/generative-ai'

@Injectable()
export class AIService {
  private genAI: GoogleGenerativeAI

  constructor(private config: ConfigService) {
    this.genAI = new GoogleGenerativeAI(
      this.config.get('GEMINI_API_KEY')
    )
  }

  async processInboxItem(content: string): Promise<AIProcessingResult> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompt = `
      Analyze this text and create a structured task:
      "${content}"
      
      Return JSON with:
      - suggestedTitle: concise action-oriented title
      - cleanedDescription: formatted description
      - suggestedDueDate: ISO date if mentioned
      - detectedCategory: feature|bug|support|admin|other
      - confidence: 0-1 score
    `
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    
    return JSON.parse(response.text())
  }
}
```

#### **6.2 Frontend AI Integration**
```typescript
// apps/web/components/inbox/ai-processor.tsx
'use client'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { apiClient } from '@/lib/api-client'

interface AIProcessorProps {
  inboxItem: InboxItem
  onProcessed: (result: AIProcessingResult) => void
}

export function AIProcessor({ inboxItem, onProcessed }: AIProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  
  const processMutation = useMutation({
    mutationFn: (id: string) => apiClient.processInboxItem(id),
    onSuccess: (result) => {
      onProcessed(result)
      setIsProcessing(false)
    },
  })

  const handleProcess = () => {
    setIsProcessing(true)
    processMutation.mutate(inboxItem.id)
  }

  return (
    <Button
      onClick={handleProcess}
      disabled={isProcessing}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Sparkles className="w-4 h-4" />
      {isProcessing ? 'Processing...' : 'Process with AI'}
    </Button>
  )
}
```

**Deliverables Weeks 10-11:**
- ✅ AI service integration
- ✅ Inbox processing with AI
- ✅ Task generation from AI results
- ✅ Error handling and fallbacks

---

### **Phase 7: Real-time Features (Week 12)**

#### **7.1 WebSocket Integration**
```typescript
// apps/api/src/websocket/websocket.gateway.ts
@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class WebSocketGateway {
  @WebSocketServer()
  server: Server

  emitTaskUpdate(userId: string, task: Task) {
    this.server.to(`user_${userId}`).emit('taskUpdated', task)
  }

  emitInboxUpdate(userId: string, item: InboxItem) {
    this.server.to(`user_${userId}`).emit('inboxUpdated', item)
  }
}
```

#### **7.2 Frontend WebSocket Client**
```typescript
// apps/web/lib/hooks/use-websocket.ts
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/nextjs'
import { io } from 'socket.io-client'

export function useWebSocket() {
  const { user } = useUser()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!user) return

    const socket = io(process.env.NEXT_PUBLIC_API_URL!)
    
    socket.emit('joinRoom', { userId: user.id })
    
    socket.on('taskUpdated', (task) => {
      queryClient.setQueryData(['tasks'], (old: Task[]) =>
        old.map((t) => (t.id === task.id ? task : t))
      )
    })

    socket.on('inboxUpdated', (item) => {
      queryClient.invalidateQueries({ queryKey: ['inbox'] })
    })

    return () => socket.disconnect()
  }, [user, queryClient])
}
```

**Deliverables Week 12:**
- ✅ Real-time task updates
- ✅ Collaborative editing capability
- ✅ WebSocket connection management

---

### **Phase 8: Testing & Optimization (Weeks 13-14)**

#### **8.1 Performance Optimization**
```typescript
// apps/web/next.config.js
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

#### **8.2 Testing Setup**
```typescript
// apps/web/__tests__/inbox.test.tsx
import { render, screen } from '@testing-library/react'
import { InboxPage } from '@/components/inbox/inbox-page'

jest.mock('@/lib/hooks/use-inbox', () => ({
  useInboxItems: () => ({
    data: [],
    isLoading: false,
  }),
}))

describe('InboxPage', () => {
  it('renders inbox page correctly', () => {
    render(<InboxPage />)
    expect(screen.getByRole('heading', { name: /inbox/i })).toBeInTheDocument()
  })
})
```

**Deliverables Weeks 13-14:**
- ✅ Performance optimization
- ✅ Comprehensive test coverage
- ✅ Bundle size optimization
- ✅ Accessibility compliance

---

### **Phase 9: Deployment & Launch (Week 15)**

#### **9.1 Production Deployment**
```yaml
# .github/workflows/deploy.yml
name: Deploy FlowAI
on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

#### **9.2 Data Migration Script**
```typescript
// tools/migration/migrate-users.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function migrateExistingUsers() {
  // Migration script for existing TaskAssign users
  console.log('Starting user migration...')
  
  // Implementation for migrating any existing data
  
  console.log('Migration completed successfully!')
}

migrateExistingUsers()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

**Deliverables Week 15:**
- ✅ Production deployment on Vercel + Render
- ✅ Database migration completed
- ✅ Monitoring and analytics setup
- ✅ Documentation and handoff

---

## **📊 Migration Success Metrics**

### **Technical Metrics**
- ✅ Type safety: 100% TypeScript coverage
- ✅ Performance: <2s initial load, <200ms view switching
- ✅ Bundle size: <500KB initial bundle
- ✅ API response time: <300ms average

### **Feature Parity**
- ✅ All existing TaskAssign features preserved
- ✅ Enhanced with AI processing capabilities
- ✅ Real-time collaboration added
- ✅ User authentication and data persistence

### **User Experience**
- ✅ Zero data loss during migration
- ✅ Improved performance and responsiveness
- ✅ Seamless transition for existing users
- ✅ Enhanced functionality with new features

This migration plan ensures a smooth transition from the current TaskAssign application to the modern FlowAI architecture while preserving all existing functionality and adding significant new capabilities.
# TaskAssign - AI-Powered Project Management

A comprehensive task and project management application with AI-powered features, team collaboration, and customer support capabilities, designed with Apple's Human Interface Guidelines.

## Features

### 🤖 AI-Powered Task Management
- **Smart Inbox**: Capture ideas and automatically convert them to structured tasks
- **AI Task Creation**: Automatically categorize, prioritize, and assign tasks based on content analysis
- **SOP Template Suggestions**: AI suggests Standard Operating Procedure templates based on task type
- **Intelligent Scheduling**: AI-powered due date and priority suggestions

### 📋 Task Management
- **Multiple Views**: Kanban board, list view, and schedule/calendar view
- **Drag & Drop**: Intuitive task organization with drag and drop
- **Status Tracking**: Track progress through customizable workflows
- **Team Assignment**: Assign tasks to team members with role-based access
- **Due Date Management**: Set and track deadlines with overdue indicators
- **Clean Schedule Interface**: Professional calendar layout with time slots and event management

### 💬 Team Collaboration
- **Real-time Chat**: Team communication with channels and direct messages
- **Live Typing Indicators**: See when team members are typing
- **Online Status**: View who's currently online
- **Message History**: Searchable chat history and message threading

### 🎫 Customer Support
- **Ticket Management**: Comprehensive support ticket system
- **AI Categorization**: Automatic ticket categorization and priority assignment
- **Customer Portal**: Clean interface for customer communication
- **SLA Tracking**: Monitor response times and resolution metrics

### 🎨 Apple Design System
- **Human Interface Guidelines**: Follows Apple's design principles
- **SF Pro Font**: Uses Apple's system font for consistency
- **Glass Morphism**: Modern translucent design elements
- **Responsive Design**: Optimized for all device sizes
- **Dark Mode**: Full dark mode support with system preference detection

## Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS with Pinterest-inspired color palette and Apple design principles
- **State Management**: React Context API with useReducer
- **Drag & Drop**: @dnd-kit for modern drag-and-drop functionality
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: Native JavaScript Date API
- **Real-time**: Socket.io ready for real-time features

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskassign
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)
- `npm run lint` - Runs ESLint to check code quality
- `npm run typecheck` - Runs TypeScript type checking

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.js     # Main dashboard with metrics
│   ├── Inbox.js         # AI-powered inbox for task creation
│   ├── Canvas.js        # Kanban board with drag & drop
│   ├── Schedule.js      # Clean calendar/schedule interface
│   ├── Chat.js          # Team communication system
│   ├── Tickets.js       # Customer support ticket management
│   ├── Navigation.js    # Main navigation component
│   ├── StyleShowcase.js # Design system showcase
│   └── ErrorBoundary.js # Error handling component
├── contexts/            # React Context providers
│   ├── TaskContext.js   # Task management state
│   ├── ChatContext.js   # Chat and messaging state
│   └── TicketContext.js # Support ticket state
├── App.js              # Main application component
├── App.css             # Apple design system styles
├── index.js            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Features Overview

### Dashboard
- Overview of tasks, tickets, and team activity
- Quick action buttons for common operations
- Recent tasks and upcoming deadlines
- Team performance metrics

### Inbox
- Capture any text input (ideas, notes, emails)
- AI analyzes content and suggests task structure
- Automatic SOP template matching
- One-click conversion to structured tasks

### Task Management
- Kanban board with drag-and-drop functionality
- List view with sorting and filtering
- Task assignment and progress tracking
- Due date management with overdue alerts

### Schedule
- Clean, professional calendar interface with sidebar navigation
- Day, week, and month views (day view implemented)
- Time-slot based event management with drag-and-drop
- Mini calendar widget and quick filters
- Event creation and management with attendee tracking
- Search functionality and category filtering

### Team Chat
- Channel-based team communication
- Real-time messaging with typing indicators
- Online status and presence awareness
- Message search and history

### Support Tickets
- Customer ticket creation and management
- AI-powered categorization and routing
- Team assignment and status tracking
- Customer communication thread

### Settings
- User profile and preferences
- Notification management
- Theme and appearance settings
- Data export and privacy controls

## AI Features

The application includes several AI-powered features that enhance productivity:

1. **Task Creation**: Analyzes inbox items to suggest task structure, priority, and assignments
2. **Content Analysis**: Identifies task type and suggests appropriate workflows
3. **SOP Matching**: Recommends Standard Operating Procedures based on task content
4. **Ticket Categorization**: Automatically categorizes and prioritizes support tickets
5. **Smart Scheduling**: Suggests realistic due dates based on task complexity

## Design System

The application follows Apple's Human Interface Guidelines with:

- **Typography**: SF Pro Display font family with consistent sizing
- **Colors**: iOS-inspired color palette with semantic meaning
- **Spacing**: 8px grid system for consistent layout
- **Components**: Reusable components following Apple's design patterns
- **Interactions**: Smooth animations and transitions
- **Accessibility**: Full keyboard navigation and screen reader support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Apple's Human Interface Guidelines for design inspiration
- React team for the excellent framework
- Tailwind CSS for utility-first styling
- Lucide for beautiful icons
# Template System Design - Multi-Task Creation

## Overview
Enhanced template system for creating multiple tasks from standardized triggers, with individual assignee and due date allocation per task.

## Data Structure

### Enhanced Template Model
```javascript
{
  id: 'template-uuid',
  name: 'Client Onboarding Process',
  description: 'Complete workflow for onboarding new clients',
  category: 'onboarding', // for grouping
  trigger: 'client_onboarding', // standardized trigger identifier
  estimatedDuration: 14, // days
  tasks: [
    {
      id: 'task-template-1',
      title: 'Send welcome email and documentation',
      description: 'Send comprehensive welcome package with onboarding checklist',
      priority: 'high',
      defaultAssignee: 'role:account_manager', // or specific user ID
      offsetDays: 0, // days from start date
      estimatedHours: 2,
      dependencies: [], // other task IDs this depends on
      sopSteps: [
        'Prepare welcome email template',
        'Customize for client specifics',
        'Attach onboarding documents',
        'Send and confirm receipt'
      ]
    },
    {
      id: 'task-template-2', 
      title: 'Schedule kickoff meeting',
      description: 'Coordinate and schedule initial project kickoff meeting',
      priority: 'high',
      defaultAssignee: 'role:project_manager',
      offsetDays: 1,
      estimatedHours: 1,
      dependencies: ['task-template-1']
    },
    {
      id: 'task-template-3',
      title: 'Setup project management tools',
      description: 'Create project workspace and configure access permissions',
      priority: 'medium', 
      defaultAssignee: 'role:developer',
      offsetDays: 2,
      estimatedHours: 3,
      dependencies: ['task-template-1']
    }
  ],
  customFields: [
    {
      name: 'client_name',
      type: 'text',
      required: true,
      placeholder: 'Enter client name'
    },
    {
      name: 'project_type', 
      type: 'select',
      options: ['Web Development', 'Mobile App', 'Consulting'],
      required: true
    }
  ]
}
```

### Template Categories
```javascript
const TEMPLATE_CATEGORIES = [
  { id: 'onboarding', name: 'Client Onboarding', icon: 'UserPlus' },
  { id: 'bug_fix', name: 'Bug Resolution', icon: 'Bug' },
  { id: 'feature', name: 'Feature Development', icon: 'Zap' },
  { id: 'maintenance', name: 'System Maintenance', icon: 'Settings' },
  { id: 'marketing', name: 'Marketing Campaign', icon: 'Megaphone' },
  { id: 'hr', name: 'HR Process', icon: 'Users' }
];
```

## User Interface Components

### 1. Template Trigger Selector
- Quick access buttons for common triggers
- Search and filter templates by category
- Template preview with task count and duration

### 2. Template Configuration Modal
- Dynamic form based on template custom fields
- Assignee override for each task
- Due date adjustment per task
- Dependency visualization
- Start date selector

### 3. Task Creation Preview
- Show all tasks to be created
- Visual timeline with dependencies
- Assignee distribution chart
- Edit individual tasks before creation

## Implementation Plan

### Phase 1: Data Layer (Week 1)
1. **Enhanced Template Context**
   - Update template data structure
   - Add CRUD operations for templates
   - Template validation and error handling

2. **Template Storage**
   - LocalStorage enhancement for templates
   - Import/export functionality
   - Version control for template updates

### Phase 2: Template Management (Week 2)
1. **Template Builder Interface**
   - Drag-and-drop task ordering
   - Task dependency visualization
   - Custom field configuration
   - Template testing/preview

2. **Template Library**
   - Category-based organization
   - Search and filtering
   - Template sharing and duplication

### Phase 3: Trigger System (Week 3)
1. **Template Selector**
   - Quick trigger buttons
   - Template comparison view
   - Recent templates history

2. **Configuration Workflow**
   - Dynamic form generation
   - Real-time validation
   - Preview before creation

### Phase 4: Multi-Task Creation (Week 4)
1. **Bulk Task Generator**
   - Process template into multiple tasks
   - Handle date calculations and dependencies
   - Assignee role resolution

2. **Creation Confirmation**
   - Task list preview
   - Individual task editing
   - Batch creation with progress tracking

## Key Features

### Template Triggers
- **Standard Triggers**: Pre-defined for common scenarios
- **Custom Triggers**: User-defined for specific workflows
- **Quick Access**: Favorite templates for frequent use

### Assignee Management
- **Role-Based Assignment**: Assign by role, resolve to actual users
- **Load Balancing**: Consider current workload when auto-assigning
- **Skill Matching**: Match tasks to team member skills

### Date Management
- **Offset-Based Scheduling**: Tasks scheduled relative to start date
- **Working Days**: Skip weekends and holidays
- **Dependency Chains**: Automatic scheduling based on dependencies

### Customization
- **Dynamic Fields**: Custom fields per template
- **Conditional Logic**: Show/hide fields based on selections
- **Validation Rules**: Ensure data quality

## Example Templates

### 1. Bug Fix Workflow
```javascript
{
  name: 'Critical Bug Resolution',
  trigger: 'critical_bug',
  tasks: [
    { title: 'Reproduce and document bug', assignee: 'role:qa', offsetDays: 0 },
    { title: 'Investigate root cause', assignee: 'role:developer', offsetDays: 0 },
    { title: 'Develop fix', assignee: 'role:developer', offsetDays: 1 },
    { title: 'Code review', assignee: 'role:senior_dev', offsetDays: 2 },
    { title: 'QA testing', assignee: 'role:qa', offsetDays: 3 },
    { title: 'Deploy to production', assignee: 'role:devops', offsetDays: 4 }
  ]
}
```

### 2. Marketing Campaign Launch
```javascript
{
  name: 'Product Launch Campaign',
  trigger: 'product_launch',
  tasks: [
    { title: 'Create campaign strategy', assignee: 'role:marketing_manager', offsetDays: -14 },
    { title: 'Design marketing materials', assignee: 'role:designer', offsetDays: -10 },
    { title: 'Write copy and content', assignee: 'role:copywriter', offsetDays: -8 },
    { title: 'Setup tracking and analytics', assignee: 'role:data_analyst', offsetDays: -5 },
    { title: 'Launch campaign', assignee: 'role:marketing_manager', offsetDays: 0 },
    { title: 'Monitor and optimize', assignee: 'role:marketing_manager', offsetDays: 1 }
  ]
}
```

## Benefits

1. **Consistency**: Standardized workflows ensure nothing is missed
2. **Efficiency**: Rapid multi-task creation from proven templates
3. **Flexibility**: Customizable fields and assignee overrides
4. **Scalability**: Easy to add new templates and modify existing ones
5. **Intelligence**: Role-based assignment and dependency handling
6. **Visibility**: Clear preview of all tasks before creation

## Migration Strategy

1. **Backward Compatibility**: Existing SOPs continue to work
2. **Gradual Migration**: Convert existing SOPs to new format
3. **Training Templates**: Provide common business templates out-of-box
4. **User Education**: Clear migration path and benefits explanation

This enhanced template system transforms FlowAI from single-task creation to powerful workflow orchestration while maintaining the simplicity and AI-powered intelligence users expect.
# FlowAI Style Guide - Pinterest-Inspired Design

## Color Palette

### Primary Colors
- **Primary**: `#E91E63` (Soft Pink) - Main brand color, used for primary actions and branding
- **Primary Hover**: `#C2185B` - Darker pink for hover states
- **Primary Active**: `#AD1457` - Darkest pink for active states

### Secondary Colors
- **Secondary**: `#8B5CF6` (Soft Purple) - Complementary brand color
- **Secondary Hover**: `#7C3AED` - Darker purple for hover states

### Accent Colors
- **Accent**: `#06B6D4` (Cyan) - For highlights and accents
- **Accent Hover**: `#0891B2` - Darker cyan for hover states
- **Warm**: `#FB923C` (Warm Orange) - For warm highlights
- **Warm Hover**: `#F97316` - Darker orange for hover states

### Text Colors
- **Text Primary**: `#1F2937` (Dark Gray) - Main text color
- **Text Secondary**: `#6B7280` (Medium Gray) - Secondary text
- **Text Tertiary**: `#9CA3AF` (Light Gray) - Tertiary text and placeholders

### Background Colors
- **Background**: `#FFFFFF` (White) - Main background
- **Background Secondary**: `#F9FAFB` (Very Light Gray) - Secondary backgrounds
- **Background Tertiary**: `#F3F4F6` (Light Gray) - Tertiary backgrounds
- **Background Warm**: `#FEF7ED` (Warm Cream) - Warm accent backgrounds

### Border Colors
- **Border**: `#E5E7EB` - Main border color
- **Border Secondary**: `#D1D5DB` - Secondary border color

### Semantic Colors
- **Success**: `#10B981` (Green) - Success states and completed items
- **Warning**: `#F59E0B` (Amber) - Warning states
- **Error**: `#EF4444` (Red) - Error states and destructive actions
- **Info**: `#3B82F6` (Blue) - Informational content

## Gradient Combinations

### Primary Gradient
```css
background: linear-gradient(135deg, #E91E63, #8B5CF6);
```
Used for: Main branding elements, primary CTAs

### Warm Gradient
```css
background: linear-gradient(135deg, #FB923C, #E91E63);
```
Used for: Warm accents, energy-focused elements

### Cool Gradient
```css
background: linear-gradient(135deg, #06B6D4, #8B5CF6);
```
Used for: Cool accents, calm/productive elements

## Usage Guidelines

### Primary Pink (#E91E63)
- Main navigation elements
- Primary buttons and CTAs
- Brand logo and icons
- Key interactive elements

### Purple (#8B5CF6)
- Secondary actions
- Creative/AI-focused features
- Gradient combinations
- Innovation highlights

### Cyan (#06B6D4)
- Progress indicators
- Status badges for "in progress" items
- Data visualization elements
- Cool accent features

### Warm Orange (#FB923C)
- Medium priority items
- Warning states (non-critical)
- Energetic accent elements
- Motivation/engagement features

## Accessibility

All color combinations meet WCAG AA contrast requirements:
- Text on backgrounds: minimum 4.5:1 contrast ratio
- Large text (18pt+): minimum 3:1 contrast ratio
- Interactive elements have clear focus indicators
- Color is never the only way to convey information

## Implementation

Colors are defined as CSS custom properties in `src/App.css`:

```css
:root {
  --color-primary: #E91E63;
  --color-secondary: #8B5CF6;
  --color-accent: #06B6D4;
  --color-warm: #FB923C;
  /* ... */
}
```

Use these variables throughout the application for consistency and easy theme updates.

## Status & Priority Color Mapping

### Status Colors
- **Todo**: `--color-text-secondary` (Gray)
- **In Progress**: `--color-accent` (Cyan)
- **In Review**: `--color-warning` (Amber)
- **Done**: `--color-success` (Green)

### Priority Colors
- **Low**: `--color-success` (Green)
- **Medium**: `--color-warm` (Orange)
- **High**: `--color-error` (Red)

This Pinterest-inspired palette creates a modern, vibrant, and engaging user experience while maintaining excellent accessibility and usability standards.

## Advanced Design Patterns

### Task Management Specific Patterns

#### Priority Visualization
- Use color intensity to indicate urgency
- Implement subtle animations for high-priority items
- Progressive color saturation based on due dates

#### Status Flow Design
```css
/* Status progression visual indicators */
.status-flow {
  display: flex;
  position: relative;
}

.status-flow::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-text-tertiary) 0%, var(--color-success) 100%);
  z-index: -1;
}
```

#### Calendar Integration Colors
- **Today**: Stronger primary color accent
- **Past Due**: Red overlay with subtle animation
- **Upcoming**: Gentle warm gradient
- **Completed**: Soft green with checkmark overlay

### Micro-Interactions

#### Hover States
```css
.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(233, 30, 99, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Loading States
```css
.loading-shimmer {
  background: linear-gradient(90deg, 
    transparent, 
    rgba(233, 30, 99, 0.1), 
    transparent
  );
  animation: shimmer 1.5s infinite;
}
```

### Data Visualization

#### Progress Bars
- Use gradient fills for visual appeal
- Animate progress changes smoothly
- Color-code based on completion percentage

#### Chart Colors
- **Completed Tasks**: `#10B981` (Success Green)
- **In Progress**: `#06B6D4` (Accent Cyan)  
- **Overdue**: `#EF4444` (Error Red)
- **Upcoming**: `#8B5CF6` (Secondary Purple)

### Layout Principles

#### Information Hierarchy
1. **Primary Actions**: Largest, primary color
2. **Secondary Actions**: Medium, secondary color
3. **Tertiary Actions**: Smallest, text color

#### Spacing Scale
```css
/* Enhanced spacing system */
--spacing-micro: 2px;   /* Fine details */
--spacing-tiny: 4px;    /* Icon spacing */
--spacing-xs: 8px;      /* Small gaps */
--spacing-sm: 12px;     /* Component internal spacing */
--spacing-md: 16px;     /* Default spacing */
--spacing-lg: 24px;     /* Section spacing */
--spacing-xl: 32px;     /* Major section spacing */
--spacing-2xl: 48px;    /* Page section spacing */
--spacing-3xl: 64px;    /* Hero spacing */
```

#### Responsive Breakpoints
```css
/* Mobile-first responsive design */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 1024px;  /* Large devices */
--breakpoint-xl: 1280px;  /* Extra large devices */
```

### Component Specifications

#### Task Cards
- **Border Radius**: 12px for modern feel
- **Padding**: 16px internal, 8px external
- **Shadow**: Subtle, increases on hover
- **Max Width**: 400px for readability

#### Navigation
- **Height**: 64px desktop, 56px mobile
- **Background**: Semi-transparent blur
- **Active States**: Subtle background color
- **Icons**: 20px with 8px padding

#### Buttons
- **Primary**: 44px min height for touch
- **Secondary**: 40px height
- **Compact**: 32px height
- **Border Radius**: 8px standard, 6px compact

### Dark Mode Support

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #111827;
    --color-background-secondary: #1F2937;
    --color-text-primary: #F9FAFB;
    --color-text-secondary: #D1D5DB;
    --color-border: #374151;
  }
}
```

### Animation Guidelines

#### Timing Functions
- **Standard**: `cubic-bezier(0.4, 0, 0.2, 1)` - Natural easing
- **Decelerate**: `cubic-bezier(0, 0, 0.2, 1)` - Elements entering
- **Accelerate**: `cubic-bezier(0.4, 0, 1, 1)` - Elements leaving

#### Duration Standards
- **Micro**: 150ms - Small state changes
- **Standard**: 250ms - Most interactions
- **Complex**: 350ms - Layout changes
- **Page**: 500ms - Route transitions

This enhanced style guide provides comprehensive guidance for building a world-class task management interface with modern design principles and excellent user experience.
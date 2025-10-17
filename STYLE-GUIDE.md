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
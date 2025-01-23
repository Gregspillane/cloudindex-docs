# System Patterns

## Architecture Overview

### Component Structure
1. DocPage (src/theme/DocPage)
   - Main layout container
   - Handles API page detection
   - Manages right sidebar integration
   - Controls responsive behavior

2. ApiPlayground (src/components/ApiPlayground)
   - Interactive API testing interface
   - Language selection with icons
   - Request builder
   - Response display
   - Authentication handling

3. CodeExamples (src/components/ApiPlayground/CodeExamples)
   - Code snippet generation
   - Language-specific formatting
   - Dynamic parameter insertion

### Layout System
1. Three-Column Layout
   - Left: Documentation navigation
   - Center: Main content
   - Right: API Playground

2. Responsive Behavior
   - Desktop: Full three-column layout
   - Mobile: Single column with collapsible sections
   - Breakpoint at 996px

### Styling Architecture
1. Global Styles (src/css/custom.css)
   - Theme variables
   - Base typography
   - Common components
   - Utility classes

2. Component-Specific Styles
   - CSS Modules for scoped styling
   - BEM-like naming convention
   - Responsive mixins
   - Theme integration

### State Management
1. Component Level
   - React useState for local state
   - useCallback for memoized handlers
   - Props for component communication

2. Persistence
   - localStorage for API keys
   - URL-based endpoint detection
   - Session-based preferences

### API Integration
1. Endpoint Configuration
   - Path-based detection
   - Method mapping
   - Parameter validation
   - Authentication requirements

2. Request Handling
   - Fetch API with proper headers
   - Error handling
   - Response formatting
   - Loading states

## Design Patterns

### Component Patterns
1. Container/Presentational
   - DocPage as container
   - ApiPlayground as presentational
   - Clear separation of concerns

2. Composition
   - Modular component structure
   - Reusable sub-components
   - Prop-based configuration

### Style Patterns
1. CSS Variables
   - Theme-based colors
   - Spacing scale
   - Typography system
   - Breakpoints

2. Responsive Design
   - Mobile-first approach
   - Fluid typography
   - Flexible layouts
   - Breakpoint system

### Interaction Patterns
1. Form Handling
   - Controlled inputs
   - Real-time validation
   - Error messaging
   - Loading states

2. Navigation
   - Smooth scrolling
   - Active state tracking
   - Responsive menu
   - Collapsible sections

## Best Practices

### Code Organization
1. File Structure
   - Component-based organization
   - Clear file naming
   - Logical grouping
   - Separation of concerns

2. Code Style
   - TypeScript for type safety
   - Consistent formatting
   - Clear documentation
   - Meaningful comments

### Performance
1. Optimization
   - Code splitting
   - Lazy loading
   - Memoization
   - Bundle size management

2. Caching
   - API response caching
   - Local storage usage
   - Session management
   - State persistence

### Accessibility
1. Standards
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Color contrast

2. Responsive Design
   - Mobile optimization
   - Touch targets
   - Font scaling
   - Layout adaptation

# System Patterns
Last Updated: 2024-01-10

## High-Level Architecture
- Static site generator architecture
- Content separated from presentation
- Markdown/MDX for content authoring
- React components for UI customization

## Core Technical Patterns
1. Documentation Structure
   - Organized in /docs directory
   - Tutorials split into basics and extras
   - Markdown features documented
   - Versioning and translation support
   - API documentation section added

2. Routing Patterns
   - Root path serves documentation
   - API reference at /api
   - Blog at /blog
   - Custom 404 pages

3. Navigation Patterns
   - Main navigation items:
     * Docs (root)
     * API Documentation (/api)
     * GitHub link
   - Footer navigation groups
   - Responsive mobile menu

3. Component Architecture
   - Homepage features component
   - CSS modules for styling
   - TypeScript for type safety
   - Static assets in /static directory

## Data Flow
1. Markdown/MDX → Docusaurus → Static HTML
2. React Components → Rendered Pages
3. Static Assets → Bundled with Site

## Key Technical Decisions
- TypeScript for type safety
- CSS modules for component styling
- MDX for enhanced Markdown capabilities
- Static site generation for performance
- RouteBasePath configuration for docs
- API documentation structure

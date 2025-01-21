# Active Context
Last Updated: 2024-01-11

## Current Focus
- Documentation structure finalization
- Two-section documentation system implementation
- Navigation and routing optimization

## Recent Changes
- Implemented separate docs and API documentation sections
- Updated Docusaurus configuration for dual documentation structure
- Configured separate plugin instances for docs and API
- Updated navigation to reflect new structure
- Modified routing paths (docs -> /docs, api -> /api)
- Fixed sidebar configuration for both documentation sections
- Properly configured document IDs for API documentation

## Active Files
- docusaurus.config.ts (updated with new plugin configuration)
- docs/docs/* (general documentation)
- docs/api/* (API reference documentation)
- sidebars.ts (configured for both sections)

## Documentation Structure
The documentation is now automatically organized based on the folder structure:

1. Main Sections:
   - /docs/docs/* -> General Documentation
   - /docs/api/* -> API Documentation

2. Folder-Based Categories:
   Example structure:
   ```
   docs/docs/
   ├── intro.md
   ├── getting-started.md
   ├── moving-forward.md
   └── guides/
       ├── index.md
       └── authentication/
           ├── index.md
           └── api-key-auth.md
   ```

3. Page Organization:
   - Use `sidebar_position` in frontmatter to control order
   - Create index.md files in folders to serve as category landing pages
   - Nest folders to create subcategories

## Adding New Pages
1. Create a new .md file in the appropriate directory
2. Include frontmatter:
   ```md
   ---
   title: Your Page Title
   sidebar_position: 1
   ---
   ```
3. The page will automatically appear in the sidebar

## Next Steps
1. Add more API documentation pages with proper categorization
2. Create additional guide categories and subcategories
3. Ensure consistent sidebar_position numbering
4. Add proper content to each documentation section

# System Patterns

## Architecture Overview
- Frontend: React/Vite application
- Backend: Node.js/Express API server
- Database: Supabase (PostgreSQL)
- Vector Store: Pinecone
- Cache/Queue: Redis
- Authentication: Clerk

## Key Technical Decisions

### Frontend Architecture
- React v18.3.1 with TypeScript
- Zustand for state management
- TailwindCSS for styling
- Radix UI for accessible components
- Vite for build tooling

### Backend Architecture
- Express framework with TypeScript
- Service-oriented architecture
- Versioned API routes (public/private)
- Middleware-based request processing
- Job queue system with Redis

### Document Processing
- LlamaIndex for document handling
- Multiple specialized processors:
  - LlamaParseProcessor (PDF/DOCX)
  - SimpleNodeParser (MD/MDX)
  - TreeSitterProcessor (code)
  - WebProcessor (web content)

### Data Integration
- Provider-specific adapters
- Circuit breaker pattern
- Real-time sync capabilities
- Batch processing with rate limiting

### Security Patterns
- Clerk-based authentication
- Role-based access control
- API key management
- Row-level security in Supabase

## Project Structure
```
cloudindex-ai/
├── frontend/
│   ├── src/
│   │   ├── components/    # Feature-based components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API services
│   │   ├── stores/       # State management
│   │   └── utils/        # Utilities
│
├── backend/
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API endpoints
│   │   └── middleware/   # Request processing
│
└── supabase/
    └── migrations/       # Database schema
```

## Development Patterns
- TypeScript for type safety
- Jest for testing
- Nodemon for development
- Docker for containerization
- Supabase migrations for schema changes

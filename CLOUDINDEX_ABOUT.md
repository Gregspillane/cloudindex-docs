# CloudIndex-AI

CloudIndex-AI is a cloud-based Retrieval-Augmented Generation (RAG) platform designed to simplify the development of RAG-enabled applications for small technical teams and individual developers.

## Features

- User authentication using Clerk
- Organization Management:
  - Multi-organization support
  - Organization-level project management
  - Role-based access control
  - Organization settings and quotas
  - LLM provider configuration and management
- Project management with customizable settings:
  - System prompts
  - Reranking configuration
  - Access control settings
  - API key management
- Multiple Data Source Integrations:
  - Manual file upload
  - Google Drive integration with real-time sync
  - S3 bucket integration
  - Slack workspace integration
  - Notion workspace integration
  - OneDrive integration
  - Automatic sync scheduling
  - Circuit breaker protection
- Document upload and processing:
  - Job-based processing system with status tracking
  - Multiple specialized document processors:
    - LlamaParseProcessor for PDF/DOCX
    - SimpleNodeParser for MD/MDX
    - TreeSitterProcessor for code files
    - WebProcessor for web content
  - Batch processing with parallel execution
  - Real-time status updates and metrics
  - Version history tracking
- Advanced Chat System:
  - Multiple LLM provider support:
    - OpenAI integration with model selection
    - Anthropic integration with model selection
  - Organization-level provider configuration
  - Thread management with named conversations
  - Thread status tracking (active/archived)
  - Star/favorite functionality
  - Custom thread ordering
  - Thread filtering and search
  - Custom instructions per thread
  - Message persistence and history
  - Real-time streaming responses
  - Source attribution for responses
- Vector Operations with Pinecone:
  - Project-specific namespacing
  - Batch vector operations
  - Parallel processing with rate limiting
  - Performance monitoring
  - Vector operation metrics
- Cohere reranking for enhanced result relevance:
  - Configurable per project
  - Adjustable top-K and top-N parameters
  - Automatic result reranking
  - Enhanced context relevance
- API key management for external access:
  - Project-specific API key generation
  - Secure key storage and management
  - Key revocation capabilities
  - Usage tracking and monitoring
  - Automatic key validation
- Error Handling and Monitoring:
  - Centralized error tracking
  - Automatic retries with exponential backoff
  - Circuit breaker implementation
  - Detailed logging and metrics
  - Performance monitoring


## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm
- Supabase CLI
- Docker and Docker Compose
- Redis
- OpenAI API key
- Anthropic API key (optional)
- Pinecone API key and environment
- LlamaCloud API key (for LlamaParse)
- Cohere API key (for reranking)
- Clerk account with Organizations enabled
- Google Cloud Platform account (for Google Drive integration)
- AWS account (for S3 integration)
- Slack API credentials (for Slack integration)
- Notion API credentials (for Notion integration)
- Microsoft Azure account (for OneDrive integration)

### Environment Setup

#### Production Environment
```
https://api.cloudindex.ai 
```

#### Development Environment
```
http://localhost:3000/api
```

### Required Environment Variables

Backend:
```
CLERK_SECRET_KEY=<clerk-secret-key>
CLERK_PUBLISHABLE_KEY=<clerk-publishable-key>
SUPABASE_URL=<supabase-url>
SUPABASE_SERVICE_KEY=<supabase-service-key>
PINECONE_API_KEY=<pinecone-api-key>
PINECONE_ENVIRONMENT=<pinecone-environment>
PINECONE_INDEX_NAME=<pinecone-index-name>
OPENAI_API_KEY=<openai-api-key>
ANTHROPIC_API_KEY=<anthropic-api-key>
LLAMA_CLOUD_API_KEY=<llama-cloud-api-key>
COHERE_API_KEY=<cohere-api-key>
REDIS_URL=<redis-url>
GOOGLE_CLIENT_ID=<google-client-id>
GOOGLE_CLIENT_SECRET=<google-client-secret>
AWS_ACCESS_KEY_ID=<aws-access-key>
AWS_SECRET_ACCESS_KEY=<aws-secret-key>
SLACK_CLIENT_ID=<slack-client-id>
SLACK_CLIENT_SECRET=<slack-client-secret>
NOTION_CLIENT_ID=<notion-client-id>
NOTION_CLIENT_SECRET=<notion-client-secret>
ONEDRIVE_CLIENT_ID=<onedrive-client-id>
ONEDRIVE_CLIENT_SECRET=<onedrive-client-secret>
FRONTEND_URL=<frontend-url>
```

### Clerk Setup

1. Enable Organizations in your Clerk Dashboard
2. Configure the following organization roles and permissions:
   - Admin: Full access to organization settings and projects
   - Member: Access to assigned projects
3. Set up the required environment variables

### Setup

You can run CloudIndex-AI either using Docker Compose (recommended) or locally.

#### Docker Setup (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cloudindex-ai.git
   cd cloudindex-ai
   ```

2. Set up environment variables:
   - Create `.env` files in both `frontend` and `backend` directories
   - Configure the required environment variables as listed above

3. Start Redis:
   ```bash
   docker-compose up redis -d
   ```

4. Start Supabase locally:
   ```bash
   supabase start
   ```

5. Run migrations:
   ```bash
   supabase migration up
   ```

6. Start the development servers:
   ```bash
   # In the backend directory
   npm run dev

   # In the frontend directory
   npm run dev
   ```

7. Open the application in your browser at `http://localhost:3000`

### API Structure

The API is organized into versioned public and private routes:

1. **Private Routes** (`/private/v1/`)
   - Project management
   - Document operations
   - Chat functionality
   - Data source management
   - API key management
   - Usage tracking
   - Reranking configuration

2. **Public Routes** (`/public/v1/`)
   - Public chat endpoints
   - Document querying
   - Health checks
   - Public API documentation

3. **Versioning**
   - All routes are versioned (v1)
   - Separate handlers for public and private endpoints
   - Consistent error handling across versions
   - Version-specific schema validation

# Technology Stack

## Frontend Technologies

### Core
- **React** (v18.3.1)
  - Modern UI library with hooks and concurrent features
  - Server-side rendering support
  - React Router DOM (v6.27.0) for routing
  - React Hook Form (v7.53.2) for form management

### Build & Development
- **Vite** (v5.4.8)
  - Next-generation frontend tooling
  - Lightning-fast HMR (Hot Module Replacement)
  - Optimized build performance

### Styling & UI
- **TailwindCSS** (v3.4.14)
  - Utility-first CSS framework
  - JIT (Just-In-Time) compilation
  - Custom animations with tailwindcss-animate
  
- **Radix UI Components**
  - Unstyled, accessible components
  - ARIA compliance
  - Key components:
    - Dialog (v1.1.2)
    - Dropdown Menu (v2.1.2)
    - Form (v0.1.0)
    - Progress (v1.1.0)
    - Tabs (v1.1.1)

### State Management
- **Zustand** (v5.0.1)
  - Lightweight state management
  - Redux-like patterns without boilerplate
  - Built-in middleware support

### Type Safety
- **TypeScript** (v5.5.3)
  - Static type checking
  - Enhanced IDE support
  - Improved code maintainability

## Backend Technologies

### Core
- **Node.js** (v18.x)
  - Event-driven architecture
  - Non-blocking I/O
  - Enterprise-level stability

### Framework
- **Express** (v4.21.0)
  - RESTful API support
  - Middleware architecture
  - Route handling
  - CORS support (v2.8.17)

### Document Processing
- **LlamaIndex** (v0.7.0)
  - Advanced document processing
  - Semantic chunking
  - Multiple processor support:
    - Tree-sitter (v0.20.6) for code parsing
    - Support for multiple languages:
      - Python (v0.20.4)
      - Go (v0.20.0)
      - Java (v0.20.2)
      - SQL (v0.1.0)
      - Bash (v0.20.0)

### AI/ML Integration
- **OpenAI SDK** (v4.0.0)
  - GPT model integration
  - Streaming support
  - Token management

- **Anthropic AI SDK** (v0.32.1)
  - Claude model integration
  - Advanced context handling

### Data Sources
- **AWS SDK S3** (v3.688.0)
  - S3 bucket integration
  - File upload/download
  - Stream processing

- **Google APIs** (v129.0.0)
  - Google Drive integration
  - OAuth2 authentication
  - Real-time file sync

- **Slack Web API** (v6.13.0)
  - Workspace integration
  - Channel management
  - Message handling

- **Notion API** (v2.1.1)
  - Workspace integration
  - Block-based content handling
  - Real-time sync support

- **Microsoft Graph API** (v3.0.0)
  - OneDrive integration
  - File system operations
  - OAuth2 authentication

## Database & Storage

### Primary Database
- **Supabase** (v2.46.1 client)
  - PostgreSQL database
  - Real-time subscriptions
  - Row-level security
  - Built-in authentication

### Vector Database
- **Pinecone** (v3.0.3)
  - Vector similarity search
  - Namespace management
  - Batch operations
  - Real-time indexing

### Caching & Queue
- **Redis** (via ioredis v5.4.1)
  - Job queue management
  - Caching layer
  - Pub/sub functionality

## Authentication & Authorization
- **Clerk** (Frontend: v5.12.0, Backend: v5.0.0)
  - User authentication
  - Organization management
  - Role-based access control
  - OAuth provider integration

## Development & Testing

### Testing Framework
- **Jest** (v29.7.0)
  - Unit testing
  - Integration testing
  - Test coverage reporting

### Development Tools
- **nodemon** (v3.0.0)
  - Automatic server restart
  - File watching
  - Development workflow optimization

- **ts-node** (v10.9.2)
  - TypeScript execution
  - REPL for TypeScript
  - Development environment support

## Key Features by Component

### Document Processing Pipeline
- Multiple format support (PDF, DOCX, MD, Code)
- Parallel processing
- Version control
- Status tracking

### Vector Operations
- Batch processing
- Namespace isolation
- Rate limiting
- Performance monitoring

### Chat System
- Multi-provider support
- Real-time streaming
- Thread management
- Custom instructions

### Data Source Integration
- Multiple provider support
- Real-time sync
- Circuit breaker protection
- Error recovery

This tech stack is designed to provide:
- Scalable architecture
- Real-time capabilities
- Type safety
- Modern development experience
- Enterprise-grade security
- Comprehensive monitoring


# Project Structure

```
cloudindex-ai/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── api-keys/         # API key management
│   │   │   ├── chat/            # Chat interface components
│   │   │   ├── data-sources/    # Data source integrations
│   │   │   ├── documents/       # Document management
│   │   │   ├── organization/    # Organization management
│   │   │   ├── project-settings/# Project configuration
│   │   │   ├── projects/        # Project management
│   │   │   ├── ui/             # Shared UI components
│   │   │   └── views/          # Page views
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API services
│   │   │   ├── auth/          # Authentication
│   │   │   ├── database/      # Database operations
│   │   │   ├── reranking/     # Cohere reranking
│   │   │   └── SSEManager/    # Server-sent events
│   │   ├── stores/            # State management
│   │   ├── types/            # TypeScript definitions
│   │   └── utils/            # Utility functions
│   │
│   ├── public/               # Static assets
│   ├── index.html
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── config/           # Environment & middleware config
│   │   ├── controllers/      # Route controllers
│   │   │   ├── base/        # Base controller
│   │   │   └── chat/        # Chat controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── routes/          # API routes
│   │   │   ├── private/     # Private API endpoints
│   │   │   ├── public/      # Public API endpoints
│   │   │   └── schemas/     # Route validation schemas
│   │   ├── services/        # Core business logic
│   │   │   ├── chat/        # Chat engine & providers
│   │   │   ├── data-sources/# Data source integrations
│   │   │   ├── document/    # Document processing
│   │   │   ├── llama-index/ # LlamaIndex integration
│   │   │   ├── project/     # Project management
│   │   │   ├── queue/       # Redis queue system
│   │   │   └── reranking/   # Cohere reranking
│   │   ├── types/           # TypeScript definitions
│   │   └── utils/           # Utility functions
│   │
│   └── index.ts             # Application entry point
│
└── supabase/
    └── migrations/          # Database migrations
        ├── 20241113000000_baseline.sql
        ├── 20241117000000_data_sources.sql
        ├── 20241143000000_add_model_providers.sql
        ├── 20241145000000_add_anthropic_provider.sql
        ├── 20241165000000_add_onedrive_type.sql
        ├── 20241166000000_add_notion_type.sql
        └── [Additional migrations...]
```

This structure represents the core application architecture:

- **Frontend**: React application with Vite
  - Organized by feature (chat, documents, projects)
  - Shared UI components and hooks
  - Type definitions and utilities

- **Backend**: Node.js with Express
  - Service-oriented architecture
  - Separate routes for public and private APIs
  - Core services for chat, document processing, etc.
  - Middleware for authentication and validation

- **Supabase**: Database migrations
  - Sequential migrations for schema changes
  - Feature-specific migrations (data sources, providers)
  - Security and encryption updates

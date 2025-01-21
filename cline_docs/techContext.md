# Technical Context

## Development Environment
- Node.js (v14 or later)
- npm
- Docker and Docker Compose
- Supabase CLI
- Redis

## Required API Keys
- OpenAI API key
- Anthropic API key (optional)
- Pinecone API key and environment
- LlamaCloud API key
- Cohere API key
- Clerk account (with Organizations)
- Google Cloud Platform account
- AWS account
- Slack API credentials
- Notion API credentials
- Microsoft Azure account

## Environment Variables
```bash
# Authentication
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=

# Database
SUPABASE_URL=
SUPABASE_SERVICE_KEY=

# Vector Store
PINECONE_API_KEY=
PINECONE_ENVIRONMENT=
PINECONE_INDEX_NAME=

# AI/ML
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
LLAMA_CLOUD_API_KEY=
COHERE_API_KEY=

# Infrastructure
REDIS_URL=
FRONTEND_URL=

# Integrations
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=
NOTION_CLIENT_ID=
NOTION_CLIENT_SECRET=
ONEDRIVE_CLIENT_ID=
ONEDRIVE_CLIENT_SECRET=
```

## API Endpoints
- Production: https://api.cloudindex.ai
- Development: http://localhost:3000/api

## Development Setup Steps
1. Clone repository
2. Set up environment variables
3. Start Redis via Docker
4. Initialize Supabase
5. Run migrations
6. Start development servers

## Version Requirements
### Frontend
- React: v18.3.1
- Vite: v5.4.8
- TailwindCSS: v3.4.14
- TypeScript: v5.5.3

### Backend
- Node.js: v18.x
- Express: v4.21.0
- LlamaIndex: v0.7.0
- OpenAI SDK: v4.0.0
- Anthropic SDK: v0.32.1

### Infrastructure
- Supabase Client: v2.46.1
- Pinecone: v3.0.3
- Redis (ioredis): v5.4.1
- Clerk: v5.12.0 (Frontend), v5.0.0 (Backend)

docs/
├── getting-started/
│   ├── introduction.md              # Product overview, key features
│   ├── quick-start.md              # Basic setup and first steps
│   └── installation.md             # Detailed setup instructions
│
├── core-concepts/
│   ├── rag-overview.md             # RAG explanation and implementation
│   ├── document-processing.md      # Processing pipeline and formats
│   ├── vector-operations.md        # Vector storage and search
│   └── reranking.md               # Cohere reranking system
│
├── guides/
│   ├── document-upload.md          # Document upload best practices
│   ├── batch-processing.md         # Working with batch uploads
│   ├── error-handling.md          # Error handling strategies
│   └── monitoring.md              # System monitoring and metrics
│
└── integrations/
    ├── google-drive.md            # Google Drive integration
    ├── s3-bucket.md              # S3 integration
    └── slack.md                  # Slack integration

api-reference/
├── introduction.md                 # Overview, authentication, common patterns
│
├── documents/                      # Document Management
│   ├── overview.md                # Documents API overview, common schemas
│   ├── upload-document.md         # POST /projects/{projectId}/documents
│   ├── list-documents.md          # GET /projects/{projectId}/documents
│   ├── get-document.md            # GET /projects/{projectId}/documents/{documentId}
│   ├── delete-document.md         # DELETE /projects/{projectId}/documents/{documentId}
│   └── document-versions.md       # GET /projects/{projectId}/documents/{documentId}/versions
│
├── query/                         # Query API
│   ├── overview.md                # Query API overview, concepts
│   └── hybrid-search.md           # POST /public/v1/query
│
├── chat/                          # Chat API
│   ├── overview.md                # Chat concepts, modes (stateless vs thread)
│   ├── threads/                   # Thread-based chat
│   │   ├── create-thread.md      # POST /chat/threads
│   │   ├── list-threads.md       # GET /chat/threads
│   │   ├── delete-thread.md      # DELETE /chat/threads/{sessionId}
│   │   ├── send-message.md       # POST /chat/threads/{sessionId}/messages
│   │   └── message-history.md    # GET /chat/threads/{sessionId}/messages/history
│   └── stateless-chat.md         # POST /chat/messages
│
└── common/                        # Common components
    ├── authentication.md          # Auth details, API keys
    ├── error-handling.md         # Error formats, codes
    ├── rate-limiting.md          # Rate limit details
    └── schemas.md                # Shared data models
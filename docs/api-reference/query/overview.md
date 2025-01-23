---
title: Query API Overview
sidebar_position: 1
---

# Query API

CloudIndex's Query API provides enterprise-grade hybrid search capabilities, combining semantic understanding, keyword matching, and advanced reranking to deliver highly relevant results from your document collection.

## Overview

Our hybrid search system integrates three powerful approaches:

1. **Semantic Search**
   - Understands the meaning and context of queries
   - Captures conceptual relationships
   - Effective for natural language queries
   - Handles synonyms and related concepts

2. **Keyword Search**
   - Precise text matching capabilities
   - Excellent for specific terms and phrases
   - Maintains search accuracy
   - Handles technical terminology

3. **Reranking**
   - Advanced ML model for result refinement
   - Improves result relevance
   - Filters low-quality matches
   - Optimizes for business context

## Enterprise Features

### Security & Compliance
- API key authentication
- Request logging for audit trails
- Document-level access control
- Compliance with data privacy standards

### Scalability
- High-performance architecture
- Distributed search capabilities
- Rate limiting for resource protection
- Optimized for large document collections

### Reliability
- Consistent response formats
- Comprehensive error handling
- Detailed response metadata
- Built-in retry mechanisms

## Rate Limits

Enterprise-grade rate limiting ensures reliable service:
- Per API key: 100 requests per minute
- Per IP: 1000 requests per hour

Rate limit information in response headers:
- `X-RateLimit-Limit`: Maximum requests per window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when the rate limit resets (Unix timestamp)

## Request Parameters

The request body should be formatted as JSON with the following structure:

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `query` | string | The search query text (1-1000 characters) |

### Optional Fields

#### Filters Object
| Field | Type | Description |
|-------|------|-------------|
| `documentIds` | string[] | Array of document IDs to search within |
| `types` | string[] | Document types to include (pdf, txt, md, mdx, doc, docx) |
| `dateRange.from` | string | Start date (ISO 8601 format) |
| `dateRange.to` | string | End date (ISO 8601 format) |

#### Options Object
| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `similarityTopK` | integer | 10 | Number of top similar documents (1-100) |
| `alpha` | number | 0.75 | Balance between semantic and keyword search (0.01-1.0) |
| `rerankingEnabled` | boolean | false | Enable result reranking |
| `rerankingTopN` | integer | 5 | Number of results to rerank (1-100, must not exceed similarityTopK) |
| `rerankingThreshold` | number | 0.2 | Minimum reranking score (0-1) |
| `limit` | integer | 10 | Maximum results to return (1-100) |
| `threshold` | number | 0.0 | Minimum similarity score (0-1) |
| `includeMetadata` | boolean | false | Include document metadata |
| `preset` | string | "general" | Search preset configuration |

## Search Presets

Enterprise-optimized presets for different use cases:

| Preset | Description | Best For |
|--------|-------------|----------|
| general | Balanced settings for general purpose search | Mixed content repositories |
| business | Optimized for business documents | Reports, presentations, emails |
| technical | Enhanced technical content matching | Documentation, code, specs |
| financial | Specialized for financial documents | Reports, analysis, statements |
| scientific | Configured for scientific content | Research papers, technical data |
| custom | Use custom parameters | Specialized requirements |

## Response Format

Successful queries (200 OK) return a structured JSON response:

### Scored Chunks

Array of matching document chunks, each containing:
- `id`: Unique chunk identifier
- `text`: Matching text content
- `score`: Relevance score (0-1)
- `document_id`: Source document ID
- `document_name`: Source document name
- `document_metadata`: Document metadata (when requested)

### Response Metadata

Search operation details:
- `total_chunks`: Number of chunks searched
- `processing_time_ms`: Processing duration
- `reranking_applied`: Reranking status

## Example Response

```json
{
  "scored_chunks": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "text": "RAG (Retrieval-Augmented Generation) is a technique that...",
      "score": 0.92,
      "document_id": "123e4567-e89b-12d3-a456-426614174001",
      "document_name": "rag-overview.pdf",
      "document_metadata": {
        "mime_type": "application/pdf",
        "created_at": "2024-01-15T12:00:00Z",
        "file_path": "docs/rag-overview.pdf",
        "source_type": "upload",
        "processing_status": "processed"
      }
    }
  ],
  "metadata": {
    "total_chunks": 150,
    "processing_time_ms": 245,
    "reranking_applied": true
  }
}
```

## Enterprise Best Practices

### Performance Optimization
1. **Query Design**
   - Use concise, focused queries
   - Include essential keywords
   - Leverage natural language when appropriate
   - Test queries with sample content

2. **Parameter Tuning**
   - Start with preset configurations
   - Adjust `alpha` strategically:
     - Higher (greater than 0.75): Semantic understanding
     - Lower (less than 0.25): Keyword precision
     - Middle: Balanced approach
   - Enable reranking for critical searches

3. **Resource Management**
   - Implement document filters
   - Set appropriate result limits
   - Request metadata selectively
   - Monitor rate limit usage

### Reranking Strategy
1. **When to Enable**
   - High-value content searches
   - Accuracy-critical operations
   - Complex semantic queries
   - User-facing applications

2. **Configuration**
   - Set `rerankingTopN` < `similarityTopK`
   - Adjust threshold based on quality needs
   - Balance latency vs. accuracy
   - Monitor performance impact

### Error Handling
1. **Robust Implementation**
   - Implement retry logic
   - Handle all error categories
   - Monitor rate limits
   - Log error patterns

2. **Response Processing**
   - Validate response format
   - Check metadata fields
   - Handle empty results gracefully
   - Monitor processing times

### Security Considerations
1. **API Key Management**
   - Rotate keys regularly
   - Use separate keys per environment
   - Monitor key usage
   - Implement key restrictions

2. **Request Patterns**
   - Implement request logging
   - Monitor unusual patterns
   - Set up alerts
   - Track usage metrics

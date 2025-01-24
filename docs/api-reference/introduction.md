---
title: Introduction
sidebar_position: 1
---

# CloudIndex API Reference

Welcome to the CloudIndex API documentation. This guide will help you integrate CloudIndex's RAG capabilities into your applications.

## Overview

The CloudIndex API is organized around REST principles. We use standard HTTP response codes, authentication, and verbs. All requests should be made to the base URL:

```bash
https://api.cloudindex.ai/public/v1
```

## Authentication

CloudIndex uses API keys for authentication. You can obtain an API key from your CloudIndex dashboard. Include your API key in the Authorization header:

```bash
Authorization: ApiKey YOUR_API_KEY
```

## Common Patterns

### Request Format
- All requests should use HTTPS
- Request bodies should be JSON encoded
- Include the `Content-Type: application/json` header
- File uploads should use `multipart/form-data`

### Response Format
All responses are returned in JSON format and include:
- HTTP status code indicating success/failure
- Response body with requested data or error details
- Standard headers including request ID and rate limit information

### Error Handling
Error responses follow a consistent format:
```json
{
  "error": "Human-readable error message",
  "code": "machine_readable_code",
  "category": "error_category",
  "details": {
    "additional": "error context"
  }
}
```

Error categories include:
- `authentication` - API key and auth issues
- `validation` - Invalid input parameters
- `rate_limit` - Rate limit exceeded
- `system` - Internal server errors

## Rate Limiting

Rate limits vary by endpoint and subscription tier. Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1516131012
```

When you exceed your rate limit, you'll receive a 429 response:
```json
{
  "error": "Rate limit exceeded",
  "code": "rate_limit_exceeded",
  "category": "rate_limit"
}
```

## Response Headers

All API responses include standard headers:

| Header | Description |
|--------|-------------|
| `X-Request-ID` | Unique request identifier |
| `X-Model` | LLM model used (e.g., "anthropic-claude-3-sonnet-20240229") |
| `X-Provider` | LLM provider used (e.g., "anthropic") |
| `X-RateLimit-Limit` | Rate limit ceiling |
| `X-RateLimit-Remaining` | Remaining requests |
| `X-RateLimit-Reset` | Rate limit reset timestamp |

## API Sections

The API documentation is organized into the following sections:

1. [Documents](/api-reference/documents/overview) - Document management and processing
   - Upload and manage documents
   - Track processing status
   - Retrieve document metadata

2. [Query](/api-reference/query/overview) - Vector search and hybrid search capabilities
   - Semantic search across documents
   - Hybrid search combining vector and keyword search
   - Reranking and relevance scoring

3. [Chat](/api-reference/chat/overview) - Chat interface and thread management
   - Stateless chat for one-off queries
   - Thread-based chat for persistent conversations
   - Source-backed responses from your documents

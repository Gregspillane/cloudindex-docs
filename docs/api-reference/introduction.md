---
title: Introduction
sidebar_position: 1
---

# CloudIndex API Reference

Welcome to the CloudIndex API documentation. This guide will help you integrate CloudIndex's RAG capabilities into your applications.

## Overview

The CloudIndex API is organized around REST principles. We use standard HTTP response codes, authentication, and verbs. All requests should be made to the base URL:

```bash
https://api.cloudindex.ai/v1
```

## Authentication

CloudIndex uses API keys for authentication. You can obtain an API key from your CloudIndex dashboard. Include your API key in the Authorization header:

```bash
Authorization: Bearer YOUR_API_KEY
```

## Common Patterns

### Request Format
- All requests should use HTTPS
- Request bodies should be JSON encoded
- Include the `Content-Type: application/json` header

### Response Format
All responses are returned in JSON format and include:
- HTTP status code indicating success/failure
- Response body with requested data or error details
- Rate limit headers showing current limits and remaining requests

### Error Handling
Error responses follow a consistent format:
```json
{
  "error": {
    "code": "error_code",
    "message": "Human-readable message",
    "details": {} // Additional error context
  }
}
```

## Rate Limiting

API requests are rate limited based on your plan:
- Free tier: 100 requests per minute
- Pro tier: 1000 requests per minute
- Enterprise tier: Custom limits

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## API Sections

The API documentation is organized into the following sections:

1. [Documents](/api-reference/documents/overview) - Document management and processing
2. [Query](/api-reference/query/overview) - Vector search and hybrid search capabilities
3. [Chat](/api-reference/chat/overview) - Chat interface and thread management
4. [Common](/api-reference/common/schemas) - Shared components and schemas

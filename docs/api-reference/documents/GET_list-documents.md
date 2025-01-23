---
title: List Documents (GET)
sidebar_position: 3
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# List Documents

Retrieve a list of all documents in a project.

<ApiPlayground
  endpoint={{
    method: 'GET',
    path: '/projects/{projectId}/documents',
    parameters: {
      path: {
        projectId: {
          name: 'projectId',
          type: 'string',
          required: true,
          description: 'Project identifier (UUID)'
        }
      },
      query: {
        status: {
          name: 'status',
          type: 'string',
          required: false,
          description: 'Filter by processing status (pending, processing, completed, failed)'
        },
        limit: {
          name: 'limit',
          type: 'integer',
          required: false,
          description: 'Maximum number of documents to return (default: 50, max: 100)'
        },
        offset: {
          name: 'offset',
          type: 'integer',
          required: false,
          description: 'Number of documents to skip (default: 0)'
        }
      }
    },
    authentication: {
      type: 'apiKey',
      location: 'header'
    }
  }}
  baseUrl="https://api.cloudindex.ai/public/v1"
  languages={['curl', 'python', 'javascript', 'go']}
/>

## Description

Retrieve a paginated list of documents in your project. Results can be filtered by processing status and include detailed metadata about each document.

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string (UUID) | Yes | Project identifier |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Filter by processing status |
| `limit` | integer | No | Maximum number of documents (default: 50, max: 100) |
| `offset` | integer | No | Number of documents to skip (default: 0) |

## Response

The response follows the `DocumentList` schema:

```json
{
  "documents": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "projectId": "123e4567-e89b-12d3-a456-426614174000",
      "fileName": "example.pdf",
      "processingStatus": "completed",
      "fileSize": 1024000,
      "mimeType": "application/pdf",
      "uploadedAt": "2024-01-22T10:00:00Z",
      "completedAt": "2024-01-22T10:01:00Z",
      "metadata": {
        "pageCount": 10,
        "wordCount": 2500,
        "language": "en"
      },
      "vectorCount": 150,
      "chunkCount": 25
    }
  ],
  "pagination": {
    "total": 125,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `documents` | array | List of documents |
| `documents[].id` | string (UUID) | Document identifier |
| `documents[].projectId` | string (UUID) | Project identifier |
| `documents[].fileName` | string | Original file name |
| `documents[].processingStatus` | string | Status: pending, processing, completed, or failed |
| `documents[].fileSize` | integer | File size in bytes |
| `documents[].mimeType` | string | File MIME type |
| `documents[].uploadedAt` | string (date-time) | Upload timestamp |
| `documents[].completedAt` | string (date-time) | Processing completion timestamp |
| `documents[].metadata` | object | Document-specific metadata |
| `documents[].metadata.pageCount` | integer | Number of pages (if applicable) |
| `documents[].metadata.wordCount` | integer | Total word count |
| `documents[].metadata.language` | string | Detected language code |
| `documents[].vectorCount` | integer | Number of vectors generated |
| `documents[].chunkCount` | integer | Number of text chunks |
| `pagination` | object | Pagination details |
| `pagination.total` | integer | Total number of documents |
| `pagination.limit` | integer | Requested limit |
| `pagination.offset` | integer | Requested offset |
| `pagination.hasMore` | boolean | Whether more documents exist |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid API key |
| 404 | Project not found |
| 429 | Rate limit exceeded |

### Example Error Response

```json
{
  "error": "Invalid project ID",
  "code": "invalid_project",
  "category": "validation",
  "details": {
    "message": "Project does not exist or you don't have access"
  }
}
```

## Best Practices

1. **Pagination**
   - Use appropriate page sizes
   - Handle hasMore flag properly
   - Cache results when possible
   - Implement infinite scroll UI

2. **Filtering**
   - Filter by status when needed
   - Consider UI loading states
   - Handle empty results gracefully
   - Preserve filter state

3. **Performance**
   - Monitor rate limits
   - Implement proper error handling
   - Consider background refresh
   - Cache document metadata

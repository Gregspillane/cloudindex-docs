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

Retrieve a list of all documents in your project. The response includes detailed metadata about each document, including processing status, file information, and generated content metrics.

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string (UUID) | Yes | Project identifier |

## Response

The response includes an array of Document objects:

```json
{
  "documents": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "projectId": "123e4567-e89b-12d3-a456-426614174000",
      "fileName": "example.pdf",
      "fileType": "PDF Document",
      "processingStatus": "processed",
      "fileSize": 1024000,
      "uploadDate": "2024-01-22T10:00:00Z",
      "version": 1,
      "contentHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "lastModified": "2024-01-22T10:00:00Z",
      "processingStartedAt": "2024-01-22T10:00:01Z",
      "processingCompletedAt": "2024-01-22T10:01:00Z",
      "processing_time": 59000,
      "processorType": "llama-parse",
      "retryCount": 0,
      "chunkCount": 25,
      "errorMessage": null
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `documents` | array | List of documents |
| `documents[].id` | string (UUID) | Document identifier |
| `documents[].projectId` | string (UUID) | Project identifier |
| `documents[].fileName` | string | Original file name |
| `documents[].fileType` | string | Detected file type (e.g., PDF Document, Word Document) |
| `documents[].processingStatus` | string | Status: pending, processing, processed, or failed |
| `documents[].fileSize` | integer | File size in bytes |
| `documents[].uploadDate` | string (date-time) | Upload timestamp |
| `documents[].version` | integer | Document version number |
| `documents[].contentHash` | string | SHA-256 hash of document content |
| `documents[].lastModified` | string (date-time) | Last modification timestamp |
| `documents[].processingStartedAt` | string (date-time) | Processing start timestamp |
| `documents[].processingCompletedAt` | string (date-time) | Processing completion timestamp |
| `documents[].processing_time` | integer | Processing duration in milliseconds |
| `documents[].processorType` | string | Type of processor used (basic, llama-parse, code, tree-sitter, note) |
| `documents[].retryCount` | integer | Number of processing retry attempts |
| `documents[].chunkCount` | integer | Number of text chunks generated |
| `documents[].errorMessage` | string | Error message if processing failed |

### Processor Types

- `basic`: Simple text extraction
- `llama-parse`: Advanced document parsing (PDF, Office docs)
- `code`: TypeScript/JavaScript parsing
- `tree-sitter`: Advanced code parsing (Python, Go, etc.)
- `note`: Note-specific parsing (Notion)

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid API key |
| 404 | Project not found |
| 429 | Rate limit exceeded |
| 500 | Server error |

### Example Error Response

```json
{
  "error": "Project not found",
  "code": "project_not_found",
  "category": "not_found",
  "details": {
    "message": "The specified project does not exist or you don't have access",
    "projectId": "123e4567-e89b-12d3-a456-426614174000"
  }
}
```

## Best Practices

1. **Document Processing Workflow**
   - Monitor processing status transitions
   - Track processing times for optimization
   - Use processor type information for content planning
   - Handle failed documents appropriately

2. **Version Management**
   - Track document versions over time
   - Use content hashes for change detection
   - Monitor modification timestamps
   - Implement version control policies

3. **Error Handling**
   - Check processing status before using documents
   - Monitor retry counts for problematic files
   - Log and analyze error messages
   - Implement appropriate retry strategies

4. **Performance Optimization**
   - Monitor processing times across document types
   - Analyze chunk counts for content optimization
   - Consider processor type performance characteristics
   - Implement caching strategies

5. **Security and Compliance**
   - Track document modifications
   - Monitor processing status changes
   - Implement audit logging
   - Maintain version history

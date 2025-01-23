---
title: Get Document Details (GET)
sidebar_position: 4
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# Get Document Details

Retrieve detailed information about a specific document.

<ApiPlayground
  endpoint={{
    method: 'GET',
    path: '/projects/{projectId}/documents/{documentId}',
    parameters: {
      path: {
        projectId: {
          name: 'projectId',
          type: 'string',
          required: true,
          description: 'Project identifier (UUID)'
        },
        documentId: {
          name: 'documentId',
          type: 'string',
          required: true,
          description: 'Document identifier (UUID)'
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

Get detailed information about a specific document, including its processing status, metadata, and associated processing jobs.

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string (UUID) | Yes | Project identifier |
| `documentId` | string (UUID) | Yes | Document identifier |

## Response

The response follows the `DocumentDetails` schema:

```json
{
  "document": {
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
  },
  "processingJobs": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440000",
      "batchId": "770e8400-e29b-41d4-a716-446655440000",
      "status": "processed",
      "processorType": "llama-parse",
      "processingMetadata": {
        "pageCount": 10,
        "wordCount": 2500,
        "language": "en"
      }
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `document` | object | Document details |
| `document.id` | string (UUID) | Document identifier |
| `document.projectId` | string (UUID) | Project identifier |
| `document.fileName` | string | Original file name |
| `document.fileType` | string | Detected file type (e.g., PDF Document, Word Document) |
| `document.processingStatus` | string | Status: pending, processing, processed, or failed |
| `document.fileSize` | integer | File size in bytes |
| `document.uploadDate` | string (date-time) | Upload timestamp |
| `document.version` | integer | Document version number |
| `document.contentHash` | string | SHA-256 hash of document content |
| `document.lastModified` | string (date-time) | Last modification timestamp |
| `document.processingStartedAt` | string (date-time) | Processing start timestamp |
| `document.processingCompletedAt` | string (date-time) | Processing completion timestamp |
| `document.processing_time` | integer | Processing duration in milliseconds |
| `document.processorType` | string | Type of processor used |
| `document.retryCount` | integer | Number of processing retry attempts |
| `document.chunkCount` | integer | Number of text chunks generated |
| `document.errorMessage` | string | Error message if processing failed |
| `processingJobs` | array | Processing job history |
| `processingJobs[].id` | string (UUID) | Processing job identifier |
| `processingJobs[].batchId` | string (UUID) | Batch identifier |
| `processingJobs[].status` | string | Job status |
| `processingJobs[].processorType` | string | Type of processor used |
| `processingJobs[].processingMetadata` | object | Additional processing metadata |

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
| 404 | Document or project not found |
| 429 | Rate limit exceeded |
| 500 | Server error |

### Example Error Response

```json
{
  "error": "Document not found",
  "code": "document_not_found",
  "category": "not_found",
  "details": {
    "message": "The specified document does not exist or you don't have access",
    "documentId": "550e8400-e29b-41d4-a716-446655440000"
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

4. **Processing Metadata**
   - Analyze processing metadata for insights
   - Use metadata for content optimization
   - Track processor performance
   - Monitor processing patterns

5. **Security and Compliance**
   - Track document modifications
   - Monitor processing status changes
   - Implement audit logging
   - Maintain version history

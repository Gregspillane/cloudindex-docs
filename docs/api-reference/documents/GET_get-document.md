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
    "processingStatus": "completed",
    "fileSize": 1024000,
    "mimeType": "application/pdf",
    "uploadedAt": "2024-01-22T10:00:00Z",
    "completedAt": "2024-01-22T10:01:00Z",
    "metadata": {
      "pageCount": 10,
      "wordCount": 2500,
      "language": "en",
      "title": "Example Document",
      "author": "John Doe",
      "createdAt": "2024-01-20T15:30:00Z"
    },
    "vectorCount": 150,
    "chunkCount": 25,
    "averageChunkSize": 100,
    "extractedText": {
      "available": true,
      "size": 25000,
      "snippet": "First few words of the document..."
    }
  },
  "processingJobs": [
    {
      "batchId": "770e8400-e29b-41d4-a716-446655440000",
      "status": "completed",
      "startedAt": "2024-01-22T10:00:00Z",
      "completedAt": "2024-01-22T10:01:00Z",
      "error": null
    }
  ],
  "usage": {
    "vectorStorage": 1500000,
    "textStorage": 25000,
    "processingTime": 60000
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `document` | object | Document details |
| `document.id` | string (UUID) | Document identifier |
| `document.projectId` | string (UUID) | Project identifier |
| `document.fileName` | string | Original file name |
| `document.processingStatus` | string | Status: pending, processing, completed, or failed |
| `document.fileSize` | integer | File size in bytes |
| `document.mimeType` | string | File MIME type |
| `document.uploadedAt` | string (date-time) | Upload timestamp |
| `document.completedAt` | string (date-time) | Processing completion timestamp |
| `document.metadata` | object | Document-specific metadata |
| `document.metadata.pageCount` | integer | Number of pages (if applicable) |
| `document.metadata.wordCount` | integer | Total word count |
| `document.metadata.language` | string | Detected language code |
| `document.metadata.title` | string | Extracted document title |
| `document.metadata.author` | string | Extracted author information |
| `document.metadata.createdAt` | string (date-time) | Original document creation date |
| `document.vectorCount` | integer | Number of vectors generated |
| `document.chunkCount` | integer | Number of text chunks |
| `document.averageChunkSize` | integer | Average tokens per chunk |
| `document.extractedText` | object | Text extraction details |
| `document.extractedText.available` | boolean | Whether text extraction succeeded |
| `document.extractedText.size` | integer | Size of extracted text in bytes |
| `document.extractedText.snippet` | string | Preview of document content |
| `processingJobs` | array | Processing job history |
| `processingJobs[].batchId` | string (UUID) | Batch identifier |
| `processingJobs[].status` | string | Job status |
| `processingJobs[].startedAt` | string (date-time) | Processing start time |
| `processingJobs[].completedAt` | string (date-time) | Processing completion time |
| `processingJobs[].error` | string | Error message if failed |
| `usage` | object | Resource usage metrics |
| `usage.vectorStorage` | integer | Vector storage used (bytes) |
| `usage.textStorage` | integer | Text storage used (bytes) |
| `usage.processingTime` | integer | Total processing time (ms) |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid API key |
| 404 | Document or project not found |
| 429 | Rate limit exceeded |

### Example Error Response

```json
{
  "error": "Document not found",
  "code": "document_not_found",
  "category": "not_found",
  "details": {
    "message": "The specified document does not exist or you don't have access"
  }
}
```

## Best Practices

1. **Error Handling**
   - Verify document existence
   - Handle 404 errors gracefully
   - Implement proper retries
   - Display user-friendly messages

2. **Status Monitoring**
   - Poll for status updates
   - Handle all status types
   - Show processing progress
   - Cache document details

3. **Resource Management**
   - Monitor usage metrics
   - Track storage consumption
   - Optimize processing time
   - Clean up unused documents

4. **Metadata Usage**
   - Extract relevant metadata
   - Display important fields
   - Use metadata for search
   - Update UI based on status

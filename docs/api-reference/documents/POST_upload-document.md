---
title: Upload Document (POST)
sidebar_position: 2
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# Upload Document

Upload one or more documents for processing. Documents are processed asynchronously in batches.

<ApiPlayground
  endpoint={{
    method: 'POST',
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
      body: {
        documents: {
          name: 'documents',
          type: 'file[]',
          required: true,
          description: 'Array of files to upload (max 20)'
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

Upload documents to your project for processing and indexing. The API supports batch uploads of up to 20 files simultaneously. Documents are processed asynchronously, and you can monitor their status through the batch processing endpoint.

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string (UUID) | Yes | Project identifier |

### Request Body

The request must use `multipart/form-data` format.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `documents` | file[] | Yes | Array of files to upload (max 20) |

## Response

The response follows the `BatchUploadResponse` schema:

```json
{
  "documents": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "projectId": "123e4567-e89b-12d3-a456-426614174000",
      "fileName": "example.pdf",
      "processingStatus": "pending",
      "fileSize": 1024000,
      "mimeType": "application/pdf",
      "uploadedAt": "2024-01-22T10:00:00Z",
      "metadata": {}
    }
  ],
  "errors": [
    {
      "fileName": "invalid.xyz",
      "error": "Unsupported file type",
      "code": "invalid_file_type",
      "retryable": false
    }
  ],
  "batch": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "status": "pending",
    "totalFiles": 1,
    "progress": 0,
    "createdAt": "2024-01-22T10:00:00Z",
    "estimatedCompletionTime": "2024-01-22T10:01:00Z"
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `documents` | array | Successfully queued documents |
| `documents[].id` | string (UUID) | Document identifier |
| `documents[].projectId` | string (UUID) | Project identifier |
| `documents[].fileName` | string | Original file name |
| `documents[].processingStatus` | string | Status: pending, processing, completed, or failed |
| `documents[].fileSize` | integer | File size in bytes |
| `documents[].mimeType` | string | File MIME type |
| `documents[].uploadedAt` | string (date-time) | Upload timestamp |
| `documents[].metadata` | object | Additional document metadata |
| `errors` | array | Failed uploads |
| `errors[].fileName` | string | Name of failed file |
| `errors[].error` | string | Error description |
| `errors[].code` | string | Error code |
| `errors[].retryable` | boolean | Whether error is temporary |
| `batch` | object | Batch processing details |
| `batch.id` | string (UUID) | Batch identifier |
| `batch.status` | string | Batch status |
| `batch.totalFiles` | integer | Total files in batch |
| `batch.progress` | number | Processing progress (0-100) |
| `batch.createdAt` | string (date-time) | Batch creation timestamp |
| `batch.estimatedCompletionTime` | string (date-time) | Estimated completion time |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid API key |
| 413 | Payload too large |
| 415 | Unsupported file type |
| 429 | Rate limit exceeded |

### Example Error Response

```json
{
  "error": "Batch upload limit exceeded",
  "code": "batch_limit_exceeded",
  "category": "validation",
  "details": {
    "message": "Maximum 20 files per batch",
    "limit": 20,
    "submitted": 25
  }
}
```

## Best Practices

1. **File Selection**
   - Verify file types before upload
   - Check file size limits
   - Ensure files are not corrupted
   - Remove unnecessary metadata

2. **Batch Processing**
   - Group related documents
   - Monitor batch progress
   - Handle failed uploads
   - Implement retry logic

3. **Performance**
   - Compress large files
   - Use parallel uploads
   - Monitor rate limits
   - Implement proper error handling

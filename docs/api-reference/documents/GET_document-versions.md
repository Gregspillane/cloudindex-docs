---
title: Document Version History (GET)
sidebar_position: 6
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# Document Version History

Retrieve the version history of a document.

<ApiPlayground
  endpoint={{
    method: 'GET',
    path: '/projects/{projectId}/documents/{documentId}/versions',
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
      },
      query: {
        limit: {
          name: 'limit',
          type: 'integer',
          required: false,
          description: 'Maximum number of versions to return (default: 10, max: 50)'
        },
        offset: {
          name: 'offset',
          type: 'integer',
          required: false,
          description: 'Number of versions to skip (default: 0)'
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

Retrieve the version history of a document, including metadata about each version and the changes made between versions. Versions are ordered from newest to oldest.

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string (UUID) | Yes | Project identifier |
| `documentId` | string (UUID) | Yes | Document identifier |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | integer | No | Maximum number of versions (default: 10, max: 50) |
| `offset` | integer | No | Number of versions to skip (default: 0) |

## Response

The response follows the `DocumentVersionHistory` schema:

```json
{
  "versions": [
    {
      "version": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "versionNumber": 3,
        "fileName": "example-v3.pdf",
        "processingStatus": "completed",
        "fileSize": 1024000,
        "mimeType": "application/pdf",
        "createdAt": "2024-01-22T10:00:00Z",
        "completedAt": "2024-01-22T10:01:00Z"
      },
      "changes": [
        {
          "type": "content_update",
          "description": "Content modified on pages 5-7",
          "affectedPages": [5, 6, 7],
          "changeSize": 2500
        }
      ],
      "metadata": {
        "isLatest": true,
        "author": "John Doe",
        "commitMessage": "Updated product specifications",
        "timestamp": "2024-01-22T10:00:00Z",
        "vectorCount": 150,
        "chunkCount": 25
      }
    }
  ],
  "pagination": {
    "total": 3,
    "limit": 10,
    "offset": 0,
    "hasMore": false
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `versions` | array | List of document versions |
| `versions[].version` | object | Version details |
| `versions[].version.id` | string (UUID) | Version identifier |
| `versions[].version.versionNumber` | integer | Sequential version number |
| `versions[].version.fileName` | string | Original file name |
| `versions[].version.processingStatus` | string | Status: pending, processing, completed, or failed |
| `versions[].version.fileSize` | integer | File size in bytes |
| `versions[].version.mimeType` | string | File MIME type |
| `versions[].version.createdAt` | string (date-time) | Version creation timestamp |
| `versions[].version.completedAt` | string (date-time) | Processing completion timestamp |
| `versions[].changes` | array | List of changes from previous version |
| `versions[].changes[].type` | string | Type of change (content_update, metadata_update, etc.) |
| `versions[].changes[].description` | string | Human-readable change description |
| `versions[].changes[].affectedPages` | array | List of modified page numbers |
| `versions[].changes[].changeSize` | integer | Size of changes in bytes |
| `versions[].metadata` | object | Version-specific metadata |
| `versions[].metadata.isLatest` | boolean | Whether this is the latest version |
| `versions[].metadata.author` | string | Author of the changes |
| `versions[].metadata.commitMessage` | string | Description of changes |
| `versions[].metadata.timestamp` | string (date-time) | Change timestamp |
| `versions[].metadata.vectorCount` | integer | Number of vectors in this version |
| `versions[].metadata.chunkCount` | integer | Number of text chunks in this version |
| `pagination` | object | Pagination details |
| `pagination.total` | integer | Total number of versions |
| `pagination.limit` | integer | Requested limit |
| `pagination.offset` | integer | Requested offset |
| `pagination.hasMore` | boolean | Whether more versions exist |

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
  "error": "Invalid version access",
  "code": "version_not_found",
  "category": "not_found",
  "details": {
    "message": "The specified version does not exist or has been deleted"
  }
}
```

## Best Practices

1. **Version Management**
   - Track version numbers
   - Store change descriptions
   - Monitor version count
   - Implement cleanup policies

2. **Change Tracking**
   - Record meaningful changes
   - Track affected content
   - Maintain author info
   - Use clear commit messages

3. **Resource Management**
   - Monitor storage usage
   - Implement version limits
   - Clean up old versions
   - Track vector changes

4. **User Experience**
   - Show version timeline
   - Enable version comparison
   - Display change summaries
   - Allow version rollback

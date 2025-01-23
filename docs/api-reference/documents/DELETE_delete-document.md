---
title: Delete Document (DELETE)
sidebar_position: 5
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# Delete Document

Delete a specific document from the project.

<ApiPlayground
  endpoint={{
    method: 'DELETE',
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

Permanently delete a document from your project. This operation removes the document's content, metadata, and all associated vectors. This action cannot be undone.

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string (UUID) | Yes | Project identifier |
| `documentId` | string (UUID) | Yes | Document identifier |

## Response

A successful deletion returns a confirmation message:

```json
{
  "success": true,
  "message": "Document deleted successfully",
  "details": {
    "documentId": "550e8400-e29b-41d4-a716-446655440000",
    "deletedAt": "2024-01-22T10:00:00Z",
    "resourcesFreed": {
      "vectorStorage": 1500000,
      "textStorage": 25000
    }
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether deletion was successful |
| `message` | string | Human-readable status message |
| `details` | object | Additional deletion details |
| `details.documentId` | string (UUID) | ID of deleted document |
| `details.deletedAt` | string (date-time) | Deletion timestamp |
| `details.resourcesFreed` | object | Resources released by deletion |
| `details.resourcesFreed.vectorStorage` | integer | Vector storage freed (bytes) |
| `details.resourcesFreed.textStorage` | integer | Text storage freed (bytes) |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid API key |
| 404 | Document or project not found |
| 409 | Document is being processed |
| 429 | Rate limit exceeded |

### Example Error Response

```json
{
  "error": "Document in use",
  "code": "document_locked",
  "category": "conflict",
  "details": {
    "message": "Document is currently being processed and cannot be deleted",
    "retryAfter": "2024-01-22T10:01:00Z"
  }
}
```

## Best Practices

1. **Confirmation**
   - Implement confirmation dialogs
   - Verify document ownership
   - Check document status
   - Consider soft deletion

2. **Resource Management**
   - Track freed resources
   - Update storage quotas
   - Clean up related data
   - Monitor deletion jobs

3. **Error Handling**
   - Handle 404 gracefully
   - Respect processing locks
   - Implement proper retries
   - Update UI immediately

4. **Data Consistency**
   - Remove from search indexes
   - Clean up vector storage
   - Update document counts
   - Maintain audit logs

5. **User Experience**
   - Show loading states
   - Provide undo options
   - Display success messages
   - Update document lists

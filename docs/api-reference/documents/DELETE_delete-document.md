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

Permanently delete a document from your project. This operation:
- Removes the document's content, metadata, and all associated vectors
- Deletes all processing history and version information
- Cannot be undone - consider archiving if permanent deletion is not required
- May have compliance and audit implications in regulated environments
- Could affect downstream systems or applications using this document

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
  "message": "Document deleted successfully"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Success confirmation message |

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
  "details": {
    "message": "The specified document does not exist or you don't have access"
  }
}
```

## Best Practices

1. **Data Governance**
   - Implement deletion approval workflows
   - Maintain comprehensive audit logs
   - Consider regulatory requirements
   - Document deletion rationale
   - Verify compliance obligations

2. **Resource Management**
   - Track downstream dependencies
   - Update related indexes
   - Clean up associated resources
   - Monitor system impact
   - Verify deletion completion

3. **Error Handling**
   - Validate document state
   - Handle errors gracefully
   - Implement proper retries
   - Log deletion attempts
   - Monitor failure patterns

4. **Recovery Procedures**
   - Consider backup requirements
   - Document recovery processes
   - Maintain deletion logs
   - Plan for rollback scenarios
   - Test recovery procedures

5. **User Experience**
   - Require confirmation
   - Show clear warnings
   - Display progress indicators
   - Provide status updates
   - Handle UI state changes

6. **Enterprise Considerations**
   - Assess business impact
   - Follow change management
   - Update documentation
   - Consider legal implications
   - Maintain deletion records

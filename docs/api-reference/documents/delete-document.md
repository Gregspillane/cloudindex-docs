---
title: Delete Document
sidebar_position: 5
---

# Delete Document

Permanently delete a document and its associated vector embeddings from a project.

## Endpoint

```bash
DELETE /v1/projects/{projectId}/documents/{documentId}
```

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | The ID of the project containing the document |
| documentId | string | Yes | The ID of the document to delete |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| force | boolean | No | Force deletion even if document is referenced (default: false) |

### Headers

| Header | Value |
|--------|-------|
| Authorization | Bearer YOUR_API_KEY |

## Response

### 204: No Content

Successfully deleted document (no response body)

### 400: Bad Request

```json
{
  "error": {
    "code": "document_referenced",
    "message": "Document is referenced by other resources",
    "details": {
      "documentId": "doc_123abc",
      "references": [
        {
          "type": "chat_thread",
          "id": "thread_789xyz"
        }
      ]
    }
  }
}
```

### 404: Not Found

```json
{
  "error": {
    "code": "document_not_found",
    "message": "Document not found",
    "details": {
      "documentId": "doc_123abc"
    }
  }
}
```

### 403: Forbidden

```json
{
  "error": {
    "code": "forbidden",
    "message": "Insufficient permissions to delete document",
    "details": {
      "documentId": "doc_123abc",
      "requiredRole": "admin"
    }
  }
}
```

## Example Requests

### Basic Delete

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.cloudindex.ai/v1/projects/proj_456def/documents/doc_123abc"
```

### Force Delete

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.cloudindex.ai/v1/projects/proj_456def/documents/doc_123abc?force=true"
```

## Code Examples

### Python

```python
import requests

url = "https://api.cloudindex.ai/v1/projects/proj_456def/documents/doc_123abc"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
params = {
    "force": True  # Optional: force deletion
}

response = requests.delete(url, headers=headers, params=params)

if response.status_code == 204:
    print("Document successfully deleted")
elif response.status_code == 400:
    error = response.json()["error"]
    print(f"Cannot delete: {error['message']}")
```

### JavaScript

```javascript
const params = new URLSearchParams({
  force: true  // Optional: force deletion
});

fetch(`https://api.cloudindex.ai/v1/projects/proj_456def/documents/doc_123abc?${params}`, {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
  .then(response => {
    if (response.status === 204) {
      console.log('Document successfully deleted');
    } else {
      return response.json().then(error => {
        throw new Error(`Cannot delete: ${error.error.message}`);
      });
    }
  })
  .catch(error => console.error(error));
```

## Notes

1. Deletion Process:
   - Document is marked for deletion
   - Associated vector embeddings are removed
   - Document metadata is purged
   - References are cleaned up

2. Impact of Deletion:
   - Document content becomes inaccessible
   - Vector embeddings are removed from search
   - Chat threads referencing the document may be affected
   - Document ID becomes invalid for future requests

3. Best Practices:
   - Verify document ID before deletion
   - Use force parameter with caution
   - Consider archiving instead of deletion
   - Handle referenced documents appropriately

4. Security:
   - Requires admin role or document owner permissions
   - Action is permanent and cannot be undone
   - Consider implementing soft delete in your application

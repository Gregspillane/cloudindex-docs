---
title: Get Document
sidebar_position: 4
---

# Get Document

Retrieve detailed information about a specific document, including its processing status and metadata.

## Endpoint

```bash
GET /v1/projects/{projectId}/documents/{documentId}
```

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | The ID of the project containing the document |
| documentId | string | Yes | The ID of the document to retrieve |

### Headers

| Header | Value |
|--------|-------|
| Authorization | Bearer YOUR_API_KEY |

## Response

### 200: OK

```json
{
  "id": "doc_123abc",
  "projectId": "proj_456def",
  "name": "example.pdf",
  "type": "pdf",
  "size": 1048576,
  "status": "processed",
  "metadata": {
    "pageCount": 10,
    "author": "John Doe",
    "createdAt": "2024-01-22T12:00:00Z",
    "lastModified": "2024-01-22T12:00:00Z",
    "contentType": "application/pdf",
    "encoding": "utf-8"
  },
  "processing": {
    "startedAt": "2024-01-22T12:00:05Z",
    "completedAt": "2024-01-22T12:00:30Z",
    "duration": 25,
    "chunks": 150,
    "tokens": 45000
  },
  "vectorCount": 150,
  "createdAt": "2024-01-22T12:00:00Z",
  "updatedAt": "2024-01-22T12:00:30Z"
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
    "message": "Insufficient permissions to access document",
    "details": {
      "documentId": "doc_123abc",
      "requiredRole": "reader"
    }
  }
}
```

## Example Requests

### Basic Request

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.cloudindex.ai/v1/projects/proj_456def/documents/doc_123abc"
```

## Code Examples

### Python

```python
import requests

url = "https://api.cloudindex.ai/v1/projects/proj_456def/documents/doc_123abc"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}

response = requests.get(url, headers=headers)
document = response.json()

# Check document status
if document["status"] == "processed":
    print(f"Document processed with {document['vectorCount']} vectors")
elif document["status"] == "processing":
    print("Document is still being processed")
else:
    print(f"Document status: {document['status']}")
```

### JavaScript

```javascript
fetch('https://api.cloudindex.ai/v1/projects/proj_456def/documents/doc_123abc', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
  .then(response => response.json())
  .then(document => {
    // Check document status
    if (document.status === 'processed') {
      console.log(`Document processed with ${document.vectorCount} vectors`);
    } else if (document.status === 'processing') {
      console.log('Document is still being processed');
    } else {
      console.log(`Document status: ${document.status}`);
    }
  });
```

## Notes

1. Use this endpoint to:
   - Check document processing status
   - Retrieve document metadata
   - Get vector embedding statistics
   - Monitor processing progress

2. Processing States:
   - `pending`: Document uploaded but not yet processed
   - `processing`: Document is currently being processed
   - `processed`: Processing completed successfully
   - `failed`: Processing failed (check error details)
   - `deleted`: Document has been deleted

3. Best Practices:
   - Poll periodically to check processing status
   - Implement exponential backoff for polling
   - Use webhooks for real-time status updates
   - Cache document metadata when appropriate

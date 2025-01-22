---
title: List Documents
sidebar_position: 3
---

# List Documents

Retrieve a paginated list of documents in a project with optional filtering and sorting.

## Endpoint

```bash
GET /v1/projects/{projectId}/documents
```

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | The ID of the project to list documents from |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 20, max: 100) |
| status | string | No | Filter by status (pending, processing, processed, failed) |
| type | string | No | Filter by document type (pdf, docx, md, txt) |
| sort | string | No | Sort field (createdAt, name, size) |
| order | string | No | Sort order (asc, desc) |
| search | string | No | Search documents by name or metadata |

### Headers

| Header | Value |
|--------|-------|
| Authorization | Bearer YOUR_API_KEY |

## Response

### 200: OK

```json
{
  "documents": [
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
        "createdAt": "2024-01-22T12:00:00Z"
      },
      "vectorCount": 150,
      "createdAt": "2024-01-22T12:00:00Z",
      "updatedAt": "2024-01-22T12:05:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}
```

### 400: Bad Request

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Invalid status filter. Allowed values: pending, processing, processed, failed",
    "details": {
      "field": "status",
      "value": "invalid_status"
    }
  }
}
```

## Example Requests

### Basic List

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.cloudindex.ai/v1/projects/proj_456def/documents"
```

### Filtered List

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.cloudindex.ai/v1/projects/proj_456def/documents?status=processed&type=pdf&sort=createdAt&order=desc"
```

### Search with Pagination

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.cloudindex.ai/v1/projects/proj_456def/documents?search=report&page=2&limit=50"
```

## Code Examples

### Python

```python
import requests

url = "https://api.cloudindex.ai/v1/projects/proj_456def/documents"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
params = {
    "status": "processed",
    "type": "pdf",
    "sort": "createdAt",
    "order": "desc",
    "page": 1,
    "limit": 50
}

response = requests.get(url, headers=headers, params=params)
documents = response.json()["documents"]
```

### JavaScript

```javascript
const params = new URLSearchParams({
  status: 'processed',
  type: 'pdf',
  sort: 'createdAt',
  order: 'desc',
  page: 1,
  limit: 50
});

fetch(`https://api.cloudindex.ai/v1/projects/proj_456def/documents?${params}`, {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
  .then(response => response.json())
  .then(data => {
    const documents = data.documents;
    const pagination = data.pagination;
  });
```

## Notes

1. Results are paginated to optimize performance
2. Use filters to narrow down results efficiently
3. The search parameter performs a fuzzy match on document names and metadata
4. Sort by multiple fields by comma-separating values (e.g., sort=createdAt,name)
5. Maximum page size is 100 documents

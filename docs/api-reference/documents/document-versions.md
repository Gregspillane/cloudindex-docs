---
title: Document Versions
sidebar_position: 6
---

# Document Versions

Manage and retrieve version history for documents in your project.

## List Versions

Get a list of all versions for a specific document.

### Endpoint

```bash
GET /v1/projects/{projectId}/documents/{documentId}/versions
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | The ID of the project containing the document |
| documentId | string | Yes | The ID of the document to get versions for |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 20, max: 100) |

### Headers

| Header | Value |
|--------|-------|
| Authorization | Bearer YOUR_API_KEY |

### Response

#### 200: OK

```json
{
  "versions": [
    {
      "id": "ver_123abc",
      "documentId": "doc_456def",
      "versionNumber": 2,
      "size": 1048576,
      "metadata": {
        "pageCount": 12,
        "author": "Jane Smith",
        "lastModified": "2024-01-22T14:00:00Z"
      },
      "vectorCount": 160,
      "createdAt": "2024-01-22T14:00:00Z",
      "status": "processed"
    },
    {
      "id": "ver_789xyz",
      "documentId": "doc_456def",
      "versionNumber": 1,
      "size": 1024000,
      "metadata": {
        "pageCount": 10,
        "author": "John Doe",
        "lastModified": "2024-01-22T12:00:00Z"
      },
      "vectorCount": 150,
      "createdAt": "2024-01-22T12:00:00Z",
      "status": "processed"
    }
  ],
  "pagination": {
    "total": 2,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

## Get Specific Version

Retrieve details about a specific version of a document.

### Endpoint

```bash
GET /v1/projects/{projectId}/documents/{documentId}/versions/{versionId}
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | The ID of the project |
| documentId | string | Yes | The ID of the document |
| versionId | string | Yes | The ID of the version to retrieve |

### Response

#### 200: OK

```json
{
  "id": "ver_123abc",
  "documentId": "doc_456def",
  "versionNumber": 2,
  "size": 1048576,
  "metadata": {
    "pageCount": 12,
    "author": "Jane Smith",
    "lastModified": "2024-01-22T14:00:00Z",
    "contentType": "application/pdf",
    "encoding": "utf-8"
  },
  "processing": {
    "startedAt": "2024-01-22T14:00:05Z",
    "completedAt": "2024-01-22T14:00:30Z",
    "duration": 25,
    "chunks": 160,
    "tokens": 48000
  },
  "vectorCount": 160,
  "createdAt": "2024-01-22T14:00:00Z",
  "status": "processed"
}
```

## Code Examples

### List Versions

#### Python

```python
import requests

url = "https://api.cloudindex.ai/v1/projects/proj_456def/documents/doc_123abc/versions"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
params = {
    "page": 1,
    "limit": 50
}

response = requests.get(url, headers=headers, params=params)
versions = response.json()["versions"]

for version in versions:
    print(f"Version {version['versionNumber']}: {version['createdAt']}")
```

#### JavaScript

```javascript
const params = new URLSearchParams({
  page: 1,
  limit: 50
});

fetch(`https://api.cloudindex.ai/v1/projects/proj_456def/documents/doc_123abc/versions?${params}`, {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
  .then(response => response.json())
  .then(data => {
    data.versions.forEach(version => {
      console.log(`Version ${version.versionNumber}: ${version.createdAt}`);
    });
  });
```

### Get Specific Version

#### Python

```python
import requests

url = "https://api.cloudindex.ai/v1/projects/proj_456def/documents/doc_123abc/versions/ver_789xyz"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}

response = requests.get(url, headers=headers)
version = response.json()

print(f"Version {version['versionNumber']} details:")
print(f"Created: {version['createdAt']}")
print(f"Size: {version['size']} bytes")
print(f"Vector count: {version['vectorCount']}")
```

## Notes

1. Version Management:
   - Each update creates a new version
   - Versions are immutable
   - All versions maintain their own vector embeddings
   - Previous versions remain searchable

2. Version Numbers:
   - Start at 1 and increment
   - Monotonically increasing
   - Cannot be changed or reused
   - Latest version is default for queries

3. Storage Considerations:
   - Each version stores complete document
   - Consider storage implications
   - Implement version cleanup policies
   - Archive older versions if needed

4. Best Practices:
   - Monitor version count
   - Clean up unused versions
   - Document version differences
   - Use webhooks for version updates

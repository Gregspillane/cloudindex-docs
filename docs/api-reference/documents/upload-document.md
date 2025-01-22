---
title: Upload Document
sidebar_position: 2
---

# Upload Document

Upload a new document to a project for processing and vector embedding generation.

## Endpoint

```bash
POST /v1/projects/{projectId}/documents
```

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string | Yes | The ID of the project to upload to |

### Headers

| Header | Value |
|--------|-------|
| Authorization | Bearer YOUR_API_KEY |
| Content-Type | multipart/form-data |

### Form Data Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| file | file | Yes | The document file to upload |
| name | string | No | Custom name for the document (defaults to filename) |
| metadata | JSON string | No | Additional metadata for the document |
| options | JSON string | No | Processing options |

### Processing Options

```json
{
  "language": "en",
  "chunkSize": 1000,
  "overlapSize": 200,
  "extractImages": false,
  "ocrEnabled": true
}
```

## Response

### 201: Created

```json
{
  "id": "doc_123abc",
  "projectId": "proj_456def",
  "name": "example.pdf",
  "type": "pdf",
  "size": 1048576,
  "status": "pending",
  "metadata": {
    "author": "John Doe",
    "createdAt": "2024-01-22T12:00:00Z"
  },
  "uploadedAt": "2024-01-22T12:00:00Z"
}
```

### 400: Bad Request

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Invalid file type. Supported types: pdf, docx, md, txt",
    "details": {
      "field": "file",
      "type": "image/jpeg"
    }
  }
}
```

### 413: Payload Too Large

```json
{
  "error": {
    "code": "file_too_large",
    "message": "File exceeds maximum size of 100MB",
    "details": {
      "size": 157286400,
      "maxSize": 104857600
    }
  }
}
```

## Example Request

### cURL

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@document.pdf" \
  -F "name=Important Document" \
  -F 'metadata={"author":"Jane Smith","department":"Engineering"}' \
  -F 'options={"language":"en","chunkSize":1000}' \
  https://api.cloudindex.ai/v1/projects/proj_456def/documents
```

### Python

```python
import requests

url = "https://api.cloudindex.ai/v1/projects/proj_456def/documents"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
files = {
    "file": ("document.pdf", open("document.pdf", "rb")),
    "name": (None, "Important Document"),
    "metadata": (None, '{"author":"Jane Smith","department":"Engineering"}'),
    "options": (None, '{"language":"en","chunkSize":1000}')
}

response = requests.post(url, headers=headers, files=files)
print(response.json())
```

### JavaScript

```javascript
const form = new FormData();
form.append('file', document.querySelector('input[type="file"]').files[0]);
form.append('name', 'Important Document');
form.append('metadata', JSON.stringify({
  author: 'Jane Smith',
  department: 'Engineering'
}));
form.append('options', JSON.stringify({
  language: 'en',
  chunkSize: 1000
}));

fetch('https://api.cloudindex.ai/v1/projects/proj_456def/documents', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: form
})
  .then(response => response.json())
  .then(data => console.log(data));
```

## Notes

1. The document will be queued for processing after upload
2. Monitor the document status using the [Get Document](/api-reference/documents/get-document) endpoint
3. Set up webhooks to receive processing status updates
4. Large files may take several minutes to process
5. Consider using batch processing for multiple files

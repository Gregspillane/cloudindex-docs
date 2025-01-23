---
title: Upload Document
sidebar_position: 2
---

# Upload Documents

Upload one or more documents for processing. Documents are processed asynchronously in batches.

## API Endpoint

```http
POST /projects/{projectId}/documents
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string (UUID) | Yes | Project identifier |

## Request Body

The request should use `multipart/form-data` format.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| documents | file[] | Yes | Array of files to upload (max 20) |

## Response

```json
{
  "documents": [
    {
      "id": "string",
      "projectId": "string",
      "fileName": "string",
      "processingStatus": "pending"
      // ... additional fields
    }
  ],
  "errors": [
    {
      "fileName": "string",
      "error": "string",
      "code": "string",
      "retryable": boolean
    }
  ],
  "batch": {
    "id": "string",
    "status": "pending",
    "totalFiles": 0,
    "progress": 0
  }
}
```
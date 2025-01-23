---
title: Get Document
sidebar_position: 4
---

# Get Document Details

Retrieve detailed information about a specific document.

## API Endpoint

```http
GET /projects/{projectId}/documents/{documentId}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string (UUID) | Yes | Project identifier |
| documentId | string (UUID) | Yes | Document identifier |

## Response

```json
{
  "document": {
    "id": "string",
    "projectId": "string",
    "fileName": "string",
    "processingStatus": "string"
    // ... additional fields
  },
  "processingJobs": [
    {
      "batchId": "string"
    }
  ]
}
```

---
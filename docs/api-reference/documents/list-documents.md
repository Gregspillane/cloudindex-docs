---
title: List Documents
sidebar_position: 3
---

# List Documents

Retrieve a list of all documents in a project.

## API Endpoint

```http
GET /projects/{projectId}/documents
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string (UUID) | Yes | Project identifier |

## Response

```json
[
  {
    "id": "string",
    "projectId": "string",
    "fileName": "string",
    "processingStatus": "string",
    // ... additional fields
  }
]
```

---
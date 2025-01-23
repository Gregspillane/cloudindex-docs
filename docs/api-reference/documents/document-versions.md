---
title: Document Versions
sidebar_position: 6
---

# Document Version History

Retrieve the version history of a document.

## API Endpoint

```http
GET /projects/{projectId}/documents/{documentId}/versions
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string (UUID) | Yes | Project identifier |
| documentId | string (UUID) | Yes | Document identifier |

## Response

```json
{
  "versions": [
    {
      "version": {
        "id": "string",
        "versionNumber": 0,
        "fileName": "string",
        "processingStatus": "string",
        "createdAt": "string"
      },
      "changes": [],
      "metadata": {
        "isLatest": true,
        "timestamp": "string"
      }
    }
  ]
}
```
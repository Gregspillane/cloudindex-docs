---
title: Delete Document
sidebar_position: 5
---

# Delete Document

Delete a specific document from the project.

## API Endpoint

```http
DELETE /projects/{projectId}/documents/{documentId}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| projectId | string (UUID) | Yes | Project identifier |
| documentId | string (UUID) | Yes | Document identifier |

## Response

```json
{
  "message": "Document deleted successfully"
}
```
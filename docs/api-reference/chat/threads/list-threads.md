---
title: List Threads
sidebar_position: 2
---

# List Threads

Retrieve a list of chat threads for a project.

## Request

```http
GET /chat/threads
```

### Headers

```json
{
  "Authorization": "Bearer YOUR_API_KEY",
  "Content-Type": "application/json"
}
```

### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectId` | string | Yes | ID of the project to list threads from |
| `limit` | number | No | Maximum number of threads to return (default: 10) |
| `offset` | number | No | Number of threads to skip (default: 0) |
| `tags` | string[] | No | Filter threads by tags |
| `sortBy` | string | No | Sort field: "createdAt" or "updatedAt" (default: "updatedAt") |
| `sortOrder` | string | No | Sort order: "asc" or "desc" (default: "desc") |

## Response

```json
{
  "threads": [
    {
      "threadId": "string",
      "projectId": "string",
      "metadata": {
        "title": "string",
        "description": "string",
        "tags": "string[]"
      },
      "options": {
        "model": "string",
        "temperature": "number",
        "maxTokens": "number",
        "filters": {
          "documentIds": "string[]",
          "types": "string[]",
          "dateRange": {
            "from": "string",
            "to": "string"
          }
        }
      },
      "messageCount": "number",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "totalCount": "number",
  "hasMore": "boolean"
}
```

### Response Fields

| Name | Type | Description |
|------|------|-------------|
| `threads` | array | List of thread objects |
| `threads[].threadId` | string | Unique thread identifier |
| `threads[].projectId` | string | Associated project ID |
| `threads[].metadata` | object | Thread metadata |
| `threads[].options` | object | Thread configuration |
| `threads[].messageCount` | number | Number of messages in thread |
| `threads[].createdAt` | string | Thread creation timestamp |
| `threads[].updatedAt` | string | Last update timestamp |
| `totalCount` | number | Total number of threads matching query |
| `hasMore` | boolean | Whether more threads are available |

## Example

### Request

```bash
curl -X GET "https://api.cloudindex.ai/chat/threads?projectId=proj_456def&limit=2&tags=features" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "threads": [
    {
      "threadId": "thread_abc123",
      "projectId": "proj_456def",
      "metadata": {
        "title": "Product Features Discussion",
        "description": "Chat about CloudIndex features",
        "tags": ["features", "product"]
      },
      "options": {
        "model": "gpt-4",
        "temperature": 0.7,
        "maxTokens": 1000
      },
      "messageCount": 5,
      "createdAt": "2024-01-22T16:00:00Z",
      "updatedAt": "2024-01-22T16:30:00Z"
    },
    {
      "threadId": "thread_def456",
      "projectId": "proj_456def",
      "metadata": {
        "title": "API Features Overview",
        "description": "Discussion about API capabilities",
        "tags": ["features", "api"]
      },
      "options": {
        "model": "gpt-4",
        "temperature": 0.5,
        "maxTokens": 1000
      },
      "messageCount": 3,
      "createdAt": "2024-01-22T15:00:00Z",
      "updatedAt": "2024-01-22T15:15:00Z"
    }
  ],
  "totalCount": 5,
  "hasMore": true
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid or missing API key |
| 403 | Insufficient permissions |
| 404 | Project not found |
| 429 | Rate limit exceeded |

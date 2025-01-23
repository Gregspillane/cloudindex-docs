---
title: List Threads
sidebar_position: 2
---

# List Threads

Retrieve a list of all chat threads in the project.

## Endpoint

```http
GET /chat/threads
```

## Description

Returns an array of chat threads with their current status and metadata. Threads are ordered by their `displayOrder` field, with optional filtering by status.

## Request Parameters

No request parameters required.

## Response

```json
{
  "threads": [
    {
      "id": "thread_abc123",
      "projectId": "proj_xyz789",
      "status": "active",
      "isStarred": false,
      "displayOrder": 0,
      "createdAt": "2024-01-22T10:00:00Z",
      "lastActiveAt": "2024-01-22T10:00:00Z",
      "totalMessages": 10,
      "totalTokens": 1500,
      "averageResponseTime": 850,
      "includeSources": false,
      "systemPrompt": "string"
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `threads` | array | Array of thread objects |

#### Thread Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique thread identifier |
| `projectId` | string | Project identifier |
| `status` | string | Thread status (active/archived) |
| `isStarred` | boolean | Whether thread is starred |
| `displayOrder` | integer | UI display order |
| `createdAt` | string | Creation timestamp |
| `lastActiveAt` | string | Last activity timestamp |
| `totalMessages` | integer | Total message count |
| `totalTokens` | integer | Total tokens used |
| `averageResponseTime` | number | Average response time (ms) |
| `includeSources` | boolean | Source inclusion setting |
| `systemPrompt` | string | Custom system prompt |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 401 | Invalid API key |
| 429 | Rate limit exceeded |

### Example Error Response

```json
{
  "error": "Invalid API key",
  "code": "invalid_api_key",
  "category": "authentication",
  "details": {
    "reason": "The provided API key does not exist"
  }
}
```

## Best Practices

1. **Performance**
   - Cache responses when appropriate
   - Implement pagination for large thread counts
   - Monitor rate limits

2. **Thread Management**
   - Regularly archive inactive threads
   - Use the `displayOrder` field for UI organization
   - Track thread usage metrics

3. **Implementation**
   - Handle empty thread lists gracefully
   - Implement proper error handling
   - Consider implementing client-side filtering
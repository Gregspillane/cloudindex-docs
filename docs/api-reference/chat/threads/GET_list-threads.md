---
title: List Threads (GET)
sidebar_position: 2
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# List Threads

Retrieve a list of all chat threads in the project.

<ApiPlayground
  endpoint={{
    method: 'GET',
    path: '/chat/threads',
    parameters: {},
    authentication: {
      type: 'apiKey',
      location: 'header'
    }
  }}
  baseUrl="https://api.cloudindex.ai/public/v1"
  languages={['curl', 'python', 'javascript', 'go']}
/>

## Description

Returns an array of chat threads with their current status and metadata. Threads are ordered by their `displayOrder` field, with optional filtering by status.

## Response

```json
{
  "threads": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "projectId": "123e4567-e89b-12d3-a456-426614174000",
      "status": "active",
      "isStarred": false,
      "displayOrder": 0,
      "createdAt": "2024-01-22T10:00:00Z",
      "lastActiveAt": "2024-01-22T10:00:00Z",
      "metadata": {},
      "totalMessages": 10,
      "totalTokens": 1500,
      "averageResponseTime": 850,
      "includeSources": false,
      "systemPrompt": "You are a helpful AI assistant..."
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
| `id` | string (UUID) | Unique thread identifier |
| `projectId` | string (UUID) | Project identifier |
| `status` | string | Thread status (active/archived) |
| `isStarred` | boolean | Whether thread is starred |
| `displayOrder` | integer | UI display order |
| `createdAt` | string (date-time) | Creation timestamp |
| `lastActiveAt` | string (date-time) | Last activity timestamp |
| `metadata` | object | Additional thread metadata |
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

### Example Error Responses

#### Invalid API Key
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

#### Rate Limit Exceeded
```json
{
  "error": "Rate limit exceeded",
  "code": "rate_limit_exceeded",
  "category": "rate_limit"
}
```

## Best Practices

1. **Performance**
   - Cache responses when appropriate
   - Implement pagination for large thread counts
   - Monitor rate limits
   - Handle timeouts gracefully

2. **Thread Management**
   - Regularly archive inactive threads
   - Use the `displayOrder` field for UI organization
   - Track thread usage metrics
   - Monitor token consumption

3. **Implementation**
   - Handle empty thread lists gracefully
   - Implement proper error handling
   - Consider client-side filtering
   - Cache frequently accessed data

4. **User Experience**
   - Sort threads by last activity
   - Show thread status indicators
   - Display relevant metadata
   - Implement search/filter capabilities

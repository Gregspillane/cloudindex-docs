---
title: Create Thread (POST)
sidebar_position: 1
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# Create Thread

Create a new chat thread for persistent conversation with your document knowledge base.

<ApiPlayground
  endpoint={{
    method: 'POST',
    path: '/chat/threads',
    parameters: {
      body: {
        includeSources: {
          name: 'includeSources',
          type: 'boolean',
          required: false,
          description: "Controls whether responses include source references. When enabled, responses include document excerpts with relevance scores. When disabled (default), responses are minimal without sources."
        },
        systemPrompt: {
          name: 'systemPrompt',
          type: 'string',
          required: false,
          description: 'Custom system prompt for the thread. Overrides project-level defaults.'
        }
      }
    },
    authentication: {
      type: 'apiKey',
      location: 'header'
    }
  }}
  baseUrl="https://api.cloudindex.ai/public/v1"
  languages={['curl', 'python', 'javascript', 'go']}
/>

## Description

Creates a new chat thread that maintains conversation history and context. Thread settings like source inclusion and system prompts can be configured at creation time.

## Request Body

```json
{
  "includeSources": false,
  "systemPrompt": "You are a helpful AI assistant..."
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `includeSources` | boolean | No | Controls whether responses include source references. Impacts token usage and response size. |
| `systemPrompt` | string | No | Custom system prompt for the thread. Overrides project-level defaults. |

### Source Inclusion Effects

When `includeSources` is enabled:
- Responses include `scored_chunks` array with relevant excerpts
- Each chunk includes content, score, and metadata
- Higher token usage (typically 60-70% more)
- Larger response payload size

When disabled:
- Minimal response structure
- Lower token usage
- Faster processing time
- Smaller response payload

## Response

The response follows the `ThreadResponse` schema:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "projectId": "123e4567-e89b-12d3-a456-426614174000",
  "status": "active",
  "isStarred": false,
  "displayOrder": 0,
  "createdAt": "2024-01-22T10:00:00Z",
  "lastActiveAt": "2024-01-22T10:00:00Z",
  "metadata": {},
  "totalMessages": 0,
  "totalTokens": 0,
  "averageResponseTime": 0,
  "includeSources": false,
  "systemPrompt": "You are a helpful AI assistant..."
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (uuid) | Unique thread identifier |
| `projectId` | string (uuid) | Project identifier |
| `status` | string (enum) | Thread status: "active" or "archived" |
| `isStarred` | boolean | Whether thread is starred |
| `displayOrder` | integer | Display order for UI |
| `createdAt` | string (date-time) | Thread creation timestamp |
| `lastActiveAt` | string (date-time) | Last activity timestamp |
| `metadata` | object | Additional thread metadata |
| `totalMessages` | integer | Total message count |
| `totalTokens` | integer | Total tokens used |
| `averageResponseTime` | number | Average response time in ms |
| `includeSources` | boolean | Whether to include sources in responses |
| `systemPrompt` | string | Custom system prompt for thread |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid API key |
| 429 | Rate limit exceeded |

### Example Error Response

```json
{
  "error": "Invalid system prompt",
  "code": "validation_error",
  "category": "validation",
  "details": {
    "message": "System prompt exceeds maximum length"
  }
}
```

## Best Practices

1. **System Prompts**
   - Keep prompts clear and focused
   - Test prompts with sample queries
   - Consider token limits
   - Use project defaults when possible

2. **Source References**
   - Enable only when needed
   - Consider performance implications
   - Plan for increased token usage
   - Handle source metadata appropriately

3. **Performance**
   - Monitor token usage
   - Track response times
   - Consider rate limits
   - Implement proper error handling

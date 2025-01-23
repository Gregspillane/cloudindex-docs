---
title: Create Thread
sidebar_position: 1
---

# Create Thread

Create a new chat thread for persistent conversation with your document knowledge base.

## Base URL

```
https://api.cloudindex.ai/public/v1
```

## Endpoint

```http
POST /chat/threads
```

## Full URL

```http
POST https://api.cloudindex.ai/public/v1/chat/threads
```

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

```json
{
  "id": "thread_abc123",
  "projectId": "proj_xyz789",
  "status": "active",
  "isStarred": false,
  "displayOrder": 0,
  "createdAt": "2024-01-22T10:00:00Z",
  "lastActiveAt": "2024-01-22T10:00:00Z",
  "totalMessages": 0,
  "totalTokens": 0,
  "averageResponseTime": 0,
  "includeSources": false,
  "systemPrompt": "string"
}
```

### Response Fields

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
---
title: Create Thread
sidebar_position: 1
---

# Create Thread

Create a new chat thread for maintaining conversation history.

## Request

```http
POST /chat/threads
```

### Headers

```json
{
  "Authorization": "Bearer YOUR_API_KEY",
  "Content-Type": "application/json"
}
```

### Request Body

```json
{
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
  }
}
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectId` | string | Yes | ID of the project to create thread in |
| `metadata` | object | No | Thread metadata |
| `metadata.title` | string | No | Thread title |
| `metadata.description` | string | No | Thread description |
| `metadata.tags` | string[] | No | Thread tags for organization |
| `options` | object | No | Thread configuration options |
| `options.model` | string | No | Default LLM model (default: "gpt-4") |
| `options.temperature` | number | No | Default creativity (0-1, default: 0.7) |
| `options.maxTokens` | number | No | Default max tokens (default: 1000) |
| `options.filters` | object | No | Default document filters |

## Response

```json
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
```

### Response Fields

| Name | Type | Description |
|------|------|-------------|
| `threadId` | string | Unique thread identifier |
| `projectId` | string | Associated project ID |
| `metadata` | object | Thread metadata |
| `options` | object | Thread configuration |
| `messageCount` | number | Number of messages (0 for new thread) |
| `createdAt` | string | Thread creation timestamp |
| `updatedAt` | string | Last update timestamp |

## Example

### Request

```bash
curl -X POST https://api.cloudindex.ai/chat/threads \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "proj_456def",
    "metadata": {
      "title": "Product Features Discussion",
      "description": "Chat about CloudIndex features",
      "tags": ["features", "product"]
    },
    "options": {
      "model": "gpt-4",
      "temperature": 0.7
    }
  }'
```

### Response

```json
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
  "messageCount": 0,
  "createdAt": "2024-01-22T16:00:00Z",
  "updatedAt": "2024-01-22T16:00:00Z"
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

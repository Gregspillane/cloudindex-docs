---
title: Send Message
sidebar_position: 4
---

# Send Message

Send a message in an existing chat thread.

## Request

```http
POST /chat/threads/{threadId}/messages
```

### Headers

```json
{
  "Authorization": "Bearer YOUR_API_KEY",
  "Content-Type": "application/json"
}
```

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `threadId` | string | Yes | ID of the thread to send message to |

### Request Body

```json
{
  "message": "string",
  "projectId": "string",
  "options": {
    "model": "string",
    "temperature": "number",
    "maxTokens": "number",
    "includeContext": "boolean",
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
| `message` | string | Yes | The message text to send |
| `projectId` | string | Yes | ID of the project containing the thread |
| `options` | object | No | Message-specific options (overrides thread defaults) |
| `options.model` | string | No | LLM model to use |
| `options.temperature` | number | No | Response creativity (0-1) |
| `options.maxTokens` | number | No | Maximum response length |
| `options.includeContext` | boolean | No | Include source context in response |
| `options.filters` | object | No | Document filtering options |

## Response

```json
{
  "messageId": "string",
  "threadId": "string",
  "role": "string",
  "content": "string",
  "context": [
    {
      "documentId": "string",
      "content": "string",
      "metadata": {
        "title": "string",
        "type": "string",
        "createdAt": "string"
      }
    }
  ],
  "usage": {
    "promptTokens": "number",
    "completionTokens": "number",
    "totalTokens": "number"
  },
  "createdAt": "string"
}
```

### Response Fields

| Name | Type | Description |
|------|------|-------------|
| `messageId` | string | Unique message identifier |
| `threadId` | string | ID of the thread |
| `role` | string | Message role ("user" or "assistant") |
| `content` | string | Message content |
| `context` | array | Source context used (if requested) |
| `usage` | object | Token usage statistics |
| `createdAt` | string | Message timestamp |

## Example

### Request

```bash
curl -X POST "https://api.cloudindex.ai/chat/threads/thread_abc123/messages" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the key features of vector search?",
    "projectId": "proj_456def",
    "options": {
      "model": "gpt-4",
      "temperature": 0.7,
      "includeContext": true
    }
  }'
```

### Response

```json
{
  "messageId": "msg_xyz789",
  "threadId": "thread_abc123",
  "role": "assistant",
  "content": "Vector search in CloudIndex offers several key features: 1) Efficient similarity search using embeddings, 2) Support for multiple vector indexes...",
  "context": [
    {
      "documentId": "doc_123abc",
      "content": "Vector search enables semantic similarity matching...",
      "metadata": {
        "title": "Vector Search Guide",
        "type": "md",
        "createdAt": "2024-01-20T10:00:00Z"
      }
    }
  ],
  "usage": {
    "promptTokens": 325,
    "completionTokens": 178,
    "totalTokens": 503
  },
  "createdAt": "2024-01-22T16:50:00Z"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid or missing API key |
| 403 | Insufficient permissions |
| 404 | Thread or project not found |
| 429 | Rate limit exceeded |
| 500 | LLM service error |

## Notes

- Messages are processed in the order they are received
- Context from previous messages in the thread is automatically included
- Thread configuration options can be overridden per message

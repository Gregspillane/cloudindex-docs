---
title: Message History
sidebar_position: 5
---

# Message History

Retrieve the message history for a chat thread.

## Request

```http
GET /chat/threads/{threadId}/messages/history
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
| `threadId` | string | Yes | ID of the thread to get history from |

### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectId` | string | Yes | ID of the project containing the thread |
| `limit` | number | No | Maximum number of messages to return (default: 50) |
| `before` | string | No | Return messages before this timestamp |
| `after` | string | No | Return messages after this timestamp |
| `includeContext` | boolean | No | Include source context in response (default: false) |

## Response

```json
{
  "messages": [
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
  ],
  "totalCount": "number",
  "hasMore": "boolean"
}
```

### Response Fields

| Name | Type | Description |
|------|------|-------------|
| `messages` | array | List of messages in chronological order |
| `messages[].messageId` | string | Unique message identifier |
| `messages[].threadId` | string | ID of the thread |
| `messages[].role` | string | Message role ("user" or "assistant") |
| `messages[].content` | string | Message content |
| `messages[].context` | array | Source context used (if requested) |
| `messages[].usage` | object | Token usage statistics |
| `messages[].createdAt` | string | Message timestamp |
| `totalCount` | number | Total number of messages in thread |
| `hasMore` | boolean | Whether more messages are available |

## Example

### Request

```bash
curl -X GET "https://api.cloudindex.ai/chat/threads/thread_abc123/messages/history?projectId=proj_456def&limit=2&includeContext=true" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "messages": [
    {
      "messageId": "msg_xyz789",
      "threadId": "thread_abc123",
      "role": "user",
      "content": "What are the key features of vector search?",
      "createdAt": "2024-01-22T16:50:00Z"
    },
    {
      "messageId": "msg_def456",
      "threadId": "thread_abc123",
      "role": "assistant",
      "content": "Vector search in CloudIndex offers several key features: 1) Efficient similarity search using embeddings...",
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
      "createdAt": "2024-01-22T16:50:05Z"
    }
  ],
  "totalCount": 10,
  "hasMore": true
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

## Notes

- Messages are returned in chronological order (oldest first)
- Use `before` and `after` parameters for pagination
- Context is only included if `includeContext=true`
- Maximum history retention period is 30 days

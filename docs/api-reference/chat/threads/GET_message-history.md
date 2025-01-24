---
title: Message History (GET)
sidebar_position: 5
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# Message History

Retrieve the message history for a chat thread.

<ApiPlayground
  endpoint={{
    method: 'GET',
    path: '/chat/threads/{sessionId}/messages/history',
    parameters: {
      path: {
        sessionId: {
          name: 'sessionId',
          type: 'string',
          required: true,
          description: 'Thread identifier (UUID)'
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

Returns the complete message history for a specified thread, including message content, metadata, and context information.

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sessionId` | string (UUID) | Yes | Thread identifier |

## Response

```json
{
  "messages": [
    {
      "id": "msg_abc123",
      "sessionId": "thread_xyz789",
      "role": "user",
      "content": "What is RAG?",
      "createdAt": "2024-01-22T10:00:00Z",
      "metadata": {
        "clientId": "client_123"
      },
      "tokensUsed": 12,
      "processingTime": 450,
      "contextMetadata": {
        "tokenCount": 12,
        "includedInContext": true
      }
    },
    {
      "id": "msg_def456",
      "sessionId": "thread_xyz789",
      "role": "assistant",
      "content": "RAG (Retrieval-Augmented Generation) is...",
      "createdAt": "2024-01-22T10:00:05Z",
      "metadata": {
        "model": "anthropic-claude-3"
      },
      "tokensUsed": 48,
      "processingTime": 850,
      "contextMetadata": {
        "tokenCount": 48,
        "includedInContext": true
      }
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `messages` | array | Array of message objects |
| `messages[].id` | string | Unique message identifier |
| `messages[].sessionId` | string (UUID) | Thread identifier |
| `messages[].role` | string | Message sender (user/assistant) |
| `messages[].content` | string | Message content |
| `messages[].createdAt` | string (date-time) | Message timestamp |
| `messages[].metadata` | object | Additional message metadata |
| `messages[].tokensUsed` | integer | Tokens used for this message |
| `messages[].processingTime` | integer | Processing time in milliseconds |
| `messages[].contextMetadata` | object | Context window metadata |
| `messages[].contextMetadata.tokenCount` | integer | Token count for this message |
| `messages[].contextMetadata.includedInContext` | boolean | Whether message is in current context window |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid API key |
| 404 | Thread not found |
| 429 | Rate limit exceeded |

### Example Error Responses

#### Thread Not Found
```json
{
  "error": "Thread not found",
  "code": "not_found",
  "category": "validation",
  "details": {
    "sessionId": "thread_abc123"
  }
}
```

#### Invalid Thread ID
```json
{
  "error": "Invalid thread ID",
  "code": "validation_error",
  "category": "validation",
  "details": {
    "message": "Thread ID must be a valid UUID"
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
   - Implement pagination for large message histories
   - Cache frequently accessed histories
   - Monitor rate limits
   - Handle timeouts appropriately

2. **Context Window**
   - Check `includedInContext` flag for context window status
   - Consider token limits when processing history
   - Handle messages outside context window appropriately
   - Use token counts for context management

3. **Implementation**
   - Handle empty message histories gracefully
   - Implement proper error handling
   - Process messages chronologically
   - Track message metadata for debugging

4. **User Experience**
   - Display messages in chronological order
   - Show message status and metadata
   - Implement proper loading states
   - Handle long message content appropriately

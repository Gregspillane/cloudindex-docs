---
title: Stateless Chat (POST)
sidebar_position: 2
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# Stateless Chat

Send one-off messages without maintaining conversation history.

<ApiPlayground
  endpoint={{
    method: 'POST',
    path: '/chat/messages',
    parameters: {
      body: {
        message: {
          name: 'message',
          type: 'string',
          required: true,
          description: 'The message to send'
        },
        include_sources: {
          name: 'include_sources',
          type: 'boolean',
          required: false,
          description: 'Include document references (default: false)'
        },
        stream: {
          name: 'stream',
          type: 'boolean',
          required: false,
          description: 'Enable response streaming'
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

Send individual messages to the AI without maintaining conversation context. Ideal for simple queries or when persistent chat history isn't needed.

## Request

### Request Body

```json
{
  "message": "string",
  "include_sources": boolean,
  "stream": boolean
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | string | Yes | The message to send |
| `include_sources` | boolean | No | Include document references (default: false) |
| `stream` | boolean | No | Enable response streaming |

## Response

### Standard Response
Content-Type: application/json

```json
{
  "message": {
    "id": "msg_abc123",
    "role": "assistant",
    "content": "string",
    "created_at": "2024-01-22T10:00:00Z"
  },
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0
  },
  "scored_chunks": [
    {
      "content": "string",
      "score": 0.95,
      "metadata": {
        "document_id": "string",
        "document_name": "string",
        "type": "document"
      }
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `message` | object | Response message details |
| `message.id` | string | Unique message identifier |
| `message.role` | string | Message role (always "assistant") |
| `message.content` | string | Response content |
| `message.created_at` | string (date-time) | Message creation timestamp |
| `usage` | object | Token usage statistics |
| `usage.prompt_tokens` | integer | Tokens used in prompt |
| `usage.completion_tokens` | integer | Tokens used in completion |
| `usage.total_tokens` | integer | Total tokens used |
| `scored_chunks` | array | Relevant document excerpts (if include_sources=true) |
| `scored_chunks[].content` | string | Document excerpt content |
| `scored_chunks[].score` | number | Relevance score (0-1) |
| `scored_chunks[].metadata` | object | Source document metadata |

### Streaming Response
Content-Type: text/event-stream

```json
{
  "type": "connected|error|end",
  "error": "string",
  "response": "string",
  "scored_chunks": [],
  "metadata": {
    "processing_time": 0,
    "node_count": 0
  }
}
```

### Response Headers

| Header | Description |
|--------|-------------|
| `X-Request-ID` | Unique request identifier |
| `X-Model` | LLM model used (e.g., "anthropic-claude-3-sonnet-20240229") |
| `X-Provider` | LLM provider used (e.g., "anthropic") |
| `X-RateLimit-Limit` | Rate limit ceiling |
| `X-RateLimit-Remaining` | Remaining requests |
| `X-RateLimit-Reset` | Rate limit reset timestamp |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid API key |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

### 400 Bad Request
Invalid input parameters

```json
{
  "error": "Invalid input parameters",
  "code": "validation_error",
  "category": "validation",
  "details": {
    "message": "Message content is required"
  }
}
```

### 401 Unauthorized
Authentication error

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

### 429 Rate Limit Exceeded

```json
{
  "error": "Rate limit exceeded",
  "code": "rate_limit_exceeded",
  "category": "rate_limit"
}
```

## Best Practices

1. **Message Content**
   - Keep messages clear and focused
   - Consider token limits
   - Use appropriate formatting
   - Avoid complex multi-turn queries

2. **Source References**
   - Enable only when needed
   - Consider performance impact
   - Handle source metadata appropriately
   - Cache frequently used sources

3. **Streaming**
   - Use for long responses
   - Handle connection errors
   - Implement proper client-side buffering
   - Monitor connection stability

4. **Error Handling**
   - Implement proper retry logic
   - Handle rate limits appropriately
   - Log relevant error details
   - Display user-friendly messages

5. **Performance**
   - Monitor token usage
   - Track response times
   - Optimize request frequency
   - Implement request batching

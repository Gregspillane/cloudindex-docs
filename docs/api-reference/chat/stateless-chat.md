---
title: Stateless Chat
sidebar_position: 2
---

# Stateless Chat

Send one-off messages without maintaining conversation history.

## Endpoint

```http
POST /chat/messages
```

## Request Body

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

## Response Headers

| Header | Description |
|--------|-------------|
| `X-Request-ID` | Unique request identifier |
| `X-Model` | LLM model used (e.g., "anthropic-claude-3-sonnet-20240229") |
| `X-Provider` | LLM provider used (e.g., "anthropic") |
| `X-RateLimit-Limit` | Rate limit ceiling |
| `X-RateLimit-Remaining` | Remaining requests |
| `X-RateLimit-Reset` | Rate limit reset timestamp |

## Error Responses

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

2. **Source References**
   - Enable only when needed
   - Consider performance impact
   - Handle source metadata appropriately

3. **Streaming**
   - Use for long responses
   - Handle connection errors
   - Implement proper client-side buffering

4. **Error Handling**
   - Implement proper retry logic
   - Handle rate limits appropriately
   - Log relevant error details

5. **Performance**
   - Monitor token usage
   - Track response times
   - Optimize request frequency
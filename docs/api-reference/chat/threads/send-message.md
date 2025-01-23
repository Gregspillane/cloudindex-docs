---
title: Send Message
sidebar_position: 4
---

# Send Message

Send a message to an existing chat thread.

## Endpoint

```http
POST /chat/threads/{sessionId}/messages
```

## Description

Sends a new message to an existing thread and receives an AI-generated response. The response can optionally include relevant source references from your documents.

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sessionId` | string (UUID) | Yes | Thread identifier |

## Request Body

```json
{
  "message": "What is RAG?",
  "includeSources": true
}
```

### Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | string | Yes | The message content |
| `includeSources` | boolean | No | Whether to include source references in the response |

## Response

```json
{
  "message": {
    "id": "msg_abc123",
    "role": "assistant",
    "content": "RAG (Retrieval-Augmented Generation) is a technique...",
    "created_at": "2024-01-22T10:00:00Z"
  },
  "usage": {
    "prompt_tokens": 145,
    "completion_tokens": 62,
    "total_tokens": 207
  },
  "scored_chunks": [
    {
      "content": "RAG is a technique that combines...",
      "score": 0.92,
      "metadata": {
        "document_id": "doc_xyz789",
        "document_name": "rag-overview.pdf",
        "type": "document"
      }
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `message.id` | string | Unique message identifier |
| `message.role` | string | Message sender role (assistant) |
| `message.content` | string | Response content |
| `message.created_at` | string | Message timestamp |
| `usage.prompt_tokens` | integer | Tokens used in prompt |
| `usage.completion_tokens` | integer | Tokens used in completion |
| `usage.total_tokens` | integer | Total tokens used |
| `scored_chunks` | array | Source references (if enabled) |

### Source Reference Fields

| Field | Type | Description |
|-------|------|-------------|
| `content` | string | Referenced content |
| `score` | number | Relevance score (0-1) |
| `metadata.document_id` | string | Source document ID |
| `metadata.document_name` | string | Source document name |
| `metadata.type` | string | Source type |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid API key |
| 404 | Thread not found |
| 429 | Rate limit exceeded |

### Example Error Response

```json
{
  "error": "Message content required",
  "code": "validation_error",
  "category": "validation",
  "details": {
    "field": "message"
  }
}
```

## Best Practices

1. **Message Content**
   - Keep messages clear and focused
   - Consider context window limits
   - Use appropriate formatting
   - Follow conversation flow

2. **Source References**
   - Enable when verification needed
   - Handle source metadata properly
   - Consider performance impact
   - Cache frequently used references

3. **Token Usage**
   - Monitor token consumption
   - Stay within context limits
   - Optimize prompt length
   - Consider cost implications

4. **Performance**
   - Handle long responses
   - Implement timeout handling
   - Monitor response times
   - Consider rate limits

5. **Error Handling**
   - Implement retry logic
   - Handle timeouts gracefully
   - Validate inputs
   - Log errors appropriately
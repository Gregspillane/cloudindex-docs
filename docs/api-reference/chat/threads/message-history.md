---
title: Message History
sidebar_position: 5
---

# Message History

Retrieve the message history for a chat thread.

## Endpoint

```http
GET /chat/threads/{sessionId}/messages/history
```

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

#### Message Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique message identifier |
| `sessionId` | string | Thread identifier |
| `role` | string | Message sender (user/assistant) |
| `content` | string | Message content |
| `createdAt` | string |
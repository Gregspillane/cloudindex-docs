---
title: Stateless Chat
sidebar_position: 2
---

# Stateless Chat

Send a single message for stateless chat interaction without maintaining conversation history.

## Request

```http
POST /chat/messages
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
| `message` | string | Yes | The chat message text |
| `projectId` | string | Yes | ID of the project to chat with |
| `options` | object | No | Chat configuration options |
| `options.model` | string | No | LLM model to use (default: "gpt-4") |
| `options.temperature` | number | No | Response creativity (0-1, default: 0.7) |
| `options.maxTokens` | number | No | Maximum response length (default: 1000) |
| `options.includeContext` | boolean | No | Include source context in response (default: false) |
| `options.filters` | object | No | Document filtering options |
| `options.filters.documentIds` | string[] | No | Filter by specific document IDs |
| `options.filters.types` | string[] | No | Filter by document types |
| `options.filters.dateRange` | object | No | Filter by document creation date |

## Response

```json
{
  "response": "string",
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
  }
}
```

### Response Fields

| Name | Type | Description |
|------|------|-------------|
| `response` | string | AI-generated response text |
| `context` | array | Source context used (if requested) |
| `context[].documentId` | string | ID of source document |
| `context[].content` | string | Relevant content snippet |
| `context[].metadata` | object | Document metadata |
| `usage` | object | Token usage statistics |

## Example

### Request

```bash
curl -X POST https://api.cloudindex.ai/chat/messages \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the key features of your product?",
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
  "response": "CloudIndex offers several key features: 1) Advanced document processing with support for multiple formats, 2) Hybrid search combining semantic and keyword matching, 3) Real-time chat capabilities with document context...",
  "context": [
    {
      "documentId": "doc_123abc",
      "content": "CloudIndex is a powerful document processing and search platform...",
      "metadata": {
        "title": "Product Overview",
        "type": "md",
        "createdAt": "2024-01-20T10:00:00Z"
      }
    }
  ],
  "usage": {
    "promptTokens": 245,
    "completionTokens": 156,
    "totalTokens": 401
  }
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
| 500 | LLM service error |

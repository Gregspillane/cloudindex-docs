---
title: Delete Thread (DELETE)
sidebar_position: 3
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# Delete Thread

Delete an existing chat thread and its associated message history.

<ApiPlayground
  endpoint={{
    method: 'DELETE',
    path: '/chat/threads/{sessionId}',
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

Permanently deletes a chat thread and all its associated messages. This action cannot be undone.

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sessionId` | string (UUID) | Yes | The unique identifier of the thread to delete |

## Response

```json
{
  "message": "Thread deleted successfully"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Success message |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid API key |
| 404 | Thread not found |
| 429 | Rate limit exceeded |

### Example Error Responses

#### Invalid Request
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

#### Invalid API Key
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

#### Rate Limit Exceeded
```json
{
  "error": "Rate limit exceeded",
  "code": "rate_limit_exceeded",
  "category": "rate_limit"
}
```

## Best Practices

1. **Before Deletion**
   - Confirm deletion is intended
   - Consider archiving instead of deletion
   - Export important conversation history
   - Check thread status

2. **Implementation**
   - Handle deletion failures gracefully
   - Implement proper error handling
   - Consider soft deletion
   - Validate thread ownership

3. **Security**
   - Verify user permissions
   - Log deletion events
   - Maintain audit trail
   - Implement rate limiting

4. **User Experience**
   - Provide clear success/failure messages
   - Handle UI state updates
   - Consider undo functionality
   - Show deletion progress for large threads

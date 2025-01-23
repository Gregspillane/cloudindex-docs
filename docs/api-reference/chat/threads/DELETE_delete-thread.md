---
title: Delete Thread (DELETE)
sidebar_position: 3
---

# Delete Thread

Delete an existing chat thread and its associated message history.

## Endpoint

```http
DELETE /chat/threads/{sessionId}
```

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
| `message` | string | Confirmation message |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid thread ID |
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

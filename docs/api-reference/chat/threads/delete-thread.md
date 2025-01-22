---
title: Delete Thread
sidebar_position: 3
---

# Delete Thread

Delete a chat thread and all its associated messages.

## Request

```http
DELETE /chat/threads/{threadId}
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
| `threadId` | string | Yes | ID of the thread to delete |

### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `projectId` | string | Yes | ID of the project containing the thread |

## Response

```json
{
  "success": true,
  "threadId": "string",
  "deletedAt": "string"
}
```

### Response Fields

| Name | Type | Description |
|------|------|-------------|
| `success` | boolean | Whether the deletion was successful |
| `threadId` | string | ID of the deleted thread |
| `deletedAt` | string | Timestamp of deletion |

## Example

### Request

```bash
curl -X DELETE "https://api.cloudindex.ai/chat/threads/thread_abc123?projectId=proj_456def" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "threadId": "thread_abc123",
  "deletedAt": "2024-01-22T16:45:00Z"
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

- Deleting a thread permanently removes all messages and associated data
- This action cannot be undone
- Active threads should be archived instead of deleted if historical access is needed

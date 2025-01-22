---
title: Error Handling
sidebar_position: 2
---

# Error Handling

CloudIndex uses conventional HTTP response codes and provides detailed error objects to indicate the success or failure of API requests.

## Error Response Format

All API errors follow a consistent format:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "string",
    "requestId": "string",
    "documentation": "string"
  }
}
```

### Error Fields

| Field | Description |
|-------|-------------|
| `code` | Machine-readable error code |
| `message` | Human-readable error description |
| `details` | Additional error context |
| `requestId` | Unique identifier for the request |
| `documentation` | Link to relevant documentation |

## HTTP Status Codes

| Code | Description | Common Causes |
|------|-------------|---------------|
| 400 | Bad Request | Invalid parameters, malformed request |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Valid key but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource state conflict |
| 422 | Unprocessable Entity | Valid request but processing failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |
| 503 | Service Unavailable | System maintenance or overload |

## Common Error Codes

### Authentication Errors

```json
{
  "error": {
    "code": "unauthorized",
    "message": "Invalid API key provided",
    "details": "The API key provided in the Authorization header is invalid or has been revoked",
    "requestId": "req_abc123",
    "documentation": "https://docs.cloudindex.ai/api-reference/common/authentication"
  }
}
```

### Rate Limit Errors

```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Too many requests",
    "details": "You have exceeded the rate limit of 60 requests per minute",
    "requestId": "req_def456",
    "documentation": "https://docs.cloudindex.ai/api-reference/common/rate-limiting"
  }
}
```

### Validation Errors

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Invalid request parameters",
    "details": {
      "projectId": "Required field missing",
      "limit": "Must be between 1 and 100"
    },
    "requestId": "req_ghi789",
    "documentation": "https://docs.cloudindex.ai/api-reference/documents/list-documents"
  }
}
```

## Error Handling Best Practices

1. **Always Check Status Codes**
   ```javascript
   if (response.status !== 200) {
     const error = await response.json();
     handleError(error);
   }
   ```

2. **Implement Retry Logic**
   - Retry on 429 (rate limit) and 5xx errors
   - Use exponential backoff
   - Respect Retry-After headers

   ```javascript
   async function requestWithRetry(url, options, maxRetries = 3) {
     for (let i = 0; i < maxRetries; i++) {
       try {
         const response = await fetch(url, options);
         if (response.status === 429) {
           const retryAfter = response.headers.get('Retry-After');
           await sleep(retryAfter * 1000);
           continue;
         }
         return response;
       } catch (error) {
         if (i === maxRetries - 1) throw error;
         await sleep(Math.pow(2, i) * 1000);
       }
     }
   }
   ```

3. **Log Request IDs**
   - Always log the `requestId` for debugging
   - Include in support requests
   - Useful for tracking issues

4. **Handle Specific Error Types**
   ```javascript
   switch (error.code) {
     case 'rate_limit_exceeded':
       await handleRateLimit(error);
       break;
     case 'invalid_request':
       await handleValidation(error);
       break;
     default:
       await handleGenericError(error);
   }
   ```

## Debugging Tips

1. **Check Request Parameters**
   - Validate all required fields
   - Ensure correct data types
   - Check parameter formatting

2. **Review Response Headers**
   - Check rate limit headers
   - Look for warning headers
   - Note server timing info

3. **Monitor Error Patterns**
   - Track error frequencies
   - Watch for recurring issues
   - Set up error alerts

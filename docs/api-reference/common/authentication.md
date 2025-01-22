---
title: Authentication
sidebar_position: 1
---

# Authentication

CloudIndex uses API keys to authenticate requests. You must include your API key in all requests to the API.

## API Keys

API keys are project-specific and can be managed through the CloudIndex dashboard. Each key has associated permissions and rate limits based on your subscription tier.

### Key Types

- **Project Keys**: Scoped to a specific project
- **Organization Keys**: Access to all projects in an organization
- **Admin Keys**: Full administrative access (organization owners only)

## Using API Keys

Include your API key in the `Authorization` header of all requests:

```http
Authorization: Bearer YOUR_API_KEY
```

### Example Request

```bash
curl -X GET "https://api.cloudindex.ai/projects" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Key Management

### Best Practices

1. **Key Security**
   - Never share API keys
   - Don't commit keys to version control
   - Rotate keys periodically
   - Use environment variables

2. **Access Control**
   - Use project-specific keys when possible
   - Limit admin key usage
   - Regularly audit key access

3. **Environment Management**
   - Use different keys for development and production
   - Create separate keys for different services
   - Monitor key usage

## Environment Variables

Set your API key as an environment variable:

```bash
# Bash/Zsh
export CLOUDINDEX_API_KEY=your_api_key

# Windows CMD
set CLOUDINDEX_API_KEY=your_api_key

# Windows PowerShell
$env:CLOUDINDEX_API_KEY="your_api_key"
```

## Error Responses

Authentication errors return standard HTTP status codes:

| Code | Description |
|------|-------------|
| 401 | Invalid or missing API key |
| 403 | Valid key but insufficient permissions |

### Example Error Response

```json
{
  "error": {
    "code": "unauthorized",
    "message": "Invalid API key provided",
    "details": "The API key provided in the Authorization header is invalid or has been revoked"
  }
}
```

## Key Rotation

1. Create new API key in dashboard
2. Update applications to use new key
3. Monitor for usage of old key
4. Revoke old key after migration

## Rate Limits

API key rate limits vary by subscription tier:

| Tier | Requests/Min | Concurrent Requests |
|------|-------------|---------------------|
| Free | 60 | 5 |
| Pro | 300 | 20 |
| Enterprise | Custom | Custom |

Rate limit headers are included in all responses:
```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1516131012

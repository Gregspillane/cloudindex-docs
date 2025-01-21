---
title: Create User
sidebar_position: 2
---

# Create User

Create a new user account in the system.

## HTTP Request

```http
POST https://api.cloudindex.com/v1/users
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| Authorization | Yes | API key or OAuth token |
| Content-Type | Yes | Must be `application/json` |

## Request Body

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "metadata": {
    "company": "Acme Inc",
    "department": "Engineering"
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| email | string | Yes | User's email address |
| name | string | Yes | User's full name |
| role | string | No | User's role (default: "user") |
| metadata | object | No | Additional user metadata |

## Response

```json
{
  "id": "usr_123abc",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "metadata": {
    "company": "Acme Inc",
    "department": "Engineering"
  },
  "created_at": "2024-01-11T10:00:00Z",
  "updated_at": "2024-01-11T10:00:00Z"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Invalid request body |
| 401 | Invalid or missing authentication |
| 409 | User already exists |
| 422 | Validation error |

## Example

### cURL

```bash
curl -X POST https://api.cloudindex.com/v1/users \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }'
```

### JavaScript

```javascript
const response = await fetch('https://api.cloudindex.com/v1/users', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user',
  }),
});

const user = await response.json();

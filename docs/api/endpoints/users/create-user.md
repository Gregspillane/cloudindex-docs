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

## Code Examples

import ApiCodeTabs from '@site/src/components/ApiCodeTabs';

<ApiCodeTabs
  examples={[
    {
      language: 'bash',
      label: 'cURL',
      code: `curl -X POST https://api.cloudindex.com/v1/users \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }'`
    },
    {
      language: 'javascript',
      label: 'Node.js',
      code: `const response = await fetch('https://api.cloudindex.com/v1/users', {
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

const user = await response.json();`
    },
    {
      language: 'python',
      label: 'Python',
      code: `import requests

response = requests.post(
    'https://api.cloudindex.com/v1/users',
    headers={
        'Authorization': 'Bearer your-api-key',
        'Content-Type': 'application/json'
    },
    json={
        'email': 'user@example.com',
        'name': 'John Doe',
        'role': 'user'
    }
)

user = response.json()`
    },
    {
      language: 'go',
      label: 'Go',
      code: `package main

import (
    "bytes"
    "encoding/json"
    "io/ioutil"
    "net/http"
)

func main() {
    data := map[string]interface{}{
        "email": "user@example.com",
        "name":  "John Doe",
        "role":  "user",
    }
    
    jsonData, _ := json.Marshal(data)
    
    req, _ := http.NewRequest("POST", "https://api.cloudindex.com/v1/users", bytes.NewBuffer(jsonData))
    req.Header.Set("Authorization", "Bearer your-api-key")
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := ioutil.ReadAll(resp.Body)
    // Parse body as needed
}`
    }
  ]}
/>

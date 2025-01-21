---
title: API Key Authentication
sidebar_position: 2
---

# API Key Authentication

Learn how to use API key authentication in your Cloudindex applications.

## Getting an API Key

1. Log into your Cloudindex Dashboard
2. Navigate to Settings > API Keys
3. Click "Generate New Key"
4. Save your API key securely

## Using Your API Key

### HTTP Headers

```bash
Authorization: Bearer your-api-key-here
```

### SDK Usage

```javascript
const cloudindex = require('@cloudindex/sdk');

// Initialize with API key
const client = new cloudindex.Client({
  apiKey: 'your-api-key-here'
});
```

## Best Practices

- Never expose your API key in client-side code
- Rotate keys regularly
- Use environment variables to store keys
- Create separate keys for development and production

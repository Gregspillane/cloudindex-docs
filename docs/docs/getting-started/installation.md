---
title: Installation
sidebar_position: 3
---

# Installation Guide

This guide provides detailed instructions for setting up CloudIndex in various environments.

## Environment Setup

### Node.js Requirements
- Node.js 18.0.0 or later
- npm 7+ or yarn 1.22+

### System Requirements
- Memory: 4GB RAM minimum
- Storage: 1GB available space
- OS: macOS, Linux, or Windows 10+

## Installation Methods

### NPM Installation

```bash
# Install the CloudIndex SDK
npm install @cloudindex/sdk

# Optional: Install CLI tools
npm install -g @cloudindex/cli
```

### Yarn Installation

```bash
# Install the CloudIndex SDK
yarn add @cloudindex/sdk

# Optional: Install CLI tools
yarn global add @cloudindex/cli
```

## Configuration

### 1. API Key Setup

Obtain your API key from the [CloudIndex Dashboard](https://dashboard.cloudindex.ai):

```javascript
// config.js
export const cloudindexConfig = {
  apiKey: process.env.CLOUDINDEX_API_KEY,
  environment: process.env.NODE_ENV,
  timeout: 30000, // 30 seconds
};
```

### 2. Environment Variables

Create a `.env` file in your project root:

```bash
CLOUDINDEX_API_KEY=your_api_key_here
CLOUDINDEX_PROJECT_ID=your_project_id
NODE_ENV=development
```

### 3. SDK Initialization

```javascript
import { CloudIndex } from '@cloudindex/sdk';
import { cloudindexConfig } from './config.js';

const cloudindex = new CloudIndex(cloudindexConfig);
```

## Advanced Configuration

### Custom Endpoints

```javascript
const cloudindex = new CloudIndex({
  ...cloudindexConfig,
  baseUrl: 'https://your-custom-endpoint.com',
  apiVersion: 'v1'
});
```

### Timeout Settings

```javascript
const cloudindex = new CloudIndex({
  ...cloudindexConfig,
  timeout: 60000, // 60 seconds
  retryAttempts: 3
});
```

### Proxy Configuration

```javascript
const cloudindex = new CloudIndex({
  ...cloudindexConfig,
  proxy: {
    host: 'proxy.company.com',
    port: 8080,
    auth: {
      username: 'proxy_user',
      password: 'proxy_pass'
    }
  }
});
```

## Platform-Specific Setup

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV CLOUDINDEX_API_KEY=your_api_key_here

CMD ["node", "index.js"]
```

### Serverless

```yaml
# serverless.yml
service: cloudindex-service

provider:
  name: aws
  runtime: nodejs18.x
  environment:
    CLOUDINDEX_API_KEY: ${env:CLOUDINDEX_API_KEY}

functions:
  processDocument:
    handler: handler.processDocument
```

## Security Best Practices

1. **API Key Management**
   - Never commit API keys to version control
   - Use environment variables
   - Rotate keys periodically

2. **Access Control**
   - Implement role-based access
   - Use separate API keys for different environments
   - Monitor API key usage

3. **Network Security**
   - Enable HTTPS/TLS
   - Configure CORS appropriately
   - Use IP whitelisting when possible

## Troubleshooting

### Common Issues

1. **Connection Timeouts**
   ```javascript
   const cloudindex = new CloudIndex({
     ...cloudindexConfig,
     timeout: 60000,
     retryAttempts: 3
   });
   ```

2. **Rate Limiting**
   - Implement exponential backoff
   - Use batch processing for large uploads

3. **Memory Issues**
   - Stream large files
   - Implement pagination
   - Monitor memory usage

## Next Steps

- [Quick Start Guide](/docs/getting-started/quick-start)
- [RAG Overview](/docs/core-concepts/rag-overview)
- [Document Processing](/docs/core-concepts/document-processing)
- [API Reference](/api-reference/introduction)

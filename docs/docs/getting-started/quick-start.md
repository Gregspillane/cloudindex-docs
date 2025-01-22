---
title: Quick Start
sidebar_position: 2
---

# Quick Start Guide

Get started with CloudIndex in minutes. This guide will help you set up your first RAG-enabled application.

## Prerequisites

Before you begin, ensure you have:
- Node.js 18 or later
- npm or yarn
- A CloudIndex account

## Step 1: Install the SDK

```bash
npm install @cloudindex/sdk
# or with yarn
yarn add @cloudindex/sdk
```

## Step 2: Configure Your API Key

```javascript
import { CloudIndex } from '@cloudindex/sdk';

const cloudindex = new CloudIndex({
  apiKey: 'your_api_key_here'
});
```

## Step 3: Upload Your First Document

```javascript
const response = await cloudindex.documents.upload({
  file: './example.pdf',
  metadata: {
    title: 'Example Document',
    author: 'John Doe'
  }
});

console.log(`Document ID: ${response.id}`);
```

## Step 4: Perform a Search

```javascript
const results = await cloudindex.search.query({
  query: 'What are the key findings?',
  limit: 5
});

console.log('Search Results:', results.matches);
```

## Step 5: Start a Chat Session

```javascript
const thread = await cloudindex.chat.createThread();

const message = await cloudindex.chat.sendMessage({
  threadId: thread.id,
  content: 'Summarize the key points from the document'
});

console.log('Assistant Response:', message.content);
```

## Complete Example

Here's a complete example that puts it all together:

```javascript
import { CloudIndex } from '@cloudindex/sdk';

async function main() {
  // Initialize the client
  const cloudindex = new CloudIndex({
    apiKey: 'your_api_key_here'
  });

  // Upload a document
  const doc = await cloudindex.documents.upload({
    file: './example.pdf',
    metadata: { title: 'Example' }
  });

  // Wait for processing
  await cloudindex.documents.waitForProcessing(doc.id);

  // Create a chat thread
  const thread = await cloudindex.chat.createThread();

  // Start chatting
  const message = await cloudindex.chat.sendMessage({
    threadId: thread.id,
    content: 'What are the main topics in this document?'
  });

  console.log('Summary:', message.content);
}

main().catch(console.error);
```

## Next Steps

- [Installation Guide](/docs/getting-started/installation) - Detailed setup instructions
- [RAG Overview](/docs/core-concepts/rag-overview) - Learn about RAG architecture
- [Document Processing](/docs/core-concepts/document-processing) - Understand the processing pipeline
- [API Reference](/api-reference/introduction) - Explore the complete API

---
title: Common Schemas
sidebar_position: 4
---

# Common Schemas

This page documents the common data models and types used across the CloudIndex API.

## Base Types

### Project

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "organizationId": "string",
  "settings": {
    "defaultModel": "string",
    "vectorStore": "string",
    "maxDocuments": "number",
    "maxVectors": "number"
  },
  "metadata": {
    "additionalProp1": "any",
    "additionalProp2": "any"
  },
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Document

```json
{
  "id": "string",
  "projectId": "string",
  "name": "string",
  "type": "string",
  "size": "number",
  "status": "string",
  "metadata": {
    "pageCount": "number",
    "author": "string",
    "createdAt": "string",
    "additionalProp": "any"
  },
  "vectorCount": "number",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Vector

```json
{
  "id": "string",
  "documentId": "string",
  "projectId": "string",
  "content": "string",
  "embedding": "number[]",
  "metadata": {
    "location": "string",
    "context": "string",
    "additionalProp": "any"
  },
  "createdAt": "string"
}
```

## Common Objects

### Pagination

```json
{
  "limit": "number",
  "offset": "number",
  "totalCount": "number",
  "hasMore": "boolean"
}
```

### Filter Options

```json
{
  "documentIds": "string[]",
  "types": "string[]",
  "dateRange": {
    "from": "string",
    "to": "string"
  },
  "metadata": {
    "additionalProp1": "any",
    "additionalProp2": "any"
  }
}
```

### Model Options

```json
{
  "model": "string",
  "temperature": "number",
  "maxTokens": "number",
  "topP": "number",
  "frequencyPenalty": "number",
  "presencePenalty": "number"
}
```

## Enums

### Document Types

```typescript
type DocumentType = 
  | "pdf"
  | "docx"
  | "md"
  | "mdx"
  | "txt"
  | "code";
```

### Document Status

```typescript
type DocumentStatus = 
  | "pending"
  | "processing"
  | "processed"
  | "failed"
  | "deleted";
```

### Vector Store Types

```typescript
type VectorStore = 
  | "pinecone"
  | "qdrant"
  | "weaviate"
  | "milvus";
```

### LLM Models

```typescript
type LLMModel = 
  | "gpt-4"
  | "gpt-3.5-turbo"
  | "claude-2"
  | "claude-instant";
```

## Type Definitions

### Timestamps

All timestamps are ISO 8601 strings in UTC:

```typescript
type Timestamp = string; // "2024-01-22T16:00:00Z"
```

### IDs

Resource IDs follow consistent patterns:

```typescript
type ProjectId = string;     // "proj_abc123"
type DocumentId = string;    // "doc_xyz789"
type VectorId = string;      // "vec_def456"
type ThreadId = string;      // "thread_ghi789"
type MessageId = string;     // "msg_jkl012"
```

### Metadata

Metadata objects allow arbitrary key-value pairs:

```typescript
interface Metadata {
  [key: string]: any;
}
```

## Usage Examples

### Creating a Document

```javascript
const document = {
  name: "example.pdf",
  type: "pdf",
  metadata: {
    author: "John Doe",
    pageCount: 10,
    tags: ["documentation", "api"]
  }
};
```

### Filtering Documents

```javascript
const filters = {
  types: ["pdf", "docx"],
  dateRange: {
    from: "2024-01-01T00:00:00Z",
    to: "2024-01-31T23:59:59Z"
  },
  metadata: {
    author: "John Doe"
  }
};
```

### Setting Model Options

```javascript
const options = {
  model: "gpt-4",
  temperature: 0.7,
  maxTokens: 1000,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0
};

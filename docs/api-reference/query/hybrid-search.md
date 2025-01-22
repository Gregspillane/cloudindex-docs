---
title: Hybrid Search
sidebar_position: 2
---

# Hybrid Search

Execute a hybrid search query combining semantic and keyword search capabilities.

## Request

```http
POST /public/v1/query
```

### Headers

```json
{
  "Authorization": "Bearer YOUR_API_KEY",
  "Content-Type": "application/json"
}
```

### Request Body

```json
{
  "query": "string",
  "projectId": "string",
  "options": {
    "limit": "number",
    "threshold": "number",
    "searchType": "string",
    "includeMetadata": "boolean",
    "filters": {
      "documentIds": "string[]",
      "types": "string[]",
      "dateRange": {
        "from": "string",
        "to": "string"
      }
    }
  }
}
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | Yes | The search query text |
| `projectId` | string | Yes | ID of the project to search in |
| `options` | object | No | Search configuration options |
| `options.limit` | number | No | Maximum number of results (default: 10) |
| `options.threshold` | number | No | Minimum similarity score (0-1, default: 0.7) |
| `options.searchType` | string | No | Search type: "hybrid", "semantic", or "keyword" (default: "hybrid") |
| `options.includeMetadata` | boolean | No | Include document metadata in results (default: false) |
| `options.filters` | object | No | Result filtering options |
| `options.filters.documentIds` | string[] | No | Filter by specific document IDs |
| `options.filters.types` | string[] | No | Filter by document types |
| `options.filters.dateRange` | object | No | Filter by document creation date |

## Response

```json
{
  "results": [
    {
      "documentId": "string",
      "score": "number",
      "content": "string",
      "metadata": {
        "title": "string",
        "type": "string",
        "createdAt": "string",
        "additionalProperties": "any"
      }
    }
  ],
  "totalResults": "number",
  "searchMetrics": {
    "processingTime": "number",
    "vectorSearchTime": "number",
    "keywordSearchTime": "number"
  }
}
```

### Response Fields

| Name | Type | Description |
|------|------|-------------|
| `results` | array | Array of search results |
| `results[].documentId` | string | ID of the matching document |
| `results[].score` | number | Similarity score (0-1) |
| `results[].content` | string | Matching content snippet |
| `results[].metadata` | object | Document metadata (if requested) |
| `totalResults` | number | Total number of matches found |
| `searchMetrics` | object | Search performance metrics |

## Example

### Request

```bash
curl -X POST https://api.cloudindex.ai/public/v1/query \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "machine learning best practices",
    "projectId": "proj_456def",
    "options": {
      "limit": 5,
      "threshold": 0.8,
      "searchType": "hybrid",
      "includeMetadata": true
    }
  }'
```

### Response

```json
{
  "results": [
    {
      "documentId": "doc_789ghi",
      "score": 0.92,
      "content": "Here are some machine learning best practices: 1) Start with clean data...",
      "metadata": {
        "title": "ML Guidelines",
        "type": "pdf",
        "createdAt": "2024-01-20T15:30:00Z"
      }
    }
  ],
  "totalResults": 1,
  "searchMetrics": {
    "processingTime": 0.15,
    "vectorSearchTime": 0.08,
    "keywordSearchTime": 0.05
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid or missing API key |
| 403 | Insufficient permissions |
| 404 | Project not found |
| 429 | Rate limit exceeded |

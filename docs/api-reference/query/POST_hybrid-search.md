---
title: Hybrid Search (POST)
sidebar_position: 2
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# Hybrid Search

Execute a hybrid search query combining semantic and keyword search capabilities.

<ApiPlayground
  endpoint={{
    method: 'POST',
    path: '/public/v1/query',
    parameters: {
      body: {
        query: {
          name: 'query',
          type: 'string',
          required: true,
          description: 'The search query text'
        },
        projectId: {
          name: 'projectId',
          type: 'string',
          required: true,
          description: 'ID of the project to search in'
        },
        options: {
          name: 'options',
          type: 'object',
          required: false,
          description: 'Search configuration options',
          properties: {
            limit: {
              type: 'number',
              description: 'Maximum number of results (default: 10)'
            },
            threshold: {
              type: 'number',
              description: 'Minimum similarity score (0-1, default: 0.7)'
            },
            searchType: {
              type: 'string',
              description: 'Search type: "hybrid", "semantic", or "keyword" (default: "hybrid")'
            },
            includeMetadata: {
              type: 'boolean',
              description: 'Include document metadata in results (default: false)'
            },
            filters: {
              type: 'object',
              description: 'Result filtering options',
              properties: {
                documentIds: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Filter by specific document IDs'
                },
                types: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Filter by document types'
                },
                dateRange: {
                  type: 'object',
                  properties: {
                    from: { type: 'string', format: 'date-time' },
                    to: { type: 'string', format: 'date-time' }
                  },
                  description: 'Filter by document creation date'
                }
              }
            }
          }
        }
      }
    },
    authentication: {
      type: 'apiKey',
      location: 'header'
    }
  }}
  baseUrl="https://api.cloudindex.ai/public/v1"
  languages={['curl', 'python', 'javascript', 'go']}
/>

## Description

Perform a hybrid search that combines semantic understanding with keyword matching for more accurate and comprehensive results. This endpoint allows fine-tuning of search parameters and filtering options.

## Request

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

The response follows the `SearchResults` schema:

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

### Response Fields

| Name | Type | Description |
|------|------|-------------|
| `results` | array | Array of search results |
| `results[].documentId` | string | ID of the matching document |
| `results[].score` | number | Similarity score (0-1) |
| `results[].content` | string | Matching content snippet |
| `results[].metadata` | object | Document metadata (if requested) |
| `results[].metadata.title` | string | Document title |
| `results[].metadata.type` | string | Document type |
| `results[].metadata.createdAt` | string (date-time) | Document creation date |
| `totalResults` | number | Total number of matches found |
| `searchMetrics` | object | Search performance metrics |
| `searchMetrics.processingTime` | number | Total processing time in seconds |
| `searchMetrics.vectorSearchTime` | number | Vector search time in seconds |
| `searchMetrics.keywordSearchTime` | number | Keyword search time in seconds |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid or missing API key |
| 403 | Insufficient permissions |
| 404 | Project not found |
| 429 | Rate limit exceeded |

### Example Error Response

```json
{
  "error": "Invalid search parameters",
  "code": "validation_error",
  "category": "validation",
  "details": {
    "message": "Threshold must be between 0 and 1",
    "field": "options.threshold"
  }
}
```

## Best Practices

1. **Query Optimization**
   - Use clear, specific queries
   - Include relevant keywords
   - Consider query length
   - Test different search types

2. **Result Filtering**
   - Use appropriate thresholds
   - Combine filter types
   - Consider date ranges
   - Filter by document type

3. **Performance**
   - Monitor search metrics
   - Optimize result limits
   - Cache frequent queries
   - Use pagination for large results

4. **Metadata Usage**
   - Request only needed metadata
   - Use metadata for filtering
   - Consider storage impact
   - Update metadata regularly

5. **Error Handling**
   - Implement retry logic
   - Handle timeouts gracefully
   - Validate input parameters
   - Monitor error rates

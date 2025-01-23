---
title: Hybrid Search (POST)
sidebar_position: 2
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# Hybrid Search

Execute a hybrid search query combining semantic search, keyword matching, and optional reranking capabilities.

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
          description: 'The search query text (1-1000 characters)'
        },
        filters: {
          name: 'filters',
          type: 'object',
          required: false,
          description: 'Optional filters to narrow search results',
          properties: {
            documentIds: {
              type: 'array',
              items: { type: 'string', format: 'uuid' },
              description: 'Filter by specific document IDs'
            },
            types: {
              type: 'array',
              items: { 
                type: 'string',
                enum: ['pdf', 'txt', 'md', 'mdx', 'doc', 'docx']
              },
              description: 'Filter by document types'
            },
            dateRange: {
              type: 'object',
              properties: {
                from: { 
                  type: 'string', 
                  format: 'date-time',
                  description: 'Start date (ISO 8601)'
                },
                to: { 
                  type: 'string', 
                  format: 'date-time',
                  description: 'End date (ISO 8601)'
                }
              },
              description: 'Filter by document creation date'
            }
          }
        },
        options: {
          name: 'options',
          type: 'object',
          required: false,
          description: 'Search configuration options',
          properties: {
            similarityTopK: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 10,
              description: 'Number of top similar documents to retrieve'
            },
            alpha: {
              type: 'number',
              minimum: 0.01,
              maximum: 1,
              default: 0.75,
              description: 'Balance between semantic and keyword search'
            },
            rerankingEnabled: {
              type: 'boolean',
              default: false,
              description: 'Enable result reranking'
            },
            rerankingTopN: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              description: 'Number of results to rerank (must not exceed similarityTopK)'
            },
            rerankingThreshold: {
              type: 'number',
              minimum: 0,
              maximum: 1,
              default: 0.2,
              description: 'Minimum score threshold for reranked results'
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 10,
              description: 'Maximum number of results to return'
            },
            threshold: {
              type: 'number',
              minimum: 0,
              maximum: 1,
              default: 0.0,
              description: 'Minimum similarity score threshold'
            },
            includeMetadata: {
              type: 'boolean',
              default: false,
              description: 'Include document metadata in results'
            },
            preset: {
              type: 'string',
              enum: ['general', 'business', 'technical', 'financial', 'scientific', 'custom'],
              default: 'general',
              description: 'Preset search configuration'
            }
          }
        }
      }
    },
    authentication: {
      type: 'apiKey',
      location: 'header',
      name: 'Authorization',
      prefix: 'ApiKey',
      description: 'Your API key'
    }
  }}
  baseUrl="https://api.cloudindex.ai/public/v1"
  languages={['curl', 'python', 'javascript', 'go']}
/>

## Rate Limiting

All requests are subject to rate limiting:
- 100 requests per minute per API key
- 1000 requests per hour per IP address

Rate limit information is included in response headers:
- `X-RateLimit-Limit`: Maximum requests allowed per window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when the rate limit resets (Unix timestamp)

## Response Format

### Success Response (200 OK)

```json
{
  "scored_chunks": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "text": "RAG (Retrieval-Augmented Generation) is a technique that...",
      "score": 0.92,
      "document_id": "123e4567-e89b-12d3-a456-426614174001",
      "document_name": "rag-overview.pdf",
      "document_metadata": {
        "mime_type": "application/pdf",
        "created_at": "2024-01-15T12:00:00Z",
        "file_path": "docs/rag-overview.pdf",
        "source_type": "upload",
        "processing_status": "processed"
      }
    }
  ],
  "metadata": {
    "total_chunks": 150,
    "processing_time_ms": 245,
    "reranking_applied": true
  }
}
```

## Error Responses

All error responses follow this format:
```json
{
  "code": "error_code",
  "category": "error_category",
  "message": "Human-readable error message",
  "details": {
    // Additional error context
  }
}
```

### Common Error Codes

#### Authentication Errors (401)
- `api_key/invalid`: Invalid API key
- `api_key/revoked`: API key has been revoked
- `api_key/expired`: API key has expired
- `api_key/missing`: No API key provided

#### Validation Errors (400)
- `validation/invalid-input`: Invalid request parameters
- `validation/missing-field`: Required field missing
- `validation/invalid-format`: Invalid field format

#### Rate Limit Errors (429)
- `rate_limit/exceeded`: Rate limit exceeded
- `rate_limit/quota-exceeded`: Monthly quota exceeded
- `rate_limit/concurrent-exceeded`: Too many concurrent requests

Example rate limit error:
```json
{
  "code": "rate_limit/exceeded",
  "category": "rate_limit",
  "message": "Rate limit exceeded",
  "details": {
    "limit": 100,
    "reset_at": 1623456789
  }
}
```

#### System Errors (500)
- `system/internal-error`: Internal server error
- `system/service-unavailable`: Service temporarily unavailable
- `system/database-error`: Database operation failed

#### Version Errors (400)
- `version/not-supported`: API version not supported
- `version/deprecated`: API version deprecated

## Code Examples

### Python

```python
import requests

def search_documents(query, api_key):
    url = "https://api.cloudindex.ai/public/v1/query"
    headers = {
        "Authorization": f"ApiKey {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "query": query,
        "options": {
            "similarityTopK": 10,
            "alpha": 0.75,
            "rerankingEnabled": True,
            "rerankingTopN": 5,
            "rerankingThreshold": 0.2
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None
```

### JavaScript

```javascript
async function searchDocuments(query, apiKey) {
  const url = 'https://api.cloudindex.ai/public/v1/query';
  const headers = {
    'Authorization': `ApiKey ${apiKey}`,
    'Content-Type': 'application/json'
  };
  const data = {
    query,
    options: {
      similarityTopK: 10,
      alpha: 0.75,
      rerankingEnabled: true,
      rerankingTopN: 5,
      rerankingThreshold: 0.2
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

### Go

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

type SearchOptions struct {
    SimilarityTopK     int     `json:"similarityTopK"`
    Alpha              float64 `json:"alpha"`
    RerankingEnabled   bool    `json:"rerankingEnabled"`
    RerankingTopN      int     `json:"rerankingTopN"`
    RerankingThreshold float64 `json:"rerankingThreshold"`
}

type SearchRequest struct {
    Query   string        `json:"query"`
    Options SearchOptions `json:"options"`
}

func searchDocuments(query, apiKey string) error {
    url := "https://api.cloudindex.ai/public/v1/query"
    
    reqBody := SearchRequest{
        Query: query,
        Options: SearchOptions{
            SimilarityTopK:     10,
            Alpha:              0.75,
            RerankingEnabled:   true,
            RerankingTopN:      5,
            RerankingThreshold: 0.2,
        },
    }
    
    jsonData, err := json.Marshal(reqBody)
    if err != nil {
        return fmt.Errorf("error marshaling request: %v", err)
    }
    
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return fmt.Errorf("error creating request: %v", err)
    }
    
    req.Header.Set("Authorization", "ApiKey "+apiKey)
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return fmt.Errorf("error making request: %v", err)
    }
    defer resp.Body.Close()
    
    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("error response: %s", resp.Status)
    }
    
    return nil
}

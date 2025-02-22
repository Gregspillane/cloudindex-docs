---
title: Query (POST)
sidebar_position: 2
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# Query

Execute a document query leveraging semantic search, keyword matching, and optional reranking capabilities for enterprise-grade search results.


<ApiPlayground
  endpoint={{
    method: 'POST',
    path: '/public/v1/query',
    summary: 'Query documents using semantic search, keyword matching, and optional reranking',
    parameters: {
      body: {
        query: {
          type: 'string',
          required: true,
          minLength: 1,
          maxLength: 1000,
          description: 'The search query text',
          example: 'What is RAG?'
        },
        filters: {
          type: 'object',
          required: false,
          description: 'Optional filters to narrow search results',
          properties: {
            documentIds: {
              type: 'array',
              items: { 
                type: 'string',
                format: 'uuid'
              },
              description: 'Limit search to specific document IDs'
            },
            types: {
              type: 'array',
              items: { 
                type: 'string',
                enum: ['pdf', 'txt', 'md', 'mdx', 'doc', 'docx']
              },
              description: 'Limit search to specific file types'
            },
            dateRange: {
              type: 'object',
              properties: {
                from: { 
                  type: 'string',
                  format: 'date-time',
                  description: 'Start date (ISO 8601 format)'
                },
                to: { 
                  type: 'string',
                  format: 'date-time',
                  description: 'End date (ISO 8601 format)'
                }
              },
              description: 'Filter by document creation date'
            }
          }
        },
        options: {
          type: 'object',
          required: false,
          description: 'Optional search configuration',
          properties: {
            similarityTopK: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 10,
              description: 'Number of top similar documents to retrieve',
              example: 10
            },
            alpha: {
              type: 'number',
              minimum: 0.01,
              maximum: 1,
              default: 0.75,
              description: 'Balance between semantic and keyword search (higher values favor semantic search)',
              example: 0.75
            },
            rerankingEnabled: {
              type: 'boolean',
              default: false,
              description: 'Whether to enable reranking of search results',
              example: true
            },
            rerankingTopN: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 5,
              description: 'Number of top results to rerank. Must not exceed similarityTopK if both are specified.',
              example: 5
            },
            rerankingThreshold: {
              type: 'number',
              minimum: 0,
              maximum: 1,
              default: 0.2,
              description: 'Minimum score threshold for reranked results',
              example: 0.2
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 10,
              description: 'Maximum number of results to return',
              example: 10
            },
            threshold: {
              type: 'number',
              minimum: 0,
              maximum: 1,
              default: 0.0,
              description: 'Minimum similarity score threshold',
              example: 0.0
            },
            includeMetadata: {
              type: 'boolean',
              default: false,
              description: 'Whether to include document metadata in results',
              example: false
            },
            preset: {
              type: 'string',
              enum: ['general', 'business', 'technical', 'financial', 'scientific', 'custom'],
              default: 'general',
              description: 'Preset configuration for search behavior: general (balanced settings), business (optimized for business docs), technical (tuned for technical docs), financial (specialized for financial docs), scientific (configured for scientific papers), custom (use custom parameters)',
              example: 'general'
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
    },
    responses: {
      '200': {
        description: 'Successful query response',
        headers: {
          'X-RateLimit-Limit': {
            description: 'Maximum requests per window'
          },
          'X-RateLimit-Remaining': {
            description: 'Remaining requests in current window'
          },
          'X-RateLimit-Reset': {
            description: 'Time when the rate limit resets (Unix timestamp)'
          }
        },
        content: {
          'application/json': {
            example: {
              scored_chunks: [
                {
                  id: '123e4567-e89b-12d3-a456-426614174000',
                  text: 'RAG (Retrieval-Augmented Generation) is a technique that...',
                  score: 0.92,
                  document_id: '123e4567-e89b-12d3-a456-426614174001',
                  document_name: 'rag-overview.pdf',
                  document_metadata: {
                    mime_type: 'application/pdf',
                    created_at: '2024-01-15T12:00:00Z',
                    file_path: 'docs/rag-overview.pdf',
                    source_type: 'upload',
                    processing_status: 'processed'
                  }
                }
              ],
              metadata: {
                total_chunks: 150,
                processing_time_ms: 245,
                reranking_applied: true
              }
            }
          }
        }
      },
      '400': {
        description: 'Bad request - invalid input parameters',
        content: {
          'application/json': {
            example: {
              code: 'validation/invalid-input',
              category: 'validation',
              message: 'Invalid input parameters provided',
              details: {
                errors: [
                  {
                    field: 'options.rerankingTopN',
                    message: 'Cannot exceed similarityTopK value'
                  }
                ]
              }
            }
          }
        }
      },
      '401': {
        description: 'Unauthorized - invalid or missing API key',
        content: {
          'application/json': {
            example: {
              code: 'api_key/invalid',
              category: 'api_key',
              message: 'The provided API key is invalid or has been revoked'
            }
          }
        }
      },
      '429': {
        description: 'Too many requests - rate limit exceeded',
        content: {
          'application/json': {
            example: {
              code: 'rate_limit/exceeded',
              category: 'rate_limit',
              message: 'Rate limit exceeded',
              details: {
                limit: 100,
                reset_at: 1623456789
              }
            }
          }
        }
      },
      '500': {
        description: 'Internal server error',
        content: {
          'application/json': {
            example: {
              code: 'system/internal-error',
              category: 'system',
              message: 'An unexpected error occurred',
              details: {
                request_id: 'req_abc123'
              }
            }
          }
        }
      }
    }
  }}
  baseUrl="https://api.cloudindex.ai"
  languages={['curl', 'python', 'javascript', 'go']}
/>

## Authentication

All requests require API key authentication:
- Include in Authorization header with "ApiKey" prefix
- Example: `Authorization: ApiKey your-api-key`
- Keep your API key secure and never expose it in client-side code
- Rotate keys regularly following security best practices

## Rate Limiting

Enterprise-grade rate limiting ensures reliable service:
- 100 requests per minute per API key
- 1000 requests per hour per IP address

Rate limit headers included in all responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1623456789
```

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

## Error Handling

All error responses follow a consistent format:

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

### Error Categories

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
from typing import Optional, Dict, Any

class CloudIndexClient:
    def __init__(self, api_key: str, base_url: str = "https://api.cloudindex.ai"):
        self.base_url = base_url
        self.headers = {
            "Authorization": f"ApiKey {api_key}",
            "Content-Type": "application/json"
        }
    
    def query(
        self,
        query: str,
        similarity_top_k: int = 10,
        alpha: float = 0.75,
        reranking_enabled: bool = True,
        reranking_top_n: int = 5,
        reranking_threshold: float = 0.2,
        filters: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Execute a document query.
        
        Args:
            query: Search query text
            similarity_top_k: Number of top similar documents
            alpha: Balance between semantic and keyword search
            reranking_enabled: Whether to enable reranking
            reranking_top_n: Number of results to rerank
            reranking_threshold: Minimum reranking score
            filters: Optional search filters
            
        Returns:
            Dict containing search results and metadata
            
        Raises:
            requests.exceptions.RequestException: On API error
        """
        url = f"{self.base_url}/public/v1/query"
        
        data = {
            "query": query,
            "options": {
                "similarityTopK": similarity_top_k,
                "alpha": alpha,
                "rerankingEnabled": reranking_enabled,
                "rerankingTopN": reranking_top_n,
                "rerankingThreshold": reranking_threshold
            }
        }
        
        if filters:
            data["filters"] = filters
        
        try:
            response = requests.post(url, headers=self.headers, json=data)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            # Handle rate limits
            if response.status_code == 429:
                reset_time = int(response.headers.get('X-RateLimit-Reset', 0))
                raise Exception(f"Rate limit exceeded. Reset at: {reset_time}")
            raise

# Usage example
client = CloudIndexClient("your-api-key")

try:
    results = client.query(
        query="What is RAG?",
        filters={
            "types": ["pdf", "md"],
            "dateRange": {
                "from": "2024-01-01T00:00:00Z"
            }
        }
    )
    
    for chunk in results["scored_chunks"]:
        print(f"Score: {chunk['score']}")
        print(f"Text: {chunk['text']}\n")
        
except Exception as e:
    print(f"Error: {e}")
```

### JavaScript

```javascript
class CloudIndexClient {
  constructor(apiKey, baseUrl = 'https://api.cloudindex.ai') {
    this.baseUrl = baseUrl;
    this.headers = {
      'Authorization': `ApiKey ${apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Execute a document query
   * @param {string} query - Search query text
   * @param {Object} options - Search configuration
   * @param {Object} filters - Optional search filters
   * @returns {Promise<Object>} Search results and metadata
   */
  async query(query, {
    similarityTopK = 10,
    alpha = 0.75,
    rerankingEnabled = true,
    rerankingTopN = 5,
    rerankingThreshold = 0.2
  } = {}, filters = null) {
    const url = `${this.baseUrl}/public/v1/query`;
    
    const data = {
      query,
      options: {
        similarityTopK,
        alpha,
        rerankingEnabled,
        rerankingTopN,
        rerankingThreshold
      }
    };

    if (filters) {
      data.filters = filters;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      });

      // Handle rate limits
      if (response.status === 429) {
        const resetTime = response.headers.get('X-RateLimit-Reset');
        throw new Error(`Rate limit exceeded. Reset at: ${resetTime}`);
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }
}

// Usage example
const client = new CloudIndexClient('your-api-key');

try {
  const results = await client.query('What is RAG?', {
    rerankingEnabled: true
  }, {
    types: ['pdf', 'md'],
    dateRange: {
      from: '2024-01-01T00:00:00Z'
    }
  });

  results.scored_chunks.forEach(chunk => {
    console.log(`Score: ${chunk.score}`);
    console.log(`Text: ${chunk.text}\n`);
  });
} catch (error) {
  console.error('Error:', error.message);
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
    "time"
)

type CloudIndexClient struct {
    BaseURL    string
    APIKey     string
    HTTPClient *http.Client
}

type QueryOptions struct {
    SimilarityTopK     int     `json:"similarityTopK,omitempty"`
    Alpha              float64 `json:"alpha,omitempty"`
    RerankingEnabled   bool    `json:"rerankingEnabled,omitempty"`
    RerankingTopN      int     `json:"rerankingTopN,omitempty"`
    RerankingThreshold float64 `json:"rerankingThreshold,omitempty"`
}

type QueryRequest struct {
    Query   string       `json:"query"`
    Options QueryOptions `json:"options,omitempty"`
    Filters interface{} `json:"filters,omitempty"`
}

type DocumentMetadata struct {
    MimeType         string    `json:"mime_type"`
    CreatedAt        time.Time `json:"created_at"`
    FilePath         string    `json:"file_path"`
    SourceType       string    `json:"source_type"`
    ProcessingStatus string    `json:"processing_status"`
}

type ScoredChunk struct {
    ID              string           `json:"id"`
    Text            string           `json:"text"`
    Score           float64         `json:"score"`
    DocumentID      string           `json:"document_id"`
    DocumentName    string           `json:"document_name"`
    DocumentMetadata DocumentMetadata `json:"document_metadata"`
}

type QueryResponse struct {
    ScoredChunks []ScoredChunk `json:"scored_chunks"`
    Metadata     struct {
        TotalChunks      int  `json:"total_chunks"`
        ProcessingTimeMs int  `json:"processing_time_ms"`
        RerankingApplied bool `json:"reranking_applied"`
    } `json:"metadata"`
}

func NewCloudIndexClient(apiKey string) *CloudIndexClient {
    return &CloudIndexClient{
        BaseURL: "https://api.cloudindex.ai",
        APIKey:  apiKey,
        HTTPClient: &http.Client{
            Timeout: time.Second * 30,
        },
    }
}

func (c *CloudIndexClient) Query(query string, options QueryOptions, filters interface{}) (*QueryResponse, error) {
    reqBody := QueryRequest{
        Query:   query,
        Options: options,
        Filters: filters,
    }
    
    jsonData, err := json.Marshal(reqBody)
    if err != nil {
        return nil, fmt.Errorf("error marshaling request: %v", err)
    }
    
    req, err := http.NewRequest("POST", c.BaseURL+"/public/v1/query", bytes.NewBuffer(jsonData))
    if err != nil {
        return nil, fmt.Errorf("error creating request: %v", err)
    }
    
    req.Header.Set("Authorization", "ApiKey "+c.APIKey)
    req.Header.Set("Content-Type", "application/json")
    
    resp, err := c.HTTPClient.Do(req)
    if err != nil {
        return nil, fmt.Errorf("error making request: %v", err)
    }
    defer resp.Body.Close()
    
    // Handle rate limits
    if resp.StatusCode == 429 {
        resetTime := resp.Header.Get("X-RateLimit-Reset")
        return nil, fmt.Errorf("rate limit exceeded. Reset at: %s", resetTime)
    }
    
    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("error response: %s", resp.Status)
    }
    
    var queryResp QueryResponse
    if err := json.NewDecoder(resp.Body).Decode(&queryResp); err != nil {
        return nil, fmt.Errorf("error decoding response: %v", err)
    }
    
    return &queryResp, nil
}

// Usage example
func main() {
    client := NewCloudIndexClient("your-api-key")
    
    options := QueryOptions{
        SimilarityTopK:     10,
        Alpha:              0.75,
        RerankingEnabled:   true,
        RerankingTopN:      5,
        RerankingThreshold: 0.2,
    }
    
    filters := map[string]interface{}{
        "types": []string{"pdf", "md"},
        "dateRange": map[string]string{
            "from": "2024-01-01T00:00:00Z",
        },
    }
    
    results, err := client.Query("What is RAG?", options, filters)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    
    for _, chunk := range results.ScoredChunks {
        fmt.Printf("Score: %f\n", chunk.Score)
        fmt.Printf("Text: %s\n\n", chunk.Text)
    }
}
```

## Implementation Tips

### Error Handling Best Practices

1. **Implement Retries**
   ```python
   from tenacity import retry, stop_after_attempt, wait_exponential
   
   @retry(
       stop=stop_after_attempt(3),
       wait=wait_exponential(multiplier=1, min=4, max=10)
   )
   def query_with_retry():
       # Your query implementation
   ```

2. **Rate Limit Handling**
   ```javascript
   if (response.status === 429) {
     const resetTime = new Date(response.headers.get('X-RateLimit-Reset') * 1000);
     const waitTime = resetTime - new Date();
     await new Promise(resolve => setTimeout(resolve, waitTime));
     return await makeRequest(); // Retry after waiting
   }
   ```

3. **Graceful Degradation**
   ```python
   try:
       results = client.query(query, reranking_enabled=True)
   except Exception:
       # Fall back to non-reranked search
       results = client.query(query, reranking_enabled=False)
   ```

### Performance Optimization

1. **Connection Pooling**
   ```python
   session = requests.Session()
   session.mount('https://', requests.adapters.HTTPAdapter(
       pool_connections=10,
       pool_maxsize=100
   ))
   ```

2. **Batch Processing**
   ```python
   async def batch_query(queries):
       tasks = [query(q) for q in queries]
       return await asyncio.gather(*tasks)
   ```

3. **Caching Results**
   ```python
   from functools import lru_cache
   
   @lru_cache(maxsize=1000)
   def cached_query(query, **options):
       return client.query(query, **options)
   ```

### Security Considerations

1. **API Key Rotation**
   ```python
   def rotate_api_key():
       old_key = current_key
       try:
           new_key = generate_new_key()
           verify_key(new_key)
           update_key(new_key)
       except Exception:
           revert_to_key(old_key)
   ```

2. **Request Validation**
   ```python
   def validate_request(query, options):
       if len(query) > 1000:
           raise ValueError("Query too long")
       if options.get('rerankingTopN', 0) > options.get('similarityTopK', 0):
           raise ValueError("rerankingTopN cannot exceed similarityTopK")
   ```

3. **Response Sanitization**
   ```python
   def sanitize_response(response):
       # Remove sensitive metadata
       if 'document_metadata' in response:
           response['document_metadata'].pop('internal_path', None)
       return response

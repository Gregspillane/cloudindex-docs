---
title: Query API Overview
sidebar_position: 1
---

# Hybrid Search

Query documents using our hybrid search system that combines semantic search with keyword matching.

## Endpoint

```http
POST /public/v1/query
```

## Request Parameters

The request body should be formatted as JSON with the following structure:

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `query` | string | The search query text (1-1000 characters) |

### Optional Fields

#### Filters Object
| Field | Type | Description |
|-------|------|-------------|
| `documentIds` | string[] | Array of document IDs to search within |
| `types` | string[] | Document types to include (pdf, txt, md, mdx, doc, docx) |
| `dateRange.from` | string | Start date (ISO 8601 format) |
| `dateRange.to` | string | End date (ISO 8601 format) |

#### Options Object
| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `similarityTopK` | integer | 10 | Number of top similar documents (1-100) |
| `alpha` | number | 0.75 | Balance between semantic and keyword search (0.01-1.0) |
| `rerankingEnabled` | boolean | false | Enable result reranking |
| `rerankingTopN` | integer | 5 | Number of results to rerank (1-100) |
| `rerankingThreshold` | number | 0.2 | Minimum reranking score (0-1) |
| `limit` | integer | 10 | Maximum results to return (1-100) |
| `threshold` | number | 0.0 | Minimum similarity score (0-1) |
| `includeMetadata` | boolean | false | Include document metadata |
| `preset` | string | "general" | Search preset configuration |

## Example Request

```bash
curl -X POST "https://api.cloudindex.ai/public/v1/query" \
-H "Authorization: ApiKey your-api-key" \
-H "Content-Type: application/json" \
-d '{
    "query": "What is RAG?",
    "options": {
        "similarityTopK": 10,
        "alpha": 0.75,
        "rerankingEnabled": true,
        "rerankingTopN": 5,
        "rerankingThreshold": 0.2
    }
}'
```

## Response

A successful query returns a 200 status code with a JSON response:

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
        "source_type": "upload"
      }
    }
  ]
}
```

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `scored_chunks` | array | Array of matching document chunks |
| `scored_chunks[].id` | string | Unique chunk identifier |
| `scored_chunks[].text` | string | Matching text content |
| `scored_chunks[].score` | number | Relevance score (0-1) |
| `scored_chunks[].document_id` | string | Source document ID |
| `scored_chunks[].document_name` | string | Source document name |
| `scored_chunks[].document_metadata` | object | Document metadata |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Bad request - invalid parameters |
| 401 | Unauthorized - invalid API key |
| 500 | Internal server error |

### Error Response Format

```json
{
  "code": "ERROR_CODE",
  "category": "ERROR_CATEGORY",
  "message": "Error description",
  "details": {}
}
```

## Search Presets

The following presets are available for the `preset` option:

| Preset | Description |
|--------|-------------|
| general | Balanced search for general content |
| business | Optimized for business documents |
| technical | Enhanced technical content matching |
| financial | Tuned for financial documents |
| scientific | Optimized for scientific content |
| custom | Use custom search parameters |

## Best Practices

1. **Query Length**
   - Keep queries concise but descriptive
   - Include relevant keywords
   - Use natural language when appropriate

2. **Search Parameters**
   - Start with default values
   - Adjust `alpha` based on search needs
   - Enable reranking for better precision

3. **Performance**
   - Use filters to narrow search scope
   - Set appropriate limits
   - Include metadata only when needed
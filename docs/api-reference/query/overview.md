---
title: Query API Overview
sidebar_position: 1
---

# Query API Overview

The Query API enables you to search through your documents using CloudIndex's hybrid search capabilities, combining semantic search with keyword matching for optimal results.

## Query Types

CloudIndex supports the following query types:
- Semantic Search
- Keyword Search
- Hybrid Search (default)

## Query Processing

When a query is received, CloudIndex:
1. Processes the query text
2. Generates embeddings
3. Performs vector similarity search
4. Applies keyword filtering
5. Returns ranked results

## Common Query Schema

```json
{
  "query": "example search query",
  "projectId": "proj_456def",
  "options": {
    "limit": 10,
    "threshold": 0.7,
    "searchType": "hybrid",
    "includeMetadata": true
  }
}
```

## Available Endpoints

- [Hybrid Search](/api-reference/query/hybrid-search) - Execute hybrid search queries

## Best Practices

### Query Optimization
- Keep queries concise and specific
- Use natural language
- Include relevant keywords

### Performance
- Default limit is 10 results
- Adjust threshold based on relevance needs
- Enable metadata only when needed

### Rate Limits
- Standard tier: 10 queries per second
- Enterprise tier: Custom limits available

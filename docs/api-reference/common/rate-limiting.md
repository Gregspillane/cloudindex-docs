---
title: Rate Limiting
sidebar_position: 3
---

# Rate Limiting

CloudIndex implements rate limiting to ensure fair usage of the API and maintain service stability. Rate limits vary by subscription tier and endpoint.

## Rate Limit Headers

All API responses include rate limit information in the headers:

```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1516131012
```

### Header Fields

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests per time window |
| `X-RateLimit-Remaining` | Remaining requests in current window |
| `X-RateLimit-Reset` | Unix timestamp when limit resets |

## Rate Limit Tiers

### Standard Endpoints

| Tier | Requests/Min | Concurrent Requests |
|------|-------------|---------------------|
| Free | 60 | 5 |
| Pro | 300 | 20 |
| Enterprise | Custom | Custom |

### Specialized Endpoints

#### Document Processing

| Tier | Uploads/Hour | Max File Size |
|------|-------------|---------------|
| Free | 100 | 10MB |
| Pro | 1000 | 100MB |
| Enterprise | Custom | Custom |

#### Vector Operations

| Tier | Queries/Min | Max Vectors |
|------|------------|-------------|
| Free | 30 | 1000 |
| Pro | 150 | 10000 |
| Enterprise | Custom | Custom |

## Handling Rate Limits

When you exceed your rate limit, the API returns a 429 status code:

```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Too many requests",
    "details": "You have exceeded the rate limit of 60 requests per minute",
    "requestId": "req_def456",
    "documentation": "https://docs.cloudindex.ai/api-reference/common/rate-limiting"
  }
}
```

### Best Practices

1. **Monitor Rate Limit Headers**
   ```javascript
   function checkRateLimit(response) {
     const remaining = response.headers.get('X-RateLimit-Remaining');
     const reset = response.headers.get('X-RateLimit-Reset');
     
     if (remaining < 10) {
       console.warn(`Rate limit running low: ${remaining} requests remaining`);
       console.warn(`Resets at: ${new Date(reset * 1000).toISOString()}`);
     }
   }
   ```

2. **Implement Backoff Strategy**
   ```javascript
   async function handleRateLimit(response) {
     const resetTime = response.headers.get('X-RateLimit-Reset');
     const waitTime = (resetTime * 1000) - Date.now();
     
     if (waitTime > 0) {
       await new Promise(resolve => setTimeout(resolve, waitTime));
     }
   }
   ```

3. **Queue Requests**
   ```javascript
   class RequestQueue {
     constructor(maxConcurrent = 5) {
       this.queue = [];
       this.running = 0;
       this.maxConcurrent = maxConcurrent;
     }

     async add(request) {
       if (this.running >= this.maxConcurrent) {
         await new Promise(resolve => this.queue.push(resolve));
       }
       
       this.running++;
       try {
         return await request();
       } finally {
         this.running--;
         if (this.queue.length > 0) {
           const next = this.queue.shift();
           next();
         }
       }
     }
   }
   ```

## Optimization Strategies

1. **Batch Operations**
   - Combine multiple operations into single requests
   - Use bulk endpoints when available
   - Group related requests together

2. **Caching**
   - Cache responses locally
   - Implement ETags for conditional requests
   - Store frequently accessed data

3. **Request Distribution**
   - Spread requests evenly over time
   - Avoid request bursts
   - Use multiple API keys for different services

## Monitoring and Alerts

1. **Track Usage**
   - Monitor rate limit headers
   - Log rate limit incidents
   - Track usage patterns

2. **Set Up Alerts**
   - Alert on low remaining limits
   - Monitor for 429 responses
   - Track reset times

3. **Usage Dashboard**
   - View current usage
   - Analyze historical patterns
   - Identify optimization opportunities

## Rate Limit Increase Requests

If you need higher rate limits:

1. **Pro Tier**
   - Upgrade through dashboard
   - Instant activation
   - Standard increased limits

2. **Enterprise Tier**
   - Contact sales team
   - Custom limit discussion
   - SLA requirements review

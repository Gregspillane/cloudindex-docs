---
title: Error Handling
sidebar_position: 3
---

# Error Handling Strategies

Learn how to effectively handle errors and implement robust error recovery in your CloudIndex implementation.

## Error Types

### API Errors

```typescript
interface CloudIndexError {
  code: string;          // Error code
  message: string;       // Human-readable message
  details?: object;      // Additional context
  status?: number;       // HTTP status code
  retryable: boolean;    // Can this error be retried?
}
```

### Common Error Codes

1. **Authentication Errors**
   - `invalid_api_key`
   - `expired_api_key`
   - `insufficient_permissions`

2. **Resource Errors**
   - `document_not_found`
   - `project_not_found`
   - `invalid_document_id`

3. **Processing Errors**
   - `processing_failed`
   - `embedding_failed`
   - `vectorization_error`

4. **System Errors**
   - `rate_limit_exceeded`
   - `service_unavailable`
   - `internal_error`

## Error Handling Implementation

### Basic Error Handler

```javascript
import { CloudIndexError } from '@cloudindex/sdk';

async function handleCloudIndexOperation() {
  try {
    const result = await cloudindex.documents.upload(file);
    return result;
  } catch (error) {
    if (error instanceof CloudIndexError) {
      switch (error.code) {
        case 'invalid_api_key':
          await refreshApiKey();
          break;
        case 'rate_limit_exceeded':
          await handleRateLimit(error);
          break;
        case 'processing_failed':
          await handleProcessingError(error);
          break;
        default:
          console.error('Unexpected error:', error);
      }
    }
    throw error;
  }
}
```

### Advanced Error Handler

```javascript
class ErrorHandler {
  constructor(options = {}) {
    this.retryConfig = {
      maxAttempts: options.maxAttempts || 3,
      initialDelay: options.initialDelay || 1000,
      maxDelay: options.maxDelay || 30000,
      backoffMultiplier: options.backoffMultiplier || 2
    };
  }

  async handleError(error, context) {
    if (!(error instanceof CloudIndexError)) {
      throw error;
    }

    // Log error with context
    this.logError(error, context);

    // Check if error is retryable
    if (error.retryable) {
      return await this.retryOperation(context);
    }

    // Handle specific error types
    switch (error.code) {
      case 'invalid_api_key':
        return await this.handleAuthError(error);
      case 'rate_limit_exceeded':
        return await this.handleRateLimit(error);
      case 'processing_failed':
        return await this.handleProcessingError(error, context);
      default:
        throw error;
    }
  }

  async retryOperation(context) {
    let delay = this.retryConfig.initialDelay;
    
    for (let attempt = 1; attempt <= this.retryConfig.maxAttempts; attempt++) {
      try {
        return await context.operation(...context.args);
      } catch (error) {
        if (attempt === this.retryConfig.maxAttempts) {
          throw error;
        }
        
        await this.delay(delay);
        delay = Math.min(
          delay * this.retryConfig.backoffMultiplier,
          this.retryConfig.maxDelay
        );
      }
    }
  }
}
```

## Error Recovery Strategies

### Rate Limiting

```javascript
class RateLimitHandler {
  constructor() {
    this.rateLimits = new Map();
  }

  async handleRateLimit(error) {
    const resetTime = error.details.resetTime;
    const waitTime = resetTime - Date.now();
    
    await this.delay(waitTime);
    
    // Update rate limit tracking
    this.rateLimits.set(error.details.endpoint, {
      limit: error.details.limit,
      remaining: error.details.limit,
      reset: resetTime
    });
  }

  canMakeRequest(endpoint) {
    const limit = this.rateLimits.get(endpoint);
    if (!limit) return true;
    
    return limit.remaining > 0 && Date.now() >= limit.reset;
  }
}
```

### Circuit Breaker

```javascript
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 60000;
    this.failures = 0;
    this.lastFailure = null;
    this.state = 'CLOSED';
  }

  async execute(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailure >= this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await operation();
      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
        this.failures = 0;
      }
      return result;
    } catch (error) {
      this.handleFailure();
      throw error;
    }
  }

  handleFailure() {
    this.failures++;
    this.lastFailure = Date.now();
    
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}
```

## Monitoring and Logging

### Error Logging

```javascript
class ErrorLogger {
  constructor(options = {}) {
    this.logLevel = options.logLevel || 'error';
    this.includeStack = options.includeStack || true;
  }

  logError(error, context = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      error: {
        code: error.code,
        message: error.message,
        stack: this.includeStack ? error.stack : undefined,
        details: error.details
      },
      context: {
        operation: context.operation,
        resourceId: context.resourceId,
        userId: context.userId
      }
    };

    console.error(JSON.stringify(logEntry, null, 2));
  }
}
```

### Error Metrics

```javascript
class ErrorMetrics {
  constructor() {
    this.metrics = {
      errors: new Map(),
      totalErrors: 0,
      errorRates: new Map()
    };
  }

  trackError(error) {
    // Increment total errors
    this.metrics.totalErrors++;

    // Track error by code
    const count = this.metrics.errors.get(error.code) || 0;
    this.metrics.errors.set(error.code, count + 1);

    // Calculate error rate
    const errorRate = this.calculateErrorRate(error.code);
    this.metrics.errorRates.set(error.code, errorRate);
  }

  getMetrics() {
    return {
      total: this.metrics.totalErrors,
      byCode: Object.fromEntries(this.metrics.errors),
      rates: Object.fromEntries(this.metrics.errorRates)
    };
  }
}
```

## Best Practices

1. **Error Prevention**
   - Validate inputs
   - Check preconditions
   - Monitor rate limits
   - Implement timeouts

2. **Error Recovery**
   - Use retries appropriately
   - Implement circuit breakers
   - Handle rate limits
   - Log recovery attempts

3. **Error Reporting**
   - Include context
   - Structure error data
   - Track metrics
   - Set up alerts

## Next Steps

- [Monitoring Guide](/docs/guides/monitoring)
- [Batch Processing](/docs/guides/batch-processing)
- [API Reference](/api-reference/introduction)
- [System Architecture](/docs/core-concepts/rag-overview)

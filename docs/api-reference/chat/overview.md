---
title: Chat API Overview
sidebar_position: 1
---

# Chat API Overview

The CloudIndex Chat API enables real-time conversational interactions with your document knowledge base. It provides comprehensive thread management, message handling, and streaming capabilities.

## Chat Modes

### 1. Stateless Mode
- Single message interactions
- No conversation history maintained
- Ideal for simple question-answer scenarios
- Lower latency and resource usage
- Independent request processing

### 2. Thread Mode
- Persistent conversation management
- Maintains context across messages
- Up to 10 messages in context window
- Source document tracking
- System prompt customization

## Key Features

### Thread Management
- Create and manage conversation threads
- Track message history
- Configure thread-specific settings
- Star/archive functionality
- Custom display ordering

### Source References
- Optional document source tracking
- Relevance scores for references
- Metadata inclusion options
- Configurable source inclusion

### LLM Integration
- Support for multiple providers:
  - OpenAI
  - Anthropic
  - Additional configured providers
- Organization-level model selection
- Provider-specific optimizations

### System Prompts
Configure response behavior at multiple levels:

1. **Thread Level**
   - Custom prompts per conversation
   - Thread-specific behavior
   - Overrides project defaults

2. **Project Level**
   - Default prompts for all threads
   - Project-wide consistency
   - Common use case optimization

3. **System Level**
   - Default fallback behavior
   - Standard response patterns
   - Base configuration

## Performance Considerations

### Token Usage
- Context window limits
- Source reference impact
- Optimization strategies
- Usage tracking

### Response Times
- Streaming capabilities
- Processing time tracking
- Performance metrics
- Response optimization

## Base URL
```
https://api.cloudindex.ai/public/v1
```

## Authentication
All endpoints require API key authentication:
```http
Authorization: ApiKey your-api-key
```

## Best Practices

1. **Mode Selection**
   - Use stateless mode for simple queries
   - Use thread mode for complex conversations
   - Consider token usage requirements

2. **Source References**
   - Enable only when needed
   - Consider performance impact
   - Use selective source inclusion

3. **System Prompts**
   - Start with project-level defaults
   - Customize for specific use cases
   - Keep prompts focused and clear

4. **Performance**
   - Monitor token usage
   - Use streaming for long responses
   - Implement proper error handling
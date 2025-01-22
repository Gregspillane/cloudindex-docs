---
title: Chat API Overview
sidebar_position: 1
---

# Chat API Overview

The Chat API enables real-time conversational interactions with documents in your CloudIndex projects. It supports both stateless and thread-based chat modes.

## Chat Modes

### Stateless Chat
- Single-turn conversations
- No context preservation
- Ideal for simple queries
- Lower latency and resource usage

### Thread-based Chat
- Multi-turn conversations
- Maintains conversation history
- Context-aware responses
- Supports complex interactions

## Message Processing

When a chat message is received, CloudIndex:
1. Processes the message text
2. Retrieves relevant document context
3. Generates embeddings
4. Performs RAG operations
5. Returns AI-generated response

## Common Message Schema

```json
{
  "message": "string",
  "projectId": "string",
  "options": {
    "model": "string",
    "temperature": "number",
    "maxTokens": "number",
    "includeContext": "boolean"
  }
}
```

## Available Endpoints

### Thread-based Chat
- [Create Thread](/api-reference/chat/threads/create-thread)
- [List Threads](/api-reference/chat/threads/list-threads)
- [Delete Thread](/api-reference/chat/threads/delete-thread)
- [Send Message](/api-reference/chat/threads/send-message)
- [Message History](/api-reference/chat/threads/message-history)

### Stateless Chat
- [Send Message](/api-reference/chat/stateless-chat)

## Best Practices

### Message Optimization
- Keep messages focused and clear
- Use natural language
- Include specific references when needed

### Thread Management
- Create new threads for distinct topics
- Delete unused threads to free resources
- Use thread metadata for organization

### Rate Limits
- Standard tier: 10 messages per minute
- Enterprise tier: Custom limits available

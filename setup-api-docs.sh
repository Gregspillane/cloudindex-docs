#!/bin/bash

# Create main directories
mkdir -p docs/api-reference/{query,chat/threads,common}

# Create query files
touch docs/api-reference/query/overview.md
touch docs/api-reference/query/hybrid-search.md

# Create chat files
touch docs/api-reference/chat/overview.md
touch docs/api-reference/chat/stateless-chat.md
touch docs/api-reference/chat/threads/create-thread.md
touch docs/api-reference/chat/threads/list-threads.md
touch docs/api-reference/chat/threads/delete-thread.md
touch docs/api-reference/chat/threads/send-message.md
touch docs/api-reference/chat/threads/message-history.md

# Create common files
touch docs/api-reference/common/authentication.md
touch docs/api-reference/common/error-handling.md
touch docs/api-reference/common/rate-limiting.md
touch docs/api-reference/common/schemas.md

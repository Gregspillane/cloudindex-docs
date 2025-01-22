---
title: Documents Overview
sidebar_position: 1
---

# Documents API Overview

The Documents API allows you to manage documents in your CloudIndex projects. This includes uploading new documents, retrieving document information, and managing document versions.

## Document Types

CloudIndex supports the following document types:
- PDF files
- Microsoft Word documents (DOCX)
- Markdown files (MD, MDX)
- Plain text files (TXT)
- Source code files

## Document Processing

When a document is uploaded, CloudIndex performs the following steps:
- Processes the document based on its type
- Extracts text and metadata
- Creates vector embeddings
- Stores the document for retrieval

## Common Document Schema

Below is the TypeScript interface for a document:

```typescript
interface Document {
  /** Unique document identifier */
  id: string;
  
  /** Associated project identifier */
  projectId: string;
  
  /** Original filename */
  name: string;
  
  /** Document file type */
  type: string;
  
  /** File size in bytes */
  size: string;
  
  /** Processing status */
  status: string;
  
  /** Document metadata */
  metadata: {
    /** Number of pages */
    pageCount: string;
    
    /** Document author */
    author: string;
    
    /** Creation timestamp */
    createdAt: string;
  };
  
  /** Number of vectors */
  vectorCount: string;
  
  /** Document creation timestamp */
  createdAt: string;
  
  /** Last update timestamp */
  updatedAt: string;
}
```

## Document Status

Documents can have the following status values:
- `pending` - Upload received, waiting for processing
- `processing` - Document is being processed
- `processed` - Processing complete, document ready for use
- `failed` - Processing failed, see error details
- `deleted` - Document has been marked for deletion

## Available Endpoints

- [Upload Document](/api-reference/documents/upload-document) - Upload a new document
- [List Documents](/api-reference/documents/list-documents) - List documents in a project
- [Get Document](/api-reference/documents/get-document) - Get document details
- [Delete Document](/api-reference/documents/delete-document) - Delete a document
- [Document Versions](/api-reference/documents/document-versions) - Manage document versions

## Best Practices

### File Size Limits
- Maximum file size: 100MB
- For larger files, use batch processing

### Processing Time
- Small documents (under 1MB): ~5 seconds
- Medium documents (1-10MB): ~30 seconds
- Large documents (over 10MB): Several minutes

### Rate Limits
- Upload: 10 requests per minute
- List/Get: 100 requests per minute
- Delete: 50 requests per minute

### Error Handling
- Always check document status after upload
- Implement retry logic for failed processing
- Monitor webhook notifications for status updates

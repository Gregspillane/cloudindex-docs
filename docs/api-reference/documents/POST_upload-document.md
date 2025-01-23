---
title: Upload Document (POST)
sidebar_position: 2
---

import ApiPlayground from '@site/src/components/ApiPlayground';

# Upload Document

Upload one or more documents for processing. Documents are processed asynchronously in batches.

<ApiPlayground
  endpoint={{
    method: 'POST',
    path: '/projects/{projectId}/documents',
    parameters: {
      path: {
        projectId: {
          name: 'projectId',
          type: 'string',
          required: true,
          description: 'Project identifier (UUID)'
        }
      },
      body: {
        documents: {
          name: 'documents',
          type: 'file[]',
          required: true,
          description: 'Array of files to upload (max 20)'
        }
      }
    },
    authentication: {
      type: 'apiKey',
      location: 'header'
    }
  }}
  baseUrl="https://api.cloudindex.ai/public/v1"
  languages={['curl', 'python', 'javascript', 'go']}
/>

## Description

Upload documents to your project for processing and indexing. The API supports batch uploads of up to 20 files simultaneously. Documents are processed asynchronously, and you can monitor their status through the batch processing endpoint.

### Supported File Formats

#### Documents
- Office: PDF, DOC, DOCX, RTF, TXT, ODT, PAGES
- OpenDocument: ODT, ABW, SXW, STW, SXG
- Legacy: WPD, WPS, LWP, HWP
- Web: HTML, HTM, XML

#### Spreadsheets
- Office: XLS, XLSX, XLSM, XLSB, CSV, TSV
- OpenDocument: ODS, FODS, NUMBERS
- Legacy: DIF, SYLK, DBF, WKS

#### Presentations
- Office: PPT, PPTX, PPTM
- Templates: POT, POTM, POTX
- OpenDocument: ODP, KEY

#### Code
- Web: JS, JSX, TS, TSX
- Systems: PY, GO, JAVA, CSHARP, RUST
- Data: SQL
- Shell: SH, BASH

#### Web/Config
- Styles: CSS, SCSS, SASS
- Templates: EJS, TMPL
- Config: YAML, ENV, CONF

#### Markdown
- MD, MDX

#### Notes
- Notion documents and databases

## Request

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projectId` | string (UUID) | Yes | Project identifier |

### Request Body

The request must use `multipart/form-data` format.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `documents` | file[] | Yes | Array of files to upload (max 20) |

## Response

The response follows the `BatchUploadResponse` schema:

```json
{
  "documents": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "projectId": "123e4567-e89b-12d3-a456-426614174000",
      "fileName": "example.pdf",
      "fileType": "PDF Document",
      "processingStatus": "pending",
      "fileSize": 1024000,
      "uploadDate": "2024-01-22T10:00:00Z",
      "version": 1,
      "contentHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "processingStartedAt": null,
      "processingCompletedAt": null,
      "processorType": "llama-parse",
      "retryCount": 0,
      "chunkCount": null
    }
  ],
  "errors": [
    {
      "fileName": "invalid.xyz",
      "error": "Unsupported file type",
      "code": "invalid_file_type",
      "category": "validation",
      "retryable": false,
      "details": {
        "supportedTypes": ["pdf", "doc", "docx", "..."]
      }
    }
  ],
  "batch": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "status": "pending",
    "totalFiles": 1,
    "progress": 0,
    "createdAt": "2024-01-22T10:00:00Z",
    "estimatedCompletionTime": "2024-01-22T10:01:00Z"
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `documents` | array | Successfully queued documents |
| `documents[].id` | string (UUID) | Document identifier |
| `documents[].projectId` | string (UUID) | Project identifier |
| `documents[].fileName` | string | Original file name |
| `documents[].fileType` | string | Detected file type |
| `documents[].processingStatus` | string | Status: pending, processing, processed, failed |
| `documents[].fileSize` | integer | File size in bytes |
| `documents[].uploadDate` | string (date-time) | Upload timestamp |
| `documents[].version` | integer | Document version number |
| `documents[].contentHash` | string | SHA-256 hash of document content |
| `documents[].processingStartedAt` | string (date-time) | Processing start timestamp |
| `documents[].processingCompletedAt` | string (date-time) | Processing completion timestamp |
| `documents[].processorType` | string | Type of processor used (basic, llama-parse, code, tree-sitter, note) |
| `documents[].retryCount` | integer | Number of processing retry attempts |
| `documents[].chunkCount` | integer | Number of chunks generated |
| `errors` | array | Failed uploads |
| `errors[].fileName` | string | Name of failed file |
| `errors[].error` | string | Error description |
| `errors[].code` | string | Error code |
| `errors[].category` | string | Error category (validation, system, etc.) |
| `errors[].retryable` | boolean | Whether error is temporary |
| `errors[].details` | object | Additional error context |
| `batch` | object | Batch processing details |
| `batch.id` | string (UUID) | Batch identifier |
| `batch.status` | string | Batch status |
| `batch.totalFiles` | integer | Total files in batch |
| `batch.progress` | number | Processing progress (0-100) |
| `batch.createdAt` | string (date-time) | Batch creation timestamp |
| `batch.estimatedCompletionTime` | string (date-time) | Estimated completion time |

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid API key |
| 413 | Payload too large |
| 415 | Unsupported file type |
| 429 | Rate limit exceeded |
| 500 | Server error |

### Example Error Response

```json
{
  "error": "Batch upload limit exceeded",
  "code": "batch_limit_exceeded",
  "category": "validation",
  "details": {
    "message": "Maximum 20 files per batch",
    "limit": 20,
    "submitted": 25
  }
}
```

## Best Practices

1. **Document Preparation**
   - Verify file types before upload
   - Check file size limits (20MB per file)
   - Remove unnecessary metadata
   - Ensure files are not corrupted
   - Use appropriate file formats for content type

2. **Batch Processing**
   - Group related documents for easier management
   - Keep batches under the 20-file limit
   - Monitor batch progress using the batch ID
   - Implement retry logic for failed uploads
   - Store batch IDs for future reference

3. **Performance Optimization**
   - Compress large files when possible
   - Use parallel uploads for multiple files
   - Monitor rate limits and adjust accordingly
   - Cache successful upload responses
   - Implement exponential backoff for retries

4. **Error Handling**
   - Validate files before uploading
   - Handle all error categories appropriately
   - Log errors with correlation IDs
   - Implement proper retry strategies
   - Monitor error patterns

5. **Security Considerations**
   - Scan files for malware before upload
   - Use HTTPS for all API calls
   - Validate file content matches extension
   - Implement proper access controls
   - Monitor for unusual upload patterns

6. **Version Management**
   - Track document versions
   - Maintain version history
   - Document version changes
   - Consider storage implications
   - Implement cleanup policies

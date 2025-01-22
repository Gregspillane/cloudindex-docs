---
title: Document Upload Best Practices
sidebar_position: 1
---

# Document Upload Best Practices

Learn how to efficiently upload and manage documents in CloudIndex for optimal processing and retrieval.

## Document Preparation

### File Format Guidelines

1. **Supported Formats**
   - PDF (recommended)
   - Microsoft Word (.docx)
   - Markdown (.md, .mdx)
   - Plain text (.txt)
   - Source code (multiple languages)

2. **Format-Specific Tips**
   - PDFs: Ensure text is selectable, not scanned images
   - Word: Use consistent formatting and styles
   - Markdown: Include proper frontmatter
   - Code: Include meaningful comments

### Document Structure

1. **Content Organization**
   ```markdown
   # Document Title
   
   ## Section 1
   Clear section content...
   
   ## Section 2
   Well-structured content...
   ```

2. **Metadata Inclusion**
   ```javascript
   const metadata = {
     title: "Technical Specification",
     author: "Jane Smith",
     department: "Engineering",
     version: "1.0.0",
     tags: ["architecture", "design", "cloud"]
   };
   ```

## Upload Methods

### Single Document Upload

```javascript
import { CloudIndex } from '@cloudindex/sdk';

const cloudindex = new CloudIndex({ apiKey: 'your_api_key' });

async function uploadDocument() {
  const response = await cloudindex.documents.upload({
    file: './document.pdf',
    metadata: {
      title: 'Technical Specification',
      department: 'Engineering'
    },
    options: {
      language: 'en',
      chunkSize: 1000,
      overlapSize: 200
    }
  });

  console.log(`Document ID: ${response.id}`);
}
```

### Batch Upload

```javascript
async function batchUpload(files) {
  const batchConfig = {
    concurrency: 3,
    retryAttempts: 2,
    onProgress: (progress) => {
      console.log(`Uploaded ${progress.completed}/${progress.total} files`);
    }
  };

  const results = await cloudindex.documents.uploadBatch(files, batchConfig);
  return results;
}
```

## Processing Options

### Basic Configuration

```javascript
const processingOptions = {
  chunking: {
    enabled: true,
    size: 1000,
    overlap: 200,
    method: 'semantic'
  },
  embedding: {
    model: 'text-embedding-ada-002',
    dimensions: 1536
  },
  metadata: {
    extract: true,
    preserve: ['author', 'created', 'title']
  }
};
```

### Advanced Settings

```javascript
const advancedOptions = {
  preprocessing: {
    ocr: {
      enabled: true,
      language: 'auto',
      quality: 'high'
    },
    cleanup: {
      removeHeaders: true,
      normalizeWhitespace: true,
      removeRedundantNewlines: true
    }
  },
  vectorization: {
    model: 'text-embedding-ada-002',
    batchSize: 100,
    normalize: true
  }
};
```

## Error Handling

### Common Issues

1. **File Size Limits**
   ```javascript
   const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

   function validateFileSize(file) {
     if (file.size > MAX_FILE_SIZE) {
       throw new Error('File exceeds maximum size of 100MB');
     }
   }
   ```

2. **Format Validation**
   ```javascript
   const SUPPORTED_FORMATS = ['.pdf', '.docx', '.md', '.txt'];

   function validateFormat(filename) {
     const ext = path.extname(filename).toLowerCase();
     if (!SUPPORTED_FORMATS.includes(ext)) {
       throw new Error(`Unsupported format: ${ext}`);
     }
   }
   ```

### Retry Logic

```javascript
async function uploadWithRetry(file, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await cloudindex.documents.upload(file);
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      await delay(Math.pow(2, attempt) * 1000); // Exponential backoff
    }
  }
}
```

## Best Practices

### Performance Optimization

1. **Batch Processing**
   - Group similar documents
   - Use consistent metadata
   - Monitor memory usage
   - Implement progress tracking

2. **Resource Management**
   - Schedule large uploads
   - Monitor API limits
   - Implement rate limiting
   - Cache results

### Quality Assurance

1. **Pre-upload Checks**
   - Validate formats
   - Check file sizes
   - Verify metadata
   - Test sample documents

2. **Post-upload Verification**
   - Check processing status
   - Verify vector counts
   - Test searchability
   - Monitor error rates

## Monitoring and Logging

### Upload Metrics

```javascript
const metrics = {
  uploads: {
    total: 1000,
    successful: 980,
    failed: 20,
    avgProcessingTime: 2.5 // seconds
  },
  processing: {
    completed: 950,
    pending: 30,
    failed: 20
  }
};
```

### Status Tracking

```javascript
async function trackUploadStatus(documentId) {
  const status = await cloudindex.documents.getStatus(documentId);
  console.log({
    id: documentId,
    status: status.state,
    progress: status.progress,
    errors: status.errors
  });
}
```

## Next Steps

- [Batch Processing Guide](/docs/guides/batch-processing)
- [Error Handling](/docs/guides/error-handling)
- [Monitoring Guide](/docs/guides/monitoring)
- [API Reference](/api-reference/introduction)

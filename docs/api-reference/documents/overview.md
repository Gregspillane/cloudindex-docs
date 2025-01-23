---
title: Documents Overview
sidebar_position: 1
---

# Documents API Overview

The CloudIndex Documents API enables uploading and managing documents for RAG applications. This API provides document upload, batch processing, and status tracking capabilities.

## Supported File Formats
- Documents: PDF, DOC, DOCX, RTF, TXT
- Spreadsheets: CSV, XLS, XLSX
- Code: JS, TS, PY, GO, SQL
- Markdown: MD, MDX

## Limits
- Maximum 20 files per request
- Maximum file size: 20MB per file

## Processing Pipeline
Documents go through the following stages:
1. Upload & Validation
2. Content Extraction
3. Chunking
4. Embedding Generation
5. Vector Storage

## Processing Status
Documents can have the following status:
- `pending`: Initial upload complete
- `processing`: Active processing
- `processed`: Successfully completed
- `failed`: Processing failed

---
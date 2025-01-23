import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  parameters: {
    path?: Record<string, Parameter>;
    query?: Record<string, Parameter>;
    body?: Record<string, Parameter>;
  };
  authentication?: {
    type: 'apiKey' | 'bearer';
    location: 'header' | 'query';
  };
}

interface CodeExamplesProps {
  endpoint: ApiEndpoint;
  baseUrl: string;
  language: string;
  apiKey?: string;
  paramValues: Record<string, string>;
}

const getUrlWithPathParams = (basePath: string, endpoint: ApiEndpoint, paramValues?: Record<string, string>): string => {
  let url = basePath;
  if (endpoint.parameters.path) {
    Object.entries(endpoint.parameters.path).forEach(([name, param]) => {
      const value = paramValues?.[`path.${name}`];
      if (value) {
        url = url.replace(`{${name}}`, encodeURIComponent(value));
      }
    });
  }
  return url;
};

const generateCurlExample = (endpoint: ApiEndpoint, baseUrl: string, apiKey?: string, paramValues?: Record<string, string>): string => {
  const parts: string[] = ['curl'];
  
  // Add method
  parts.push(`-X ${endpoint.method}`);
  
  // Add headers
  if (endpoint.authentication) {
    if (endpoint.authentication.type === 'apiKey') {
      parts.push(`-H "Authorization: ApiKey ${apiKey}"`);
    } else if (endpoint.authentication.type === 'bearer') {
      parts.push(`-H "Authorization: Bearer ${apiKey}"`);
    }
  }
  
  // Add URL with path parameters
  const url = getUrlWithPathParams(`${baseUrl}${endpoint.path}`, endpoint, paramValues);
  parts.push(`"${url}"`);
  
  // Add body if POST/PUT
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    Object.entries(endpoint.parameters.body).forEach(([name, param]) => {
      const value = paramValues?.[`body.${name}`];
      if (value) {
        if (param.type === 'file' || param.type === 'file[]') {
          // Handle file uploads with -F
          value.split(',').forEach(file => {
            parts.push(`-F "${name}=@${file.trim()}"`);
          });
        } else {
          // Handle regular form fields with -F
          parts.push(`-F "${name}=${value}"`);
        }
      }
    });
  }
  
  return parts.join(' \\\n  ');
};

const generatePythonExample = (endpoint: ApiEndpoint, baseUrl: string, apiKey?: string, paramValues?: Record<string, string>): string => {
  const lines: string[] = [
    'import requests',
    'import os',
    '',
    `url = "${getUrlWithPathParams(`${baseUrl}${endpoint.path}`, endpoint, paramValues)}"`,
    ''
  ];
  
  // Add headers
  const headers: Record<string, string> = {};
  
  if (endpoint.authentication) {
    if (endpoint.authentication.type === 'apiKey') {
      headers['Authorization'] = `ApiKey ${apiKey}`;
    } else if (endpoint.authentication.type === 'bearer') {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
  }
  
  lines.push('headers = ' + JSON.stringify(headers, null, 2));
  
  // Add body if POST/PUT
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    lines.push('');
    lines.push('files = {');
    Object.entries(endpoint.parameters.body).forEach(([name, param]) => {
      const value = paramValues?.[`body.${name}`];
      if (value) {
        if (param.type === 'file' || param.type === 'file[]') {
          // Handle file uploads
          value.split(',').forEach((file, index) => {
            lines.push(`    '${name}': ('${file.trim()}', open('${file.trim()}', 'rb')),`);
          });
        } else {
          // Handle regular form fields
          lines.push(`    '${name}': '${value}',`);
        }
      }
    });
    lines.push('}');
  }
  
  // Add request
  lines.push('');
  const requestLine = `response = requests.${endpoint.method.toLowerCase()}(url`;
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    lines.push(`${requestLine}, headers=headers, files=files)`);
  } else {
    lines.push(`${requestLine}, headers=headers)`);
  }
  
  return lines.join('\n');
};

const generateJavaScriptExample = (endpoint: ApiEndpoint, baseUrl: string, apiKey?: string, paramValues?: Record<string, string>): string => {
  const lines: string[] = [
    'const formData = new FormData();',
    ''
  ];
  
  // Add body if POST/PUT
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    Object.entries(endpoint.parameters.body).forEach(([name, param]) => {
      const value = paramValues?.[`body.${name}`];
      if (value) {
        if (param.type === 'file' || param.type === 'file[]') {
          // Handle file uploads
          value.split(',').forEach(file => {
            lines.push(`// Assuming '${file.trim()}' is a File object`);
            lines.push(`formData.append('${name}', file);`);
          });
        } else {
          // Handle regular form fields
          lines.push(`formData.append('${name}', '${value}');`);
        }
      }
    });
    lines.push('');
  }
  
  lines.push('const options = {');
  lines.push(`  method: '${endpoint.method}',`);
  lines.push('  headers: {');
  
  if (endpoint.authentication) {
    if (endpoint.authentication.type === 'apiKey') {
      lines.push(`    'Authorization': 'ApiKey ${apiKey}',`);
    } else if (endpoint.authentication.type === 'bearer') {
      lines.push(`    'Authorization': 'Bearer ${apiKey}',`);
    }
  }
  
  lines.push('  },');
  
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    lines.push('  body: formData,');
  }
  
  lines.push('};');
  lines.push('');
  lines.push(`fetch('${getUrlWithPathParams(`${baseUrl}${endpoint.path}`, endpoint, paramValues)}', options)`);
  lines.push('  .then(response => response.json())');
  lines.push('  .then(data => console.log(data))');
  lines.push('  .catch(error => console.error(error));');
  
  return lines.join('\n');
};

const generateGoExample = (endpoint: ApiEndpoint, baseUrl: string, apiKey?: string, paramValues?: Record<string, string>): string => {
  const lines: string[] = [
    'package main',
    '',
    'import (',
    '    "bytes"',
    '    "io"',
    '    "mime/multipart"',
    '    "os"',
    '    "path/filepath"',
    '    "fmt"',
    '    "net/http"',
    ')',
    '',
    'func main() {'
  ];
  
  // Add body if POST/PUT
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    lines.push('    body := &bytes.Buffer{}');
    lines.push('    writer := multipart.NewWriter(body)');
    lines.push('');
    
    Object.entries(endpoint.parameters.body).forEach(([name, param]) => {
      const value = paramValues?.[`body.${name}`];
      if (value) {
        if (param.type === 'file' || param.type === 'file[]') {
          // Handle file uploads
          value.split(',').forEach(file => {
            const trimmedFile = file.trim();
            lines.push(`    file, err := os.Open("${trimmedFile}")`);
            lines.push('    if err != nil {');
            lines.push('        fmt.Println("Error:", err)');
            lines.push('        return');
            lines.push('    }');
            lines.push('    defer file.Close()');
            lines.push('');
            lines.push(`    part, err := writer.CreateFormFile("${name}", filepath.Base("${trimmedFile}"))`);
            lines.push('    if err != nil {');
            lines.push('        fmt.Println("Error:", err)');
            lines.push('        return');
            lines.push('    }');
            lines.push('');
            lines.push('    _, err = io.Copy(part, file)');
            lines.push('    if err != nil {');
            lines.push('        fmt.Println("Error:", err)');
            lines.push('        return');
            lines.push('    }');
            lines.push('');
          });
        } else {
          // Handle regular form fields
          lines.push(`    err := writer.WriteField("${name}", "${value}")`);
          lines.push('    if err != nil {');
          lines.push('        fmt.Println("Error:", err)');
          lines.push('        return');
          lines.push('    }');
          lines.push('');
        }
      }
    });
    
    lines.push('    err := writer.Close()');
    lines.push('    if err != nil {');
    lines.push('        fmt.Println("Error:", err)');
    lines.push('        return');
    lines.push('    }');
    lines.push('');
  }
  
  const url = getUrlWithPathParams(`${baseUrl}${endpoint.path}`, endpoint, paramValues);
  lines.push(`    req, err := http.NewRequest("${endpoint.method}", "${url}", `);
  
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    lines.push('        body)');
  } else {
    lines.push('        nil)');
  }
  
  lines.push('    if err != nil {');
  lines.push('        fmt.Println("Error:", err)');
  lines.push('        return');
  lines.push('    }');
  lines.push('');
  
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    lines.push('    req.Header.Set("Content-Type", writer.FormDataContentType())');
  }
  
  if (endpoint.authentication) {
    if (endpoint.authentication.type === 'apiKey') {
      lines.push(`    req.Header.Set("Authorization", "ApiKey ${apiKey}")`);
    } else if (endpoint.authentication.type === 'bearer') {
      lines.push(`    req.Header.Set("Authorization", "Bearer ${apiKey}")`);
    }
  }
  
  lines.push('');
  lines.push('    client := &http.Client{}');
  lines.push('    resp, err := client.Do(req)');
  lines.push('    if err != nil {');
  lines.push('        fmt.Println("Error:", err)');
  lines.push('        return');
  lines.push('    }');
  lines.push('    defer resp.Body.Close()');
  lines.push('}');
  
  return lines.join('\n');
};

const codeGenerators: Record<string, (endpoint: ApiEndpoint, baseUrl: string, apiKey?: string, paramValues?: Record<string, string>) => string> = {
  curl: generateCurlExample,
  python: generatePythonExample,
  javascript: generateJavaScriptExample,
  go: generateGoExample,
};

export default function CodeExamples({ endpoint, baseUrl, language, apiKey, paramValues }: CodeExamplesProps): JSX.Element {
  const generator = codeGenerators[language.toLowerCase()];
  if (!generator) {
    return <div className={styles.error}>Unsupported language: {language}</div>;
  }

  const code = generator(endpoint, baseUrl, apiKey, paramValues);

  return (
    <div className={styles.container}>
      <CodeBlock language={language === 'javascript' ? 'typescript' : language}>
        {code}
      </CodeBlock>
    </div>
  );
}

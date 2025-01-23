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

const convertValue = (value: string | undefined, type: string): any => {
  if (!value) return undefined;
  
  switch (type.toLowerCase()) {
    case 'boolean':
      return value.toLowerCase() === 'true';
    case 'number':
    case 'integer':
      return Number(value);
    case 'array':
      try {
        return JSON.parse(value);
      } catch {
        return value.split(',').map(v => v.trim());
      }
    case 'object':
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    default:
      return value;
  }
};

const generateCurlExample = (endpoint: ApiEndpoint, baseUrl: string, apiKey?: string, paramValues?: Record<string, string>): string => {
  const parts: string[] = ['curl'];
  
  // Add method
  parts.push(`-X ${endpoint.method}`);
  
  // Add headers
  parts.push('-H "Content-Type: application/json"');
  if (apiKey && endpoint.authentication) {
    if (endpoint.authentication.type === 'apiKey') {
      parts.push(`-H "Authorization: ApiKey ${apiKey}"`);
    } else if (endpoint.authentication.type === 'bearer') {
      parts.push(`-H "Authorization: Bearer ${apiKey}"`);
    }
  }
  
  // Add URL
  let url = `${baseUrl}${endpoint.path}`;
  parts.push(`"${url}"`);
  
  // Add body if POST/PUT
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    const bodyData = Object.entries(endpoint.parameters.body).reduce((acc, [key, param]) => {
      const value = paramValues?.[`body.${key}`];
      if (value !== undefined && value !== '') {
        acc[key] = convertValue(value, param.type);
      } else if (param.required) {
        switch (param.type.toLowerCase()) {
          case 'boolean':
            acc[key] = false;
            break;
          case 'number':
          case 'integer':
            acc[key] = 0;
            break;
          case 'array':
            acc[key] = [];
            break;
          case 'object':
            acc[key] = {};
            break;
          default:
            acc[key] = `<${param.type}>`;
        }
      }
      return acc;
    }, {} as Record<string, any>);
    // Format JSON with double quotes for valid JSON, wrapped in single quotes for shell
    const jsonBody = JSON.stringify(bodyData).replace(/'/g, "'\\''"); // Escape single quotes
    parts.push(`-d '${jsonBody}'`);
  }
  
  return parts.join(' \\\n  ');
};

const generatePythonExample = (endpoint: ApiEndpoint, baseUrl: string, apiKey?: string, paramValues?: Record<string, string>): string => {
  const lines: string[] = [
    'import requests',
    '',
    `url = "${baseUrl}${endpoint.path}"`,
    ''
  ];
  
  // Add headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  
  if (apiKey && endpoint.authentication) {
    if (endpoint.authentication.type === 'apiKey') {
      headers['Authorization'] = `ApiKey ${apiKey}`;
    } else if (endpoint.authentication.type === 'bearer') {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
  }
  
  lines.push('headers = ' + JSON.stringify(headers, null, 2));
  
  // Add body if POST/PUT
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    const bodyData = Object.entries(endpoint.parameters.body).reduce((acc, [key, param]) => {
      const value = paramValues?.[`body.${key}`];
      if (value !== undefined && value !== '') {
        acc[key] = convertValue(value, param.type);
      } else if (param.required) {
        switch (param.type.toLowerCase()) {
          case 'boolean':
            acc[key] = false;
            break;
          case 'number':
          case 'integer':
            acc[key] = 0;
            break;
          case 'array':
            acc[key] = [];
            break;
          case 'object':
            acc[key] = {};
            break;
          default:
            acc[key] = `<${param.type}>`;
        }
      }
      return acc;
    }, {} as Record<string, any>);
    lines.push('');
    lines.push('data = ' + JSON.stringify(bodyData));
  }
  
  // Add request
  lines.push('');
  const requestLine = `response = requests.${endpoint.method.toLowerCase()}(url`;
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    lines.push(`${requestLine}, headers=headers, json=data)`);
  } else {
    lines.push(`${requestLine}, headers=headers)`);
  }
  
  return lines.join('\n');
};

const generateJavaScriptExample = (endpoint: ApiEndpoint, baseUrl: string, apiKey?: string, paramValues?: Record<string, string>): string => {
  const lines: string[] = [
    'const options = {',
    `  method: '${endpoint.method}',`,
    '  headers: {',
    "    'Content-Type': 'application/json',"
  ];
  
  if (apiKey && endpoint.authentication) {
    if (endpoint.authentication.type === 'apiKey') {
      lines.push(`    'Authorization': 'ApiKey ${apiKey}',`);
    } else if (endpoint.authentication.type === 'bearer') {
      lines.push(`    'Authorization': 'Bearer ${apiKey}',`);
    }
  }
  lines.push('  },');
  
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    const bodyData = Object.entries(endpoint.parameters.body).reduce((acc, [key, param]) => {
      const value = paramValues?.[`body.${key}`];
      if (value !== undefined && value !== '') {
        acc[key] = convertValue(value, param.type);
      } else if (param.required) {
        switch (param.type.toLowerCase()) {
          case 'boolean':
            acc[key] = false;
            break;
          case 'number':
          case 'integer':
            acc[key] = 0;
            break;
          case 'array':
            acc[key] = [];
            break;
          case 'object':
            acc[key] = {};
            break;
          default:
            acc[key] = `<${param.type}>`;
        }
      }
      return acc;
    }, {} as Record<string, any>);
    lines.push('  body: JSON.stringify(' + JSON.stringify(bodyData) + '),');
  }
  
  lines.push('};');
  lines.push('');
  lines.push(`fetch('${baseUrl}${endpoint.path}', options)`);
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
    '    "encoding/json"',
    '    "fmt"',
    '    "net/http"',
    ')',
    '',
    'func main() {'
  ];
  
  // Add body if POST/PUT
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    const bodyData = Object.entries(endpoint.parameters.body).reduce((acc, [key, param]) => {
      const value = paramValues?.[`body.${key}`];
      if (value !== undefined && value !== '') {
        acc[key] = convertValue(value, param.type);
      } else {
        switch (param.type.toLowerCase()) {
          case 'boolean':
            acc[key] = false;
            break;
          case 'number':
          case 'integer':
            acc[key] = 0;
            break;
          case 'array':
            acc[key] = [];
            break;
          case 'object':
            acc[key] = {};
            break;
          default:
            acc[key] = `<${param.type}>`;
        }
      }
      return acc;
    }, {} as Record<string, any>);
    lines.push(`    data := ${JSON.stringify(bodyData)}`);
    lines.push('    jsonData, err := json.Marshal(data)');
    lines.push('    if err != nil {');
    lines.push('        fmt.Println("Error:", err)');
    lines.push('        return');
    lines.push('    }');
    lines.push('');
  }
  
  lines.push(`    req, err := http.NewRequest("${endpoint.method}", "${baseUrl}${endpoint.path}", `);
  if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
    lines.push('        bytes.NewBuffer(jsonData))');
  } else {
    lines.push('        nil)');
  }
  
  lines.push('    if err != nil {');
  lines.push('        fmt.Println("Error:", err)');
  lines.push('        return');
  lines.push('    }');
  lines.push('');
  
  // Add headers
  lines.push('    req.Header.Set("Content-Type", "application/json")');
  if (apiKey && endpoint.authentication) {
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

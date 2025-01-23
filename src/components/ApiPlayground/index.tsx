import React, { useState, useCallback } from 'react';
import styles from './styles.module.css';
import CodeExamples from './CodeExamples';

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

interface ApiPlaygroundProps {
  endpoint: ApiEndpoint;
  baseUrl: string;
  languages: string[];
}

const convertValue = (value: string, type: string): any => {
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

export default function ApiPlayground({ endpoint, baseUrl, languages }: ApiPlaygroundProps): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [apiKey, setApiKey] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cloudindex_api_key') || '';
    }
    return '';
  });

  const handleParamChange = useCallback((type: string, name: string, value: string) => {
    setParamValues(prev => {
      const newValues = {
        ...prev,
        [`${type}.${name}`]: value
      };
      // Clean up empty values
      Object.keys(newValues).forEach(key => {
        if (newValues[key] === '') {
          delete newValues[key];
        }
      });
      return newValues;
    });
  }, []);

  const handleApiKeyChange = useCallback((value: string) => {
    setApiKey(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cloudindex_api_key', value);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    setError(null);
    setResponse(null);
    setIsLoading(true);

    try {
      // Prepare request URL
      let url = `${baseUrl}${endpoint.path}`;
      
      // Add query parameters if any
      if (endpoint.parameters.query) {
        const queryParams = Object.entries(endpoint.parameters.query)
          .map(([name, param]) => {
            const value = paramValues[`query.${name}`];
            const convertedValue = convertValue(value, param.type);
            return convertedValue ? `${name}=${encodeURIComponent(String(convertedValue))}` : null;
          })
          .filter(Boolean)
          .join('&');
        
        if (queryParams) {
          url += `?${queryParams}`;
        }
      }

      // Prepare headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };

      if (endpoint.authentication) {
        if (!apiKey) {
          throw new Error('API key is required');
        }
        if (endpoint.authentication.type === 'apiKey') {
          headers['Authorization'] = `ApiKey ${apiKey}`;
        } else if (endpoint.authentication.type === 'bearer') {
          headers['Authorization'] = `Bearer ${apiKey}`;
        }
      }

      // Prepare request body
      let body: string | undefined;
      if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
        const bodyData = Object.entries(endpoint.parameters.body).reduce((acc, [name, param]) => {
          const value = paramValues[`body.${name}`];
          if (value || param.required) {
            acc[name] = convertValue(value, param.type);
          }
          return acc;
        }, {} as Record<string, any>);
        
        // Ensure proper JSON formatting with double quotes
        body = JSON.stringify(bodyData, null, 2);
      }

      // Make the request
      const response = await fetch(url, {
        method: endpoint.method,
        headers,
        body
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || 
          errorData?.message || 
          `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, baseUrl, apiKey, paramValues]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.method}>{endpoint.method}</div>
        <div className={styles.path}>{endpoint.path}</div>
        <button 
          className={styles.collapseButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? 'EXPAND' : 'COLLAPSE'}
        </button>
      </div>

      <div className={`${styles.content} ${isCollapsed ? styles.collapsed : ''}`}>
        <div className={styles.leftPanel}>
          <div className={styles.languageTabs}>
            {languages.map(lang => (
              <button
                key={lang}
                className={`${styles.languageTab} ${selectedLanguage === lang ? styles.selected : ''}`}
                onClick={() => setSelectedLanguage(lang)}
                data-language={lang.toLowerCase()}
                aria-label={`${lang} code example`}
              >
                {lang}
              </button>
            ))}
          </div>
          <CodeExamples
            endpoint={endpoint}
            baseUrl={baseUrl}
            language={selectedLanguage}
            apiKey={apiKey}
            paramValues={paramValues}
          />
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.requestBuilder}>
            <h3>Request</h3>
            <div className={styles.section}>
              <h4>Base URL</h4>
              <input 
                type="text" 
                value={baseUrl} 
                readOnly 
                className={styles.baseUrl}
              />
            </div>

            {endpoint.authentication && (
              <div className={styles.section}>
                <h4>Authentication</h4>
                <input 
                  type="text"
                  value={apiKey}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  placeholder={`Enter ${endpoint.authentication.type}`}
                  className={styles.authInput}
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            )}

            {Object.entries(endpoint.parameters).map(([type, params]) => (
              <div key={type} className={styles.section}>
                <h4>{type.charAt(0).toUpperCase() + type.slice(1)} Parameters</h4>
                {Object.entries(params).map(([name, param]) => (
                  <div key={name} className={styles.parameter}>
                    <label>
                      {name}
                      {param.required && <span className={styles.required}>*</span>}
                    </label>
                    <input
                      type="text"
                      value={paramValues[`${type}.${name}`] || ''}
                      onChange={(e) => handleParamChange(type, name, e.target.value)}
                      placeholder={param.type}
                      className={styles.parameterInput}
                      spellCheck={false}
                    />
                    <div className={styles.description}>{param.description}</div>
                  </div>
                ))}
              </div>
            ))}

            <button 
              className={styles.sendButton}
              onClick={handleSubmit}
              disabled={isLoading}
              type="button"
            >
              {isLoading ? 'Sending...' : 'Send Request'}
            </button>
          </div>

          <div className={styles.response}>
            <h3>Response</h3>
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}
            {response && (
              <pre className={styles.responseContent}>
                {JSON.stringify(response, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useCallback } from 'react';
import styles from './styles.module.css';
import CodeExamples from './CodeExamples';

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ApiEndpoint {
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

export default function ApiPlayground({ endpoint, baseUrl, languages }: ApiPlaygroundProps): JSX.Element {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
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

  const getUrlWithPathParams = useCallback((basePath: string) => {
    let url = basePath;
    if (endpoint.parameters.path) {
      Object.entries(endpoint.parameters.path).forEach(([name, param]) => {
        const value = paramValues[`path.${name}`];
        if (value) {
          url = url.replace(`{${name}}`, encodeURIComponent(value));
        }
      });
    }
    return url;
  }, [endpoint.parameters.path, paramValues]);

  const handleSubmit = useCallback(async () => {
    setError(null);
    setResponse(null);
    setIsLoading(true);

    try {
      let url = getUrlWithPathParams(`${baseUrl}${endpoint.path}`);
      
      if (endpoint.parameters.query) {
        const queryParams = Object.entries(endpoint.parameters.query)
          .map(([name, param]) => {
            const value = paramValues[`query.${name}`];
            return value ? `${name}=${encodeURIComponent(value)}` : null;
          })
          .filter(Boolean)
          .join('&');
        
        if (queryParams) {
          url += `?${queryParams}`;
        }
      }

      const headers: Record<string, string> = {};

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

      let formData: FormData | undefined;
      if ((endpoint.method === 'POST' || endpoint.method === 'PUT') && endpoint.parameters.body) {
        formData = new FormData();
        Object.entries(endpoint.parameters.body).forEach(([name, param]) => {
          const value = paramValues[`body.${name}`];
          if (value) {
            // For file type parameters, create a File object
            if (param.type === 'file' || param.type === 'file[]') {
              // Create a mock File object since we can't access the real file in the playground
              formData!.append(name, new File([''], value.split('/').pop() || value, {
                type: 'application/octet-stream'
              }));
            } else {
              formData!.append(name, value);
            }
          }
        });
      }

      const response = await fetch(url, {
        method: endpoint.method,
        headers,
        body: formData
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
      <div className={styles.header} onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className={styles.method}>{endpoint.method}</div>
        <div className={styles.path}>{endpoint.path}</div>
        <div className={styles.toggleButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" className={`${styles.arrow} ${isCollapsed ? styles.collapsed : ''}`}>
            <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>
      </div>

      {!isCollapsed && (
        <div className={styles.content}>
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

        <div className={styles.codeExample}>
          <CodeExamples
            endpoint={endpoint}
            baseUrl={baseUrl}
            language={selectedLanguage}
            apiKey={apiKey}
            paramValues={paramValues}
          />
        </div>

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
      )}
    </div>
  );
}

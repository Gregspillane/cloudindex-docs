import React from 'react';
import { useLocation } from '@docusaurus/router';
import Layout from '@theme/Layout';
import ApiPlayground from '@site/src/components/ApiPlayground';
import styles from './styles.module.css';

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  parameters: {
    path?: Record<string, any>;
    query?: Record<string, any>;
    body?: Record<string, any>;
  };
  authentication?: {
    type: 'apiKey' | 'bearer';
    location: 'header' | 'query';
  };
}

function getEndpointFromPath(path: string): ApiEndpoint | null {
  // Extract endpoint info from the current path
  if (path.includes('/chat/threads')) {
    return {
      method: 'POST',
      path: '/chat/threads',
      parameters: {
        body: {
          systemPrompt: {
            type: 'string',
            required: false,
            description: 'Custom system prompt for the thread'
          }
        }
      },
      authentication: {
        type: 'apiKey',
        location: 'header'
      }
    };
  }
  return null;
}

export default function DocPage(props: any): JSX.Element {
  const location = useLocation();
  const isApiPage = location.pathname.startsWith('/api-reference/');
  const endpoint = getEndpointFromPath(location.pathname);

  return (
    <Layout>
      <div className={styles.docPage}>
        <div className={styles.mainContent}>
          {props.children}
        </div>
        {isApiPage && endpoint && (
          <div className={styles.rightSidebar}>
            <ApiPlayground
              endpoint={endpoint}
              baseUrl="https://api.cloudindex.ai/public/v1"
              languages={['curl', 'python', 'javascript', 'go']}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

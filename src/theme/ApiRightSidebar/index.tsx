import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import ApiPlayground from '@site/src/components/ApiPlayground';
import type { ApiEndpoint } from '@site/src/components/ApiPlayground';

export default function ApiRightSidebar(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('playgroundExpanded');
      return saved ? saved === 'true' : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('playgroundExpanded', String(isExpanded));
  }, [isExpanded]);

  return (
    <div className={clsx(styles.sidebarContainer, {
      [styles.collapsed]: !isExpanded
    })}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Collapse API playground" : "Expand API playground"}
      >
        <svg className={styles.chevron} viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      {isExpanded && <ApiPlayground 
        endpoint={{
          method: 'POST',
          path: '/chat/threads/create',
          parameters: {
            body: {
              messages: {
                name: 'messages',
                type: 'array',
                required: true,
                description: 'Array of initial messages in the thread'
              },
              metadata: {
                name: 'metadata',
                type: 'object',
                required: false,
                description: 'Optional key-value pairs for thread metadata'
              }
            }
          },
          authentication: {
            type: 'bearer',
            location: 'header'
          }
        }}
        baseUrl="https://api.cloudindex.io/v1"
        languages={['curl', 'javascript', 'python']}
      />}
    </div>
  );
}

import React from 'react';
import DocSidebarItemOriginal from '@theme-original/DocSidebarItem';
import MethodBadge from '@site/src/components/MethodBadge';

interface DocSidebarItemProps {
  item: {
    type?: string;
    label?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export default function DocSidebarItem(props: DocSidebarItemProps): JSX.Element {
  const { item } = props;

  // Check if this is an API endpoint with a method
  const methodMatch = item?.label?.match(/\((GET|POST|PUT|DELETE)\)/i);
  
  if (methodMatch) {
    const method = methodMatch[1].toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE';
    const label = item.label?.replace(/\s*\((GET|POST|PUT|DELETE)\)/i, '');
    
    const newItem = {
      ...item,
      label: (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <MethodBadge method={method} />
          <span style={{ flex: 1 }}>{label}</span>
        </div>
      ),
    };

    return <DocSidebarItemOriginal {...props} item={newItem} />;
  }

  return <DocSidebarItemOriginal {...props} />;
}

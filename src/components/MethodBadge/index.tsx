import React from 'react';
import styles from './styles.module.css';

interface MethodBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

const MethodBadge: React.FC<MethodBadgeProps> = ({ method }) => {
  return (
    <span className={`${styles.badge} ${styles[method.toLowerCase()]}`}>
      {method}
    </span>
  );
};

export default MethodBadge;

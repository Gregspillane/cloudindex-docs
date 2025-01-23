import React from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

interface TocItem {
  id: string;
  value: string;
  level: number;
}

export default function ApiRightSidebar(): JSX.Element {
  const location = useLocation();
  const [sections, setSections] = React.useState<TocItem[]>([]);

  React.useEffect(() => {
    // Get all h2 and h3 elements from the content
    const headings = Array.from(document.querySelectorAll('h2, h3')).map(heading => ({
      id: heading.id,
      value: heading.textContent || '',
      level: parseInt(heading.tagName[1])
    }));
    setSections(headings);
  }, [location.pathname]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className={styles.rightSidebar}>
      <div className={styles.sidebarInner}>
        <div className={styles.tocHeader}>On This Page</div>
        <nav className={styles.tocNav}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`${styles.tocLink} ${section.level === 3 ? styles.tocLinkNested : ''}`}
            >
              {section.value}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

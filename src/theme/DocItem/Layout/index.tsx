import React from 'react';
import clsx from 'clsx';
import { useLocation } from '@docusaurus/router';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import styles from './styles.module.css';

interface Props {
  children: React.ReactNode;
}

export default function DocItemLayout({ children }: Props): JSX.Element {
  const location = useLocation();
  const isApiPage = location.pathname.startsWith('/api-reference/');

  return (
    <div className={clsx('row', styles.docItemContainer, {
      [styles.apiPage]: isApiPage
    })}>
      <div className={clsx('col', styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemWrapper}>
          <DocBreadcrumbs />
          <DocVersionBadge />
          <DocItemContent>{children}</DocItemContent>
          <DocItemFooter />
          <DocItemPaginator />
        </div>
      </div>
    </div>
  );
}

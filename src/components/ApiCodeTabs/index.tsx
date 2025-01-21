import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

interface CodeExample {
  language: string;
  label: string;
  code: string;
}

interface ApiCodeTabsProps {
  examples: CodeExample[];
}

export default function ApiCodeTabs({ examples }: ApiCodeTabsProps): JSX.Element {
  return (
    <Tabs groupId="api-code-examples">
      {examples.map((example) => (
        <TabItem key={example.language} value={example.language} label={example.label}>
          <CodeBlock language={example.language}>{example.code}</CodeBlock>
        </TabItem>
      ))}
    </Tabs>
  );
}

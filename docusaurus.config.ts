import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'The Cloudindex Platform | Cloudindex Docs',
  tagline: 'Documentation for Cloudindex',
  favicon: 'img/emoticon.png',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cloudindex', // Usually your GitHub org/user name.
  projectName: 'cloudindex-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'default',
        path: 'docs/docs',
        routeBasePath: 'docs',
        sidebarPath: undefined,
        sidebarCollapsible: true,
        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          return defaultSidebarItemsGenerator(args);
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'docs/api-reference',
        routeBasePath: 'api-reference',
        sidebarPath: undefined,
        sidebarCollapsible: true,
        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          return defaultSidebarItemsGenerator(args);
        },
      },
    ],
  ],
  presets: [
    [
      'classic',
      {
        docs: false, // Disable the docs plugin in the classic preset since we're using it as a standalone plugin
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      logo: {
        alt: 'Cloudindex Logo',
        src: 'img/cloudindex-black.png',
        srcDark: 'img/cloudindex-white.png',
        style: {
          maxHeight: '40px',
          width: 'auto'
        }
      },
      items: [
        {
          to: '/docs/getting-started/introduction',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/api-reference/introduction',
          position: 'left',
          label: 'API Reference',
        },
        {
          href: 'https://github.com/cloudindex/cloudindex-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/introduction',
            },
            {
              label: 'API Reference',
              to: '/api-reference/introduction',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Core Concepts',
              to: '/docs/core-concepts/rag-overview',
            },
            {
              label: 'Guides',
              to: '/docs/guides/document-upload',
            },
            {
              label: 'Integrations',
              to: '/docs/integrations/google-drive',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/cloudindex/cloudindex-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Cloudindex.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

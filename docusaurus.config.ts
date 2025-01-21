import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
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
        sidebarPath: undefined, // Generate automatically from folder structure
        sidebarCollapsible: true,
        // Category index pages can be generated automatically
        async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
          const sidebarItems = await defaultSidebarItemsGenerator(args);
          return sidebarItems;
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'docs/api',
        routeBasePath: 'api',
        sidebarPath: undefined, // Generate automatically from folder structure
        sidebarCollapsible: true,
        // Category index pages can be generated automatically
        async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
          const sidebarItems = await defaultSidebarItemsGenerator(args);
          return sidebarItems;
        },
      },
    ],
  ],
  presets: [
    [
      'classic',
      {
        docs: false, // Disable the docs plugin in the classic preset since we're using it as a standalone plugin
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
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
          to: '/docs',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/api',
          position: 'left',
          label: 'API Reference',
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs', // Updated to reflect root path
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
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

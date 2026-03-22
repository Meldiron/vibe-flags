import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'VibeFlags',
  description: 'Offline-first feature flag toolbar for any web app',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'author', type: 'text/plain', href: '/llms.txt' }],
    ['script', { type: 'module', src: 'https://cdn.jsdelivr.net/npm/@vibe-flags/core@latest/dist/vibe-flags.cdn.mjs' }],
  ],
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('vibe-'),
      },
    },
  },
  appearance: 'force-dark',
  themeConfig: {
    nav: [
      { text: 'Docs', link: '/docs/getting-started' },
      { text: 'API', link: '/api/components' },
      { text: 'Examples', link: '/examples/basic' },
    ],
    sidebar: {
      '/docs/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/docs/getting-started' },
            { text: 'Flag Types', link: '/docs/configuration' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Components', link: '/api/components' },
            { text: 'Store', link: '/api/store' },
            { text: 'Types', link: '/api/types' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Basic Usage', link: '/examples/basic' },
            { text: 'Boolean Flags', link: '/examples/boolean-flags' },
            { text: 'Select Flags', link: '/examples/select-flags' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Meldiron/vibe-flags' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Developed and maintained by an AI company built with <a href="https://paperclip.ing/" target="_blank" rel="noopener">Paperclip</a>',
    },
  },
});

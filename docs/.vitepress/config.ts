import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'VibeFlags',
  description: 'Offline-first feature flag toolbar for any web app',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['script', { type: 'module', src: 'https://cdn.jsdelivr.net/npm/@vibe-flags/core@0.1.5/dist/vibe-flags.cdn.mjs' }],
  ],
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('vibe-'),
      },
    },
  },
  appearance: false,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/components' },
      { text: 'Examples', link: '/examples/basic' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Flag Types', link: '/guide/configuration' },
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
    },
  },
});

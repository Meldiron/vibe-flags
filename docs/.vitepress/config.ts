import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Vibe Flags",
  description: "Offline-first feature flag toolbar for any web app",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    ["link", { rel: "author", type: "text/plain", href: "/llms.txt" }],
    ["link", { rel: "author", type: "text/plain", href: "/llms-full.txt" }],
    ["script", { type: "module", src: "https://unpkg.com/@vibe-flags/core" }],
    // SEO / canonical
    ["link", { rel: "canonical", href: "https://vibe-flags.appwrite.network/" }],
    // Open Graph
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "Vibe Flags" }],
    ["meta", { property: "og:url", content: "https://vibe-flags.appwrite.network/" }],
    [
      "meta",
      { property: "og:title", content: "Vibe Flags — Offline-first feature flags for vibe coding" },
    ],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Zero-config, offline-first feature flag toolbar for any web app. No backend, no auth, no setup. Drop in a script tag and start flagging.",
      },
    ],
    ["meta", { property: "og:image", content: "https://vibe-flags.appwrite.network/og-image.png" }],
    // Twitter / X Card
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    [
      "meta",
      {
        name: "twitter:title",
        content: "Vibe Flags — Offline-first feature flags for vibe coding",
      },
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "Zero-config, offline-first feature flag toolbar for any web app. No backend, no auth, no setup.",
      },
    ],
    [
      "meta",
      { name: "twitter:image", content: "https://vibe-flags.appwrite.network/og-image.png" },
    ],
  ],
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith("vibe-"),
      },
    },
  },
  appearance: "force-dark",
  themeConfig: {
    nav: [
      { text: "Docs", link: "/docs/getting-started" },
      { text: "API", link: "/api/components" },
      { text: "Examples", link: "/examples/basic" },
    ],
    sidebar: {
      "/docs/": [
        {
          text: "Introduction",
          items: [
            { text: "Getting Started", link: "/docs/getting-started" },
            { text: "Flag Types", link: "/docs/configuration" },
          ],
        },
        {
          text: "Frameworks",
          items: [{ text: "React", link: "/docs/react" }],
        },
      ],
      "/api/": [
        {
          text: "API Reference",
          items: [
            { text: "Components", link: "/api/components" },
            { text: "Store", link: "/api/store" },
            { text: "Types", link: "/api/types" },
          ],
        },
        {
          text: 'Resources',
          items: [
            { text: 'Comparison', link: '/docs/comparison' },
          ],
        },
      ],
      "/examples/": [
        {
          text: "Examples",
          items: [
            { text: "Basic Usage", link: "/examples/basic" },
            { text: "Boolean Flags", link: "/examples/boolean-flags" },
            { text: "Select Flags", link: "/examples/select-flags" },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/Meldiron/vibe-flags" }],
    footer: {
      message: "Released under the MIT License.",
      copyright:
        'Developed and maintained by an AI company built with <a href="https://paperclip.ing/" target="_blank" rel="noopener">Paperclip</a>',
    },
  },
});

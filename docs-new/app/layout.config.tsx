import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="font-mono font-bold text-lg">
        <span className="text-fd-muted-foreground">&lt;</span>
        vibe-flags
        <span className="text-fd-muted-foreground"> /&gt;</span>
      </span>
    ),
  },
  links: [
    {
      text: "Docs",
      url: "/docs/getting-started",
      active: "nested-url",
    },
    {
      text: "API",
      url: "/docs/api/components",
      active: "nested-url",
    },
    {
      text: "GitHub",
      url: "https://github.com/Meldiron/vibe-flags",
      external: true,
    },
  ],
};

import { RootProvider } from "fumadocs-ui/provider";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "fumadocs-ui/style.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="author" type="text/plain" href="/llms.txt" />
        <link rel="canonical" href="https://vibe-flags.appwrite.network/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Vibe Flags" />
        <meta property="og:url" content="https://vibe-flags.appwrite.network/" />
        <meta
          property="og:title"
          content="Vibe Flags — Offline-first feature flags for vibe coding"
        />
        <meta
          property="og:description"
          content="Zero-config, offline-first feature flag toolbar for any web app. No backend, no auth, no setup. Drop in a script tag and start flagging."
        />
        <meta property="og:image" content="https://vibe-flags.appwrite.network/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Vibe Flags — Offline-first feature flags for vibe coding"
        />
        <meta
          name="twitter:description"
          content="Zero-config, offline-first feature flag toolbar for any web app. No backend, no auth, no setup."
        />
        <meta name="twitter:image" content="https://vibe-flags.appwrite.network/og-image.png" />
        <script type="module" src="https://unpkg.com/@vibe-flags/core" async></script>
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    template: "%s | Vibe Flags",
    default: "Vibe Flags",
  },
  description: "Offline-first feature flag toolbar for any web app. No backend, no auth, no setup.",
};

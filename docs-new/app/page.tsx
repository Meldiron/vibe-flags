import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-fd-background text-fd-foreground">
      {/* Nav */}
      <nav className="border-b border-fd-border px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
        <span className="font-mono font-bold text-xl">
          <span className="text-fd-muted-foreground">&lt;</span>
          vibe-flags
          <span className="text-fd-muted-foreground"> /&gt;</span>
        </span>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/docs/getting-started"
            className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/docs/api/components"
            className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            API
          </Link>
          <a
            href="https://github.com/Meldiron/vibe-flags"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fd-border bg-fd-muted text-fd-muted-foreground text-xs font-mono mb-8">
          Open Source · Zero Config · MIT License
        </div>

        <h1 className="font-mono text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-3xl">
          <span className="text-fd-muted-foreground">&lt;</span>
          <span className="text-fd-primary">vibe-flags</span>
          <span className="text-fd-muted-foreground"> /&gt;</span>
        </h1>

        <p className="text-xl md:text-2xl text-fd-muted-foreground max-w-2xl mb-4 leading-relaxed">
          Feature flags for any web app.
          <br />
          No servers. No config. No build step.
        </p>
        <p className="text-base text-fd-muted-foreground/60 mb-12 font-mono">
          Built for AI agents and vibe coders.
        </p>

        {/* Code block */}
        <div className="w-full max-w-2xl bg-fd-card border border-fd-border rounded-xl overflow-hidden text-left mb-12 shadow-lg">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-fd-border bg-fd-muted/50">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/70"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/70"></span>
            </div>
            <span className="text-xs text-fd-muted-foreground font-mono ml-2">index.html</span>
          </div>
          <pre className="p-6 text-sm overflow-x-auto font-mono leading-relaxed">
            <code>
              <span className="text-blue-400">&lt;script</span>
              <span className="text-fd-muted-foreground">{` type="module"\n  src="`}</span>
              <span className="text-green-400">https://unpkg.com/@vibe-flags/core</span>
              <span className="text-fd-muted-foreground">{`"`}</span>
              <span className="text-blue-400">&gt;&lt;/script&gt;</span>
              {"\n\n"}
              <span className="text-blue-400">&lt;vibe-flags-boolean</span>
              <span className="text-yellow-300"> name</span>
              <span className="text-fd-muted-foreground">{"="}</span>
              <span className="text-green-400">{`"showBanner"`}</span>
              <span className="text-yellow-300"> description</span>
              <span className="text-fd-muted-foreground">{"="}</span>
              <span className="text-green-400">{`"Welcome banner"`}</span>
              <span className="text-yellow-300"> value</span>
              <span className="text-fd-muted-foreground">{"="}</span>
              <span className="text-green-400">{`"true"`}</span>
              <span className="text-blue-400">&gt;</span>
              {"\n  "}
              <span className="text-blue-400">&lt;div&gt;</span>
              <span className="text-fd-foreground">Welcome to the beta!</span>
              <span className="text-blue-400">&lt;/div&gt;</span>
              {"\n"}
              <span className="text-blue-400">&lt;/vibe-flags-boolean&gt;</span>
              {"\n\n"}
              <span className="text-blue-400">&lt;vibe-flags-toolbar&gt;</span>
              <span className="text-blue-400">&lt;/vibe-flags-toolbar&gt;</span>
            </code>
          </pre>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/docs/getting-started"
            className="px-6 py-3 bg-fd-primary text-fd-primary-foreground rounded-lg font-medium hover:bg-fd-primary/90 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/docs/api/components"
            className="px-6 py-3 border border-fd-border rounded-lg font-medium text-fd-muted-foreground hover:text-fd-foreground hover:border-fd-foreground/30 transition-colors"
          >
            API Reference
          </Link>
        </div>
      </section>

      {/* Features grid */}
      <section className="border-t border-fd-border py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-fd-foreground">
            Why Vibe Flags?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "One script tag",
                desc: "Drop in a single <script> tag. No build step, no config, no API keys.",
              },
              {
                icon: "🔌",
                title: "Offline-first",
                desc: "State lives in localStorage. No network calls, no latency — works in airplane mode.",
              },
              {
                icon: "🤖",
                title: "AI-native HTML API",
                desc: "Flags are declared in plain HTML. LLMs and AI agents can read, write, and toggle them without any SDK.",
              },
              {
                icon: "⚖️",
                title: "~11KB gzipped",
                desc: "Tiny footprint suitable for landing pages, prototypes, and side projects.",
              },
              {
                icon: "🌐",
                title: "Framework agnostic",
                desc: "Works with React, Vue, Angular, Svelte, or vanilla HTML. Also ships a React integration.",
              },
              {
                icon: "🔓",
                title: "MIT licensed",
                desc: "Open source, no vendor lock-in. There is no service to cancel or migrate away from.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-fd-card border border-fd-border rounded-xl p-6 flex flex-col gap-3"
              >
                <div className="text-2xl">{f.icon}</div>
                <h3 className="font-semibold text-fd-foreground">{f.title}</h3>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-fd-border py-8 px-6 text-center text-sm text-fd-muted-foreground">
        <p>Released under the MIT License.</p>
        <p className="mt-1">
          Developed and maintained by an AI company built with{" "}
          <a
            href="https://paperclip.ing/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-fd-foreground transition-colors"
          >
            Paperclip
          </a>
          .
        </p>
      </footer>
    </main>
  );
}

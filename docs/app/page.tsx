import Link from "next/link";
import { AiSection } from "./(home)/ai-section";
import { CodeBlock } from "./(home)/code-block";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-fd-background text-fd-foreground overflow-x-hidden">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-fd-border bg-fd-background/80 backdrop-blur-md px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-mono font-bold text-lg tracking-tight">
            <span className="text-fd-muted-foreground">&lt;</span>
            <span className="text-fd-foreground">vibe-flags</span>
            <span className="text-fd-muted-foreground"> /&gt;</span>
          </span>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/docs/introduction"
              className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/showcase"
              className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Showcase
            </Link>
            <a
              href="https://github.com/Meldiron/vibe-flags"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <Link
              href="/docs/getting-started"
              className="px-4 py-1.5 bg-fd-foreground text-fd-background rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative border-b border-fd-border">
        <div className="absolute inset-0 bg-grid hero-glow" />
        <div className="relative flex flex-col items-center justify-center px-6 pt-28 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-fd-border bg-surface text-fd-muted-foreground text-xs font-mono mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Open Source · MIT License
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-[-0.04em] mb-6 max-w-4xl leading-[1.05]">
            Feature flags for vibes
          </h1>

          <p className="text-lg md:text-xl text-fd-muted-foreground max-w-xl mb-4 leading-relaxed">
            No server. No config. No build step. Just add &lt;script&gt; tag in your &lt;head&gt; and start benefiting from feature flags.
          </p>

          <p className="text-sm text-fd-muted-foreground/60 mb-10 font-mono">
            Built for AI agents and vibe coders.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <Link
              href="/docs/getting-started"
              className="px-5 py-2.5 bg-fd-foreground text-fd-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              href="/showcase"
              className="px-5 py-2.5 border border-fd-border rounded-lg text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground hover:border-fd-foreground/20 transition-colors"
            >
              Try it out
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center divide-x divide-fd-border text-sm text-fd-muted-foreground font-mono mb-16">
            {[
              { label: "gzipped", value: "~11KB" },
              { label: "dependencies", value: "Minimal" },
              { label: "license", value: "MIT" },
              { label: "backend", value: "Without" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 px-8">
                <span className="text-xl font-semibold text-fd-foreground">{s.value}</span>
                <span className="text-xs">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Hero code block */}
          <div className="w-full max-w-2xl rounded-lg border border-fd-border overflow-hidden text-left">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-fd-border bg-surface">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-fd-muted-foreground font-mono ml-2">index.html</span>
            </div>
            <pre className="p-5 text-[13px] overflow-x-auto font-mono leading-relaxed bg-fd-background">
              <code><span className="text-sky-400">{"<script"}</span>{" "}<span className="text-amber-300">{"type"}</span><span className="text-fd-muted-foreground">{"="}</span><span className="text-emerald-400">{'"module"'}</span>{" "}<span className="text-amber-300">{"src"}</span><span className="text-fd-muted-foreground">{"="}</span><span className="text-emerald-400">{'"https://unpkg.com/@vibe-flags/core"'}</span><span className="text-sky-400">{">"}</span><span className="text-sky-400">{"</script>"}</span>{"\n\n"}<span className="text-fd-muted-foreground/50">{"<!-- Toggle flag -->"}</span>{"\n"}<span className="text-sky-400">{"<vibe-flags-boolean"}</span>{" "}<span className="text-amber-300">{"name"}</span><span className="text-fd-muted-foreground">{"="}</span><span className="text-emerald-400">{'"showBanner"'}</span>{" "}<span className="text-amber-300">{"value"}</span><span className="text-fd-muted-foreground">{"="}</span><span className="text-emerald-400">{'"false"'}</span><span className="text-sky-400">{">"}</span>{"\n  "}<span className="text-sky-400">{"<div>"}</span><span className="text-fd-foreground">{"Welcome to the beta!"}</span><span className="text-sky-400">{"</div>"}</span>{"\n"}<span className="text-sky-400">{"</vibe-flags-boolean>"}</span>{"\n\n"}<span className="text-fd-muted-foreground/50">{"<!-- Multiple options flag -->"}</span>{"\n"}<span className="text-sky-400">{"<vibe-flags-select"}</span>{" "}<span className="text-amber-300">{"name"}</span><span className="text-fd-muted-foreground">{"="}</span><span className="text-emerald-400">{'"theme"'}</span><span className="text-sky-400">{">"}</span>{"\n  "}<span className="text-sky-400">{"<vibe-flags-option"}</span>{" "}<span className="text-amber-300">{"value"}</span><span className="text-fd-muted-foreground">{"="}</span><span className="text-emerald-400">{'"light"'}</span><span className="text-sky-400">{">"}</span><span className="text-fd-muted-foreground">{"..."}</span><span className="text-sky-400">{"</vibe-flags-option>"}</span>{"\n  "}<span className="text-sky-400">{"<vibe-flags-option"}</span>{" "}<span className="text-amber-300">{"value"}</span><span className="text-fd-muted-foreground">{"="}</span><span className="text-emerald-400">{'"dark"'}</span><span className="text-sky-400">{">"}</span><span className="text-fd-muted-foreground">{"..."}</span><span className="text-sky-400">{"</vibe-flags-option>"}</span>{"\n"}<span className="text-sky-400">{"</vibe-flags-select>"}</span>{"\n\n"}<span className="text-fd-muted-foreground/50">{"<!-- Beautiful toolbar -->"}</span>{"\n"}<span className="text-sky-400">{"<vibe-flags-toolbar></vibe-flags-toolbar>"}</span></code>
            </pre>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-b border-fd-border py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-mono text-fd-muted-foreground mb-3 tracking-wider uppercase">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Up and running in 30 seconds
          </h2>
          <p className="text-fd-muted-foreground max-w-lg mb-14">
            No CLI, no framework, no signup. Three simple steps and you have feature flags up and running.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-fd-border rounded-lg overflow-hidden">
            {/* Step 01 */}
            <div className="bg-fd-background p-8 flex flex-col gap-4">
              <span className="text-xs font-mono text-fd-muted-foreground/50">01</span>
              <h3 className="text-lg font-semibold">Add the script tag</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">Drop one line into your HTML. The library self-registers all custom elements automatically.</p>
              <div className="pt-4">
                <CodeBlock code={`<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>`}>
                  <span className="text-sky-400">&lt;script</span>
                  {"\n  "}
                  <span className="text-amber-300">type</span>
                  <span className="text-fd-muted-foreground">=</span>
                  <span className="text-emerald-400">{`"module"`}</span>
                  {"\n  "}
                  <span className="text-amber-300">src</span>
                  <span className="text-fd-muted-foreground">=</span>
                  <span className="text-emerald-400">{`"https://unpkg.com/\n    @vibe-flags/core"`}</span>
                  <span className="text-sky-400">&gt;</span>
                  {"\n"}
                  <span className="text-sky-400">&lt;/script&gt;</span>
                </CodeBlock>
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-fd-background p-8 flex flex-col gap-4">
              <span className="text-xs font-mono text-fd-muted-foreground/50">02</span>
              <h3 className="text-lg font-semibold">Declare your flags</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">Wrap content in flag components. Boolean for toggles, select for variants. No JavaScript needed.</p>
              <div className="pt-4">
                <CodeBlock code={`<vibe-flags-boolean name="isVip" value="false"><p>Welcome, VIP!</p></vibe-flags-boolean>`}>
                  <span className="text-sky-400">&lt;vibe-flags-boolean</span>
                  {"\n  "}
                  <span className="text-amber-300">name</span>
                  <span className="text-fd-muted-foreground">=</span>
                  <span className="text-emerald-400">{`"isVip"`}</span>
                  {"\n  "}
                  <span className="text-amber-300">value</span>
                  <span className="text-fd-muted-foreground">=</span>
                  <span className="text-emerald-400">{`"false"`}</span>
                  <span className="text-sky-400">&gt;</span>
                  {"\n  "}
                  <span className="text-sky-400">&lt;p&gt;</span>
                  <span className="text-fd-foreground">Welcome, VIP!</span>
                  <span className="text-sky-400">&lt;/p&gt;</span>
                  {"\n"}
                  <span className="text-sky-400">&lt;/vibe-flags-boolean&gt;</span>
                </CodeBlock>
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-fd-background p-8 flex flex-col gap-4">
              <span className="text-xs font-mono text-fd-muted-foreground/50">03</span>
              <h3 className="text-lg font-semibold">Toggle from the toolbar</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">Add the toolbar anywhere. It auto-discovers all flags and persists state to localStorage.</p>
              <div className="pt-4">
                <CodeBlock code={`<vibe-flags-toolbar\n  position="bottom-right">\n</vibe-flags-toolbar>`}>
                  <span className="text-sky-400">&lt;vibe-flags-toolbar</span>
                  {"\n  "}
                  <span className="text-amber-300">position</span>
                  <span className="text-fd-muted-foreground">=</span>
                  <span className="text-emerald-400">{`"bottom-right"`}</span>
                  <span className="text-sky-400">&gt;</span>
                  {"\n"}
                  <span className="text-sky-400">&lt;/vibe-flags-toolbar&gt;</span>
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="border-b border-fd-border py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-mono text-fd-muted-foreground mb-3 tracking-wider uppercase">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need
          </h2>
          <p className="text-fd-muted-foreground max-w-lg mb-14">
            A complete feature flag solution that works out of the box.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-fd-border rounded-lg overflow-hidden">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
                title: "No Login Required",
                desc: "Pure localStorage. No accounts, no API keys, no servers.",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                ),
                title: "Any Framework",
                desc: "Web components work in React, Vue, Svelte, Angular, or plain HTML.",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                ),
                title: "~11KB Gzipped",
                desc: "Tiny footprint. Zero runtime dependencies. Zero performance impact.",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                ),
                title: "Persistent State",
                desc: "Flag values survive page refreshes and stay in sync across tabs.",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                ),
                title: "TypeScript Native",
                desc: "Full type safety, imperative store API, and a reactive event system.",
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="21" x2="4" y2="14" />
                    <line x1="4" y1="10" x2="4" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="3" />
                    <line x1="20" y1="21" x2="20" y2="16" />
                    <line x1="20" y1="12" x2="20" y2="3" />
                    <line x1="1" y1="14" x2="7" y2="14" />
                    <line x1="9" y1="8" x2="15" y2="8" />
                    <line x1="17" y1="16" x2="23" y2="16" />
                  </svg>
                ),
                title: "Polished Toolbar",
                desc: "Draggable FAB, resizable panel, toggles and dropdowns. Dark and light.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-fd-background p-7 flex flex-col gap-3 group">
                <div className="w-9 h-9 rounded-md bg-surface border border-fd-border flex items-center justify-center text-fd-muted-foreground group-hover:text-fd-foreground transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-[15px]">{f.title}</h3>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Section ── */}
      <AiSection />

      {/* ── URL overrides ── */}
      <section className="border-b border-fd-border py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-mono text-fd-muted-foreground mb-3 tracking-wider uppercase">URL overrides</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Share exact flag states via URL
            </h2>
            <p className="text-fd-muted-foreground leading-relaxed mb-6">
              Override any flag with a query parameter — no localStorage changes. Perfect for QA snapshots, review links, or demo states.
            </p>
            <ul className="space-y-2.5 text-sm text-fd-muted-foreground">
              {[
                "URL params take priority over localStorage",
                "Ephemeral — not saved on page load",
                "Works for both boolean and select flags",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="text-emerald-500 text-xs">&#10003;</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-fd-border overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-fd-border bg-surface">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-fd-muted-foreground font-mono ml-2">browser address bar</span>
            </div>
            <div className="bg-fd-background">
              <CodeBlock code={"https://yourapp.com\n  ?vf:darkMode=true\n  &vf:theme=dark\n  &vf:showBanner=false"}>
                <span className="text-fd-foreground">{"https://"}</span><span className="text-fd-muted-foreground">{"yourapp.com"}</span>{"\n"}<span className="text-amber-300">{"  ?vf:darkMode"}</span><span className="text-fd-muted-foreground">{"="}</span><span className="text-emerald-400">{"true"}</span>{"\n"}<span className="text-amber-300">{"  &vf:theme"}</span><span className="text-fd-muted-foreground">{"="}</span><span className="text-emerald-400">{"dark"}</span>{"\n"}<span className="text-amber-300">{"  &vf:showBanner"}</span><span className="text-fd-muted-foreground">{"="}</span><span className="text-emerald-400">{"false"}</span>
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="border-b border-fd-border py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-mono text-fd-muted-foreground mb-3 tracking-wider uppercase">Comparison</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            vs. the enterprise alternatives
          </h2>
          <p className="text-fd-muted-foreground max-w-lg mb-14">
            LaunchDarkly and friends are great for production at scale. Vibe Flags is for prototyping, vibe-coding, and AI-assisted development.
          </p>

          <div className="rounded-lg border border-fd-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fd-border bg-surface">
                  <th className="text-left px-5 py-3.5 font-medium text-fd-muted-foreground text-xs uppercase tracking-wider">Feature</th>
                  <th className="px-5 py-3.5 font-medium text-fd-foreground text-xs uppercase tracking-wider text-center">Vibe Flags</th>
                  <th className="px-5 py-3.5 font-medium text-fd-muted-foreground text-xs uppercase tracking-wider text-center hidden md:table-cell">LaunchDarkly</th>
                  <th className="px-5 py-3.5 font-medium text-fd-muted-foreground text-xs uppercase tracking-wider text-center hidden md:table-cell">Unleash</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Zero config setup", vibe: true, ld: true, unleash: false },
                  { feature: "Backendless / offline", vibe: true, ld: false, unleash: false },
                  { feature: "No account needed", vibe: true, ld: false, unleash: false },
                  { feature: "localStorage persistence", vibe: true, ld: false, unleash: false },
                  { feature: "AI-friendly HTML API", vibe: true, ld: false, unleash: false },
                  { feature: "Free & unlimited", vibe: true, ld: false, unleash: true },
                  { feature: "Bundle size", vibe: "~11KB", ld: "~50KB+", unleash: "~20KB+" },
                  { feature: "Targeting rules", vibe: false, ld: true, unleash: true },
                  { feature: "Audit trail", vibe: false, ld: true, unleash: true },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-fd-border last:border-0">
                    <td className="px-5 py-3 text-fd-muted-foreground">{row.feature}</td>
                    <td className="px-5 py-3 text-center">
                      {typeof row.vibe === "boolean" ? (
                        row.vibe ? (
                          <span className="text-emerald-500">&#10003;</span>
                        ) : (
                          <span className="text-fd-muted-foreground/30">&mdash;</span>
                        )
                      ) : (
                        <span className="font-mono text-xs">{row.vibe}</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-center hidden md:table-cell">
                      {typeof row.ld === "boolean" ? (
                        row.ld ? (
                          <span className="text-emerald-500">&#10003;</span>
                        ) : (
                          <span className="text-fd-muted-foreground/30">&mdash;</span>
                        )
                      ) : (
                        <span className="font-mono text-fd-muted-foreground text-xs">{row.ld}</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-center hidden md:table-cell">
                      {typeof row.unleash === "boolean" ? (
                        row.unleash ? (
                          <span className="text-emerald-500">&#10003;</span>
                        ) : (
                          <span className="text-fd-muted-foreground/30">&mdash;</span>
                        )
                      ) : (
                        <span className="font-mono text-fd-muted-foreground text-xs">{row.unleash}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] mb-6">
            Start shipping faster
          </h2>
          <p className="text-fd-muted-foreground text-lg mb-10 leading-relaxed">
            One script tag. Feature flags, variant switching, and a polished toolbar — no backend, no account, no config.
          </p>

          <div className="rounded-lg border border-fd-border overflow-hidden mb-10 text-left mx-auto max-w-lg">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-fd-border bg-surface">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-fd-muted-foreground font-mono ml-2">index.html</span>
            </div>
            <div className="bg-fd-background">
              <CodeBlock code={`<script\n  type="module"\n  src="https://unpkg.com/@vibe-flags/core">\n</script>`}>
                <span className="text-sky-400">{"<script"}</span>{"\n  "}<span className="text-amber-300">{"type"}</span><span className="text-fd-muted-foreground">{"="}</span><span className="text-emerald-400">{'"module"'}</span>{"\n  "}<span className="text-amber-300">{"src"}</span><span className="text-fd-muted-foreground">{"="}</span><span className="text-emerald-400">{'"https://unpkg.com/@vibe-flags/core"'}</span><span className="text-sky-400">{">"}</span>{"\n"}<span className="text-sky-400">{"</script>"}</span>
              </CodeBlock>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs/getting-started"
              className="px-6 py-3 bg-fd-foreground text-fd-background rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              href="/showcase"
              className="px-6 py-3 border border-fd-border rounded-lg font-medium text-fd-muted-foreground hover:text-fd-foreground hover:border-fd-foreground/20 transition-colors"
            >
              Try it out
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-fd-border py-8 px-6 text-center text-sm text-fd-muted-foreground">
        <p className="mt-1">
          Developed and maintained by an AI company built with{" "}
          <a
            href="https://paperclip.ing/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-fd-border hover:text-fd-foreground hover:decoration-fd-foreground/30 transition-colors"
          >
            Paperclip
          </a>
          .
        </p>
      </footer>
    </main>
  );
}

import Link from "next/link";
import { AiSection } from "./(home)/ai-section";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-fd-background text-fd-foreground overflow-x-hidden">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-fd-border bg-fd-background/80 backdrop-blur-sm px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-mono font-bold text-xl tracking-tight">
            <span className="text-fd-muted-foreground">&lt;</span>
            <span className="text-fd-foreground">vibe-flags</span>
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
              className="flex items-center gap-1.5 text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <Link
              href="/docs/getting-started"
              className="px-4 py-1.5 bg-fd-primary text-fd-primary-foreground rounded-md text-sm font-medium hover:bg-fd-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(var(--fd-primary) / 0.08), transparent)",
          }}
        />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fd-border bg-fd-muted/50 text-fd-muted-foreground text-xs font-mono mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Open Source · Zero Config · MIT License
        </div>

        <h1 className="font-mono text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-tight">
          <span className="text-fd-muted-foreground">&lt;</span>
          <span>vibe-flags</span>
          <span className="text-fd-muted-foreground"> /&gt;</span>
        </h1>

        <p className="text-xl md:text-2xl text-fd-muted-foreground max-w-2xl mb-3 leading-relaxed">
          Feature flags for any web app.
          <br />
          No servers. No config. No build step.
        </p>
        <p className="text-base text-fd-muted-foreground/60 mb-10 font-mono">
          Drop in one{" "}
          <code className="text-fd-primary bg-fd-muted px-1.5 py-0.5 rounded">&lt;script&gt;</code>{" "}
          tag. Built for AI agents and vibe coders.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link
            href="/docs/getting-started"
            className="px-6 py-3 bg-fd-primary text-fd-primary-foreground rounded-lg font-semibold hover:bg-fd-primary/90 transition-colors shadow-sm"
          >
            Get Started →
          </Link>
          <Link
            href="/docs/api/components"
            className="px-6 py-3 border border-fd-border rounded-lg font-semibold text-fd-muted-foreground hover:text-fd-foreground hover:border-fd-foreground/30 transition-colors"
          >
            API Reference
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-fd-muted-foreground mb-14 font-mono">
          {[
            { label: "gzipped", value: "~11KB" },
            { label: "dependencies", value: "0" },
            { label: "license", value: "MIT" },
            { label: "backend", value: "none" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-fd-foreground">{s.value}</span>
              <span className="text-xs">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Hero code block */}
        <div className="w-full max-w-2xl rounded-xl border border-fd-border bg-fd-card overflow-hidden text-left shadow-xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-fd-border bg-fd-muted/50">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs text-fd-muted-foreground font-mono ml-2">index.html</span>
          </div>
          <pre className="p-6 text-sm overflow-x-auto font-mono leading-loose">
            <code>
              <span className="text-sky-400">&lt;script</span>
              <span className="text-fd-muted-foreground">{` type="module"\n  src="`}</span>
              <span className="text-emerald-400">https://unpkg.com/@vibe-flags/core</span>
              <span className="text-fd-muted-foreground">{`"`}</span>
              <span className="text-sky-400">&gt;&lt;/script&gt;</span>
              {"\n\n"}
              <span className="text-fd-muted-foreground">{`<!-- Boolean flag: show/hide content -->`}</span>
              {"\n"}
              <span className="text-sky-400">&lt;vibe-flags-boolean</span>
              <span className="text-amber-300"> name</span>
              <span className="text-fd-muted-foreground">{"="}</span>
              <span className="text-emerald-400">{`"showBanner"`}</span>
              <span className="text-amber-300"> value</span>
              <span className="text-fd-muted-foreground">{"="}</span>
              <span className="text-emerald-400">{`"true"`}</span>
              <span className="text-sky-400">&gt;</span>
              {"\n  "}
              <span className="text-sky-400">&lt;div</span>
              <span className="text-amber-300"> class</span>
              <span className="text-fd-muted-foreground">{"="}</span>
              <span className="text-emerald-400">{`"banner"`}</span>
              <span className="text-sky-400">&gt;</span>
              <span className="text-fd-foreground">Welcome to the beta!</span>
              <span className="text-sky-400">&lt;/div&gt;</span>
              {"\n"}
              <span className="text-sky-400">&lt;/vibe-flags-boolean&gt;</span>
              {"\n\n"}
              <span className="text-fd-muted-foreground">{`<!-- Select flag: pick between variants -->`}</span>
              {"\n"}
              <span className="text-sky-400">&lt;vibe-flags-select</span>
              <span className="text-amber-300"> name</span>
              <span className="text-fd-muted-foreground">{"="}</span>
              <span className="text-emerald-400">{`"theme"`}</span>
              <span className="text-sky-400">&gt;</span>
              {"\n  "}
              <span className="text-sky-400">&lt;vibe-flags-option</span>
              <span className="text-amber-300"> value</span>
              <span className="text-fd-muted-foreground">{"="}</span>
              <span className="text-emerald-400">{`"light"`}</span>
              <span className="text-sky-400">&gt;</span>
              <span className="text-fd-muted-foreground">...</span>
              <span className="text-sky-400">&lt;/vibe-flags-option&gt;</span>
              {"\n  "}
              <span className="text-sky-400">&lt;vibe-flags-option</span>
              <span className="text-amber-300"> value</span>
              <span className="text-fd-muted-foreground">{"="}</span>
              <span className="text-emerald-400">{`"dark"`}</span>
              <span className="text-sky-400">&gt;</span>
              <span className="text-fd-muted-foreground">...</span>
              <span className="text-sky-400">&lt;/vibe-flags-option&gt;</span>
              {"\n"}
              <span className="text-sky-400">&lt;/vibe-flags-select&gt;</span>
              {"\n\n"}
              <span className="text-fd-muted-foreground">{`<!-- Floating toolbar — discovers all flags -->`}</span>
              {"\n"}
              <span className="text-sky-400">
                &lt;vibe-flags-toolbar&gt;&lt;/vibe-flags-toolbar&gt;
              </span>
            </code>
          </pre>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 px-6 border-t border-fd-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-fd-foreground mb-4">
              Up and running in 30 seconds
            </h2>
            <p className="text-fd-muted-foreground text-lg max-w-xl mx-auto">
              No CLI, no framework, no signup. Three steps and you have feature flags.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Add the script tag",
                desc: "Drop one line into your HTML. The library self-registers all custom elements automatically.",
                code: `<script type="module"\n  src="https://unpkg.com/@vibe-flags/core">\n</script>`,
              },
              {
                step: "02",
                title: "Declare your flags",
                desc: "Wrap content with `<vibe-flags-boolean>` or `<vibe-flags-select>`. No JavaScript needed.",
                code: `<vibe-flags-boolean\n  name="darkMode"\n  value="true">\n  <div>Dark!</div>\n</vibe-flags-boolean>`,
              },
              {
                step: "03",
                title: "Toggle from the toolbar",
                desc: "Add `<vibe-flags-toolbar>` anywhere. It auto-discovers all flags and persists state to localStorage.",
                code: `<vibe-flags-toolbar\n  position="bottom-right">\n</vibe-flags-toolbar>`,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-xl border border-fd-border bg-fd-card p-6 flex flex-col gap-4"
              >
                <div className="text-4xl font-bold font-mono text-fd-border">{item.step}</div>
                <h3 className="text-lg font-semibold text-fd-foreground">{item.title}</h3>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">{item.desc}</p>
                <div className="mt-auto rounded-lg bg-fd-muted/60 border border-fd-border p-3">
                  <pre className="text-xs font-mono text-fd-muted-foreground overflow-x-auto whitespace-pre">
                    {item.code}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6 bg-fd-muted/20 border-t border-fd-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-fd-foreground mb-4">
              Everything you need
            </h2>
            <p className="text-fd-muted-foreground text-lg max-w-xl mx-auto">
              A complete feature flag solution that works out of the box — no configuration, no
              signup, no ops burden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
                title: "No Login Required",
                desc: "Pure localStorage. No accounts, no API keys, no servers.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                ),
                title: "~11KB Gzipped",
                desc: "Tiny footprint. Zero runtime dependencies. Zero impact on performance.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                ),
                title: "TypeScript Native",
                desc: "Full type safety, imperative store API, and a reactive event system.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
                desc: "Draggable FAB, resizable panel, toggles and dropdowns. Looks great dark or light.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-fd-border bg-fd-card p-6 flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-fd-primary/10 border border-fd-primary/20 flex items-center justify-center text-fd-primary">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-fd-foreground">{f.title}</h3>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Section (interactive, client component) ── */}
      <AiSection />

      {/* ── URL overrides / QA sharing ── */}
      <section className="py-24 px-6 border-t border-fd-border">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fd-border bg-fd-muted text-fd-muted-foreground text-xs font-mono mb-6">
              🔗 URL overrides
            </div>
            <h2 className="text-3xl font-bold text-fd-foreground mb-4">
              Share exact flag states via URL
            </h2>
            <p className="text-fd-muted-foreground leading-relaxed mb-6">
              Override any flag with a URL query parameter — no localStorage changes. Perfect for
              sharing QA snapshots, review links, or demo states with teammates.
            </p>
            <ul className="space-y-3 text-sm text-fd-muted-foreground">
              {[
                "URL params take priority over localStorage",
                "Ephemeral — not saved on page load",
                "Works for both boolean and select flags",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-fd-border bg-fd-card overflow-hidden shadow-lg">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-fd-border bg-fd-muted/50">
              <span className="text-xs text-fd-muted-foreground font-mono">
                browser address bar
              </span>
            </div>
            <pre className="p-6 text-sm font-mono text-fd-muted-foreground overflow-x-auto leading-loose">
              <span className="text-fd-foreground">https://</span>
              <span className="text-fd-muted-foreground">yourapp.com</span>
              {"\n"}
              <span className="text-amber-300">?vf:darkMode</span>
              <span className="text-fd-muted-foreground">=</span>
              <span className="text-emerald-400">true</span>
              {"\n"}
              <span className="text-amber-300">&amp;vf:theme</span>
              <span className="text-fd-muted-foreground">=</span>
              <span className="text-emerald-400">dark</span>
              {"\n"}
              <span className="text-amber-300">&amp;vf:showBanner</span>
              <span className="text-fd-muted-foreground">=</span>
              <span className="text-emerald-400">false</span>
            </pre>
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="py-24 px-6 bg-fd-muted/20 border-t border-fd-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fd-foreground mb-4">
              vs. the enterprise alternatives
            </h2>
            <p className="text-fd-muted-foreground text-lg max-w-xl mx-auto">
              LaunchDarkly and friends are great for production at scale. Vibe Flags is for
              prototyping, vibe-coding, and AI-assisted development.
            </p>
          </div>

          <div className="rounded-xl border border-fd-border bg-fd-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fd-border bg-fd-muted/50">
                  <th className="text-left px-5 py-4 font-semibold text-fd-foreground">Feature</th>
                  <th className="px-5 py-4 font-semibold text-fd-primary text-center">
                    Vibe Flags
                  </th>
                  <th className="px-5 py-4 font-semibold text-fd-muted-foreground text-center hidden md:table-cell">
                    LaunchDarkly
                  </th>
                  <th className="px-5 py-4 font-semibold text-fd-muted-foreground text-center hidden md:table-cell">
                    Unleash
                  </th>
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
                  <tr key={row.feature} className="border-b border-fd-border/50 last:border-0">
                    <td className="px-5 py-3 text-fd-muted-foreground">{row.feature}</td>
                    <td className="px-5 py-3 text-center">
                      {typeof row.vibe === "boolean" ? (
                        row.vibe ? (
                          <span className="text-green-400">✓</span>
                        ) : (
                          <span className="text-fd-muted-foreground/40">—</span>
                        )
                      ) : (
                        <span className="font-mono text-fd-primary text-xs">{row.vibe}</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-center hidden md:table-cell">
                      {typeof row.ld === "boolean" ? (
                        row.ld ? (
                          <span className="text-green-400">✓</span>
                        ) : (
                          <span className="text-fd-muted-foreground/40">—</span>
                        )
                      ) : (
                        <span className="font-mono text-fd-muted-foreground text-xs">{row.ld}</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-center hidden md:table-cell">
                      {typeof row.unleash === "boolean" ? (
                        row.unleash ? (
                          <span className="text-green-400">✓</span>
                        ) : (
                          <span className="text-fd-muted-foreground/40">—</span>
                        )
                      ) : (
                        <span className="font-mono text-fd-muted-foreground text-xs">
                          {row.unleash}
                        </span>
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
      <section className="py-24 px-6 border-t border-fd-border text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-fd-foreground mb-6 font-mono">
            Start shipping faster.
          </h2>
          <p className="text-fd-muted-foreground text-lg mb-10 leading-relaxed">
            Drop in one script tag and get feature flags, variant switching, and a polished toolbar
            — no backend, no account, no config.
          </p>

          <div className="rounded-xl border border-fd-border bg-fd-card overflow-hidden mb-8 shadow-lg text-left mx-auto max-w-lg">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-fd-border bg-fd-muted/50">
              <span className="text-xs text-fd-muted-foreground font-mono">one line to start</span>
            </div>
            <pre className="p-5 text-sm font-mono">
              <span className="text-sky-400">&lt;script</span>
              <span className="text-amber-300"> type</span>
              <span className="text-fd-muted-foreground">{"="}</span>
              <span className="text-emerald-400">{`"module"`}</span>
              <span className="text-amber-300"> src</span>
              <span className="text-fd-muted-foreground">{"="}</span>
              <span className="text-emerald-400">{`"https://unpkg.com/@vibe-flags/core"`}</span>
              <span className="text-sky-400">&gt;&lt;/script&gt;</span>
            </pre>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs/getting-started"
              className="px-8 py-3.5 bg-fd-primary text-fd-primary-foreground rounded-lg font-semibold hover:bg-fd-primary/90 transition-colors shadow-sm text-lg"
            >
              Get Started →
            </Link>
            <Link
              href="/docs/api/components"
              className="px-8 py-3.5 border border-fd-border rounded-lg font-semibold text-fd-muted-foreground hover:text-fd-foreground hover:border-fd-foreground/30 transition-colors text-lg"
            >
              API Reference
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
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

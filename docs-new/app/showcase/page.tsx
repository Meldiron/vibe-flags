import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Showcase | Vibe Flags",
  description: "Interactive demo of Vibe Flags — toggle features and switch variants in real time.",
};

export default function ShowcasePage() {
  return (
    <main className="flex flex-col min-h-screen bg-fd-background text-fd-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-fd-border bg-fd-background/80 backdrop-blur-md px-6 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-mono font-bold text-lg tracking-tight">
            <span className="text-fd-muted-foreground">&lt;</span>
            <span className="text-fd-foreground">vibe-flags</span>
            <span className="text-fd-muted-foreground"> /&gt;</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/docs/getting-started" className="text-fd-muted-foreground hover:text-fd-foreground transition-colors">
              Docs
            </Link>
            <Link href="/" className="text-fd-muted-foreground hover:text-fd-foreground transition-colors">
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="border-b border-fd-border px-6 py-16 text-center">
        <p className="text-sm font-mono text-fd-muted-foreground mb-3 tracking-wider uppercase">Interactive Demo</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Try it out
        </h1>
        <p className="text-fd-muted-foreground max-w-lg mx-auto">
          This page uses real Vibe Flags. Open the toolbar (bottom-right) to toggle features and switch between variants.
        </p>
      </section>

      {/* Demo content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Boolean: Welcome banner */}
          <vibe-flags-boolean name="showBanner" description="Welcome banner" value="true" default>
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-5">
              <div className="flex items-start gap-3">
                <span className="text-blue-500 text-lg mt-0.5">i</span>
                <div>
                  <p className="font-medium text-fd-foreground mb-1">Welcome to the beta!</p>
                  <p className="text-sm text-fd-muted-foreground">This banner is controlled by a boolean flag. Toggle it off in the toolbar.</p>
                </div>
              </div>
            </div>
          </vibe-flags-boolean>

          {/* Select: Hero variant */}
          <div className="rounded-lg border border-fd-border overflow-hidden">
            <div className="px-5 py-3 border-b border-fd-border bg-surface">
              <p className="text-xs font-mono text-fd-muted-foreground">select flag: hero</p>
            </div>
            <vibe-flags-select name="hero" description="Hero variant" default="minimal">
              <vibe-flags-option value="minimal">
                <div className="p-10 text-center">
                  <h2 className="text-2xl font-bold mb-2">Minimal Hero</h2>
                  <p className="text-fd-muted-foreground">Clean and simple. Just a heading and subtext.</p>
                </div>
              </vibe-flags-option>
              <vibe-flags-option value="bold">
                <div className="p-10 text-center" style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)" }}>
                  <h2 className="text-3xl font-extrabold text-white mb-3">Bold Hero</h2>
                  <p className="text-gray-300">High contrast, dark background, larger type.</p>
                  <button className="mt-4 px-6 py-2 bg-white text-black rounded-md font-medium text-sm">Get Started</button>
                </div>
              </vibe-flags-option>
              <vibe-flags-option value="colorful">
                <div className="p-10 text-center" style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}>
                  <h2 className="text-3xl font-bold text-white mb-3">Colorful Hero</h2>
                  <p className="text-white/80">Gradient background with vibrant colors.</p>
                  <div className="mt-4 flex justify-center gap-3">
                    <button className="px-5 py-2 bg-white text-purple-700 rounded-md font-medium text-sm">Primary</button>
                    <button className="px-5 py-2 bg-white/20 text-white rounded-md font-medium text-sm border border-white/30">Secondary</button>
                  </div>
                </div>
              </vibe-flags-option>
            </vibe-flags-select>
          </div>

          {/* Select: Pricing layout */}
          <div className="rounded-lg border border-fd-border overflow-hidden">
            <div className="px-5 py-3 border-b border-fd-border bg-surface">
              <p className="text-xs font-mono text-fd-muted-foreground">select flag: pricing</p>
            </div>
            <vibe-flags-select name="pricing" description="Pricing layout" default="cards">
              <vibe-flags-option value="cards">
                <div className="p-8">
                  <h3 className="text-lg font-semibold mb-6 text-center">Pricing — Cards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["Free", "Pro", "Enterprise"].map((plan) => (
                      <div key={plan} className="rounded-lg border border-fd-border p-5 text-center">
                        <p className="font-semibold mb-1">{plan}</p>
                        <p className="text-2xl font-bold mb-3">{plan === "Free" ? "$0" : plan === "Pro" ? "$19" : "$99"}</p>
                        <p className="text-xs text-fd-muted-foreground">per month</p>
                      </div>
                    ))}
                  </div>
                </div>
              </vibe-flags-option>
              <vibe-flags-option value="table">
                <div className="p-8">
                  <h3 className="text-lg font-semibold mb-6 text-center">Pricing — Table</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-fd-border">
                        <th className="text-left py-2 px-3 text-fd-muted-foreground font-medium">Plan</th>
                        <th className="text-left py-2 px-3 text-fd-muted-foreground font-medium">Price</th>
                        <th className="text-left py-2 px-3 text-fd-muted-foreground font-medium">Features</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { plan: "Free", price: "$0/mo", features: "1 project, community support" },
                        { plan: "Pro", price: "$19/mo", features: "Unlimited projects, priority support" },
                        { plan: "Enterprise", price: "$99/mo", features: "Custom SLA, dedicated support" },
                      ].map((row) => (
                        <tr key={row.plan} className="border-b border-fd-border/50 last:border-0">
                          <td className="py-2.5 px-3 font-medium">{row.plan}</td>
                          <td className="py-2.5 px-3 font-mono">{row.price}</td>
                          <td className="py-2.5 px-3 text-fd-muted-foreground">{row.features}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </vibe-flags-option>
              <vibe-flags-option value="simple">
                <div className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">Pricing — Simple</h3>
                  <p className="text-4xl font-bold mb-1">$19<span className="text-lg font-normal text-fd-muted-foreground">/mo</span></p>
                  <p className="text-fd-muted-foreground text-sm mb-4">Everything included. No tiers.</p>
                  <button className="px-6 py-2 bg-fd-foreground text-fd-background rounded-md text-sm font-medium">Subscribe</button>
                </div>
              </vibe-flags-option>
            </vibe-flags-select>
          </div>

          {/* Info */}
          <div className="rounded-lg border border-fd-border bg-surface p-6 text-center">
            <p className="text-sm text-fd-muted-foreground">
              Open the <strong className="text-fd-foreground">toolbar</strong> in the bottom-right corner to toggle flags and switch variants.
            </p>
          </div>

        </div>
      </div>

      {/* Toolbar */}
      <vibe-flags-toolbar></vibe-flags-toolbar>

      {/* Footer */}
      <footer className="border-t border-fd-border py-6 px-6 text-center text-sm text-fd-muted-foreground">
        <Link href="/" className="underline decoration-fd-border hover:text-fd-foreground transition-colors">
          Back to home
        </Link>
        {" · "}
        <Link href="/docs/getting-started" className="underline decoration-fd-border hover:text-fd-foreground transition-colors">
          Read the docs
        </Link>
      </footer>
    </main>
  );
}

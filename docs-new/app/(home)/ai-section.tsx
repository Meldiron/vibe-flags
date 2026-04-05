"use client";

import { useState } from "react";

export function AiSection() {
  const [tab, setTab] = useState<"human" | "robot">("human");

  return (
    <section className="py-24 px-6 bg-fd-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fd-border bg-fd-background text-fd-muted-foreground text-xs font-mono mb-6">
            🤖 AI-native
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-fd-foreground mb-4">
            Built for humans <span className="text-fd-primary">&amp;</span> AI agents
          </h2>
          <p className="text-fd-muted-foreground text-lg max-w-2xl mx-auto">
            Flags are declared in plain HTML. LLMs and AI coding agents can read, write, and toggle
            them without learning any SDK.
          </p>
        </div>

        {/* Tab toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-fd-border bg-fd-background p-1 gap-1">
            <button
              onClick={() => setTab("human")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                tab === "human"
                  ? "bg-fd-primary text-fd-primary-foreground shadow-sm"
                  : "text-fd-muted-foreground hover:text-fd-foreground"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              I am human
            </button>
            <button
              onClick={() => setTab("robot")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                tab === "robot"
                  ? "bg-fd-primary text-fd-primary-foreground shadow-sm"
                  : "text-fd-muted-foreground hover:text-fd-foreground"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4" />
                <line x1="8" y1="16" x2="8" y2="16" />
                <line x1="16" y1="16" x2="16" y2="16" />
              </svg>
              I am a robot
            </button>
          </div>
        </div>

        {/* Cards */}
        {tab === "human" && (
          <div className="rounded-xl border border-fd-border bg-fd-card overflow-hidden shadow-lg">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-fd-border bg-fd-muted/50">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs font-mono text-fd-muted-foreground ml-1">Prompt</span>
              <span className="ml-auto text-xs text-fd-muted-foreground">
                Copy and paste into your AI assistant
              </span>
            </div>
            <pre className="p-6 text-sm font-mono text-fd-foreground leading-relaxed whitespace-pre-wrap">
              {`Design 5 distinctly unique and visually different variations of a section of my website. Use your best designer skills to make each variant professional, modern, and creative — vary the layout, typography, colors, spacing, and visual style across all 5. Use Vibe Flags (https://vibe-flags.appwrite.network/llms-full.txt) to let me switch between variants in its toolbar, so I can pick the one I like most.

Section to redesign: [EXPLAIN YOUR SECTION HERE]`}
            </pre>
          </div>
        )}

        {tab === "robot" && (
          <div className="rounded-xl border border-fd-border bg-fd-card overflow-hidden shadow-lg">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-fd-border bg-fd-muted/50">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs font-mono text-fd-muted-foreground ml-1">
                AI Instructions
              </span>
              <span className="ml-auto text-xs text-fd-muted-foreground">
                Add to your system prompt, CLAUDE.md, or agent instructions
              </span>
            </div>
            <pre className="p-6 text-sm font-mono text-fd-foreground leading-relaxed whitespace-pre-wrap">
              {`When designing UI components, generate multiple distinct variants and use Vibe Flags (https://vibe-flags.appwrite.network/llms-full.txt) to let the user switch between them in the browser.`}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

export function AiSection() {
  const [tab, setTab] = useState<"human" | "robot">("human");

  return (
    <section className="border-b border-fd-border py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-mono text-fd-muted-foreground mb-3 tracking-wider uppercase">AI-native</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Built for humans &amp; AI agents
        </h2>
        <p className="text-fd-muted-foreground max-w-2xl mb-12">
          Flags are declared in plain HTML. LLMs and AI coding agents can read, write, and toggle
          them without learning any SDK.
        </p>

        {/* Tab toggle */}
        <div className="flex mb-6">
          <div className="inline-flex rounded-md border border-fd-border overflow-hidden text-sm">
            <button
              onClick={() => setTab("human")}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                tab === "human"
                  ? "bg-fd-foreground text-fd-background"
                  : "text-fd-muted-foreground hover:text-fd-foreground bg-surface"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors border-l border-fd-border ${
                tab === "robot"
                  ? "bg-fd-foreground text-fd-background"
                  : "text-fd-muted-foreground hover:text-fd-foreground bg-surface"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
          <div className="rounded-lg border border-fd-border overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-fd-border bg-surface">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-fd-border" />
                <span className="w-2.5 h-2.5 rounded-full border border-fd-border" />
                <span className="w-2.5 h-2.5 rounded-full border border-fd-border" />
              </div>
              <span className="text-xs font-mono text-fd-muted-foreground ml-1">Prompt</span>
              <span className="ml-auto text-xs text-fd-muted-foreground">
                Copy and paste into your AI assistant
              </span>
            </div>
            <pre className="p-5 text-[13px] font-mono text-fd-foreground leading-relaxed whitespace-pre-wrap bg-fd-background">
              {`Design 5 distinctly unique and visually different variations of a section of my website. Use your best designer skills to make each variant professional, modern, and creative — vary the layout, typography, colors, spacing, and visual style across all 5. Use Vibe Flags (https://vibe-flags.appwrite.network/llms-full.txt) to let me switch between variants in its toolbar, so I can pick the one I like most.

Section to redesign: [EXPLAIN YOUR SECTION HERE]`}
            </pre>
          </div>
        )}

        {tab === "robot" && (
          <div className="rounded-lg border border-fd-border overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-fd-border bg-surface">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-fd-border" />
                <span className="w-2.5 h-2.5 rounded-full border border-fd-border" />
                <span className="w-2.5 h-2.5 rounded-full border border-fd-border" />
              </div>
              <span className="text-xs font-mono text-fd-muted-foreground ml-1">AI Instructions</span>
              <span className="ml-auto text-xs text-fd-muted-foreground">
                Add to your system prompt, CLAUDE.md, or agent instructions
              </span>
            </div>
            <pre className="p-5 text-[13px] font-mono text-fd-foreground leading-relaxed whitespace-pre-wrap bg-fd-background">
              {`When designing UI components, generate multiple distinct variants and use Vibe Flags (https://vibe-flags.appwrite.network/llms-full.txt) to let the user switch between them in the browser.`}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}

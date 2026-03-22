<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
const activeTab = ref('human');

function onFlagsChanged(e: Event) {
  const detail = (e as CustomEvent).detail;
  if (detail?.state?.lightMode !== undefined) {
    document.documentElement.classList.toggle('dark', !detail.state.lightMode);
  }
}

onMounted(() => {
  // Start in dark mode
  document.documentElement.classList.add('dark');
  window.addEventListener('vibe-flags-changed', onFlagsChanged);
});

onUnmounted(() => {
  window.removeEventListener('vibe-flags-changed', onFlagsChanged);
});
</script>

<template>
  <div class="home-root">
      <!-- Light mode toggle: dark by default, toggle on for light -->
      <vibe-flag-boolean name="lightMode" description="Light mode"></vibe-flag-boolean>

      <!-- Hero Select Flag -->
      <vibe-flag-select name="heroVariant" description="Hero variant">
      
              <!-- HERO 1: Terminal / Developer -->
        <vibe-flag-option value="terminal">
          <section class="hero hero-terminal">
            <div class="hero-content">
              <h1 class="hero-title hero-title-mono">
                <span class="mono-muted">&lt;</span>vibe-flag<span class="mono-muted"> /&gt;</span>
              </h1>
              <p class="hero-subtitle hero-subtitle-light">
                Feature flag toolkit that lives in your HTML.<br />
                No servers. No config files. No build step.<br />
                Made for agents and LLMs.
              </p>
              <div class="terminal-window">
                <div class="terminal-header">
                  <div class="code-dots">
                    <span class="dot dot-red"></span>
                    <span class="dot dot-yellow"></span>
                    <span class="dot dot-green"></span>
                  </div>
                  <span class="terminal-title">index.html</span>
                </div>
                <pre class="terminal-body"><code><span class="t-tag">&lt;script</span>
    <span class="t-attr">type</span>=<span class="t-str">"module"</span>
    <span class="t-attr">src</span>=<span class="t-str">"https://cdn.jsdelivr.net/npm/@vibe-flags/core/dist/vibe-flags.cdn.mjs"</span>
<span class="t-tag">&gt;&lt;/script&gt;</span>

<span class="t-tag">&lt;vibe-flag-boolean</span> <span class="t-attr">name</span>=<span class="t-str">"debug"</span> <span class="t-attr">description</span>=<span class="t-str">"Show debug information"</span><span class="t-tag">&gt;</span>
  <span class="t-tag">&lt;DebugComponent /&gt;</span>
<span class="t-tag">&lt;/vibe-flag-boolean&gt;</span>

<span class="t-tag">&lt;vibe-flag-select</span> <span class="t-attr">name</span>=<span class="t-str">"header"</span> <span class="t-attr">description</span>=<span class="t-str">"Header layout style"</span><span class="t-tag">&gt;</span>
  <span class="t-tag">&lt;vibe-flag-option</span> <span class="t-attr">value</span>=<span class="t-str">"terminal"</span><span class="t-tag">&gt;&lt;TerminalHeaderLayout /&gt;</span><span class="t-tag">&lt;/vibe-flag-option&gt;</span>
  <span class="t-tag">&lt;vibe-flag-option</span> <span class="t-attr">value</span>=<span class="t-str">"with-picture"</span><span class="t-tag">&gt;&lt;VisualHeaderLayout /&gt;</span><span class="t-tag">&lt;/vibe-flag-option&gt;</span>
  <span class="t-tag">&lt;vibe-flag-option</span> <span class="t-attr">value</span>=<span class="t-str">"minimal"</span><span class="t-tag">&gt;&lt;MinimalHeaderLayout /&gt;</span><span class="t-tag">&lt;/vibe-flag-option&gt;</span>
<span class="t-tag">&lt;/vibe-flag-select&gt;</span>

<span class="t-tag">&lt;vibe-toolbar&gt;&lt;/vibe-toolbar&gt;</span></code></pre>
              </div>
              <div class="hero-actions hero-actions-center">
                <a href="/docs/getting-started" class="btn btn-primary btn-glow">Get Started</a>
                <a href="/examples/basic" class="btn btn-outline">Examples</a>
              </div>
            </div>
          </section>
        </vibe-flag-option>

        <!-- HERO 2: Gradient & Bold -->
        <vibe-flag-option value="gradient">
          <section class="hero hero-gradient">
            <div class="hero-content">
              <div class="hero-eyebrow">Open Source Feature Flags</div>
              <h1 class="hero-title hero-title-gradient">
                Feature flags<br />without the server.
              </h1>
              <p class="hero-subtitle">
                Toggle, test, and ship. Local-first, framework-agnostic, zero config.
                Just HTML — no JavaScript required.
              </p>
              <div class="hero-actions">
                <a href="/docs/getting-started" class="btn btn-primary">Get Started</a>
                <a href="/examples/basic" class="btn btn-secondary">See Examples</a>
              </div>
              <div class="hero-code">
                <div class="code-window">
                  <div class="code-dots">
                    <span class="dot dot-red"></span>
                    <span class="dot dot-yellow"></span>
                    <span class="dot dot-green"></span>
                  </div>
                  <pre><code>&lt;vibe-flag-boolean name="darkMode" description="Dark mode" value="true"&gt;
  &lt;div class="dark-theme"&gt;Dark mode is on!&lt;/div&gt;
&lt;/vibe-flag-boolean&gt;

&lt;vibe-toolbar&gt;&lt;/vibe-toolbar&gt;</code></pre>
                </div>
              </div>
            </div>
          </section>
        </vibe-flag-option>

        <!-- HERO 3: Split with Visual -->
        <vibe-flag-option value="split">
          <section class="hero hero-split">
            <div class="hero-split-grid">
              <div class="hero-split-left">
                <h1 class="hero-title hero-title-dark">
                  Ship features<br />with confidence.
                </h1>
                <p class="hero-subtitle">
                  VibeFlags is a drop-in web component toolbar for managing feature flags.
                  No backend. No login. Everything stays in your browser.
                </p>
                <div class="hero-actions">
                  <a href="/docs/getting-started" class="btn btn-primary">Get Started</a>
                  <a href="/api/components" class="btn btn-ghost">API Reference</a>
                </div>
              </div>
              <div class="hero-split-right">
                <div class="feature-card-stack">
                  <div class="feature-card">
                    <div class="feature-card-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <h3>No Login Required</h3>
                    <p>Pure localStorage. No accounts, no API keys.</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-card-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                    </div>
                    <h3>Any Framework</h3>
                    <p>Web components. React, Vue, Svelte, or plain HTML.</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-card-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    </div>
                    <h3>Tiny & Fast</h3>
                    <p>Under 11KB gzipped. Zero impact on performance.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </vibe-flag-option>

      </vibe-flag-select>

      <!-- Features Section -->
      <section class="features-section">
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">&#128274;</div>
            <h3>No Login Required</h3>
            <p>Everything works locally with localStorage. No accounts, no servers, no API keys.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">&#129513;</div>
            <h3>Any Framework</h3>
            <p>Built as web components. Works in React, Vue, Svelte, Angular, or plain HTML.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">&#127912;</div>
            <h3>Polished Toolbar</h3>
            <p>Slide-out sidebar with toggle switches and dropdowns. Dark and light themes.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">&#9889;</div>
            <h3>Tiny & Fast</h3>
            <p>Under 11KB gzipped. Zero impact on your bundle or performance.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">&#128190;</div>
            <h3>Persistent State</h3>
            <p>Flag values survive page refreshes and sync across browser tabs.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">&#128736;</div>
            <h3>Developer Friendly</h3>
            <p>Full TypeScript support, imperative API, and reactive updates across your app.</p>
          </div>
        </div>
      </section>

      <!-- Use with AI Section -->
      <section class="ai-section">
        <div class="ai-section-inner">
          <h2 class="ai-section-title">Use with AI</h2>
          <p class="ai-section-subtitle">Designing a new component? Let AI generate multiple variants and use VibeFlags to switch between them.</p>

          <div class="chip-toggle">
            <button :class="['chip', activeTab === 'human' ? 'chip-active' : '']" @click="activeTab = 'human'">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              I am human
            </button>
            <button :class="['chip', activeTab === 'robot' ? 'chip-active' : '']" @click="activeTab = 'robot'">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
              I am robot
            </button>
          </div>

          <!-- Human card -->
          <div v-if="activeTab === 'human'" class="ai-card">
            <div class="ai-card-header">
              <span class="ai-card-label">Prompt</span>
              <span class="ai-card-hint">Copy and paste this into your AI assistant</span>
            </div>
            <div class="ai-card-body">
              <pre class="ai-prompt">Design 5 distinctly unique and visually different variations of a section of my website. Use your best designer skills to make each variant professional, modern, and creative — vary the layout, typography, colors, spacing, and visual style across all 5. Use @vibe-flags/core library to let me switch between variants in it's toolbar, so I can pick the one I like best.

Section to redesign: [EXPLAIN YOUR SECTION HERE]</pre>
            </div>
          </div>

          <!-- Robot card -->
          <div v-if="activeTab === 'robot'" class="ai-card">
            <div class="ai-card-header">
              <span class="ai-card-label">AI Instructions</span>
              <span class="ai-card-hint">Add to your system prompt, CLAUDE.md, or agent instructions</span>
            </div>
            <div class="ai-card-body">
              <pre class="ai-prompt">When designing UI components, generate multiple distinct variants and use @vibe-flags/core to let the user switch between them in the browser.

## Setup

Add to the HTML &lt;head&gt;:
```
&lt;script type="module" src="https://cdn.jsdelivr.net/npm/@vibe-flags/core/dist/vibe-flags.cdn.mjs"&gt;&lt;/script&gt;
```

## Structure

Use &lt;vibe-flag-select&gt; for multi-variant components, with each variant inside a &lt;vibe-flag-option&gt;:

```
&lt;vibe-flag-select name="hero" description="Hero variant"&gt;
  &lt;vibe-flag-option value="v1"&gt;...&lt;/vibe-flag-option&gt;
  &lt;vibe-flag-option value="v2"&gt;...&lt;/vibe-flag-option&gt;
&lt;/vibe-flag-select&gt;

&lt;vibe-toolbar&gt;&lt;/vibe-toolbar&gt;
```

Use &lt;vibe-flag-boolean&gt; for on/off features:
```
&lt;vibe-flag-boolean name="banner" description="Show banner" value="true"&gt;
  ...content shown when flag is on...
&lt;/vibe-flag-boolean&gt;
```

## Rules

- Always include &lt;vibe-toolbar&gt; so the user can toggle flags from a sidebar UI
- Make each variant visually distinct — vary layout, typography, colors, and style
- The first &lt;vibe-flag-option&gt; is shown by default
- Boolean flags default to false
- All state persists in localStorage automatically</pre>
            </div>
          </div>

        </div>
      </section>

      <vibe-toolbar></vibe-toolbar>
  </div>
</template>

<style scoped>
/* ===== Theme-aware tokens (using VitePress variables) ===== */
.home-root {
  --h-text: var(--vp-c-text-1);
  --h-text-muted: var(--vp-c-text-2);
  --h-text-faint: var(--vp-c-text-3);
  --h-bg: var(--vp-c-bg);
  --h-bg-muted: var(--vp-c-bg-soft);
  --h-bg-card: var(--vp-c-bg-soft);
  --h-border: var(--vp-c-divider);
  --h-border-hover: var(--vp-c-border);
  font-family: var(--vp-font-family-base);
  color: var(--h-text);
  line-height: 1.6;
}

/* ===== Shared Hero ===== */
.hero {
  padding: 80px 24px;
  max-width: 1100px;
  margin: 0 auto;
}
.hero-content {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}
.hero-eyebrow {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6366f1;
  margin-bottom: 16px;
}
.hero-title {
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
  color: var(--h-text);
}
.hero-subtitle {
  font-size: 18px;
  color: var(--h-text-muted);
  max-width: 540px;
  margin: 0 auto 32px;
  line-height: 1.7;
}
.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.hero-actions-center {
  margin-top: 40px;
}

/* ===== Buttons ===== */
.btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.btn-primary {
  background: var(--h-text);
  color: var(--h-bg);
}
.btn-primary:hover {
  opacity: 0.85;
}
.btn-secondary {
  background: var(--h-bg-muted);
  color: var(--h-text);
  border-color: var(--h-border);
}
.btn-secondary:hover {
  border-color: var(--h-border-hover);
}
.btn-ghost {
  background: transparent;
  color: var(--h-text-muted);
}
.btn-ghost:hover {
  background: var(--h-bg-muted);
  color: var(--h-text);
}
.btn-outline {
  background: transparent;
  color: var(--h-text-muted);
  border-color: var(--h-border);
}
.btn-outline:hover {
  border-color: #6366f1;
  color: var(--h-text);
}
.btn-glow {
  background: #6366f1;
  color: white;
  box-shadow: 0 0 20px rgba(99,102,241,0.4);
}
.btn-glow:hover {
  background: #4f46e5;
  box-shadow: 0 0 30px rgba(99,102,241,0.6);
}

/* ===== HERO 1: Gradient ===== */
.hero-gradient {
  padding-top: 100px;
}
.hero-title-gradient {
  background: linear-gradient(135deg, var(--h-text) 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-code {
  margin-top: 48px;
}
.code-window {
  background: #0a0a0a;
  border-radius: 12px;
  overflow: hidden;
  text-align: left;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  border: 1px solid #262626;
}
.code-dots {
  display: flex;
  gap: 6px;
  padding: 14px 16px 0;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot-red { background: #ef4444; }
.dot-yellow { background: #eab308; }
.dot-green { background: #22c55e; }
.code-window pre {
  padding: 16px 20px 20px;
  margin: 0;
  overflow-x: auto;
}
.code-window code {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.7;
  color: #d4d4d4;
}

/* ===== HERO 2: Split ===== */
.hero-split {
  padding-top: 80px;
  padding-bottom: 80px;
}
.hero-split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
@media (max-width: 768px) {
  .hero-split-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
.hero-split-left .hero-title {
  text-align: left;
}
.hero-split-left .hero-subtitle {
  text-align: left;
  margin-left: 0;
}
.hero-split-left .hero-actions {
  justify-content: flex-start;
}
.hero-title-dark {
  color: var(--h-text);
}
.feature-card-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.feature-card {
  background: var(--h-bg-card);
  border: 1px solid var(--h-border);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.feature-card:hover {
  border-color: var(--h-border-hover);
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  transform: translateY(-2px);
}
.feature-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(99,102,241,0.08);
  color: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.feature-card h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--h-text);
}
.feature-card p {
  font-size: 13px;
  color: var(--h-text-faint);
  margin: 0;
}

/* ===== HERO 3: Terminal ===== */
.hero-terminal {
  background: var(--h-bg);
  margin: 0;
  max-width: 100%;
  padding: 100px 24px;
}
.dark .hero-terminal {
  background: #0a0a0a;
}
.hero-terminal .hero-content {
  max-width: 800px;
}
.hero-title-mono {
  font-family: var(--vp-font-family-mono);
  color: var(--h-text);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 700;
}
.mono-muted {
  color: var(--h-text-faint);
}
.dark .mono-muted {
  color: #525252;
}
.hero-subtitle-light {
  color: var(--h-text-muted);
}
.terminal-window {
  background: #171717;
  border-radius: 12px;
  border: 1px solid #2e2e2e;
  overflow: hidden;
  text-align: left;
  margin-top: 40px;
}
.terminal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #2e2e2e;
  background: #1a1a1a;
}
.terminal-title {
  font-size: 12px;
  color: #737373;
  font-family: var(--vp-font-family-mono);
}
.terminal-body {
  padding: 20px;
  margin: 0;
  overflow-x: auto;
}
.terminal-body code {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.8;
  color: #d4d4d4;
}
.t-tag { color: #7dd3fc; }
.t-attr { color: #c4b5fd; }
.t-str { color: #86efac; }

/* ===== Features Section ===== */
.features-section {
  padding: 80px 24px;
  max-width: 1100px;
  margin: 0 auto;
  border-top: 1px solid var(--h-border);
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
.feature-item {
  text-align: center;
  padding: 24px;
}
.feature-icon {
  font-size: 32px;
  margin-bottom: 12px;
}
.feature-item h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--h-text);
}
.feature-item p {
  font-size: 14px;
  color: var(--h-text-faint);
  line-height: 1.6;
  margin: 0;
}

/* ===== AI Section ===== */
.ai-section {
  padding: 80px 24px;
  max-width: 1100px;
  margin: 0 auto;
  border-top: 1px solid var(--h-border);
}
.ai-section-inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}
.ai-section-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  color: var(--h-text);
}
.ai-section-subtitle {
  font-size: 16px;
  color: var(--h-text-muted);
  margin-bottom: 32px;
  line-height: 1.6;
}

/* Chip Toggle */
.chip-toggle {
  display: inline-flex;
  background: var(--h-bg-muted);
  border-radius: 10px;
  padding: 4px;
  gap: 4px;
  margin-bottom: 32px;
  border: 1px solid var(--h-border);
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  color: var(--h-text-faint);
  font-family: inherit;
}
.chip:hover {
  color: var(--h-text);
}
.chip-active {
  background: var(--h-bg-card);
  color: var(--h-text);
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

/* AI Card */
.ai-card {
  background: #0a0a0a;
  border-radius: 12px;
  overflow: hidden;
  text-align: left;
  border: 1px solid #262626;
}
.ai-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #262626;
  background: #111;
}
.ai-card-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6366f1;
}
.ai-card-hint {
  font-size: 12px;
  color: #525252;
}
.ai-card-body {
  padding: 20px;
}
.ai-prompt {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.8;
  color: #d4d4d4;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>

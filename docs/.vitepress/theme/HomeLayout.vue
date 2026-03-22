<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const activeTab = ref('human');
const copiedBox = ref<string | null>(null);

const SCRIPT_TAG = '<script type="module"\n  src="https://unpkg.com/@vibe-flags/core@0.1.8">\n<\/script>';

function copyScript(box: string) {
  navigator.clipboard.writeText(SCRIPT_TAG).then(() => {
    copiedBox.value = box;
    setTimeout(() => { copiedBox.value = null; }, 2000);
  });
}

function onFlagsChanged(e: Event) {
  const detail = (e as CustomEvent).detail;
  if (detail?.state?.lightMode !== undefined) {
    document.documentElement.classList.toggle('dark', !detail.state.lightMode);
  }
}

onMounted(() => {
  document.documentElement.classList.add('dark');
  window.addEventListener('vibe-flags-changed', onFlagsChanged);
});

onUnmounted(() => {
  window.removeEventListener('vibe-flags-changed', onFlagsChanged);
});
</script>

<template>
  <div class="home-root">

    <!-- Light mode toggle -->
    <vibe-flag-boolean name="lightMode" description="Light mode"></vibe-flag-boolean>

    <!-- Hero Select Flag — live demo of the library -->
    <vibe-flag-select name="heroVariant" description="Hero variant">

  <!-- ─────────────────────────────────────────────────────────
           HERO 2: Minimal
           ───────────────────────────────────────────────────────── -->
      <vibe-flag-option value="minimal">
        <section class="hero hero-minimal">
          <div class="hero-inner hero-inner--center">
            <div class="badge">Open Source · Zero Config · MIT License</div>
            <h1 class="hero-title">
              Feature flags<br />without the backend.
            </h1>
            <p class="hero-subtitle">
              Drop-in web components that persist to localStorage.<br />
              Works in any framework. No servers, no accounts, no SDK.
            </p>
            <div class="hero-actions">
              <a href="/docs/getting-started" class="btn btn-primary">Get Started</a>
              <a href="/api/components" class="btn btn-outline">API Reference</a>
            </div>
            <div class="snippet-box">
              <pre class="snippet-pre"><span class="c-tag">&lt;script</span>
  <span class="c-attr">type</span>=<span class="c-str">"module"</span>
  <span class="c-attr">src</span>=<span class="c-str">"https://unpkg.com/@vibe-flags/core@0.1.8"</span><span class="c-tag">&gt;
&lt;/script&gt;</span></pre>
              <button class="copy-btn" @click="copyScript('hero')">
                <span v-if="copiedBox === 'hero'" class="copy-label">Copied!</span>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            </div>
          </div>
        </section>
      </vibe-flag-option>
      
      <!-- ─────────────────────────────────────────────────────────
           HERO 1: Terminal (default)
           ───────────────────────────────────────────────────────── -->
      <vibe-flag-option value="terminal">
        <section class="hero hero-terminal">
          <div class="hero-inner hero-inner--center">
            <h1 class="brand-mono">
              <span class="t-tag">&lt;</span>vibe-flags<span class="t-tag"> /&gt;</span>
            </h1>
            <p class="hero-subtitle">
              Feature flag toolkit for HTML.<br />
              No servers. No config. No build step.<br />
              Built for AI agents.
            </p>

            <div class="code-block code-block--lg">
              <div class="cb-header">
                <div class="cb-dots">
                  <span class="dot dot-red"></span>
                  <span class="dot dot-yellow"></span>
                  <span class="dot dot-green"></span>
                </div>
                <span class="cb-filename">index.html</span>
              </div>
              <pre class="cb-body"><code><span class="c-tag">&lt;script</span>
    <span class="c-attr">type</span>=<span class="c-str">"module"</span>
    <span class="c-attr">src</span>=<span class="c-str">"https://unpkg.com/@vibe-flags/core@0.1.8"</span>
<span class="c-tag">&gt;&lt;/script&gt;</span>

<span class="c-comment">&lt;!-- Boolean flag: shows content when enabled --&gt;</span>
<span class="c-tag">&lt;vibe-flag-boolean</span> <span class="c-attr">name</span>=<span class="c-str">"debug"</span> <span class="c-attr">description</span>=<span class="c-str">"Show debug info"</span><span class="c-tag">&gt;</span>
  <span class="c-tag">&lt;DebugPanel /&gt;</span>
<span class="c-tag">&lt;/vibe-flag-boolean&gt;</span>

<span class="c-comment">&lt;!-- Select flag: switch between variants --&gt;</span>
<span class="c-tag">&lt;vibe-flag-select</span> <span class="c-attr">name</span>=<span class="c-str">"header"</span> <span class="c-attr">description</span>=<span class="c-str">"Header layout"</span><span class="c-tag">&gt;</span>
  <span class="c-tag">&lt;vibe-flag-option</span> <span class="c-attr">value</span>=<span class="c-str">"minimal"</span><span class="c-tag">&gt;&lt;MinimalHeader /&gt;&lt;/vibe-flag-option&gt;</span>
  <span class="c-tag">&lt;vibe-flag-option</span> <span class="c-attr">value</span>=<span class="c-str">"visual"</span><span class="c-tag">&gt;&lt;VisualHeader /&gt;&lt;/vibe-flag-option&gt;</span>
<span class="c-tag">&lt;/vibe-flag-select&gt;</span>

<span class="c-comment">&lt;!-- Floating toolbar to toggle all flags --&gt;</span>
<span class="c-tag">&lt;vibe-toolbar&gt;&lt;/vibe-toolbar&gt;</span></code></pre>
            </div>

            <div class="hero-actions">
              <a href="/docs/getting-started" class="btn btn-primary">Get Started</a>
              <a href="/examples/basic" class="btn btn-outline">Examples</a>
            </div>
          </div>
        </section>
      </vibe-flag-option>

    

      <!-- ─────────────────────────────────────────────────────────
           HERO 3: Bold / Split
           ───────────────────────────────────────────────────────── -->
      <vibe-flag-option value="split">
        <section class="hero hero-split">
          <div class="hero-inner hero-inner--split">
            <div class="split-left">
              <h1 class="hero-title hero-title--gradient">
                Ship features<br />with confidence.
              </h1>
              <p class="hero-subtitle hero-subtitle--left">
                VibeFlags is a drop-in web component toolkit for managing feature flags.
                No backend. No login. Everything stays in your browser.
              </p>
              <div class="hero-actions hero-actions--left">
                <a href="/docs/getting-started" class="btn btn-primary">Get Started</a>
                <a href="/api/components" class="btn btn-ghost">API Reference</a>
              </div>
            </div>
            <div class="split-right">
              <div class="mini-cards">
                <div class="mini-card">
                  <div class="mini-card-icon">
                    <!-- lock -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <div class="mini-card-text">
                    <h3>No Login Required</h3>
                    <p>Pure localStorage. No accounts, no API keys, no servers.</p>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-card-icon">
                    <!-- layers -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                  </div>
                  <div class="mini-card-text">
                    <h3>Any Framework</h3>
                    <p>Web components work in React, Vue, Svelte, or plain HTML.</p>
                  </div>
                </div>
                <div class="mini-card">
                  <div class="mini-card-icon">
                    <!-- lightning -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  </div>
                  <div class="mini-card-text">
                    <h3>Tiny &amp; Fast</h3>
                    <p>Under 11KB gzipped. Zero impact on performance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </vibe-flag-option>

    </vibe-flag-select>

    <!-- ─────────────────────────────────────────────────────────
         Features Section
         ───────────────────────────────────────────────────────── -->
    <div class="section-divider">
      <section class="features-section">
        <div class="section-inner">
          <div class="section-header">
            <h2 class="section-title">Everything you need</h2>
            <p class="section-subtitle">
              A complete feature flag solution that works out of the box — no configuration, no signup, no ops burden.
            </p>
          </div>
          <div class="features-grid">

            <div class="feature-item">
              <div class="feature-icon-box">
                <!-- lock -->
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h3>No Login Required</h3>
              <p>Pure localStorage. No accounts, no API keys, no servers.</p>
            </div>

            <div class="feature-item">
              <div class="feature-icon-box">
                <!-- layers -->
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              </div>
              <h3>Any Framework</h3>
              <p>Web components work in React, Vue, Svelte, or plain HTML.</p>
            </div>

            <div class="feature-item">
              <div class="feature-icon-box">
                <!-- lightning -->
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <h3>Tiny &amp; Fast</h3>
              <p>Under 11KB gzipped. Zero impact on performance.</p>
            </div>

            <div class="feature-item">
              <div class="feature-icon-box">
                <!-- database -->
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
              </div>
              <h3>Persistent State</h3>
              <p>Flag values survive page refreshes and sync across tabs.</p>
            </div>

            <div class="feature-item">
              <div class="feature-icon-box">
                <!-- code -->
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <h3>TypeScript Native</h3>
              <p>Full type safety, imperative API, and reactive event system.</p>
            </div>

            <div class="feature-item">
              <div class="feature-icon-box">
                <!-- sliders -->
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
              </div>
              <h3>Polished Toolbar</h3>
              <p>Slide-out sidebar with toggles. Supports dark and light themes.</p>
            </div>

          </div>
        </div>
      </section>
    </div>

    <!-- ─────────────────────────────────────────────────────────
         AI Section
         ───────────────────────────────────────────────────────── -->
    <section class="ai-section">
      <div class="section-inner">
        <div class="section-header">
          <h2 class="section-title">Built for AI agents</h2>
          <p class="section-subtitle">
            Let AI generate UI variants and switch between them instantly.
          </p>
        </div>

        <div class="chip-toggle">
          <button
            :class="['chip', activeTab === 'human' ? 'chip-active' : '']"
            @click="activeTab = 'human'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            I am human
          </button>
          <button
            :class="['chip', activeTab === 'robot' ? 'chip-active' : '']"
            @click="activeTab = 'robot'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
            I am robot
          </button>
        </div>

        <!-- Human card -->
        <div v-if="activeTab === 'human'" class="code-block ai-card">
          <div class="cb-header">
            <div class="cb-dots">
              <span class="dot dot-red"></span>
              <span class="dot dot-yellow"></span>
              <span class="dot dot-green"></span>
            </div>
            <span class="cb-filename">Prompt</span>
            <span class="cb-hint">Copy and paste into your AI assistant</span>
          </div>
          <pre class="cb-body ai-prompt">Design 5 distinctly unique and visually different variations of a section of my website. Use your best designer skills to make each variant professional, modern, and creative — vary the layout, typography, colors, spacing, and visual style across all 5. Use @vibe-flags/core library to let me switch between variants in its toolbar, so I can pick the one I like best.

Section to redesign: [EXPLAIN YOUR SECTION HERE]</pre>
        </div>

        <!-- Robot card -->
        <div v-if="activeTab === 'robot'" class="code-block ai-card">
          <div class="cb-header">
            <div class="cb-dots">
              <span class="dot dot-red"></span>
              <span class="dot dot-yellow"></span>
              <span class="dot dot-green"></span>
            </div>
            <span class="cb-filename">AI Instructions</span>
            <span class="cb-hint">Add to your system prompt, CLAUDE.md, or agent instructions</span>
          </div>
          <pre class="cb-body ai-prompt">When designing UI components, generate multiple distinct variants and use @vibe-flags/core to let the user switch between them in the browser.

## Setup

Add to the HTML &lt;head&gt;:
```
&lt;script type="module" src="https://unpkg.com/@vibe-flags/core@0.1.8"&gt;&lt;/script&gt;
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
    </section>

    <!-- ─────────────────────────────────────────────────────────
         CTA Section (toggleable)
         ───────────────────────────────────────────────────────── -->
    <vibe-flag-boolean name="showCta" description="Show CTA section" :default="true" value="true">
      <section class="cta-section">
        <div class="section-inner cta-inner">
          <h2 class="cta-title">Start shipping faster.</h2>
          <p class="cta-subtitle">
            Drop in one script tag and get feature flags, variant switching, and a<br class="cta-br" />
            polished toolbar — no backend, no account, no config.
          </p>
          <div class="snippet-box">
            <pre class="snippet-pre"><span class="c-tag">&lt;script</span>
  <span class="c-attr">type</span>=<span class="c-str">"module"</span>
  <span class="c-attr">src</span>=<span class="c-str">"https://unpkg.com/@vibe-flags/core@0.1.8"</span><span class="c-tag">&gt;
&lt;/script&gt;</span></pre>
            <button class="copy-btn" @click="copyScript('cta')">
              <span v-if="copiedBox === 'cta'" class="copy-label">Copied!</span>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
          <div class="cta-actions">
            <a href="/docs/getting-started" class="btn btn-cta-primary">Get Started</a>
            <a href="/api/components" class="btn btn-cta-outline">API Reference →</a>
          </div>
        </div>
      </section>
    </vibe-flag-boolean>

    <vibe-toolbar></vibe-toolbar>

  </div>
</template>

<style scoped>
/* ═══════════════════════════════════════════════════════════════
   Theme tokens
   ═══════════════════════════════════════════════════════════════ */
.home-root {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  line-height: 1.6;

  /* Code block tokens — light defaults */
  --cb-bg: #f6f8fa;
  --cb-header: #eef0f3;
  --cb-border: #d8dde3;
  --cb-text: #1f2328;
  --cb-tag: #0550ae;
  --cb-attr: #8250df;
  --cb-str: #0a3069;
  --cb-comment: #57606a;
}
.dark .home-root {
  --cb-bg: #0d1117;
  --cb-header: #161b22;
  --cb-border: #21262d;
  --cb-text: #e6edf3;
  --cb-tag: #7dd3fc;
  --cb-attr: #c4b5fd;
  --cb-str: #86efac;
  --cb-comment: #8b949e;
}

/* ═══════════════════════════════════════════════════════════════
   Layout helpers
   ═══════════════════════════════════════════════════════════════ */
.section-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 96px 24px;
}
.section-header {
  text-align: center;
  margin-bottom: 64px;
}
.section-title {
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}
.section-subtitle {
  font-size: 17px;
  color: var(--vp-c-text-2);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Hero shared */
.hero {
  width: 100%;
}
.hero-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 24px 80px;
}
.hero-inner--center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.hero-title {
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
}
.hero-subtitle {
  font-size: 18px;
  color: var(--vp-c-text-2);
  max-width: 540px;
  margin: 0 auto 36px;
  line-height: 1.75;
}
.hero-subtitle--left {
  margin-left: 0;
  text-align: left;
}

/* ═══════════════════════════════════════════════════════════════
   Buttons
   ═══════════════════════════════════════════════════════════════ */
.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.hero-actions--left {
  justify-content: flex-start;
}
.btn {
  display: inline-flex;
  align-items: center;
  padding: 11px 26px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.15s, background 0.15s, border-color 0.15s, color 0.15s;
  border: 1px solid transparent;
  cursor: pointer;
  white-space: nowrap;
}
.btn-primary {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
}
.btn-primary:hover {
  opacity: 0.82;
}
.btn-outline {
  background: transparent;
  color: var(--vp-c-text-2);
  border-color: var(--vp-c-divider);
}
.btn-outline:hover {
  border-color: var(--vp-c-border);
  color: var(--vp-c-text-1);
}
.btn-ghost {
  background: transparent;
  color: var(--vp-c-text-2);
  border-color: transparent;
}
.btn-ghost:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

/* ═══════════════════════════════════════════════════════════════
   Code blocks (shared component)
   ═══════════════════════════════════════════════════════════════ */
.code-block {
  background: var(--cb-bg);
  border: 1px solid var(--cb-border);
  border-radius: 10px;
  overflow: hidden;
  text-align: left;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
}
.code-block--lg {
  width: 100%;
  max-width: 720px;
  margin: 36px 0 40px;
}
.cb-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: var(--cb-header);
  border-bottom: 1px solid var(--cb-border);
}
.cb-dots {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot-red    { background: #ef4444; }
.dot-yellow { background: #eab308; }
.dot-green  { background: #22c55e; }
.cb-filename {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--cb-text);
  opacity: 0.75;
}
.cb-hint {
  font-size: 12px;
  color: var(--cb-comment);
  margin-left: auto;
}
.cb-body {
  margin: 0;
  padding: 20px 22px;
  overflow-x: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.85;
  color: var(--cb-text);
}
/* Syntax tokens */
.c-tag     { color: var(--cb-tag); }
.c-attr    { color: var(--cb-attr); }
.c-str     { color: var(--cb-str); }
.c-comment { color: var(--cb-comment); font-style: italic; }

/* ═══════════════════════════════════════════════════════════════
   HERO 1: Terminal
   ═══════════════════════════════════════════════════════════════ */
.hero-terminal {
  background: var(--vp-c-bg);
}
.dark .hero-terminal {
  background: #060a10;
}
.brand-mono {
  font-family: var(--vp-font-family-mono);
  font-size: clamp(28px, 5vw, 52px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
  line-height: 1.1;
}
/* t-tag used in brand-mono only, always use cb-tag colour */
.t-tag { color: var(--cb-tag); }

/* ═══════════════════════════════════════════════════════════════
   HERO 2: Minimal
   ═══════════════════════════════════════════════════════════════ */
.hero-minimal {
  background: var(--vp-c-bg);
}
.badge {
  display: inline-block;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  margin-bottom: 28px;
}
/* ─── Snippet box (shared by hero + CTA) ─── */
.snippet-box {
  position: relative;
  display: inline-block;
  margin-top: 36px;
  background: var(--cb-bg);
  border: 1px solid var(--cb-border);
  border-radius: 10px;
  padding: 18px 60px 18px 22px;
  text-align: left;
  max-width: 100%;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}
.snippet-pre {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.85;
  color: var(--cb-text);
  white-space: pre;
}
.copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--cb-header);
  border: 1px solid var(--cb-border);
  border-radius: 6px;
  padding: 5px 9px;
  cursor: pointer;
  color: var(--cb-comment);
  font-size: 12px;
  font-family: var(--vp-font-family-base);
  font-weight: 500;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  white-space: nowrap;
}
.copy-btn:hover {
  background: var(--cb-border);
  color: var(--cb-text);
}
.copy-label {
  color: #22c55e;
}

/* ═══════════════════════════════════════════════════════════════
   HERO 3: Bold / Split
   ═══════════════════════════════════════════════════════════════ */
.hero-split {
  background: var(--vp-c-bg);
}
.hero-inner--split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
@media (max-width: 768px) {
  .hero-inner--split {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
.split-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.hero-title--gradient {
  background: linear-gradient(135deg, var(--vp-c-text-1) 0%, #6366f1 55%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.mini-cards {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.mini-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 22px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}
.mini-card:hover {
  border-color: var(--vp-c-border);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
.mini-card-icon {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mini-card-text h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 4px;
}
.mini-card-text p {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 0;
  line-height: 1.5;
}

/* ═══════════════════════════════════════════════════════════════
   Features Section
   ═══════════════════════════════════════════════════════════════ */
.section-divider {
  background: var(--vp-c-bg-soft);
}
.features-section {
  /* intentionally empty — uses .section-inner + .section-divider bg */
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-divider);
}
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
.feature-item {
  background: var(--vp-c-bg);
  padding: 32px 28px;
  transition: background 0.15s;
}
.feature-item:hover {
  background: var(--vp-c-bg-soft);
}
.feature-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.08);
  color: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}
.feature-item h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 6px;
}
.feature-item p {
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
}

/* ═══════════════════════════════════════════════════════════════
   AI Section
   ═══════════════════════════════════════════════════════════════ */
.ai-section {
  background: var(--vp-c-bg);
}

/* Chip toggle */
.chip-toggle {
  display: inline-flex;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 4px;
  gap: 4px;
  margin-bottom: 32px;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  border: none;
  background: transparent;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;
}
.chip:hover {
  color: var(--vp-c-text-1);
}
.chip-active {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--vp-c-divider);
}
.dark .chip-active {
  background: #111111;
  border-color: #2e2e2e;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
}

/* AI card (extends .code-block) */
.ai-card {
  max-width: 760px;
  margin: 0 auto;
}
.ai-prompt {
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--cb-text);
}

/* AI section inner alignment */
.ai-section .section-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ai-section .section-header {
  width: 100%;
}

/* ═══════════════════════════════════════════════════════════════
   CTA Section
   ═══════════════════════════════════════════════════════════════ */
.cta-section {
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
}
.cta-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 80px;
  padding-bottom: 80px;
}
.cta-title {
  font-size: clamp(28px, 4.5vw, 44px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}
.cta-subtitle {
  font-size: 17px;
  color: var(--vp-c-text-2);
  line-height: 1.75;
  max-width: 520px;
  margin: 0 auto 32px;
}
.cta-br {
  display: none;
}
@media (min-width: 640px) {
  .cta-br {
    display: inline;
  }
}
.cta-inner .snippet-box {
  margin-top: 0;
  margin-bottom: 28px;
}
.cta-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.btn-cta-primary {
  background: #6366f1;
  color: #fff;
  border-color: #6366f1;
}
.btn-cta-primary:hover {
  background: #4f46e5;
  border-color: #4f46e5;
}
.btn-cta-outline {
  background: transparent;
  color: var(--vp-c-text-2);
  border-color: var(--vp-c-divider);
}
.btn-cta-outline:hover {
  border-color: var(--vp-c-border);
  color: var(--vp-c-text-1);
}
</style>

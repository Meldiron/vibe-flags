<template>
  <div class="playground">
    <div class="playground-toolbar">
      <span class="playground-label">Presets:</span>
      <button
        v-for="preset in presets"
        :key="preset.name"
        class="preset-btn"
        :class="{ active: activePreset === preset.name }"
        @click="loadPreset(preset)"
      >
        {{ preset.name }}
      </button>
    </div>
    <div ref="embedEl" class="playground-embed" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const BOOLEAN_PRESET = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Boolean Flag Demo</title>
  <style>
    body { font-family: sans-serif; padding: 24px; background: #0d1117; color: #e6edf3; }
    .card { padding: 16px; background: #1c1f26; border-radius: 8px; margin-bottom: 12px; }
    .banner { padding: 16px; background: #1a3a5c; border: 1px solid #2d6a9f; border-radius: 8px; margin-bottom: 12px; }
  </style>
  <script src="https://unpkg.com/@vibe-flags/core/dist/vibe-flags.cdn.js"><\/script>
</head>
<body>
  <h2>Boolean Flag Demo</h2>
  <p>Open the toolbar on the right to toggle the flag.</p>

  <vibe-flags-boolean name="showBanner" description="Welcome banner" value="true">
    <div class="banner">
      Welcome to the beta! This banner is controlled by a feature flag.
    </div>
  </vibe-flags-boolean>

  <div class="card">This content is always visible.</div>

  <vibe-flags-toolbar></vibe-flags-toolbar>
</body>
</html>`;

const SELECT_PRESET = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Select Flag Demo</title>
  <style>
    body { font-family: sans-serif; padding: 24px; background: #0d1117; color: #e6edf3; }
    [data-value] { padding: 16px; border-radius: 8px; margin-bottom: 12px; }
    [data-value="blue"]  { background: #1a3a5c; border: 1px solid #2d6a9f; }
    [data-value="green"] { background: #1a3a2a; border: 1px solid #2d9f4e; }
    [data-value="red"]   { background: #3a1a1a; border: 1px solid #9f2d2d; }
  </style>
  <script src="https://unpkg.com/@vibe-flags/core/dist/vibe-flags.cdn.js"><\/script>
</head>
<body>
  <h2>Select Flag Demo</h2>
  <p>Switch themes using the toolbar on the right.</p>

  <vibe-flags-select name="theme" description="UI theme" value="blue" options="blue,green,red">
    <div data-value="blue">Blue theme is active</div>
    <div data-value="green">Green theme is active</div>
    <div data-value="red">Red theme is active</div>
  </vibe-flags-select>

  <vibe-flags-toolbar></vibe-flags-toolbar>
</body>
</html>`;

const MULTI_PRESET = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Multiple Flags Demo</title>
  <style>
    body { font-family: sans-serif; padding: 24px; background: #0d1117; color: #e6edf3; }
    .card { padding: 16px; background: #1c1f26; border-radius: 8px; margin-bottom: 12px; }
    .promo { padding: 16px; background: #2a1a3a; border: 1px solid #7c3aed; border-radius: 8px; margin-bottom: 12px; }
    .badge { display: inline-block; background: #7c3aed; color: #fff; padding: 2px 8px; border-radius: 99px; font-size: 12px; }
    .compact h2 { font-size: 14px; margin: 0 0 4px; }
  </style>
  <script src="https://unpkg.com/@vibe-flags/core/dist/vibe-flags.cdn.js"><\/script>
</head>
<body>
  <vibe-flags-select name="layout" description="Layout density" value="default" options="default,compact">
    <div data-value="default"><h2>My App <span class="badge">Beta</span></h2></div>
    <div data-value="compact" class="compact"><h2>My App <span class="badge">Beta</span></h2></div>
  </vibe-flags-select>

  <vibe-flags-boolean name="promoBar" description="Promo banner" value="true">
    <div class="promo">🎉 Launch sale — 50% off this week only!</div>
  </vibe-flags-boolean>

  <div class="card">
    <vibe-flags-boolean name="newDashboard" description="New dashboard UI" value="false">
      ✨ New dashboard (experimental)
    </vibe-flags-boolean>
    <vibe-flags-boolean name="newDashboard" value="true">
      Classic dashboard
    </vibe-flags-boolean>
  </div>

  <vibe-flags-toolbar></vibe-flags-toolbar>
</body>
</html>`;

const presets = [
  { name: 'Boolean Flag', code: BOOLEAN_PRESET },
  { name: 'Select Flag', code: SELECT_PRESET },
  { name: 'Multiple Flags', code: MULTI_PRESET },
];

const embedEl = ref(null);
const activePreset = ref('Boolean Flag');
let vm = null;

const EMBED_OPTIONS = {
  height: 550,
  view: 'preview',
  hideExplorer: true,
  hideNavigation: true,
  hideDevTools: true,
  settings: {
    compile: {
      trigger: 'auto',
      action: 'refresh',
      clearConsole: false,
    },
  },
};

function makeProject(code) {
  return {
    title: 'Vibe Flags Playground',
    template: 'html',
    files: { 'index.html': code },
  };
}

function loadStackBlitzSDK() {
  return new Promise((resolve, reject) => {
    if (window.StackBlitzSDK) {
      resolve(window.StackBlitzSDK);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@stackblitz/sdk/bundles/sdk.umd.js';
    script.onload = () => resolve(window.StackBlitzSDK);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function loadPreset(preset) {
  activePreset.value = preset.name;
  if (vm) {
    await vm.applyFsDiff({ create: { 'index.html': preset.code }, destroy: [] });
  }
}

onMounted(async () => {
  const sdk = await loadStackBlitzSDK();
  vm = await sdk.embedProject(embedEl.value, makeProject(BOOLEAN_PRESET), EMBED_OPTIONS);
});
</script>

<style scoped>
.playground {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 24px 0;
}

.playground-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.playground-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.preset-btn {
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 13px;
  transition: background 0.15s, border-color 0.15s;
}

.preset-btn:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand);
}

.preset-btn.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.playground-embed {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}
</style>

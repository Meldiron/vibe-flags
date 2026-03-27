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
    <div class="playground-panels">
      <div class="playground-editor-panel">
        <div class="panel-header">HTML Editor</div>
        <textarea
          class="playground-editor"
          :value="code"
          @input="onInput"
          spellcheck="false"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
        />
      </div>
      <div class="playground-preview-panel">
        <div class="panel-header">Live Preview</div>
        <iframe
          ref="previewFrame"
          class="playground-preview"
          sandbox="allow-scripts allow-same-origin"
          title="Vibe Flags Playground Preview"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';

const BOOLEAN_PRESET = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 24px; background: #0d1117; color: #e6edf3; }
    .card { padding: 16px; background: #1c1f26; border-radius: 8px; margin-bottom: 12px; }
    .banner { padding: 16px; background: #1a3a5c; border: 1px solid #2d6a9f; border-radius: 8px; }
  </style>
  <script type="module" src="https://unpkg.com/@vibe-flags/core"><\/script>
</head>
<body>
  <h2>Boolean Flag Demo</h2>

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
  <style>
    body { font-family: sans-serif; padding: 24px; background: #0d1117; color: #e6edf3; }
    .theme-blue  { background: #1a3a5c; padding: 16px; border-radius: 8px; }
    .theme-green { background: #1a3a2a; padding: 16px; border-radius: 8px; }
    .theme-red   { background: #3a1a1a; padding: 16px; border-radius: 8px; }
  </style>
  <script type="module" src="https://unpkg.com/@vibe-flags/core"><\/script>
</head>
<body>
  <h2>Select Flag Demo</h2>
  <p>Switch themes using the toolbar on the right.</p>

  <vibe-flags-select name="theme" description="UI theme" value="blue" options="blue,green,red">
    <div class="theme-blue" data-value="blue">Blue theme is active</div>
    <div class="theme-green" data-value="green">Green theme is active</div>
    <div class="theme-red" data-value="red">Red theme is active</div>
  </vibe-flags-select>

  <vibe-flags-toolbar></vibe-flags-toolbar>
</body>
</html>`;

const MULTI_PRESET = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 24px; background: #0d1117; color: #e6edf3; }
    .card { padding: 16px; background: #1c1f26; border-radius: 8px; margin-bottom: 12px; }
    .promo { padding: 16px; background: #2a1a3a; border: 1px solid #7c3aed; border-radius: 8px; }
    .badge { display: inline-block; background: #7c3aed; color: white; padding: 2px 8px; border-radius: 99px; font-size: 12px; }
    .theme-compact h2 { font-size: 14px; }
  </style>
  <script type="module" src="https://unpkg.com/@vibe-flags/core"><\/script>
</head>
<body>
  <vibe-flags-select name="layout" description="Layout density" value="default" options="default,compact">
    <div data-value="default"><h2>My App <span class="badge">Beta</span></h2></div>
    <div data-value="compact" class="theme-compact"><h2>My App <span class="badge">Beta</span></h2></div>
  </vibe-flags-select>

  <vibe-flags-boolean name="promoBar" description="Promo banner" value="true">
    <div class="promo">🎉 Launch sale — 50% off this week only!</div>
  </vibe-flags-boolean>

  <div class="card">
    <vibe-flags-boolean name="newDashboard" description="New dashboard UI" value="false">
      ✨ New dashboard (experimental)
    </vibe-flags-boolean>
    <vibe-flags-boolean name="newDashboard" description="New dashboard UI" value="true" invert>
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

const code = ref(BOOLEAN_PRESET);
const activePreset = ref('Boolean Flag');
const previewFrame = ref(null);
let debounceTimer = null;

function updatePreview() {
  if (!previewFrame.value) return;
  const doc = previewFrame.value.contentDocument || previewFrame.value.contentWindow?.document;
  if (!doc) return;
  doc.open();
  doc.write(code.value);
  doc.close();
}

function onInput(e) {
  code.value = e.target.value;
  activePreset.value = null;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(updatePreview, 300);
}

function loadPreset(preset) {
  code.value = preset.code;
  activePreset.value = preset.name;
  nextTick(updatePreview);
}

onMounted(() => {
  nextTick(updatePreview);
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

.playground-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  min-height: 480px;
}

@media (max-width: 768px) {
  .playground-panels {
    grid-template-columns: 1fr;
    min-height: unset;
  }
}

.playground-editor-panel,
.playground-preview-panel {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.panel-header {
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.playground-editor {
  flex: 1;
  padding: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.6;
  border: none;
  resize: none;
  outline: none;
  tab-size: 2;
  min-height: 420px;
}

@media (max-width: 768px) {
  .playground-editor {
    min-height: 260px;
  }
}

.playground-preview {
  flex: 1;
  border: none;
  background: white;
  min-height: 420px;
}

@media (max-width: 768px) {
  .playground-preview {
    min-height: 320px;
  }
}
</style>

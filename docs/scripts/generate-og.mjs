/**
 * generate-og.mjs
 * Generates docs/public/og-image.png using satori + @resvg/resvg-js.
 * Run: node scripts/generate-og.mjs
 *
 * Layout: two-column — left: <vibe-flags /> title + subtitle, right: terminal code block
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, '../public/og-image.png');

// ---------- fonts ----------
const FONT_DIR = '/usr/lib/node_modules/openclaw/node_modules/pdfjs-dist/standard_fonts';
const fontBold = readFileSync(join(FONT_DIR, 'LiberationSans-Bold.ttf'));
const fontRegular = readFileSync(join(FONT_DIR, 'LiberationSans-Regular.ttf'));

// ---------- palette ----------
const INDIGO_LIGHT = '#818cf8';
const BG = '#0d0d14';
const TEXT_PRIMARY = '#f5f5f5';
const TEXT_MUTED = '#9ca3af';
const TEXT_DIM = '#6b7280';

// Code-block dark-mode colours (matching HomeLayout.vue)
const CB_BG = '#0d1117';
const CB_HEADER = '#161b22';
const CB_BORDER = '#21262d';
const CB_TEXT = '#e6edf3';
const CB_TAG = '#7dd3fc';
const CB_ATTR = '#c4b5fd';
const CB_STR = '#86efac';

const W = 1200;
const H = 630;
const PAD = 60;

// ---------- helpers ----------
function div(style, children) {
  return { type: 'div', props: { style: { display: 'flex', ...style }, children } };
}

function span(text, color, extra = {}) {
  return {
    type: 'span',
    props: {
      style: { color, fontFamily: 'Sans', ...extra },
      children: text,
    },
  };
}

// A single row of [text, color] token pairs for code display
function codeLine(tokens) {
  return div(
    { flexDirection: 'row', minHeight: 20 },
    tokens.map(([text, color]) =>
      span(text, color || CB_TEXT, { fontSize: 13, lineHeight: 1.6, fontWeight: 400 })
    )
  );
}

function macDot(color) {
  return div({ width: 12, height: 12, borderRadius: 6, background: color, marginRight: 7, flexShrink: 0 });
}

// ---------- code lines ----------
// Mirrors the terminal hero in HomeLayout.vue
const CODE = [
  [[`<script`, CB_TAG]],
  [['  type', CB_ATTR], ['=', CB_TEXT], ['"module"', CB_STR]],
  [['  src', CB_ATTR], ['=', CB_TEXT], ['"https://unpkg.com/@vibe-flags/core"', CB_STR]],
  [[`></`, CB_TAG], ['script', CB_TAG], [`>`, CB_TAG]],
  [['', CB_TEXT]],
  [[`<vibe-flag-boolean`, CB_TAG]],
  [['  name', CB_ATTR], ['=', CB_TEXT], ['"darkMode"', CB_STR]],
  [['  description', CB_ATTR], ['=', CB_TEXT], ['"Dark mode"', CB_STR], ['>', CB_TAG]],
  [[`</vibe-flag-boolean>`, CB_TAG]],
  [['', CB_TEXT]],
  [[`<vibe-toolbar`, CB_TAG], [`></vibe-toolbar>`, CB_TAG]],
];

// ---------- terminal block ----------
const terminal = div(
  {
    flexDirection: 'column',
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: CB_BORDER,
    overflow: 'hidden',
  },
  [
    // Window chrome header
    div(
      {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: CB_HEADER,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: CB_BORDER,
      },
      [
        div({ flexDirection: 'row', alignItems: 'center' }, [
          macDot('#ff5f57'),
          macDot('#febc2e'),
          macDot('#28c840'),
        ]),
        span('index.html', TEXT_DIM, { fontSize: 12, fontWeight: 400 }),
        div({ width: 60 }), // balance spacer so filename appears near-center
      ]
    ),
    // Code body
    div(
      {
        flexDirection: 'column',
        flex: 1,
        background: CB_BG,
        paddingTop: 22,
        paddingBottom: 22,
        paddingLeft: 24,
        paddingRight: 24,
      },
      CODE.map(tokens => codeLine(tokens))
    ),
  ]
);

// ---------- left column ----------
const leftCol = div(
  {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 460,
    paddingRight: 52,
  },
  [
    // Brand + subtitle
    div({ flexDirection: 'column' }, [
      // <vibe-flags />
      div(
        { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 30 },
        [
          span('<', INDIGO_LIGHT, { fontSize: 54, fontWeight: 700, lineHeight: 1 }),
          span('vibe-flags', TEXT_PRIMARY, { fontSize: 54, fontWeight: 700, lineHeight: 1, letterSpacing: -1 }),
          span(' />', INDIGO_LIGHT, { fontSize: 54, fontWeight: 700, lineHeight: 1 }),
        ]
      ),
      // Subtitle lines
      div({ flexDirection: 'column' }, [
        span('Feature flag toolkit for HTML.', TEXT_MUTED, { fontSize: 21, fontWeight: 400, lineHeight: 1.55, marginBottom: 2 }),
        span('No servers. No config. No build step.', TEXT_MUTED, { fontSize: 21, fontWeight: 400, lineHeight: 1.55, marginBottom: 2 }),
        span('Built for AI agents.', TEXT_MUTED, { fontSize: 21, fontWeight: 400, lineHeight: 1.55 }),
      ]),
    ]),

    // Domain
    span('https://vibe-flags.appwrite.network/', TEXT_DIM, { fontSize: 17, fontWeight: 400 }),
  ]
);

// ---------- root ----------
const tree = div(
  {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: W,
    height: H,
    background: BG,
    paddingTop: PAD,
    paddingBottom: PAD,
    paddingLeft: PAD,
    paddingRight: PAD,
  },
  [leftCol, terminal]
);

// ---------- render ----------
const svg = await satori(tree, {
  width: W,
  height: H,
  fonts: [
    { name: 'Sans', data: fontBold, weight: 700, style: 'normal' },
    { name: 'Sans', data: fontRegular, weight: 400, style: 'normal' },
  ],
});

const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
const png = resvg.render().asPng();
writeFileSync(OUTPUT, png);
console.log(`✓ og-image.png written to ${OUTPUT}`);

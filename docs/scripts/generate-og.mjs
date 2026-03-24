/**
 * generate-og.mjs
 * Generates docs/public/og-image.png using satori + @resvg/resvg-js.
 * Run: node scripts/generate-og.mjs
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

// ---------- flag icon as SVG data URL ----------
const FLAG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`;
const flagDataUrl = `data:image/svg+xml;base64,${Buffer.from(FLAG_SVG).toString('base64')}`;

// ---------- constants ----------
const W = 1200;
const H = 630;
const PAD = 88;
const INDIGO = '#6366f1';
const INDIGO_LIGHT = '#818cf8';
const BG = '#0d0d14';
const TEXT_PRIMARY = '#f5f5f5';
const TEXT_MUTED = '#9ca3af';
const TEXT_DIM = '#4b5563';
const PILL_BG = '#16162a';
const PILL_BORDER = '#2d2d52';

// Helper: flex div
function div(style, children) {
  return { type: 'div', props: { style: { display: 'flex', ...style }, children } };
}

// Helper: pill chip
function pill(label) {
  return div(
    {
      alignItems: 'center',
      padding: '10px 28px',
      borderRadius: '40px',
      background: PILL_BG,
      border: `1.5px solid ${PILL_BORDER}`,
      color: INDIGO_LIGHT,
      fontSize: 22,
      fontFamily: 'Sans',
      fontWeight: 400,
      marginRight: 16,
    },
    label
  );
}

// ---------- layout tree ----------
const tree = div(
  {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: W,
    height: H,
    background: BG,
    padding: PAD,
    fontFamily: 'Sans',
  },
  [
    // ── upper content ──────────────────────────────────────────────
    div({ flexDirection: 'column' }, [
      // Logo + wordmark row
      div({ flexDirection: 'row', alignItems: 'center', marginBottom: 36 }, [
        // Indigo badge
        div(
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: 88,
            height: 88,
            borderRadius: 20,
            background: INDIGO,
            marginRight: 28,
            flexShrink: 0,
          },
          {
            type: 'img',
            props: {
              src: flagDataUrl,
              width: 48,
              height: 48,
              style: { objectFit: 'contain' },
            },
          }
        ),
        // Word-mark
        {
          type: 'span',
          props: {
            style: {
              fontSize: 86,
              fontWeight: 700,
              color: TEXT_PRIMARY,
              letterSpacing: -2,
              lineHeight: 1,
              fontFamily: 'Sans',
            },
            children: 'Vibe Flags',
          },
        },
      ]),

      // Tagline
      {
        type: 'span',
        props: {
          style: {
            fontSize: 34,
            color: TEXT_MUTED,
            lineHeight: 1.45,
            fontFamily: 'Sans',
            fontWeight: 400,
          },
          children: 'Offline-first feature flags for vibe coding',
        },
      },

      // Accent bar
      div({
        width: 560,
        height: 3,
        borderRadius: 2,
        background: INDIGO,
        marginTop: 28,
        opacity: 0.7,
      }),
    ]),

    // ── bottom bar: pills + domain ─────────────────────────────────
    div({ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, [
      div({ flexDirection: 'row' }, [pill('Zero-config'), pill('No backend'), pill('AI-native')]),
      {
        type: 'span',
        props: {
          style: {
            fontSize: 22,
            color: TEXT_DIM,
            fontFamily: 'Sans',
            fontWeight: 400,
          },
          children: 'vibeflags.dev',
        },
      },
    ]),
  ]
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

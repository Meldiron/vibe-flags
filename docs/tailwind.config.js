import { createPreset } from "fumadocs-ui/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [createPreset()],
  content: [
    "./node_modules/fumadocs-ui/dist/**/*.js",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.{mdx,md}",
  ],
};

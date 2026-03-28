import { describe, it, expect, beforeEach } from "vitest";
import { fixture, html } from "@open-wc/testing";
import "../src/components/vibe-flag-select.js";
import "../src/components/vibe-flag-option.js";
import "../src/components/vibe-toolbar.js";
import { vibeFlagsStore } from "../src/store.js";

describe("<vibe-flags-select> switching via toolbar", () => {
  beforeEach(() => {
    localStorage.clear();
    vibeFlagsStore.reset();
  });

  it("option visibility changes when toolbar dropdown is used", async () => {
    const el = await fixture(html`
      <div>
        <vibe-flags-select name="hero" description="Hero">
          <vibe-flags-option value="v1"><div id="v1">V1</div></vibe-flags-option>
          <vibe-flags-option value="v2"><div id="v2">V2</div></vibe-flags-option>
          <vibe-flags-option value="v3"><div id="v3">V3</div></vibe-flags-option>
        </vibe-flags-select>
        <vibe-flags-toolbar></vibe-flags-toolbar>
      </div>
    `);

    await new Promise((r) => setTimeout(r, 50));

    const toolbar = el.querySelector("vibe-flags-toolbar")!;
    await toolbar.updateComplete;

    const options = el.querySelectorAll("vibe-flags-option");

    // Initial: v1 active
    expect(options[0].active).toBe(true);
    await options[0].updateComplete;
    expect(options[0].shadowRoot!.querySelector("slot")).not.toBeNull();

    // Simulate toolbar dropdown change (exactly what the toolbar does)
    const selectEl = toolbar.shadowRoot!.querySelector(".select") as HTMLSelectElement;

    // Change to v2 via the select element
    selectEl.value = "v2";
    selectEl.dispatchEvent(new Event("change"));

    await new Promise((r) => setTimeout(r, 50));
    await options[0].updateComplete;
    await options[1].updateComplete;

    expect(vibeFlagsStore.get("hero")).toBe("v2");
    expect(options[0].active).toBe(false);
    expect(options[1].active).toBe(true);
    expect(options[0].shadowRoot!.querySelector("slot")).toBeNull();
    expect(options[1].shadowRoot!.querySelector("slot")).not.toBeNull();
  });
});

# Comparison

How does Vibe Flags stack up against other feature flag solutions?

## Feature Comparison

| Feature | Vibe Flags | LaunchDarkly | Unleash | PostHog Feature Flags |
|---|---|---|---|---|
| **Setup complexity** | Drop in a `<script>` tag | SDK + account + project config | Self-host server + SDK | Account + SDK install |
| **Backend required** | No | Yes | Yes | Yes |
| **Authentication required** | No | Yes (API key) | Yes (API key) | Yes (API key) |
| **Pricing** | Free, open source | Paid (free tier limited) | Open source (cloud paid) | Free tier + paid plans |
| **Self-hosted option** | Yes (static files) | No | Yes | Yes |
| **localStorage persistence** | Yes (built-in) | No | No | No |
| **AI-friendly HTML API** | Yes (`<vibe-flags-boolean>`) | No | No | No |
| **Bundle size** | ~11KB gzipped | ~50KB+ | ~20KB+ | ~30KB+ |
| **Framework support** | Any (web components + React) | Any (multiple SDKs) | Any (multiple SDKs) | Any (multiple SDKs) |

## Where Vibe Flags Wins

**Zero config, instant setup.** No account, no API keys, no backend. Add one script tag and you're done:

```html
<script type="module" src="https://unpkg.com/@vibe-flags/core"></script>
<vibe-flags-boolean name="myFeature" value="true">
  <p>This content is behind a flag.</p>
</vibe-flags-boolean>
<vibe-flags-toolbar></vibe-flags-toolbar>
```

**AI-native HTML API.** Flags are declared in HTML — LLMs and AI coding agents can read, write, and toggle them without learning any SDK. The markup is self-documenting.

**Offline-first by design.** State lives in `localStorage`. No network calls, no latency, works in airplane mode.

**Tiny footprint.** ~11KB gzipped — suitable for landing pages, prototypes, and side projects where every byte counts.

**No vendor lock-in.** Open source, MIT licensed. There's no service to cancel or migrate away from.

## Where Enterprise Tools Win

LaunchDarkly, Unleash, and PostHog are built for production systems at scale. They offer things Vibe Flags intentionally does not:

- **Audit trails and history** — who changed what flag, when, and why.
- **Team management and permissions** — role-based access control across a large engineering org.
- **Analytics and experimentation** — A/B testing, conversion tracking, feature adoption metrics.
- **Targeting rules** — serve flags based on user attributes, cohorts, or percentages.
- **Server-side evaluation** — evaluate flags before rendering, useful for SSR or backend services.

If your use case involves production rollouts with gradual percentage-based targeting, user cohorts, or compliance requirements — use one of those tools.

## When to Use Vibe Flags

Vibe Flags is the right choice when:

- You are vibe-coding or prototyping and want flags without infrastructure.
- You are building a static site, demo, or playground.
- You want AI agents or LLMs to control feature flags directly in HTML.
- You need offline-first behavior with zero external dependencies.
- You want a free, open-source solution with no vendor relationship.

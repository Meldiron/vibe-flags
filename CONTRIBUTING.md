# Contributing to Vibe Flags

Thank you for your interest in contributing to Vibe Flags! We welcome contributions from the community and are excited to build this together.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/vibe-flags.git
   cd vibe-flags
   ```
3. **Install** dependencies:
   ```bash
   npm install -g pnpm
   pnpm install
   ```

## Development Setup

This is a pnpm monorepo. The main package lives in `packages/core`.

```bash
# Run tests
pnpm test

# Build the library
pnpm build

# Watch mode for tests
cd packages/core && pnpm test:watch

# Check formatting
pnpm format:check

# Run linter
pnpm lint
```

### Project Structure

```
vibe-flags/
├── packages/
│   └── core/           # @vibe-flags/core package
│       ├── src/        # Source files
│       └── test/       # Tests
└── docs/               # Documentation site
```

## How to Contribute

### Reporting Bugs

Before submitting a bug report, please:

1. Check the [existing issues](https://github.com/vibeflags/vibe-flags/issues) to avoid duplicates
2. Use the bug report template when opening a new issue
3. Include a minimal reproducible example

### Requesting Features

1. Check the [existing issues](https://github.com/vibeflags/vibe-flags/issues) for similar requests
2. Open an issue with the `enhancement` label
3. Describe the use case and why it would benefit the project

### Submitting Changes

1. Create a **new branch** from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
2. Make your changes
3. Write or update tests as needed
4. Ensure all checks pass locally before pushing:
   ```bash
   pnpm format:check
   pnpm lint
   pnpm test
   ```
5. Commit your changes (see [Commit Messages](#commit-messages))
6. Push to your fork and open a Pull Request

## Pull Request Process

1. **Target `main`** for all pull requests
2. **Fill out the PR template** completely
3. **Link related issues** using `Closes #123` in the PR description
4. **Ensure CI passes** — tests, build, and lint must all be green
5. **Request a review** — maintainers will review within a few days
6. **Address feedback** — respond to comments and push updates
7. **Squash commits** if requested before merging

PRs that do not pass CI or lack tests for new functionality will not be merged.

## Coding Standards

- **Language**: TypeScript — all source files must be `.ts`
- **Style**: Follow the existing code style; ESLint is configured
- **Types**: Prefer explicit types; avoid `any`
- **Tests**: New features require tests; bug fixes should include a regression test
- **Bundle size**: Be mindful of dependencies — this library aims to stay tiny
- **Compatibility**: Code must work in browser, Node.js, and edge runtimes

### Running the Linter

```bash
pnpm lint
```

### CI Checks

Every push and pull request runs three automated checks via GitHub Actions:

1. **Format check** — `pnpm format:check` (Prettier)
2. **Lint** — `pnpm lint` (ESLint)
3. **Test** — `pnpm test`

PRs will not be merged if any check fails. Run these locally before pushing to catch issues early.

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `chore`: Maintenance tasks (deps, build, config)
- `perf`: Performance improvements

**Examples:**

```
feat(core): add persistence option for flag store
fix(toolbar): prevent toolbar from rendering outside viewport
docs: update README with CDN usage example
```

## Questions?

Feel free to open a [Discussion](https://github.com/vibeflags/vibe-flags/discussions) for questions that aren't bug reports or feature requests.

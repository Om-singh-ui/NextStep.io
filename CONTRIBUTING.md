# Contributing to NextStep.io

Welcome, and thank you for your interest in contributing to NextStep.io!
We’re building a community-driven platform designed to empower learners, job-seekers, and developers and your contributions play a crucial role in shaping that vision.

This guide outlines how both new and experienced contributors can get involved: from reporting bugs and suggesting new features to improving documentation or contributing production-ready code. Whether you're fixing a typo or architecting a major feature, every contribution helps strengthen the NextStep.io ecosystem.
 **Audience:** developers, designers, writers, mentors, and community members who want to help make NextStep.io better.


## Table of contents

* [Code of Conduct](#code-of-conduct)
* [How can I contribute?](#how-can-i-contribute)

  * [Report a bug](#report-a-bug)
  * [Request a feature](#request-a-feature)
  * [Improve docs](#improve-docs)
  * [Submit code (PRs)](#submit-code-prs)
* [Getting started (local development)](#getting-started-local-development)
* [Branching & workflow](#branching--workflow)
* [Commit message convention](#commit-message-convention)
* [Coding style & linting](#coding-style--linting)
* [Testing](#testing)
* [Review process](#review-process)
* [Security & responsible disclosure](#security--responsible-disclosure)
* [License and copyright](#license-and-copyright)
* [Acknowledgements & contacts](#acknowledgements--contacts)

## Code of Conduct

This project follows a [**Contributor Covenant**](https://www.contributor-covenant.org/) (v2) — we expect all community members to be professional, respectful, and inclusive. By participating you agree to abide by this code. If you experience or witness unacceptable behavior, contact the maintainers immediately (see **Contacts** below).

## How can I contribute?

### Report a bug

1. Search existing issues to avoid duplicates.
2. Open a new issue and include:

   * A clear title (what's broken)
   * Steps to reproduce
   * Expected vs. actual behavior
   * Environment (OS, Node version, browser, device)
   * Relevant logs or screenshots

### Request a feature

1. Check if there's an open discussion or issue.
2. Create a feature-request issue with:

   * Problem statement
   * Proposed solution or user flow
   * Who benefits and why
   * Possible alternatives

### Improve docs

Docs improvements are the easiest way to start contributing.

* Fork the repo, make changes to `/docs` or the relevant markdown files.
* Add examples, clarify steps, or fix typos.
* Submit a PR referencing the issue (if any).

### Submit code (PRs)

1. Fork the repository and create a branch named like `feature/<short-description>` or `fix/<short-description>`.
2. Implement small, focused changes.
3. Add or update tests where applicable.
4. Run linters and tests locally.
5. Open a Pull Request against `master` and include:

   * A descriptive title
   * What problem the PR solves
   * Notes on migration, breaking changes, or runtime impact
   * Screenshots or screencasts for UI changes

## Getting started (local development)

> Assumes Node.js LTS and Git are installed.

```bash
# clone your fork
git clone https://github.com/Om-singh-ui/NextStep.io.git
cd NextStep.io

# install dependencies
npm install  

# run the dev server
npm dev

# run tests
npm test

# run linters
npm lint
```

Add any environment variables to `.env.local` based on `.env.example`. Do not commit secrets.

## Branching & workflow

We follow a simple feature-branch workflow:

* Create branches from `master`.
* Keep PRs small and focused.
* Use `master` as the production-ready branch; merges happen only after review and CI pass.

Branch name convention examples:

* `feature/auth-ui-improve`
* `fix/onboarding-redirect`
* `chore/deps-update`

## Commit message convention

We use concise, conventional-style commit messages. Examples:

```
feat(auth): add magic-link login
fix(onboarding): prevent re-onboarding for existing users
docs(readme): clarify setup steps
chore(deps): bump tailwind to v3.4
```

Good commits make change history readable and help with automated changelogs.

---

## Coding style & linting

* Tailwind CSS + shadcn/ui for UI components.
* React + Next.js where applicable.
* Run `npm lint` before opening a PR. Lint and formatting are enforced via Prettier + ESLint.

Accessibility:

* Aim for semantic HTML, keyboard accessibility, and color contrast that meets WCAG AA where possible.


## Testing

* Add unit tests for logic and integration tests for components where feasible.
* Run the full test suite with `npm test`.
* If adding new features, include tests that validate expected behavior.


## Review process

* PRs should have a clear description and link to the related issue (if any).
* Reviewers will check for correctness, tests, performance, and accessibility.
* Maintain a positive, educational review style — suggest improvements with examples.

Merge conditions:

* CI passing
* At least one approving review from a maintainer
* No unresolved conversations

## Security & responsible disclosure

If you discover a security vulnerability, **do not** open a public issue. Instead, email the maintainers at `security@nextstep.io` (or use the project's private security contact) with details. We will acknowledge receipt and coordinate a fix.

## License and copyright

By contributing you agree that your contributions will be licensed under the project's existing license (see `LICENSE`). If you have concerns, discuss them with the maintainers before submitting.

## Acknowledgements & contacts

* Maintainers: `@Om-sing-ui`, `@_`
* Mailing list / Discord / Slack: add links or invite here

If you need help or want to discuss a contribution idea, open an issue labelled `discussion` or contact a maintainer directly.

## Templates 

### Pull Request template

```md
<!-- Describe the change and why it is needed -->

## Related Issue
Closes #<issue-number>

## Proposed Changes
-
-

## Checklist
- [ ] I have read the contributing guidelines
- [ ] Tests added/updated
- [ ] Linting passes
- [ ] Documentation updated (if applicable)
```

### Issue template (bug)

```md
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1.
2.
3.

**Expected behavior**
A clear and concise description of what you expected to happen.

**Environment**
- OS:
- Node:
- Browser:
```

We appreciate your contribution to NextStep.io. Every improvement you make advances our mission, enhances our ecosystem, and supports a growing community of future-ready talent. 🚀

*Last updated: 2025-11-25*
-Om Singh

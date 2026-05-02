# Contributing to NextStep.io

Welcome, and thank you for your interest in contributing to **NextStep.io**!
We're building a community-driven platform designed to empower learners, job-seekers, and developers — and your contributions play a crucial role in shaping that vision.

This guide outlines how both new and experienced contributors can get involved: from reporting bugs and suggesting new features to improving documentation or contributing production-ready code. Whether you're fixing a typo or architecting a major feature, every contribution helps strengthen the NextStep.io ecosystem.

**Audience:** Developers, designers, writers, mentors, and community members who want to help make NextStep.io better.

[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen)](CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/Code%20of%20Conduct-Contributor%20Covenant-ff69b4)](CODE_OF_CONDUCT.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-181717?logo=github)](https://github.com/Om-singh-ui/NextStep.io/pulls)
[![First Timers Friendly](https://img.shields.io/badge/First_Timers-Friendly-blue)](https://github.com/Om-singh-ui/NextStep.io/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Report a Bug](#report-a-bug)
  - [Request a Feature](#request-a-feature)
  - [Improve Documentation](#improve-documentation)
  - [Submit Code (PRs)](#submit-code-prs)
- [Getting Started (Local Development)](#getting-started-local-development)
- [Project Structure](#project-structure)
- [Branching & Workflow](#branching--workflow)
- [Commit Message Convention](#commit-message-convention)
- [Coding Style & Linting](#coding-style--linting)
- [Testing](#testing)
- [Review Process](#review-process)
- [Security & Responsible Disclosure](#security--responsible-disclosure)
- [License and Copyright](#license-and-copyright)
- [Acknowledgements & Contacts](#acknowledgements--contacts)

## Code of Conduct

This project follows the [**Contributor Covenant**](https://www.contributor-covenant.org/) (v2.1) — we expect all community members to be professional, respectful, and inclusive. By participating, you agree to abide by this code. If you experience or witness unacceptable behavior, contact the maintainers immediately (see [Acknowledgements & Contacts](#acknowledgements--contacts)).

[![Code of Conduct](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa)](CODE_OF_CONDUCT.md)

## How Can I Contribute?

### Report a Bug

[![Bug Reports](https://img.shields.io/badge/Bug-Report-red)](https://github.com/Om-singh-ui/NextStep.io/issues/new?template=bug_report.md)

1. Search [existing issues](https://github.com/Om-singh-ui/NextStep.io/issues) to avoid duplicates
2. Use the bug report template when creating a new issue
3. Include the following:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots or screen recordings if applicable
   - Environment details (OS, browser, Node version)

### Request a Feature

[![Feature Requests](https://img.shields.io/badge/Feature-Request-blue)](https://github.com/Om-singh-ui/NextStep.io/issues/new?template=feature_request.md)

1. Search [existing feature requests](https://github.com/Om-singh-ui/NextStep.io/issues) to avoid duplicates
2. Use the feature request template
3. Describe:
   - The problem you're solving
   - Your proposed solution
   - Any alternatives you've considered
   - Potential impact on users

### Improve Documentation

[![Documentation](https://img.shields.io/badge/Docs-Improvement-success)](https://github.com/Om-singh-ui/NextStep.io/wiki)

- Fix typos, improve clarity, or add examples
- Create tutorials or guides for the community
- Submit changes via pull request with the `documentation` label

### Submit Code (PRs)

[![Pull Requests](https://img.shields.io/badge/Pull_Requests-Review-6f42c1)](https://github.com/Om-singh-ui/NextStep.io/pulls)

1. Fork the repository
2. Create a feature branch
3. Write clear, well-documented code
4. Add tests if applicable
5. Ensure all checks pass
6. Submit a pull request using the PR template

## Getting Started (Local Development)

[![Setup](https://img.shields.io/badge/Setup-Local_Development-0a0a0a)](https://github.com/Om-singh-ui/NextStep.io#installation)

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | 18+ |
| pnpm | 8+ |
| PostgreSQL | 15+ |

### Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/NextStep.io.git
cd NextStep.io

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env

# Setup database
pnpm prisma generate
pnpm prisma migrate dev

# Start development server
pnpm dev
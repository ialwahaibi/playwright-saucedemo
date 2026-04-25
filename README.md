# Playwright E2E Test Suite — SauceDemo

![CI](https://github.com/ialwahaibi/playwright-saucedemo/actions/workflows/playwright.yml/badge.svg)
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=ialwahaibi_playwright-saucedemo)](https://sonarcloud.io/summary/new_code?id=ialwahaibi_playwright-saucedemo)

End-to-end test automation for the SauceDemo storefront, built with Playwright
and continuously executed via GitHub Actions across Chromium, Firefox, and WebKit.

## Why this exists

Built as a reference implementation while preparing for a Manager — Automation
role. The objective was to demonstrate a production-grade Playwright setup
from scratch in a single weekend, including CI integration, multi-browser
execution, and proper failure artifacts.

## What's covered

- 5 E2E tests covering login (valid/invalid), product browsing,
  cart updates, and full checkout
- Multi-browser execution (Chromium, Firefox, WebKit)
- CI on every push and pull request via GitHub Actions
- HTML report uploaded as build artifact (30-day retention)
- Traces, screenshots, and video retained on failure
- Conservative retry strategy: 2 retries on CI, none locally

## Stack

- Playwright (TypeScript)
- GitHub Actions
- Node.js 20 LTS

## Running locally

```bash
npm ci
npx playwright install --with-deps
npx playwright test
npx playwright show-report
```

## Design decisions

- **Locator strategy**: prefer `getByRole` and `getByPlaceholder` over
  CSS selectors for resilience against DOM changes
- **Retry policy**: retries enabled only on CI to avoid masking real
  bugs during development
- **Artifacts**: traces and videos retained only on failure to keep
  storage costs low while preserving full reproduction of failures

## Author

Isehaq Al Wahaibi

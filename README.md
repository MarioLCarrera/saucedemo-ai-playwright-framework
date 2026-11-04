# SauceDemo AI Playwright Framework

[![Playwright Tests](https://github.com/MarioLCarrera/saucedemo-ai-playwright-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/MarioLCarrera/saucedemo-ai-playwright-framework/actions/workflows/playwright.yml)

End-to-end test automation framework for [SauceDemo](https://www.saucedemo.com), built with **Playwright and TypeScript**. Test design and implementation are done with AI assistance (Claude, GitHub Copilot), and every AI output is reviewed and verified against the real application before it is committed.

> **Status:** in progress. Login and inventory are covered. Cart, checkout and special users are next.

## 🧰 Tech stack

- Playwright + TypeScript (strict mode)
- Page Object Model
- GitHub Actions (CI)

## 📁 Project structure

```
├── .github/workflows/playwright.yml   # CI pipeline
├── docs/
│   ├── test-plan.md                   # Test cases, designed from user stories
│   └── ai-workflow.md                 # What the AI generated and what I corrected
├── src/
│   ├── data/users.ts                  # Typed test data
│   └── pages/                         # Page Objects (LoginPage, InventoryPage)
├── tests/
│   ├── auth/login.spec.ts
│   └── inventory/inventory.spec.ts
├── playwright.config.ts
└── tsconfig.json
```

## 🚀 Getting started

```bash
npm ci
npx playwright install
npx playwright test
```

Useful commands:

| Command | Purpose |
|---|---|
| `npx playwright test --ui` | Interactive mode with step-by-step view |
| `npx playwright test tests/auth` | Run a single folder or file |
| `npx playwright show-report` | Open the HTML report of the last run |
| `npm run typecheck` | Type-check the project |

Locally the browser opens with a short delay between actions so the flow can be followed. In CI (`CI=true`) it runs headless without delay.

## ✅ Test coverage

Cases come from [docs/test-plan.md](docs/test-plan.md).

| Area | Cases | Status |
|---|---|---|
| Login and session | L-01 to L-05, L-07 | Automated |
| Inventory and sorting | I-01 to I-03 | Automated |
| Logout | L-06 | Planned |
| Cart | C-01 to C-06 | Planned |
| Checkout | K-01 to K-07 | Planned |
| Special users (`problem_user`, `error_user`, ...) | P-01 to P-06 | Planned |

## 🧭 Design decisions

- **Page Object Model:** selectors live only in `src/pages`; tests describe behavior.
- **`data-test` attributes:** configured as the test id attribute, so locators use `getByTestId` and `getByRole` instead of CSS or XPath.
- **Expected data:** SauceDemo has no catalog API and its data is static, so expected values (such as the number of products) are written in the tests. If the catalog changes, the test should fail. In a dynamic system, I would take them from an API or from seeded data, never from the screen being tested.
- **Tests that can fail:** each assertion is checked by breaking it on purpose. For example, the A to Z sort test first switches to another order, because A to Z is already the default.
- **Web-first assertions:** auto-retrying assertions and a wait for the page to load before reading data, with no fixed waits.
- **Sort tests are independent from each other:** price tests check only prices (some products share a price) and name tests check only names.

## 🤖 AI-assisted workflow

The AI proposes and I review. [docs/ai-workflow.md](docs/ai-workflow.md) records, for each task, what was generated, what I changed and what I learned.
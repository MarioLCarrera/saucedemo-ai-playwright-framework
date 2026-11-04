# AI Workflow Log

How I use AI in this project: the AI proposes, I review, verify against the real application and correct. Each entry records what the AI generated and what I changed.

## 1. Test plan (docs/test-plan.md)

- **Tool:** Claude
- **What it generated:** a draft of 30 test cases across 5 areas (login, inventory, cart, checkout and special users), with priority and an automation recommendation.
- **What I corrected:**
  - The error messages were written approximately. I verified them on the real site and replaced them with the exact texts: the `Epic sadface:` prefix on login and `Error:` on checkout.
  - I added the exact expected result for L-02, L-03 and L-07.

## 2. Negative login tests (tests/auth/login.spec.ts)

- **Tool:** GitHub Copilot, with the test plan and the Page Object as context.
- **What it generated:** parameterized tests for L-02 to L-05, the direct-access test L-07, typed test data in `src/data/users.ts` and new methods in `LoginPage`.
- **What I corrected:** the first test had no ID. In `users.ts` I added a short description so the loop titles are clearer.
- **Proof the tests are useful:** I ran the tests with a wrong expected message to check that they fail.

## 3. Inventory and sorting tests (tests/inventory/inventory.spec.ts)

- **Tool:** GitHub Copilot, with the test plan, `LoginPage` and the test data as context. Claude was used to review the result.
- **What it generated:** `InventoryPage` and the tests for I-01 to I-03, with typed sort cases, the expected order calculated before sorting and prices compared as numbers.
- **What I corrected after the review:**
  - **Race condition:** reading the products did not wait for the catalog to load, so a fast read could return an empty list without any error. I added `expectLoaded()` and call it before reading.
  - **Price ties:** two products share the same price, so I check only prices in the price tests and only names in the name tests.
  - **Assertions that retry:** prices are now compared with `toHaveText`, which retries on its own, instead of reading them once and comparing with `toEqual` (which also had a redundant `await`).
  - **Selectors in the wrong place:** the locators used by I-01 moved from the spec into the Page Object.
  - **A test that could not fail:** A to Z is already the default order, so that case first switches to another order. Otherwise it would pass even if the dropdown did nothing.
  - **Small clean-ups:** one `parsePrice` function instead of two copies, and an unused locator removed.
- **Decision I made:** I kept the expected product count (6) written in the test instead of a shared constant. SauceDemo is a controlled site with a static catalog and no API, so a fixed value is the requirement. If the catalog changes, the test should fail. In a dynamic system I would take the expected value from an API or from seeded data, never from the screen under test.
- **Proof the tests are useful:** TO COMPLETE (10 repeated runs without retries, a sort case broken on purpose, and the result with `problem_user`).
- **What I learned:** TO COMPLETE.
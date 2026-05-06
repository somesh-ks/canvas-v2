# Testing

Tests live in `tests/` and are plain Node ES modules using `node:assert/strict`. There is no test runner configured in `package.json`.

## Running

Run a single test file:

```bash
node tests/appRoutes.test.js
```

Run the whole suite:

```bash
for f in tests/*.test.js; do node "$f" || exit 1; done
```

## Conventions

- Import the unit under test from `../src/lib/...` and assert with `node:assert/strict`.
- A successful test exits 0 with no thrown assertion. Failures throw and exit non-zero.
- Keep tests free of DOM/React dependencies — they run in plain Node, not a browser harness.

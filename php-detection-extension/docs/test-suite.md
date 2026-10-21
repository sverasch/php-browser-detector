# Test Suite

This document describes the test suite for the PHP Detector extension.

## Structure

```
tests/
├── unit/           # Unit tests for individual components
├── integration/    # Integration tests with known sites
└── fixtures/       # Test fixtures and mock data
```

## Unit Tests

Run unit tests:

```bash
npm run test
npm run test:watch
```

### Test Categories

#### Detection Methods
- `checkHeaders()`: Verify header parsing
- `checkFileExtensions()`: Verify URL pattern matching
- `checkResponsePatterns()`: Verify content analysis

#### Integration Tests

Run integration tests against known PHP sites:

```bash
jest tests/integration/known-sites.test.js
```

### Test Coverage

- Known PHP sites: php.net, WordPress.org, Drupal.org
- Known non-PHP sites: react.dev, nextjs.org
- Synthetic test pages for edge cases

## Test Fixtures

### PHP Info Page
```html
<!DOCTYPE html>
<html>
<head><title>PHP Info</title></head>
<body>
  <h1>PHP Version 8.2.0</h1>
</body>
</html>
```

### PHP Page with Parameters
```html
<a href="page.php?id=123">Link</a>
```

### Normal HTML Page
```html
<p>This page has no PHP indicators</p>
```

## Running Tests

### All Tests
```bash
npm test
```

### Specific Test File
```bash
jest tests/unit/detector.test.js
```

### With Coverage
```bash
npm test -- --coverage
```

## Adding New Tests

1. Create test file in appropriate directory
2. Use Jest's expect assertions
3. Include edge cases and error handling
4. Add documentation for complex test scenarios

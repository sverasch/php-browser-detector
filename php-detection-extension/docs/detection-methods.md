# Detection Methods

This document describes the detection methods used by the PHP Detector extension.

## 1. HTTP Headers

### X-Powered-By Header
PHP often exposes its version in the `X-Powered-By` header:
```
X-Powered-By: PHP/8.2.0
```

### Server Header
PHP may be indicated in the Server header:
```
Server: Apache/2.4.41 (Unix) PHP/8.2.0
```

**Confidence**: High (for X-Powered-By), Medium (for Server)

## 2. File Extensions

PHP files typically have `.php` extension:
```
https://example.com/page.php
https://example.com/admin/index.php?id=123
```

**Confidence**: High

## 3. Response Patterns

### PHP Info Page
```html
<title>PHP Info</title>
<h1>PHP Version 8.2.0</h1>
```

### PHP-Specific Patterns
- Session IDs in URLs: `PHPSESSID=...`
- PHP-specific HTML comments
- Default error pages

**Confidence**: High

## 4. Common Paths

Common PHP files that may be accessible:
- `phpinfo.php`
- `info.php`
- `test.php`
- `wp-admin/` (WordPress)

**Confidence**: Medium (requires active probing)

## Detection Algorithm

1. **Passive Detection**: Analyze available headers and content
2. **Active Probing** (optional): Send additional requests to common paths
3. **Combine Results**: Use multiple methods for higher confidence
4. **Conflict Resolution**: Default to PHP detected if any method suggests it

## False Positives/Negatives

### False Positives May Occur When
- Non-PHP servers mimic PHP headers
- Files have `.php` extension but aren't actually PHP
- Content Management Systems use PHP-like patterns

### False Negatives May Occur When
- PHP servers hide their presence
- Custom error pages mask PHP signatures
- Modern PHP deployments (serverless, containerized) hide headers

## Improvement Strategies

1. Use multiple detection methods for higher accuracy
2. Consider confidence scores for each detection
3. Allow user feedback to improve detection patterns
4. Maintain a database of known PHP signatures

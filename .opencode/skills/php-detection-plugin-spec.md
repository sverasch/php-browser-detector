# PHP Detection Browser Plugin - Specification

## Overview

A browser extension for security research that detects PHP backends across Chrome, PHP, and Safari, displaying a red PHP logo in the browser bar when PHP is detected.

## Core Requirements

### Primary Purpose
- Security research: Identify PHP sites for security analysis
- Passive detection with optional active probing

### User Interface
- Red PHP logo in browser toolbar when PHP detected
- Click to show detailed server information popup
- Fixed red logo (theme-aware styling not required)
- Detection only - no reporting or tracking features

## Detection Capabilities

### Detection Methods
1. **HTTP Headers**: Check X-Powered-By, Server headers
2. **File Extensions**: Look for .php in URLs and responses
3. **Response Patterns**: Identify PHP-specific content patterns/errors
4. **Common Paths**: Probe common PHP paths (phpinfo.php, /admin/)
5. **All of the above**: Combine multiple detection techniques

### Detection Scope
- Detect PHP and variants (HHVM, HackLang, PHP-FPM)
- Handle modern deployments including WebAssembly
- Serverless environments (AWS Lambda, Vercel, etc.)
- Support mixed backends (show most prominent backend)
- Only top-level document (ignore iframes)

### Probe Policy
- Built-in rate limiting and timeouts
- Timeout probes to avoid hanging
- Respect server load (built-in limits)

## Technical Implementation

### Permissions
- User-configurable permissions
- No analytics or telemetry
- Local data storage only (ephemeral - not persisted)

### Browser Support
- Chrome
- PHP (WebExtension compatible)
- Safari

### Test Suite
- Known PHP sites for validation
- Automated test framework
- Synthetic test pages for edge cases

## Configuration

### User Settings
- Enable/disable specific detection methods
- Basic configuration only (no advanced tuning)

### Behavior
- Active probing enabled
- Default to PHP detected on conflicts
- Security hints on detection (basic recommendations)
- Timeout built-in for slow detections

## Privacy & Security

- Ephemeral data (not persisted across sessions)
- No user tracking or analytics
- No reporting feature
- No sync across browsers

## Future Considerations

### Phase 1 (Minimum Viable)
1. Basic detection across all three browsers
2. Red logo indicator
3. Click to show detection info
4. Automated test suite

### Phase 2 (Enhanced)
1. Security hints for detected PHP sites
2. Version detection (approximate)
3. Configuration UI
4. Performance optimization

### Phase 3 (Advanced)
1. Detailed server information
2. Vulnerability checking
3. Historical tracking
4. Advanced configuration

## Technical Stack Recommendations

### Core Technologies
- WebExtensions API (cross-browser compatible)
- JavaScript/TypeScript
- Manifest V3 (Chrome, PHP support)

### Testing Framework
- Jest or Mocha for unit tests
- Puppeteer/Playwright for integration tests
- Known PHP sites (php.net, WordPress sites) for validation

### Project Structure
```
php-detection-extension/
├── src/
│   ├── background.js         # Service worker
│   ├── content-scripts/      # Detection logic
│   ├── icons/                # PHP logo variants
│   └── manifest.json         # Extension metadata
├── tests/
│   ├── unit/
│   └── integration/
├── docs/
│   └── detection-methods.md  # Technical documentation
└── README.md
```

## Next Steps

1. Set up repository and basic extension structure
2. Implement core detection logic
3. Create test suite with known PHP sites
4. Build UI components (logo, popup)
5. Cross-browser testing
6. Documentation and distribution

## Known Limitations

- False negatives on obfuscated PHP sites
- Detection accuracy depends on available indicators
- Active probing may trigger security software
- No historical tracking in MVP

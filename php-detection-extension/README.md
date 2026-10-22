# PHP Detector Browser Extension

A browser extension for security research that detects PHP backends across Chrome and Firefox.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

This extension helps security researchers identify PHP backends by analyzing HTTP headers, file extensions, response patterns, and more. When PHP is detected, a red PHP logo appears in the browser toolbar.

## Installation & Loading

Since this is a development version, you must load it as an "unpacked" extension.

### 🌐 Google Chrome / Microsoft Edge
1. Open the extensions page: `chrome://extensions` (or `edge://extensions`).
2. Enable **"Developer mode"** using the toggle in the top right corner.
3. Click the **"Load unpacked"** button.
4. Select the `php-detection-extension/src` directory.

### 🦊 Mozilla Firefox
1. Open the debugging page: `about:debugging#/runtime/this-firefox`.
2. Click the **"Load Temporary Add-on..."** button.
3. Navigate to the `php-detection-extension/src` folder and select the `manifest.json` file.
   *Note: Temporary add-ons are removed when Firefox is restarted.*

## How to Use

1. **Visit a website**: The extension automatically analyzes the site in the background.
2. **Check the Toolbar**: A red PHP logo will appear in your browser toolbar if PHP is detected.
3. **View Details**: Click the extension icon to open the popup and see:
   - Which detection methods were triggered.
   - The confidence level of the detection.
   - Specific indicators found.
   - Basic security recommendations for PHP environments.

## Features

- **Multi-method detection**: analyzes HTTP headers, file extensions, and response patterns.
- **Cross-browser support**: Fully compatible with Chrome and Firefox (Manifest V3).
- **Privacy-focused**: No analytics, no telemetry, and no user tracking. All detection happens locally in your browser.

## Development

### Prerequisites
- [Node.js](https://nodejs.org/)

### Setup & Build
```bash
# Install dependencies
npm install

# Build the extension
npm run build

# Run linting
npm run lint
```

### Testing
```bash
# Run the test suite
npm test

# Run tests in watch mode
npm run test:watch
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

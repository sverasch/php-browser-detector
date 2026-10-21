# PHP Browser Detector

A browser extension for security research that detects PHP backends across Chrome, Firefox, and Safari.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

This extension helps security researchers identify PHP backends by analyzing HTTP headers, file extensions, response patterns, and more. When PHP is detected, a red PHP logo appears in the browser toolbar.

## How to Use

### Installation

#### For Development/Testing

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sverasch/php-browser-detector.git
   cd php-browser-detector
   ```

2. **Load the extension in your browser:**

   **Chrome/Edge:**
   - Open `chrome://extensions`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `php-detection-extension` folder

   **Firefox:**
   - Open `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on..."
   - Select the `php-detection-extension/manifest.json` file

   **Safari:**
   - Enable Develop menu: Safari > Settings > Advanced > Show Develop menu
   - Develop > Show Extension Builder
   - Click "+" to add a new extension
   - Select the `php-detection-extension` folder

3. **The extension is now active!** Visit any website to see the detection in action.

### Basic Usage

1. **Visit a website** - The extension automatically detects PHP in the background
2. **Look for the red PHP logo** in your browser toolbar when PHP is detected
3. **Click the icon** to see detailed detection information:
   - Detection methods used
   - Confidence level
   - Detected indicators
   - Detection timestamp

4. **Security hints** - When PHP is detected, you'll see basic security recommendations

### Manual Detection

To manually trigger detection on a page:
1. Click the PHP detector icon in your toolbar
2. The popup will show current detection results

## Detection Methods

The extension uses multiple methods to detect PHP:

1. **HTTP Headers** - Checks `X-Powered-By` and `Server` headers
2. **File Extensions** - Looks for `.php` in URLs
3. **Response Patterns** - Identifies PHP-specific content and error pages
4. **Common Paths** - Probes typical PHP files (with user permission)

## Configuration

The extension currently runs automatically. Future versions will allow:
- Enable/disable specific detection methods
- Adjust detection sensitivity
- Configure active probing behavior

## Browser Support

- ✅ Chrome 88+
- ✅ Firefox 79+
- ✅ Safari 14+

## Building from Source

```bash
cd php-detection-extension
npm install
```

## Testing

```bash
cd php-detection-extension
npm test
```

## Privacy

- No analytics or telemetry
- Ephemeral data storage (not persisted)
- No user tracking
- All detection happens locally in your browser

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Detection methods based on common PHP deployment patterns
- Uses standard WebExtensions API for cross-browser compatibility

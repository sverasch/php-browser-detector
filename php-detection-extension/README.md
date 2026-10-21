# PHP Detector Browser Extension

A browser extension for security research that detects PHP backends across Chrome, Firefox, and Safari.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

This extension helps security researchers identify PHP backends by analyzing HTTP headers, file extensions, response patterns, and more. When PHP is detected, a red PHP logo appears in the browser toolbar.

## How to Use

### Installation

#### For Development/Testing

1. **Load the extension in your browser:**

   **Chrome/Edge:**
   - Open `chrome://extensions`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the extension directory

   **Firefox:**
   - Open `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on..."
   - Select the `manifest.json` file in this directory

   **Safari:**
   - Enable Develop menu: Safari > Settings > Advanced > Show Develop menu
   - Develop > Show Extension Builder
   - Click "+" to add a new extension
   - Select this extension directory

2. **The extension is now active!** Visit any website to see the detection in action.

### Basic Usage

1. **Visit a website** - The extension automatically detects PHP in the background
2. **Look for the red PHP logo** in your browser toolbar when PHP is detected
3. **Click the icon** to see detailed detection information:
   - Detection methods used
   - Confidence level
   - Detected indicators
   - Detection timestamp

4. **Security hints** - When PHP is detected, you'll see basic security recommendations

## Features

- **Multi-method detection**: HTTP headers, file extensions, response patterns
- **Cross-browser support**: Chrome, Firefox, Safari
- **Active probing**: Additional detection techniques when needed
- **Security hints**: Basic recommendations for detected PHP sites
- **Ephemeral storage**: No tracking, local detection only

## Building

```bash
npm install
npm run build
```

## Testing

## Testing

Run the test suite:

```bash
npm test
npm run test:watch
```

### Test Coverage

The extension includes:

- **Unit tests**: Detection logic for each method
- **Integration tests**: Known PHP site validation
- **Synthetic tests**: Custom test cases

## Usage

1. **Automatic Detection** - The extension runs automatically when you visit a page
2. **Check the toolbar** - Look for the red PHP logo when PHP is detected
3. **View details** - Click the icon to see detection methods and confidence level
4. **Security hints** - Review basic security recommendations for PHP sites

## Configuration

Basic settings are available through the extension popup:

- Enable/disable detection methods
- View detection details

## Privacy

- No analytics or telemetry
- Ephemeral data storage (not persisted)
- No user tracking
- All detection happens locally in your browser

## Building

```bash
npm install
npm run build
```

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- PHP logo and branding used for detection purposes
- Detection methods based on common PHP deployment patterns

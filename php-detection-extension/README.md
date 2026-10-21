# PHP Detector Browser Extension

A browser extension for security research that detects PHP backends across Chrome, PHP, and Safari.

## Overview

This extension helps security researchers identify PHP backends by analyzing HTTP headers, file extensions, response patterns, and more. When PHP is detected, a red PHP logo appears in the browser toolbar.

## Features

- **Multi-method detection**: HTTP headers, file extensions, response patterns
- **Cross-browser support**: Chrome, PHP, Safari
- **Active probing**: Additional detection techniques when needed
- **Security hints**: Basic recommendations for detected PHP sites
- **Ephemeral storage**: No tracking, local detection only

## Installation

### For Development

1. Clone this repository
2. Open your browser's extension management page (e.g., `chrome://extensions`)
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the extension directory

### Building

```bash
npm install
npm run build
```

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

## Detection Methods

1. **HTTP Headers**: Check X-Powered-By, Server headers
2. **File Extensions**: Look for .php in URLs
3. **Response Patterns**: Identify PHP-specific content
4. **Common Paths**: Probe typical PHP files

## Configuration

Basic settings are available through the extension popup:

- Enable/disable detection methods
- View detection details

## Privacy

- No analytics or telemetry
- Ephemeral data storage
- No user tracking
- Local detection only

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

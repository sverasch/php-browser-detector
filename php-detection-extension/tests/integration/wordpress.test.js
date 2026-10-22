/**
 * Integration tests for PHP Detector
 * Simulating common CMS patterns like WordPress
 */
const { detectPHP } = require('../../src/content-scripts/detector');

describe('WordPress Detection Simulation', () => {
  const mockDocument = (html) => ({
    documentElement: {
      outerHTML: html
    }
  });

  it('should detect WordPress via typical WP-specific content indicators', async () => {
    // WordPress often includes references to wp-content, wp-includes in HTML
    // Although the current detector doesn't specifically check for "wp-content" yet,
    // we can test if it handles a page that might have PHP extensions or headers.
    
    const url = 'https://wordpress.org/blog/index.php'; 
    const html = `
      <html>
        <head><title>WordPress Blog</title></head>
        <body>
          <link rel="stylesheet" href="/wp-content/themes/twentytwentyfour/style.css">
          <script src="/wp-includes/js/jquery/jquery.min.js"></script>
        </body>
      </html>
    `;
    const headers = [
      { name: 'X-Powered-By', value: 'PHP/8.1.0' },
      { name: 'Server', value: 'Apache' }
    ];

    const result = await detectPHP(url, mockDocument(html), headers);

    expect(result.isPHP).toBe(true);
    expect(result.confidence).toBe('high');
    // Should be detected by both headers and file extension (.php)
    expect(result.methods.some(m => m.method === 'headers')).toBe(true);
    expect(result.methods.some(m => m.method === 'fileExtensions')).toBe(true);
  });

  it('should detect WordPress even without .php extension if headers are present', async () => {
    const url = 'https://example.com/wp-admin/'; 
    const html = `<html><body>WordPress Admin</body></html>`;
    const headers = [
      { name: 'X-Powered-By', value: 'PHP/7.4.33' }
    ];

    const result = await detectPHP(url, mockDocument(html), headers);

    expect(result.isPHP).toBe(true);
    expect(result.methods.some(m => m.method === 'headers')).toBe(true);
  });

  it('should not flag a static HTML site as WordPress/PHP', async () => {
    const url = 'https://example.com/about';
    const html = `<html><body>About Us - Static Site</body></html>`;
    const headers = [
      { name: 'Server', value: 'nginx' },
      { name: 'Content-Type', value: 'text/html' }
    ];

    const result = await detectPHP(url, mockDocument(html), headers);

    expect(result.isPHP).toBe(false);
  });
});

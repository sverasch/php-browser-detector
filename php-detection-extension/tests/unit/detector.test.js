/**
 * Tests for PHP Detector
 */
const { detectPHP, detectionMethods } = require('../../src/content-scripts/detector');

describe('PHP Detection Methods', () => {
  describe('checkHeaders', () => {
    it('should detect PHP in X-Powered-By header', () => {
      const headers = [
        { name: 'X-Powered-By', value: 'PHP/8.2.0' },
        { name: 'Server', value: 'Apache/2.4.41' }
      ];
      
      const result = detectionMethods.checkHeaders(headers);
      
      expect(result).not.toBeNull();
      expect(result.method).toBe('headers');
      expect(result.confidence).toBe('high');
    });
    
    it('should detect PHP in Server header', () => {
      const headers = [
        { name: 'Server', value: 'nginx/1.18.0 (PHP/8.2.0)' }
      ];
      
      const result = detectionMethods.checkHeaders(headers);
      
      expect(result).not.toBeNull();
      expect(result.method).toBe('headers');
      expect(result.confidence).toBe('medium');
    });
    
    it('should return null when no PHP headers found', () => {
      const headers = [
        { name: 'Server', value: 'nginx/1.18.0' },
        { name: 'X-Powered-By', value: 'Express' }
      ];
      
      const result = detectionMethods.checkHeaders(headers);
      
      expect(result).toBeNull();
    });
    
    it('should handle null headers', () => {
      const result = detectionMethods.checkHeaders(null);
      expect(result).toBeNull();
    });
  });
  
  describe('checkFileExtensions', () => {
    it('should detect PHP file in URL', () => {
      const url = 'https://example.com/page.php';
      const result = detectionMethods.checkFileExtensions(url);
      
      expect(result).not.toBeNull();
      expect(result.method).toBe('fileExtensions');
      expect(result.confidence).toBe('high');
    });
    
    it('should detect PHP with query parameters', () => {
      const url = 'https://example.com/page.php?id=123';
      const result = detectionMethods.checkFileExtensions(url);
      
      expect(result).not.toBeNull();
    });
    
    it('should not detect non-PHP URLs', () => {
      const url = 'https://example.com/page.html';
      const result = detectionMethods.checkFileExtensions(url);
      
      expect(result).toBeNull();
    });
  });
  
  describe('checkResponsePatterns', () => {
    it('should detect PHP info page', () => {
      const document = {
        documentElement: {
          outerHTML: '<html><head><title>PHP Info</title></head><body></body></html>'
        }
      };
      
      const result = detectionMethods.checkResponsePatterns(document);
      
      expect(result).not.toBeNull();
      expect(result.method).toBe('responsePatterns');
    });
  });
});

describe('detectPHP', () => {
  it('should return PHP detected when any method finds indicators', async () => {
    const url = 'https://example.com/page.php';
    const document = { documentElement: { outerHTML: '<html></html>' } };
    const headers = [{ name: 'X-Powered-By', value: 'PHP/8.2.0' }];
    
    const result = await detectPHP(url, document, headers);
    
    expect(result.isPHP).toBe(true);
    expect(result.methods.length).toBeGreaterThan(0);
  });
  
  it('should return not PHP when no methods find indicators', async () => {
    const url = 'https://example.com/page.html';
    const document = { documentElement: { outerHTML: '<html></html>' } };
    const headers = [{ name: 'Server', value: 'nginx/1.18.0' }];
    
    const result = await detectPHP(url, document, headers);
    
    expect(result.isPHP).toBe(false);
  });
});

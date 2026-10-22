/**
 * PHP Detector - Content Script
 * Detection logic for identifying PHP backends
 */

// Detection methods
const detectionMethods = {
  // Check HTTP headers for PHP indicators
  checkHeaders: (responseHeaders) => {
    if (!responseHeaders) return null;
    
    for (const header of responseHeaders) {
      if (header.name.toLowerCase() === 'x-powered-by' && 
          header.value.toLowerCase().includes('php')) {
        return { method: 'headers', confidence: 'high', details: header };
      }
      if (header.name.toLowerCase() === 'server' && 
          header.value.toLowerCase().includes('php')) {
        return { method: 'headers', confidence: 'medium', details: header };
      }
    }
    return null;
  },
  
  // Check URL for PHP file extensions
  checkFileExtensions: (url) => {
    const phpExtensions = /\.php(\?|#|$)/i;
    if (phpExtensions.test(url)) {
      return { method: 'fileExtensions', confidence: 'high', details: { url } };
    }
    return null;
  },
  
  // Check response content for PHP patterns
  checkResponsePatterns: (document) => {
    const phpPatterns = [
      /<title>PHP\s*(info|info.*)<\/title>/i,
      /<h1>PHP Version/i,
      /PHP Extension\s*(\d+)/i,
      /<title>PHP\s*\\?@/i,
      /<a href="[^"]*\?PHP[A-Z0-9]+=/i,
      /wp-content\/.*\.php/i,
      /wp-includes\/.*\.php/i,
      /<\/body>\s*<!--\s*PHP\s*detected\s*-->/i
    ];
    
    const html = document.documentElement.outerHTML;

    for (const pattern of phpPatterns) {
      if (pattern.test(html)) {
        return { method: 'responsePatterns', confidence: 'high', pattern: pattern.source };
      }
    }
    return null;
  },
  
  // Check for common PHP paths (would require additional probing)
  checkCommonPaths: async (url) => {
    const commonPaths = [
      'phpinfo.php',
      'php-info.php',
      'info.php',
      'test.php',
      'wp-admin/'
    ];
    
    // This would be implemented with fetch requests
    // For now, just return null (active probing handled separately)
    return null;
  }
};

// Main detection function
async function detectPHP(url, document, responseHeaders) {
  const results = [];
  
  // Run all detection methods
  const headerResult = detectionMethods.checkHeaders(responseHeaders);
  if (headerResult) results.push(headerResult);
  
  const fileExtResult = detectionMethods.checkFileExtensions(url);
  if (fileExtResult) results.push(fileExtResult);
  
  const patternResult = detectionMethods.checkResponsePatterns(document);
  if (patternResult) results.push(patternResult);
  
  // Check if we found any PHP indicators
  if (results.length > 0) {
    // Calculate overall confidence
    const hasHighConfidence = results.some(r => r.confidence === 'high');
    const overallConfidence = hasHighConfidence ? 'high' : 'medium';
    
    return {
      isPHP: true,
      confidence: overallConfidence,
      methods: results,
      timestamp: Date.now()
    };
  }
  
  // If no indicators found, could do active probing here
  return {
    isPHP: false,
    confidence: 'none',
    methods: [],
    timestamp: Date.now()
  };
}

// Execute detection on page load
function executeDetection() {
  const url = window.location.href;
  const document = window.document;
  
  // Get response headers from performance entries
  const responseHeaders = getResponseHeaders();
  
  detectPHP(url, document, responseHeaders)
    .then(result => {
      console.log('PHP Detection result:', result);
      
      // Send result to background script
      chrome.runtime.sendMessage({
        action: 'detectionResult',
        url: url,
        result: result
      });
    })
    .catch(error => {
      console.error('PHP Detection error:', error);
    });
}

// Helper function to get response headers
function getResponseHeaders() {
  try {
    const performanceEntries = performance.getEntriesByType('navigation');
    if (performanceEntries.length > 0) {
      // Note: This is a simplified approach
      // Actual header access may require different methods
      return null;
    }
  } catch (e) {
    console.error('Error getting response headers:', e);
  }
  return null;
}

// Run detection after page loads
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', executeDetection);
  } else {
    executeDetection();
  }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { detectPHP, detectionMethods };
}

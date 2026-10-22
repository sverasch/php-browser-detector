/**
 * PHP Detector - Background Script
 * Service worker for managing extension state and communication
 */

console.log('PHP Detector: Background script loaded');

// Extension state
const state = {
  detectionEnabled: true,
  detectionMethods: {
    headers: true,
    fileExtensions: true,
    responsePatterns: true,
    commonPaths: true
  },
  timeout: 5000,
  lastDetections: {} // Store results per tabId: { url: string, result: object }
};

// Message listener for communication with content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkPHP') {
    sendResponse({ status: 'checking', timestamp: Date.now() });
  } else if (request.action === 'getSettings') {
    sendResponse({ settings: state });
  } else if (request.action === 'detectionResult') {
    console.log('Received detection result for', request.url, request.result);
    
    // Store the result for the tab that sent it
    if (sender.tab) {
      state.lastDetections[sender.tab.id] = {
        url: request.url,
        result: request.result
      };
    }

    if (request.result.isPHP) {
      // Update the extension icon to show PHP was detected
      chrome.action.setIcon({
        path: {
          "16": "icons/php-16.png",
          "32": "icons/php-32.png",
          "48": "icons/php-48.png",
          "128": "icons/php-128.png"
        }
      });
      
      // Optional: Set a badge text like "PHP"
      chrome.action.setBadgeText({ text: 'PHP' });
      chrome.action.setBadgeBackgroundColor({ color: '#777BB4' });
    } else {
      // Reset to default icon/badge if not PHP
      chrome.action.setBadgeText({ text: '' });
    }
    sendResponse({ status: 'received' });
  } else if (request.action === 'getDetectionForTab') {
    const tabId = request.tabId;
    sendResponse({ 
      result: state.lastDetections[tabId]?.result || null,
      url: state.lastDetections[tabId]?.url || 'Unknown'
    });
  }
});

// Handle extension installation/updates
chrome.runtime.onInstalled.addListener((details) => {
  console.log('PHP Detector installed/updated:', details.reason);
  
  if (details.reason === 'install') {
    // Set default settings on first install
    chrome.storage.local.set({ phpDetectorSettings: state });
  }
});

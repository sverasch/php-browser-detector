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
  timeout: 5000
};

// Message listener for communication with content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkPHP') {
    sendResponse({ status: 'checking', timestamp: Date.now() });
  } else if (request.action === 'getSettings') {
    sendResponse({ settings: state });
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

/**
 * PHP Detector - Popup Script
 * Handles displaying detection results to the user
 */

async function updatePopup() {
  const statusEl = document.getElementById('status');
  const infoPanel = document.getElementById('infoPanel');
  const urlEl = document.getElementById('url');
  const methodEl = document.getElementById('detectionMethod');
  const methodsList = document.getElementById('methodsList');
  const timeEl = document.getElementById('detectionTime');
  const securityHint = document.getElementById('securityHint');
  const error = document.getElementById('error');

  try {
    // 1. Get the current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // 2. Ask background script for the latest detection result for this tab
    const response = await chrome.runtime.sendMessage({ 
      action: 'getDetectionForTab', 
      tabId: tab.id 
    });

    if (!response || !response.result) {
      statusEl.textContent = 'No detection data available';
      // Instead of showing a hard error, show that it's still checking or just not detected
      if (response && response.result === null) {
        statusEl.textContent = 'No PHP Detected';
        statusEl.className = 'status not-php';
        infoPanel.style.display = 'none';
        securityHint.style.display = 'none';
      } else {
        error.style.display = 'block';
      }
      return;
    }

    const { result, url } = response;
    urlEl.textContent = url;

    if (result.isPHP) {
      statusEl.textContent = 'PHP Detected';
      statusEl.className = 'status php';
      
      infoPanel.style.display = 'block';
      securityHint.style.display = 'block';
      
      const highConfidenceMethods = result.methods.filter(m => m.confidence === 'high');
      methodEl.textContent = highConfidenceMethods.length > 0 
        ? highConfidenceMethods[0].method 
        : result.methods[0]?.method || 'Multiple';
      
      methodsList.innerHTML = result.methods
        .map(m => `<li>
          <span class="method-name">${m.method}</span>
          <span class="method-conf">${m.confidence.toUpperCase()} confidence</span>
        </li>`)
        .join('');
      
      const time = new Date(result.timestamp);
      timeEl.textContent = time.toLocaleTimeString();
    } else {
      statusEl.textContent = 'No PHP Detected';
      statusEl.className = 'status not-php';
      infoPanel.style.display = 'none';
      securityHint.style.display = 'none';
    }
  } catch (e) {
    console.error('Popup error:', e);
    statusEl.textContent = 'Error loading results';
    error.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', updatePopup);

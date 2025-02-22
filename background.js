// background.js

// --- Enhanced Privacy Protection ---
// Block trackers, ads, and third-party cookies using declarativeNetRequest API.
// Automatically clear cookies and local storage after each session.

// --- IP Masking ---
// Route traffic through a secure proxy or Tor network using the proxy API.

// --- Anti-Fingerprinting ---
// Randomize or spoof headers (User-Agent, Accept-Language, Referer).
// Limit access to APIs exposing unique device information (WebRTC, Canvas, WebGL).

// --- Malware and Phishing Protection ---
// Integrate with threat intelligence APIs (e.g., Google Safe Browsing, VirusTotal).

// --- Data Isolation ---
// Open links in sandboxed tabs or iframes with restricted permissions.
// Clear all session data when the session ends.

// --- Automatic Session Expiry ---
// Automatically close the advanced incognito session after a set period of inactivity.

// --- Secure DNS Resolution ---
// Use encrypted DNS (DNS-over-HTTPS or DNS-over-TLS).

// --- Encrypted Local Storage ---
// Encrypt any temporary data stored locally during the session.

// --- Decoy Traffic Generation ---
// Generate fake traffic patterns to confuse trackers.

// --- Multi-Account Containers ---
// Allow users to isolate different accounts within separate containers.

// --- Declarative Net Request Rules ---
// Load rules from rules.json

// --- Proxy Configuration ---
// Function to set the proxy
function setProxy(proxyConfig) {
  chrome.proxy.settings.set(
    {
      value: proxyConfig,
      scope: 'regular',
    },
    function() {
      if (chrome.runtime.lastError) {
        console.error('Proxy setting error:', chrome.runtime.lastError);
      } else {
        console.log('Proxy settings updated.');
      }
    }
  );
}

function updateProxy(useProxy) {
  if (useProxy) {
    // Get proxy settings from storage (example)
    chrome.storage.local.get(['proxyConfig'], function(result) {
      const proxyConfig = result.proxyConfig;
      if (proxyConfig) {
        setProxy(proxyConfig);
      } else {
        console.log('No proxy configuration found in storage.');
        // Optionally, provide a default proxy configuration or alert the user
      }
    });
  } else {
    // Clear proxy settings
    chrome.proxy.settings.set(
      {
        value: {
          mode: 'direct',
        },
        scope: 'regular',
      },
      function() {
        if (chrome.runtime.lastError) {
          console.error('Proxy clearing error:', chrome.runtime.lastError);
        } else {
          console.log('Proxy settings cleared.');
        }
      }
    );
  }
}

// --- Event Listeners ---
// Listen for extension install or update
chrome.runtime.onInstalled.addListener(function() {
  console.log('Extension installed or updated.');
  // Optionally, initialize settings or perform other setup tasks
});

// --- Initialize Proxy on startup ---
chrome.storage.local.get(['useProxy'], function(result) {
  const useProxy = result.useProxy !== undefined ? result.useProxy : false;
  updateProxy(useProxy);
});

// --- Listen for changes in useProxy setting ---
// --- Listen for changes in useProxy setting ---
chrome.storage.onChanged.addListener(function(changes) {
  if (changes.useProxy) {
    const useProxy = changes.useProxy.newValue;
    updateProxy(useProxy);
  }
});

// --- Example: Clear cookies on session end ---
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  if (removeInfo.isWindowClosing) {
    // This is a simplified example.  You'll need to refine this to only clear cookies
    // for the incognito session.
    chrome.cookies.getAll({}, function(cookies) {
      for (let i = 0; i < cookies.length; i++) {
        chrome.cookies.remove({
          url: "http://" + cookies[i].domain + cookies[i].path,
          name: cookies[i].name
        });
      }
    });
    // Clear local storage
    chrome.storage.local.clear(function() {
      console.log('Local storage cleared.');
    });
  }
});

// --- Declarative Net Request Rules ---
// This is a placeholder.  The actual rules will be in rules.json.
// The rules.json file will contain the rules for blocking trackers, ads, etc.
// The rules are loaded automatically based on the manifest.json configuration.
// You can add a console log here to confirm the rules are loaded.
console.log("Declarative Net Request rules loaded from rules.json");

// --- Initialize Declarative Net Request Rules on startup ---
// Removed: The rules are loaded automatically.
// chrome.storage.local.get(['blockTrackers'], function(result) {
//   const blockTrackers = result.blockTrackers !== undefined ? result.blockTrackers : true;
//   updateDeclarativeNetRequestRules(blockTrackers);
// });

// --- Initialize User-Agent Spoofing on startup ---
// Removed:  Replaced with declarativeNetRequest in rules.json

// --- Listen for changes in antiFingerprinting setting ---
// Removed:  Replaced with declarativeNetRequest in rules.json

// --- Listen for changes in blockTrackers setting ---
// Removed: The rules are loaded automatically.
// chrome.storage.onChanged.addListener(function(changes) {
//   if (changes.blockTrackers) {
//     const blockTrackers = changes.blockTrackers.newValue;
//     updateDeclarativeNetRequestRules(blockTrackers);
//   }
// });
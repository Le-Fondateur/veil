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
    chrome.storage.local.get(['proxyConfig'], function(result) {
      const proxyConfig = result.proxyConfig;
      if (proxyConfig) {
        setProxy(proxyConfig);
      } else {
        console.log('No proxy configuration found in storage.');
        // Optionally a default proxy configuration or alert the user
      }
    });
  } else {
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
chrome.runtime.onInstalled.addListener(function() {
  console.log('Extension installed or updated.');
});

// --- Initialize Proxy on startup ---
chrome.storage.local.get(['useProxy'], function(result) {
  const useProxy = result.useProxy !== undefined ? result.useProxy : false;
  updateProxy(useProxy);
});

// --- Listen for changes in useProxy setting ---
chrome.storage.onChanged.addListener(function(changes) {
  if (changes.useProxy) {
    const useProxy = changes.useProxy.newValue;
    updateProxy(useProxy);
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  if (removeInfo.isWindowClosing) {
    chrome.cookies.getAll({}, function(cookies) {
      for (let i = 0; i < cookies.length; i++) {
        chrome.cookies.remove({
          url: "http://" + cookies[i].domain + cookies[i].path,
          name: cookies[i].name
        });
      }
    });
    chrome.storage.local.clear(function() {
      console.log('Local storage cleared.');
    });
  }
});

console.log("Declarative Net Request rules loaded from rules.json");

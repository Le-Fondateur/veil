document.addEventListener('DOMContentLoaded', function() {

  const blockTrackersCheckbox = document.getElementById('blockTrackers');
  const useProxyCheckbox = document.getElementById('useProxy');
  const antiFingerprintingCheckbox = document.getElementById('antiFingerprinting');
  const secureDNSCheckbox = document.getElementById('secureDNS');
  const settingsButton = document.getElementById('settingsButton');

  // Load saved settings
  function loadSettings() {
    chrome.storage.local.get(['blockTrackers', 'useProxy', 'antiFingerprinting', 'secureDNS'], function(result) {
      blockTrackersCheckbox.checked = result.blockTrackers !== undefined ? result.blockTrackers : true;
      useProxyCheckbox.checked = result.useProxy !== undefined ? result.useProxy : false;
      antiFingerprintingCheckbox.checked = result.antiFingerprinting !== undefined ? result.antiFingerprinting : true;
      secureDNSCheckbox.checked = result.secureDNS !== undefined ? result.secureDNS : false;
    });
  }

  // Save settings when checkboxes are changed
  function saveSettings() {
    chrome.storage.local.set({
      blockTrackers: blockTrackersCheckbox.checked,
      useProxy: useProxyCheckbox.checked,
      antiFingerprinting: antiFingerprintingCheckbox.checked,
      secureDNS: secureDNSCheckbox.checked
    });
  }

  blockTrackersCheckbox.addEventListener('change', function() {
    saveSettings();
  });

  useProxyCheckbox.addEventListener('change', function() {
    saveSettings();
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
      backgroundPage.updateProxy(useProxyCheckbox.checked);
    });
  });

  antiFingerprintingCheckbox.addEventListener('change', function() {
    saveSettings();
  });

  secureDNSCheckbox.addEventListener('change', function() {
    saveSettings();
  });

  loadSettings();
});
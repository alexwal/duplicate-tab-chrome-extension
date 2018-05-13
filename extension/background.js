// Author: Alex Walczak (awal@awal.io)
// background.js

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
  // Duplicate the active tab in the current window
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.duplicate(tabs[0].id);
  });
});

// Author: Alex Walczak (awal@awal.io)
// background.js

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
  // Duplicate the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    duplicateCurrentTab();
  });
});

// Duplicate the current tab
function duplicateCurrentTab() {
  chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.duplicate(tab.id);
  });
}

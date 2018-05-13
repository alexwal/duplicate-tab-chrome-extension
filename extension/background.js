// Author: Alex Walczak (awal@awal.io)

// Duplicate tabs.Tab `tab`
function duplicateTab(tab) {
  chrome.tabs.duplicate(tab.id);
}

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(duplicateTab);

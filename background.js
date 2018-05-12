// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

// Duplicate the current tab
function duplicateCurrentTab() {
  chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.duplicate(tab.id);
  });
}

// Called when receives message from content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.message === "duplicate_current_tab") {
    duplicateCurrentTab();
  }
});

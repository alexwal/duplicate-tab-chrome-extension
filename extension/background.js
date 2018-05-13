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

// On startup, we inject each tab with new script to avoid a refresh of all pages.
var injectExtensionCode = function() {
  chrome.tabs.query({}, function(tabs) {
    var i = 0, n = tabs.length;
    for ( ; i < n; i++ ) {
      var tab = tabs[i];
      chrome.tabs.executeScript(tab.id, {file: "content.js"});
    }
  });
}

// Check whether new version is installed; inject scripts (see injectExtensionCode).
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
        // alert("This is a first install!");
        injectExtensionCode();
    } else if (details.reason == "update") {
        var thisVersion = chrome.runtime.getManifest().version;
        // alert("Updated from " + details.previousVersion + " to " + thisVersion + "!");
        injectExtensionCode();
    }
});

// content.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {
    console.log("Clicked duplicate tab button");
    chrome.runtime.sendMessage({"message": "duplicate_current_tab"});
    console.log("Sent duplicate tab request finished");
  }
});

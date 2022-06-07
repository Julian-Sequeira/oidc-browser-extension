async function getTabFromCurrentWindow() {
    return new Promise((resolve) => {
        chrome.tabs.query(
            {active: true, currentWindow: true},
            (tabs) => { resolve(tabs); }
        )
    });
}

async function notifyFlowStart() {
    // Pop up a notification for the user
    let [tab] = await getTabFromCurrentWindow();
    console.log(tab);
    chrome.browserAction.setBadgeText({
        text: "1",
        tabId: tab.id
    })
    chrome.browserAction.setBadgeBackgroundColor({
        color: "#ff0000"
    })
}


let responseHandler = async function(details) {
    console.log("Interrupted Redirect Here");
    if (details.statusCode == 302) {

        // Get the RP parameters to start OIDC flow
        details.responseHeaders.forEach((header, i) => {
            if (header.name.toLowerCase() == "location") {
                console.log(header.value);
            }
        })
        notifyFlowStart();
    }
}


chrome.webRequest.onHeadersReceived.addListener(
    responseHandler,
    {urls: ["<all_urls>"]},
    ["responseHeaders", "blocking"]
)


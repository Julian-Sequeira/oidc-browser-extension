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
    
    if (details.statusCode == 302) {
        console.log("Interrupted Redirect Here");
        notifyFlowStart();

        // Get the RP parameters to start OIDC flow
        details.responseHeaders.forEach((header, i) => {
            if (header.name.toLowerCase() == "location") {
                uri = header.value
                console.log(uri);
                chrome.runtime.sendMessage({
                    msg: "REDIRECT LOCATION RECEIVED", 
                    data: {
                        value: uri 
                    }
                });
            }
        })
        
    }
    notifyFlowStart();
}


chrome.webRequest.onHeadersReceived.addListener(
    responseHandler,
    {urls: ["<all_urls>"]},
    ["responseHeaders", "blocking"]
)


let responseHandler = function(details) {
    console.log("Interrupted Redirect Here");
    if (details.statusCode == 302) {
        details.responseHeaders.forEach((header, i) => {
            if (header.name.toLowerCase() == "location") {
                console.log(header.value);
            }
        })
    }
}


chrome.webRequest.onHeadersReceived.addListener(
    responseHandler,
    {urls: ["<all_urls>"]},
    ["responseHeaders", "blocking"]
)


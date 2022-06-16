chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "REDIRECT LOCATION RECEIVED") {
            //  To do something
            fetch(data.uri);
        }
    }
);
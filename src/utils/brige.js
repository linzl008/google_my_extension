function sendMessageToContentScript(message, callback)
{
    window.chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        window.chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}

function sendMessageByWindow(message) {
    window.postMessage(message, '*');
}

export {
    sendMessageToContentScript,
    sendMessageByWindow
}

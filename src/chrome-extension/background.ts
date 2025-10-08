chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'extractedData') {
        chrome.runtime.sendMessage({ action: 'extractedData', data: message.data });
    }
});



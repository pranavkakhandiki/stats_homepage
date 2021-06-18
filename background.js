console.log('we running boiss');

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {

    let msg = {
        txt: "yo!"
    }
    chrome.tabs.sendMessage(tab.id, msg)
}
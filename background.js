console.log('we running boiss');

/*
chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {

    let msg = {
        txt: "yo!"
    }
    chrome.tabs.sendMessage(tab.id, msg)
}
*/



var arr = []
setInterval(getHistory, 1000);

function getHistory() {
    chrome.history.search({text: '', maxResults: 10}, function(data) {
        data.forEach(function(page) {
            //console.log(page.url);
            arr.push(page.url)
        });
    });
}

setInterval(sendHistory, 1000);

function sendHistory() {
    chrome.tabs.query({active: true, currentWindow: true}, 
        function(tabs){
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, arr);  
                arr = [];
            }   
        }
    );
}
setInterval(mostRecentURL, 10);
function mostRecentURL() {
    document.getElementById("test").innerHTML = arr[0];
}

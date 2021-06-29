
let urlQueue = [];
let queueLength = 5;

let maxNumber = 0;
let maxUrl = "";
//var searchQuery = new Map();



const getMap = (data) => {
    let urlMap = new Map();
    data.forEach((page) => {
        // parse urlof page
        const url = new URL(page.url).hostname;
        if (!urlMap.has(url)) { 
            urlMap.set(url, 1);
        }
        else{
            urlMap.set(url, urlMap.get(url) + 1)
        }
        if (urlMap.get(url) > maxNumber) {
            maxNumber = urlMap.get(url);
            maxUrl = url;
        }
    });
    return urlMap;
}


const getRecentHistory = () => {
    chrome.history.search({text: '', maxResults: 50}, (data) => {
        urlQueue.push(...data);
        console.log("data", data)
        //urlQueue is [most recent, 2nd most recent, etc....]
        if (urlQueue.length > queueLength) { 
            urlQueue = urlQueue.slice(0, queueLength);
        }
        //urlQueue is [most recent, 2nd most recent, to fifth most recent]
        
        console.log("history", urlQueue);
        console.log("chris's dick size: ", urlQueue.length);
        let urlMap = getMap(urlQueue);
        console.log(urlMap);
        console.log("maxUrl: ", maxUrl);
    });
}
setInterval(getRecentHistory, 1000);

/*
chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {

    let msg = {
        txt: "yo!"
    }
    chrome.tabs.sendMessage(tab.id, msg)
}

*/

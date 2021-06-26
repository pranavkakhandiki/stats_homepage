
/*
chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {

    let msg = {
        txt: "yo!"
    }
    chrome.tabs.sendMessage(tab.id, msg)
}

*/

//small change #1

//collects history (# determined by maxResults) and stores it in array
const getHistory = () => {
    chrome.history.search({text: '', maxResults: 1}, function(data) {
        data.forEach((page) => {
            //console.log(page.url);
            lasturl.push(page.url)
        });
    });
}

let lasturl = [];
setInterval(getHistory, 10000);

let urlQueue = [];
let urlMap = new Map();
let maxNumber = 0;
let maxUrl = "";
//var searchQuery = new Map();


const getRecentHistory = () => {
    chrome.history.search({text: '', maxResults: 50}, (data) => {
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
    });
    console.log(urlMap);
    console.log("maxUrl: ", maxUrl);
    
}
setInterval(getRecentHistory, 1000);


const sendHistory = () => {
    chrome.tabs.query({active: true, currentWindow: true}, 
        (tabs) => {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, mostrecenturl);  
                lasturl = [];
            }   
        }
    );
}
setInterval(sendHistory, 100000);

//sends most recent URL visited to the main document, editing the HTML file in the process

const mostRecentURL = () => {
    if (typeof document != undefined) { 
        document.getElementById("test").innerHTML = lasturl[0];
    }
}
setInterval(mostRecentURL, 10000);
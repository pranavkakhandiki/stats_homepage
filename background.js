`1`1


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
    //if (typeof document != undefined) { 
    document.getElementById("test").innerHTML = lasturl[0];
    //}
}
setInterval(mostRecentURL, 10000);
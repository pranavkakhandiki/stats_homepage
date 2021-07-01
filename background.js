//collects history (# determined by maxResults) and stores it in array

let lasturl = [];


const getAvgLength = () => {
    let sum = 0;
    for (const i in lasturl){
        sum += lasturl[i].length;
    }
    console.log("average len" , sum/lasturl.length);
}

setInterval(getAvgLength, 20000);
//i.split("e").length - 1

const getpranavpenissize = () => {
    console.log(localStorage.getItem("pranavpenissize"));
}
setInterval(getpranavpenissize, 20000);

const getHistory = () => {
    //lasturl = [];
    chrome.history.search({text: '', startTime: 0 , maxResults: 1000000}, function(data) {
        data.forEach((page) => {
            lasturl.push(page.url);
        });        
    });
    console.log(lasturl.length);
    if (lasturl.length != 0) {
        console.log(lasturl[lasturl.length - 1]);
    }
}


setInterval(getHistory, 1000);


const sendHistory = () => {
    chrome.tabs.query({active: true, currentWindow: true}, 
        (tabs) => {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, mostrecenturl);  
                //lasturl = [];
            }   
        }
    );
}
setInterval(sendHistory, 100000);

//sends most recent URL visited to the main document, editing the HTML file in the process

const mostRecentURL = () => {
    //if (typeof document != undefined) { 
    //document.getElementById("test").innerHTML = lasturl[0];
    //}
}
setInterval(mostRecentURL, 10000);
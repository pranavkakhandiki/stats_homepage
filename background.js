//collects history (# determined by maxResults) and stores it in array

let lastUrl = [];
let lastTitle = [];
let timeSpentUrl = new Map();

/**
 * Gets average length of google searches
 */
const getAvgLength = () => {
    let sum = 0;
    for (const i in lastTitle) {
        sum += lastTitle[i].length;
    }
    console.log("average length:", sum / lastTitle.length);
};

/**
 * Finds average number of words in a search
 */
const avNumWrds = () => {
    let sum = 0;
    for (const i in lastTitle) {
        sum += lastTitle[i].split(" ").length;
    }
    if (lastTitle.length > 0) {
        console.log("average number of words:", sum / lastTitle.length);
    }
};

/**
 * Most Time Spent On URLs
 */
const timeSpent = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.length === 0) {
            return;
        }

        let activeUrl = new URL(tabs[0].url);
        let hostname = activeUrl.hostname;
        if (timeSpentUrl.hasOwnProperty(hostname)) {
            timeSpentUrl.set(hostname, timeSpentUrl.get(hostname) + 1);
        }
        else {
            timeSpentUrl.set(hostname, 1);
        }
    });
};

/**
 * Gets number of google searches
 */
const numSearches = () => {
    return lastTitle.length;
};

/**
 * Gets number of questions asked for google searches
 */
const numQuestionsAsked = () => {
    let sum = 0;
    let qWords = [
        "?",
        "who",
        "what",
        "where",
        "when",
        "why",
        "how",
        "can",
        "could",
        "should",
        "would",
    ];

    for (const i in lastTitle) {
        for (const j in qWords) {
            if (lastTitle[i].includes(qWords[j])) {
                sum += 1;
            }
        }
    }
    console.log("Questions: ", sum);
};

/**
 * Gets number of instances of 'the' in google searhces
 */
const numberThes = () => {
    let sum = 0;
    for (const i in lastTitle) {
        sum += (lastTitle[i].match(/the/g) || []).length;
        //console.log(sum);
    }
    console.log("Thes: ", sum);
};

setInterval(getAvgLength, 20000);
setInterval(numberThes, 10000);
setInterval(numQuestionsAsked, 10000);
setInterval(avNumWrds, 10000);
setInterval(timeSpent, 10000);
//i.split("e").length - 1

const getHistory = () => {
    //lasturl = [];
    lastTitle = [];
    chrome.history.search(
        { text: "", startTime: 0, maxResults: 1000000 },
        function (data) {
            data.forEach((page) => {
                lastUrl.push(page.url);
                //adds only defined page titles that are regular google searches (like 'what is the weather') to array
                if (page.title != undefined && page.title.endsWith("Google Search")) {
                    lastTitle.push(page.title);
                }
            });
        }
    );
    //console.log(lasttitle.length);
    if (lastUrl.length != 0) {
        console.log(lastUrl[lastUrl.length - 1]);
    }
};

setInterval(getHistory, 10000);

const sendHistory = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, mostRecentURL);
            //lasturl = [];
        }
    });
};
setInterval(sendHistory, 100000);

//sends most recent URL visited to the main document, editing the HTML file in the process

const mostRecentURL = () => {
    //if (typeof document != undefined) {
    //document.getElementById("test").innerHTML = lasturl[0];
    //}
};
setInterval(mostRecentURL, 10000);

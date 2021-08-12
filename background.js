let lastUrl = [];
let lastTitle = [];

//localStorage.setItem('lastSearchTimeStorage',undefined)
if (localStorage.getItem('lastSearchTimeStorage') === undefined) {
    console.log("HI");
    localStorage.setItem('lastSearchTimeStorage',0);
}

//localStorage.setItem('numQuestions', undefined);
if (localStorage.getItem('numQuestions') === undefined) {
    console.log("numQuestions is undefined in the beginning");
    localStorage.setItem('numQuestions', 0);
}

//localStorage.setItem('numQuestions', undefined);
if (localStorage.getItem('numPunctuationMarks') === undefined) {
    console.log("numPunctuationMarks is undefined in the beginning");
    localStorage.setItem('numPunctuationMarks', 0);
}

//localStorage.setItem('numQuestions', undefined);
if (localStorage.getItem('totalNumWords') === undefined) {
    console.log("totalNumWords is undefined in the beginning");
    localStorage.setItem('totalNumWords', 0);
}

//localStorage.setItem('numQuestions', undefined);
if (localStorage.getItem('totalNumSearches') === undefined) {
    console.log("totalNumSearches is undefined in the beginning");
    localStorage.setItem('totalNumSearches', 0);
}

//localStorage.setItem('numQuestions', undefined);
if (localStorage.getItem('numberThes') === undefined) {
    console.log("numberThes is undefined in the beginning");
    localStorage.setItem('numberThes', 0);
}



// check if we've already done the initial data grab
// run the update loop for the stats
  

/** DO NOW
 * Number of punctuation marks used
 * Number of times punctuation was used in a sentence
 */
const numPunctuationMarks = () => {
    let oldNum = parseInt(localStorage.getItem('numPunctuationMarks'));
    if(Number.isNaN(oldNum)) {
        console.log("numPunctuationMarks is undefined in the function");
        oldNum = 0;        
    }
    console.log("oldNum:", oldNum);
    let sum = 0;
    const punctuation = '!"#$%&\'()*+,-./:;<=>?@[]\\^_`{|}~';
    for (const index in lastTitle) {
        let lastsearch = lastTitle[index];
        lastsearch = lastsearch.replace("Google Search", "");
        for (let i = 0; i < lastsearch.length; i++) {
            let char = lastsearch.charAt(i);
            if (punctuation.includes(char)) {
                sum += 1;
            }            
        }
    }
    console.log('punctuation lastTitle:', lastTitle.length);
    console.log('punctuation sum:', sum)
    localStorage.setItem('numPunctuationMarks', oldNum + sum);
    console.log('punctuation final num:', oldNum + sum)
}

/**
 * Finds average number of words in a search
 */
const avNumWrds = () => {
    let oldNum_words = parseInt(localStorage.getItem('totalNumWords'));
    if(Number.isNaN(oldNum_words)) {
        console.log("totalNumWords is undefined in the function");
        oldNum_words = 0;        
    }
    let oldNum_searches = parseInt(localStorage.getItem('totalNumSearches'));
    if(Number.isNaN(oldNum_searches)) {
        console.log("totalNumWords is undefined in the function");
        oldNum_searches = 0;        
    }
    let search_sum = 0;
    let word_sum = 0;
    for (const i in lastTitle) {
        word_sum += lastTitle[i].split(" ").length;
    }
    search_sum += lastTitle.length;

    localStorage.setItem('totalNumWords', oldNum_words + word_sum);
    localStorage.setItem('totalNumSearches', search_sum + oldNum_searches);
};

/**
 * Most Time Spent On URLs
 * ADD - ADD A DATE COMPONENT FOR THE DICTIONARY
 */
const timeSpent = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            return;
        }
        let timeSpentUrl;
        if (localStorage.getItem('timeSpentUrl') === undefined) {
            timeSpentUrl = new Map();
        } else {
            timeSpentUrl = new Map(JSON.parse(localStorage.getItem('timeSpentUrl')));
        }
        let activeUrl = new URL(tabs[0].url);
        let hostname = activeUrl.hostname;
        if (timeSpentUrl.has(hostname)) {
            timeSpentUrl.set(hostname, timeSpentUrl.get(hostname) + 1);
        }
        else {
            timeSpentUrl.set(hostname, 1);
        }
        //console.log(timeSpentUrl);
        localStorage.setItem('timeSpentUrl', JSON.stringify(Array.from(timeSpentUrl.entries())));
    });
};

/**
 * Gets number of questions asked for google searches
 */
const numQuestionsAsked = () => {
    let oldNum = parseInt(localStorage.getItem('numQuestions'));
    if(Number.isNaN(oldNum)) {
        console.log("numQuestions is undefined in the function");
        oldNum = 0;        
    }
    console.log("oldNum:", oldNum);
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
        console.log('word:',lastTitle[i])
        for (const j in qWords) {
            if (lastTitle[i].includes(qWords[j])) {
                sum += 1;
                break;
            }
        }
    }
    console.log('lastTitle:', lastTitle.length);
    console.log('sum:', sum)
    localStorage.setItem('numQuestions', oldNum + sum);
    console.log('final num:', oldNum + sum)
};

/**
 * Gets number of instances of 'the' in google searhces
 */
const numberThes = () => {
    let oldNum = parseInt(localStorage.getItem('numThes'));
    if(Number.isNaN(oldNum)) {
        console.log("numThes is undefined in the function");
        oldNum = 0;        
    }
    let sum = 0;
    console.log("oldnumThes:", oldNum);

    for (const i in lastTitle) {
        sum += (lastTitle[i].match(/the/g) || []).length;
    }
    console.log('lastTitle:', lastTitle.length);
    console.log('sum:', sum)
    localStorage.setItem('numThes', oldNum + sum);
    console.log('final num:', oldNum + sum)
};

//setInterval(getAvgLength, 20000);
setInterval(numberThes, 10000);
setInterval(numQuestionsAsked, 10000);
setInterval(avNumWrds, 10000);
//setInterval(numNumsSearched, 10000);
//setInterval(numLettersSearched, 10000);
setInterval(timeSpent, 1000); // Should increment this to like 30 seconds or 1 minute
//setInterval(numNumsSearched, 10000);
setInterval(numPunctuationMarks, 10000);
const getHistory = () => {
    lastTitle = []
    chrome.history.search(
        { text: "", startTime: parseInt(localStorage.getItem('lastSearchTimeStorage')), maxResults: 1000000000 },
        function (data) {
            if(data[0] != undefined){
                localStorage.setItem('lastSearchTimeStorage', data[0].lastVisitTime + 1);
            }
            console.log(localStorage.getItem('lastSearchTimeStorage'));
            data.forEach((page) => {
                lastUrl.push(page.url);
                //adds only defined page titles that are regular google searches (like 'what is the weather') to array
                if (page.title != undefined && page.title.endsWith("Google Search")) {
                    lastTitle.push(page.title);
                }
            });
        }
    );
    /*
    console.log(lasttitle.length);
    if (lastUrl.length != 0) {
        console.log(lastUrl[lastUrl.length - 1]);
    }*/
};

//running get history once initially
getHistory();
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
    if (document !== undefined) {
        document.getElementById("test").innerHTML = localStorage.getItem('numberThes') ?? 0;
    }
};
mostRecentURL();
setInterval(mostRecentURL, 10000);
//collects history (# determined by maxResults) and stores it in array

let lastUrl = [];
let lastTitle = [];

//localStorage.setItem('lastSearchTimeStorage',undefined)
if (localStorage.getItem('lastSearchTimeStorage') === undefined) {
    localStorage.setItem('lastSearchTimeStorage',0);
}

//localStorage.setItem('numQuestions', undefined);
if (localStorage.getItem('numQuestions') === undefined) {
    console.log("numQuestions is undefined in the beginning");
    localStorage.setItem('numQuestions', 0);
}

// check if we've already done the initial data grab
// run the update loop for the stats

  
const mainLoopFunction = () =>  {
    let searchLength = 0;
    let numWords = 0;
    let distrWords = new Map();
    let numLetters = 0;
    let distrLetters = new Map();

    for (let i in lastTitle) {
        //google search length
        searchLength += getAvgLength(lastTitle, i);
        numWords += numWordsSearched(lastTitle, i);
        distrWords = numWordsSearchedDistribution(lastTitle, i, numWords);
        numLetters += numLettersSearched(lastTitle, i);
        distrLetters = numLettersSearchedDistribution(lastTitle, i, distrLetters);
    }
    let avgSearchLength = searchLength/lastTitle[i].length;
};
/**
 * Gets average length of google searches
 */
const getAvgLength = (lastTitle, i) => {
    return lastTitle[i].length;
};

/** TO BE DONE
 * Number of searches done per day/per hour
 */

// TO BE DONE - make everything in one loop

/** DO NOW
 * Number of words searched
 */
const numWordsSearched = (lastTitle, i) => {
    let sum = 0;
    let words = lastTitle[i].split(" ");
    sum += words.length - 2;
    return sum;
}

const numWordsSearchedDistribution = (lastTitle, i, numWords) => {
    let words = lastTitle[i].split(" ");
    sum += words.length - 2;
    for (const index in words) {
        let word = words[index]
        word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        word = word.replace(/\s{2,}/g," ");
        if (word != "") {
            if (numWords.has(word)) {
                numWords.set(word, numWords.get(word) + 1);
            }
            else {
                numWords.set(word, 1);
            }
        }            
    }
    return numWords;
}

/** 
 * Whether a character is a letter
 */
function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
}

/** DO NOW
 * Number of letters in search
 */
const numLettersSearched = (lastTitle, index) => {
    let lastsearch = lastTitle[index];
    lastsearch = lastsearch.replace(" - Google Search", "");
    for (var i = 0; i < lastsearch.length; i++) {
        let char = lastsearch.charAt(i).toLowerCase();
        if (isCharacterALetter(char)) {
            sum += 1;  
        }
    }
    return sum;
}

const numLettersSearchedDistribution = (lastTitle, index, numChars) => {
    let lastsearch = lastTitle[index];
    lastsearch = lastsearch.replace(" - Google Search", "");
    for (var i = 0; i < lastsearch.length; i++) {
        let char = lastsearch.charAt(i).toLowerCase();
        if (isCharacterALetter(char)) {
            if (numChars.has(char)) {
                numChars.set(char, numChars.get(char) + 1);
            }
            else {
                numChars.set(char, 1);
            } 
        }
    }
    return numChars;
}

/** DO NOW
 * Number of numbers searched
 */
const numNumsSearched = (lastTitle, i, numNums) => {
    let arr = lastTitle[i].replace("Google search", "").split(" ");
    for (let j in arr) {
        let str = arr[j];
        if (typeof str != "string") continue; // we only process strings!
        if (!isNaN(str) && !isNaN(parseFloat(str))) {
            let key = parseFloat(str);
            if (numNums.has(key)) {
                numNums.set(key, numNums.get(key) + 1);
            }
            else {
                numNums.set(key, 1);
            }
        }
    }
    return numNums;
}

/** DO NOW
 * Number of punctuation marks used
 * Number of times punctuation was used in a sentence
 */

const numPunctuationMarks = () => {
    let numPunctuation = new Map();
    let sum = 0;
    const punctuation = '!"#$%&\'()*+,-./:;<=>?@[]\\^_`{|}~';
    for (const index in lastTitle) {
        let lastsearch = lastTitle[index];
        lastsearch = lastsearch.replace("Google Search", "");
        for (let i = 0; i < lastsearch.length; i++) {
            let char = lastsearch.charAt(i);
            if (punctuation.includes(char)) {
                sum += 1;
                if (numPunctuation.has(char)) {
                    numPunctuation.set(char, numPunctuation.get(char) + 1);
                }
                else {
                    numPunctuation.set(char, 1);
                }
            }            
        }
    }
    //console.log("amount of punctuation in searches:", sum);
    //console.log("punctuation distribution:", numPunctuation);
}

/**
 * Most used word
 */
const mostUsedWord = () => {
}

/**
 * Finds average number of words in a search
 */
const avNumWrds = () => {
    let sum = 0;
    for (const i in lastTitle) {
        sum += lastTitle[i].split(" ").length;
    }
    if (lastTitle.length > 0) {
        //console.log("average number of words:", sum / lastTitle.length);
    }
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
 * Gets number of google searches
 */
const numSearches = () => {
    return lastTitle.length;
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
    let sum = 0;
    for (const i in lastTitle) {
        sum += (lastTitle[i].match(/the/g) || []).length;
        //console.log(sum);
    }
    //console.log("The's: ", sum);
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
        document.getElementById("test").innerHTML = localStorage.getItem('numQuestions') ?? 0;
    }
};
mostRecentURL();
setInterval(mostRecentURL, 10000);

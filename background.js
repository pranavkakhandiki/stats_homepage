//collects history (# determined by maxResults) and stores it in array
let lastUrl = [];
let lastTitle = [];
let timeSpentDict = {};

/*All Stats
-getAvgLength: 
-numWordsSearched
-numWordsSearchedDistribution
-numLettersSearched
-numNumsSearched
-numPunctuationMarks
-numPunctuationMarksDistr
-timeSpent
-numQuestionsAsked
-numberThes
-numSearches
*/

/* CHRIS TO DO LIST DO NOT DELETE
migrate all stats
localStorage update stats
document stats in dailyStat
*/


//Format: Function Name, String before, String after stat
let dailyStat = [
    ['searchLength', 'The average length of all your past google searches is', '' ],
    ['numWords', 'You have used ', 'words in your past google searches'],
    ['numLettersSearched','You have used ', ' letters in your past google searches' ],
    ['numLetters', 'You have used ', ' numbers in your past google searches'],
    ['numPunctuation', 'You have used ', ' punctuation marks in your google searches'],
    ['timeSpentOnYoutube', 'The most amount of time you have spent on a single tab is ', ' hours'  ],
    ['numQuestions', 'You have asked ', ' questions in your past google searches' ],
    ['numberThes', "You have used the word 'the' ", ' times in your google searches'],
    ['numSearches', 'You have made', ' google searches in total']
];








const generateLocalStorageObjects = (name, initialVal) =>  {
    if (localStorage.getItem(name) === undefined) {
        localStorage.setItem(name, initialVal);
    }
}
generateLocalStorageObjects('lastSearchTimeStorage', 0);
generateLocalStorageObjects('numQuestions', 0);
generateLocalStorageObjects('searchLength', 0);
generateLocalStorageObjects('numWords', 0);
let tempmap = new Map();
generateLocalStorageObjects('distrWords', JSON.stringify(tempmap));
generateLocalStorageObjects('numLetters', 0);
tempmap = new Map();
generateLocalStorageObjects('distrLetters', JSON.stringify(tempmap));
tempmap = new Map();
generateLocalStorageObjects('distrNums', JSON.stringify(tempmap));
generateLocalStorageObjects('numPunctuation', 0);
tempmap = new Map();
generateLocalStorageObjects('distrPunctuation', JSON.stringify(tempmap));
generateLocalStorageObjects('numberThe', 0);

// check if we've already done the initial data grab
// run the update loop for the stats
const mainLoopFunction = () =>  {
    let numQuestions = localStorage.getItem('numQuestions');
    let searchLength = localStorage.getItem('searchLength');
    let numWords = localStorage.getItem('numWords');
    let distrWords= new Map(JSON.parse(localStorage.getItem('distrWords')));
    let numLetters = localStorage.getItem('numLetters');
    let distrLetters = new Map(JSON.parse(localStorage.getItem('distrLetters')));
    let distrNums = new Map(JSON.parse(localStorage.getItem('distrNums')));
    let numPunctuation = localStorage.getItem('numPunctuation');
    let distrPunctuation = new Map(JSON.parse(localStorage.getItem('distrPunctuation')));
    let timeSpentOnYoutube = 0.0;
    let numberThe = localStorage.getItem('numberThe');
    for (let i in lastTitle) {
        //google search length
        numQuestions += numQuestionsAsked(lastTitle, i);
        searchLength += getAvgLength(lastTitle, i);
        numWords += numWordsSearched(lastTitle, i);
        distrWords = numWordsSearchedDistribution(lastTitle, i, numWords);
        numLetters += numLettersSearched(lastTitle, i);
        distrLetters = numLettersSearchedDistribution(lastTitle, i, distrLetters);
        distrNums = numNumsSearched(lastTitle, i, distrNums);
        numPunctuation += numPunctuationMarks(lastTitle, i);
        distrPunctuation = numPunctuationMarksDistr(lastTitle, i, distrPunctuation);
        timeSpentOnYoutube += timeSpentYT(timeSpentDict);
        numberThe += numberThes(lastTitle, i);
    }
    localStorage.setItem('numQuestions', numQuestions);
    localStorage.setItem('searchLength', searchLength);
    localStorage.setItem('numWords', numWords);
    localStorage.setItem('distrWords', JSON.stringify(distrWords));
    localStorage.setItem('numLetters', numLetters);
    localStorage.setItem('distrLetters', JSON.stringify(distrLetters));
    localStorage.setItem('distrNums', JSON.stringify(distrNums));
    localStorage.setItem('numPunctuation', numPunctuation);
    localStorage.setItem('distrPunctuation', JSON.stringify(distrPunctuation));
    localStorage.setItem('timeSpentOnYoutube', timeSpentOnYoutube);
    localStorage.setItem('numberThe', numberThe);



    let avgSearchLength = searchLength/lastTitle.length;
    let avNumWords = numWords/lastTitle.length;
    let numSearches = lastTitle.length;
};
setInterval(mainLoopFunction, 10000);


/**
 * Gets number of questions asked for google searches
 */
const numQuestionsAsked = (lastTitle, i) => {
    let qWords = [
        "?",  "who", "what", "where", "when", "why",
        "how", "can", "could", "should", "would",
    ];
    for (const j in qWords) {
        console.log(lastTitle);
        if (lastTitle[i].includes(qWords[j])) {
            return 1;
        }
    }
    return 0;
};

/**
 * Gets average length of google searches
 */
const getAvgLength = (lastTitle, i) => {
    return lastTitle[i].length;
};

/**
 * Check for time spent on Youtube since creating the extension
 */
const timeSpentYT = (timeSpentDict) => {
    console.log(timeSpentDict["youtube.com"]);
    return timeSpentDict["youtube.com"];
};

//setInterval(timeSpentYT, 1000);



/** TO BE DONE
 * Number of searches done per day/per hour
 */

const numQuestions = (lastTitle, i) => {
    let qWords = [
        "?", "who", "what",
        "where", "when", "why",
        "how", "can", "could", 
        "should", "would"
    ];
    console.log('word:',lastTitle[i])
    for (const j in qWords) {
        if (lastTitle[i].includes(qWords[j])) {
            return 1;
        }
    }
    return 0;
};




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

const numPunctuationMarks = (lastTitle, index) => {
    let sum = 0;
    const punctuation = '!"#$%&\'()*+,-./:;<=>?@[]\\^_`{|}~';
    var lastsearch = lastTitle[index];
    lastsearch = lastsearch.replace("Google Search", "");
    for (var i = 0; i < lastsearch.length; i++) {
        let char = lastsearch.charAt(i);
        if (punctuation.includes(char)) {
            sum += 1;
        }            
    }
    return sum;
}

const numPunctuationMarksDistr = (lastTitle, index, numPunctuation) => {
    const punctuation = '!"#$%&\'()*+,-./:;<=>?@[]\\^_`{|}~';
    var lastsearch = lastTitle[index];
    lastsearch = lastsearch.replace("Google Search", "");
    for (var i = 0; i < lastsearch.length; i++) {
        let char = lastsearch.charAt(i);
        if (punctuation.includes(char)) {
            if (numPunctuation.has(char)) {
                numPunctuation.set(char, numPunctuation.get(char) + 1);
            }
            else {
                numPunctuation.set(char, 1);
            }
        }            
    }
    return numPunctuation;
}

/**
 * Most Time Spent On URLs
 * ADD - ADD A DATE COMPONENT FOR THE DICTIONARY
 */
const timeSpent = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            console.log("In TimeSpent but not in the right if statement");
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
        console.log("In TimeSpent");
        localStorage.setItem('timeSpentUrl', JSON.stringify(timeSpentUrl.entries()));
        timeSpentDict = timeSpentUrl;
    });
};


/**
 * Gets number of instances of 'the' in google searhces
 */
const numberThes = (lastTitle, i) => {
    return (lastTitle[i].match(/the/g) || []).length;
}

//setInterval(getAvgLength, 20000);
setInterval(numberThes, 10000);
setInterval(numQuestionsAsked, 10000);
//setInterval(numNumsSearched, 10000);
//setInterval(numLettersSearched, 10000);
setInterval(timeSpent, 1000); // Should increment this to like 30 seconds or 1 minute
//setInterval(numNumsSearched, 10000);
setInterval(numPunctuationMarks, 10000);


const getHistory = () => {
    lastTitle = [];
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
            chrome.tabs.sendMessage(tabs[0].id, displayStat);
            //lasturl = [];
        }
    });
};
setInterval(sendHistory, 100000);

//sends most recent URL visited to the main document, editing the HTML file in the process

const displayStat = () => {
    console.log(dailyStat);
    let rand = Math.random();
    rand *= dailyStat.length;
    rand = Math.floor(rand);
    

    let sentence = dailyStat[rand][1] + localStorage.getItem(dailyStat[rand][0]) + dailyStat[rand][2];
    console.log("SENTENCE", sentence);
    if (document !== undefined) {
        //document.getElementById("test").innerHTML = localStorage.getItem('numQuestions') ?? 0;
        document.getElementById("test").innerHTML = sentence;
    }
};
//displayStat();
setInterval(displayStat, 10000);

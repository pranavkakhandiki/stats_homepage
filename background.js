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

let comparisons = [
    [0, 'number of alien civilizations found', 'alien.jpg', 'https://en.wikipedia.org/wiki/Extraterrestrial_life'],
    [1, 'number of known intelligent species in the universe', 'universe.jpg', 'https://en.wikipedia.org/wiki/Extraterrestrial_intelligence'],
    [2, 'number of years pineapples take to grow', 'pineapple.jpg', 'https://en.wikipedia.org/wiki/Pineapple'],
    [5, 'number of oceans', 'ocean.jpg', 'https://en.wikipedia.org/wiki/Ocean'],
    [7, 'height of Colossus Penguin (37 million years ago)','penguin.jpg', 'https://en.wikipedia.org/wiki/Palaeeudyptes_klekowskii'],
    [9, 'number of species', 'species.jpg', 'https://en.wikipedia.org/wiki/Global_biodiversity'],
    [14, 'height of Olympus Mons on Mars in miles', 'mars.jpg', 'https://en.wikipedia.org/wiki/Olympus_Mons'],
    [17, 'number of hours cats sleep per day', 'cat.jpg', 'https://en.wikipedia.org/wiki/Cat'],
    [20, 'number of slams won by Federer', 'tennis.jpg', 'https://en.wikipedia.org/wiki/Roger_Federer'],
    [36, "number of adults from USA that can't read above a 3rd grade level(millions)", 'read.jpg', 'https://en.wikipedia.org/wiki/Functional_illiteracy'],
    [80, 'percent of ocean unexplored', 'ocean.jpg', 'https://en.wikipedia.org/wiki/Ocean'],
    [125, 'number of galaxies in observable universe in billions', 'galaxy.jpg', 'https://en.wikipedia.org/wiki/Galaxy'],
    [178, 'number of seeds on McDonalds Bbn', 'burger.jpg', 'https://en.wikipedia.org/wiki/McDonald%27s'],
    [195, 'number of countries', 'countries.jpg', 'https://en.wikipedia.org/wiki/Country'],
    [1942, 'year the atomic bomb was developed', 'bomb.jpg', 'https://en.wikipedia.org/wiki/Nuclear_weapon'],
    [6500, 'number of spoken languages ', 'language.jpg', 'https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers'],
    [11034, 'depth of the Mariana Trench in meters', 'trench.jpg', 'https://en.wikipedia.org/wiki/Mount_Everest'],
    [29032, 'height of Mount Everest in feet', 'everest1.jpg', 'https://en.wikipedia.org/wiki/Mount_Everest'],
    [86000000000, 'number of neurons in a human brain', 'neuron.jpg', 'https://en.wikipedia.org/wiki/Neuron'],
];

let prefixes = [
    ["That's the "]
];


const generateLocalStorageObjects = (name, initialVal) =>  {
    if (localStorage.getItem(name) === undefined) {
        localStorage.setItem(name, initialVal);
    }
}
generateLocalStorageObjects('lastSearchTimeStorage', 0);
//generateLocalStorageObjects('numQuestions', 0);

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

// const numQuestions = (lastTitle, i) => {
//     let qWords = [
//         "?", "who", "what",
//         "where", "when", "why",
//         "how", "can", "could", 
//         "should", "would"
//     ];
//     console.log('word:',lastTitle[i])
//     for (const j in qWords) {
//         if (lastTitle[i].includes(qWords[j])) {
//             return 1;
//         }
//     }
//     return 0;
// };




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
    
    let index = 0;
    let background_image = "";
    let test_num = localStorage.getItem('numQuestions');
    for (let i = 0; i < comparisons.length-1; i++){
        if (Math.abs(test_num - comparisons[i][0]) <= Math.abs(test_num - comparisons[i+1][0])){
            background_image = comparisons[i][2];
            index = i;
            break;
        }
    }
    
    //document.getElementById("test").innerHTML = "YO";
    window.onload = function () {
        document.getElementById('image').src = "assets/" + background_image;
        
    }
    
    console.log(dailyStat);
    
    let rand_stat = Math.floor(Math.random() * dailyStat.length);
    let rand_prefix = Math.floor(Math.random() * prefixes.length);

    let sentence = dailyStat[rand_stat][1] + localStorage.getItem(dailyStat[rand_stat][0]) + dailyStat[rand_stat][2] + ". "
    + prefixes[rand_prefix][0] + comparisons[index][1] + ".";

    let url = dailyStat[rand_stat][3];

    //match up with a corresponding html image
    //document.getElementById('image').src = "assets/ksi.jpg";
    


    console.log("SENTENCE", sentence);
    if (document !== undefined) {
        //document.getElementById("test").innerHTML = localStorage.getItem('numQuestions') ?? 0;
        document.getElementById("test").innerHTML = sentence;
        document.getElementById("URL").href = url;
    }
};
displayStat();
setInterval(displayStat, 10000);

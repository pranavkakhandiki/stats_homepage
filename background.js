//collects history (# determined by maxResults) and stores it in array
let lastUrl = [];
let lastTitle = [];

//localStorage.setItem('lastSearchTimeStorage',undefined)
if (localStorage.getItem('lastSearchTimeStorage') === undefined) {
    console.log("HI");
    localStorage.setItem('lastSearchTimeStorage',0);
}

if (localStorage.getItem('numQuestions') === undefined) {
    console.log("numQuestions is undefined in the beginning");
    localStorage.setItem('numQuestions', 0);
}

if (localStorage.getItem('numPunctuationMarks') === undefined) {
    console.log("numPunctuationMarks is undefined in the beginning");
    localStorage.setItem('numPunctuationMarks', 0);
}

if (localStorage.getItem('totalNumWords') === undefined) {
    console.log("totalNumWords is undefined in the beginning");
    localStorage.setItem('totalNumWords', 0);
}

if (localStorage.getItem('totalNumSearches') === undefined) {
    console.log("totalNumSearches is undefined in the beginning");
    localStorage.setItem('totalNumSearches', 0);
}

if (localStorage.getItem('numberThes') === undefined) {
    console.log("numberThes is undefined in the beginning");
    localStorage.setItem('numberThes', 0);
}

if (localStorage.getItem('searchLength') === undefined) {
    console.log("searchLength is undefined in the beginning");
    localStorage.setItem('searchLength', 0);
}

if (localStorage.getItem('numLettersSearched') === undefined) {
    console.log("numLettersSearched is undefined in the beginning");
    localStorage.setItem('numLettersSearched', 0);
}

if (localStorage.getItem('numNumbers') === undefined) {
    console.log("numNumbers is undefined in the beginning");
    localStorage.setItem('numNumbers', 0);
}
if (localStorage.getItem('mostTimeSpent') === undefined) {
    console.log("mostTimeSpent is undefined in the beginning");
    localStorage.setItem('mostTimeSpent', 0);
}


// check if we've already done the initial data grab
// run the update loop for the stats
  
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
const numberThesCount = () => {
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
 * Whether a character is a letter
 */
 function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
}

/** DO NOW
 * Number of letters in search
 */
const numLettersSearched = () => {
    let oldNum = parseInt(localStorage.getItem('numLettersSearched'));
    if(Number.isNaN(oldNum)) {
        console.log("numLettersSearched is undefined in the function");
        oldNum = 0;        
    }
    console.log("oldNum:", oldNum);
    let sum = 0;

    for (const index in lastTitle) {
        let lastsearch = lastTitle[index];
        lastsearch = lastsearch.replace("Google Search", "");
        for (var i = 0; i < lastsearch.length; i++) {
            let char = lastsearch.charAt(i).toLowerCase();
            if (isCharacterALetter(char)) {
                sum += 1;  
            }
        }
    }
    console.log('numLettersSearched sum:', sum)
    localStorage.setItem('numLettersSearched', oldNum + sum);
    console.log('numLettersSearched final num:', oldNum + sum)
}
/** DO NOW
 * Number of numbers in search
 */
 const numNumbersSearched = () => {
    let oldNum = parseInt(localStorage.getItem('numNumbers'));
    if(Number.isNaN(oldNum)) {
        console.log("numNumbers is undefined in the function");
        oldNum = 0;        
    }
    console.log("oldNum:", oldNum);
    let sum = 0;
    for (const index in lastTitle) {
        let arr = lastTitle[index].replace("Google Search", "").split(" ");
        for (let j in arr) {
            let str = arr[j];
            if (typeof str != "string") continue; // we only process strings!
            if (!isNaN(str) && !isNaN(parseFloat(str))) {
                sum += 1
            }
        }
    }
    console.log('numNumbers sum:', sum);
    localStorage.setItem('numNumbers', oldNum + sum);
    console.log('numNumbers final num:', oldNum + sum);
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

    localStorage.setItem('searchLength', (oldNum_words + word_sum)/(search_sum + oldNum_searches));

    localStorage.setItem('totalNumWords', oldNum_words + word_sum);
    localStorage.setItem('totalNumSearches', search_sum + oldNum_searches);
};

let timeSpentDict = {};




/*All Stats
-getAvgLength: 
-numWordsSearched
-numWordsSeassssrchedDistribution
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
    ['searchLength', 'The average length of all your past google searches is ', '' ],
    ['totalNumWords', 'You have used ', ' words in your past google searches'],
    ['numLettersSearched','You have used ', ' letters in your past google searches' ],
    ['numNumbers', 'You have used ', ' numbers in your past google searches'],
    ['numPunctuationMarks', 'You have used ', ' punctuation marks in your google searches'],
//    ['mostTimeSpent', 'The most amount of time you have spent on a single tab is ', ' hours'  ],
    ['numQuestions', 'You have asked ', ' questions in your past google searches' ],
    ['numberThes', "You have used the word 'the' ", ' times in your google searches'],
    ['totalNumSearches', 'You have made ', ' google searches in total']
];
//stat, initial text, linked text, finishing text
let comparisons = [
    [0, 'number of ', 'alien civilizations', ' found', 'alien.jpg', 'https://en.wikipedia.org/wiki/Extraterrestrial_life'],
    [1, 'number of known ', 'intelligent species', ' in the universe', 'universe.jpg', 'https://en.wikipedia.org/wiki/Extraterrestrial_intelligence'],
    [2, 'number of years ', 'pineapples', ' take to grow', 'pineapple.jpg', 'https://en.wikipedia.org/wiki/Pineapple'],
    [5, 'number of ', 'oceans', ' on Earth', 'ocean.jpg', 'https://en.wikipedia.org/wiki/Ocean'],
    [7, 'height of the ', 'Colossus Penguin', ' (37 million years ago)','penguin.jpg', 'https://en.wikipedia.org/wiki/Palaeeudyptes_klekowskii'],
    [9, 'number of ', 'species on Earth', '(in millions)', 'species.jpg', 'https://en.wikipedia.org/wiki/Global_biodiversity'],
    [14, 'height of ', 'Olympus Mons', ' on Mars in miles', 'mars.jpg', 'https://en.wikipedia.org/wiki/Olympus_Mons'],
    [17, 'number of hours ', 'cats', ' sleep per day', 'cat.jpg', 'https://en.wikipedia.org/wiki/Cat'],
    [20, 'number of slams won by ', 'Roger Federer', '', 'tennis.jpg', 'https://en.wikipedia.org/wiki/Roger_Federer'],
    [36, 'number of adults from USA that ', "can't read", ' above a 3rd grade level (in millions)', 'read.jpg', 'https://en.wikipedia.org/wiki/Functional_illiteracy'],
    [80, 'percent of ', 'ocean', ' unexplored', 'ocean.jpg', 'https://en.wikipedia.org/wiki/Ocean'],
    [125, 'number of ', 'galaxies', ' in observable universe in billions', 'galaxy.jpg', 'https://en.wikipedia.org/wiki/Galaxy'],
    [178, 'number of seeds on ', 'McDonalds', ' bun', 'burger.jpg', 'https://en.wikipedia.org/wiki/McDonald%27s'],
    [195, 'number of ', 'countries', '','countries.jpg', 'https://en.wikipedia.org/wiki/Country'],
    [1942, 'year the ', 'atomic bomb', ' was developed', 'bomb.jpg', 'https://en.wikipedia.org/wiki/Nuclear_weapon'],
    [6500, 'number of spoken ', 'languages ','', 'language.jpg', 'https://en.wikipedia.org/wiki/List_of_languages_by_number_of_native_speakers'],
    [11034, 'depth of the', ' Mariana Trench', ' in meters', 'trench.jpg', 'https://en.wikipedia.org/wiki/Mount_Everest'],
    [29032, 'height of ', 'Mount Everest', ' in feet', 'everest1.jpg', 'https://en.wikipedia.org/wiki/Mount_Everest'],
    [86000000000, 'number of', 'neurons', 'in a human brain', 'neuron.jpg', 'https://en.wikipedia.org/wiki/Neuron']
];

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
const mostTimeSpentURL = () => {
    let timeSpentUrl;
    if (localStorage.getItem('timeSpentUrl') === undefined) {
        return;
    } else {
        timeSpentUrl = new Map(JSON.parse(localStorage.getItem('timeSpentUrl')));
    }
    let maxval = 0;
    for (val in timeSpentUrl) {
        if (timeSpentUrl[val] > maxval) {
            maxval = timeSpentUrl[val]
        }
    }
    localStorage.setItem('mostTimeSpent', maxval);
}


//setInterval(getAvgLength, 20000);
setInterval(numberThesCount, 10000);
setInterval(numQuestionsAsked, 10000);
setInterval(avNumWrds, 10000);
setInterval(numNumbersSearched, 10000);
setInterval(numLettersSearched, 10000);
setInterval(timeSpent, 1000); // Should increment this to like 30 seconds or 1 minute
setInterval(numPunctuationMarks, 10000);
setInterval(mostTimeSpentURL, 10000);

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
    let rand = Math.floor(Math.random() * dailyStat.length);    
    let background_image = "";
    let test_num = localStorage.getItem(dailyStat[rand][0]);
    let imageIndex = 0;
    for (let i = 0; i < comparisons.length-1; i++){
        if (Math.abs(test_num - comparisons[i][0]) <= Math.abs(test_num - comparisons[i+1][0])){
            background_image = comparisons[i][4];
            imageIndex = i;
            break;
        }
    }
    
    //document.getElementById("test").innerHTML = "YO";
    window.onload = function () {
        console.log(background_image);
        document.getElementById('image').src = "assets/" + background_image;
    }
    
    console.log(dailyStat);
    
    

    let sentence = dailyStat[rand][1] + localStorage.getItem(dailyStat[rand][0]) + dailyStat[rand][2] + ". That's close to the " + comparisons[imageIndex][1];
    //let sentence = dailyStat[rand][1] + "BHARATAP" + localStorage.getItem('numQuestions') + dailyStat[rand][2];


    //match up with a corresponding html image
    //document.getElementById('image').src = "assets/ksi.jpg";

    console.log("SENTENCE", sentence);
    if (document !== undefined) {
        //document.getElementById("test").innerHTML = localStorage.getItem('numQuestions') ?? 0;
        document.getElementById("text1").innerHTML = sentence;
        document.getElementById("test").innerHTML = comparisons[imageIndex][2];
        document.getElementById("text2").innerHTML = comparisons[imageIndex][3];
        document.getElementById("URL").href = comparisons[imageIndex][5]
    }
};
displayStat();
setInterval(displayStat, 10000);

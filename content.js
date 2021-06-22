
function printfn() { 
    var word1234123 = "pranav ag";
    console.log(word1234123);
}


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    console.log(message.txt);
    if (message.txt === "yo!"){
        let paragraphs = document.getElementsByTagName('p');
        for (elt of paragraphs){
            elt.style['background-color'] = '#FF00FF';
        }
    }
}



/*
"content_scripts": [
        {
            "matches":["https://github.com/*"],
            "js": ["content.js"]
        }
    ],
    "background": {
        "scripts": ["background.js"]
    },
    "browser_action": {
        "default_icon": "img.png", 
        "default_popup": "popup.html",
        "default_title": "A popup will appear"
    }
*/

//CODE FOR MANIFEST before new tab override
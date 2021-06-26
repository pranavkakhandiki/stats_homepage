
function printfn() { 
    var word1234123 = "pranav ag";
    console.log(word1234123);
}

function addstuff(message, sender, sendResponse) {
    document.getElementById("id").value = message.attribute;
}

//chrome.runtime.onopening.addListener(addstuff);


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    console.log("TEST MESSAGE");
    console.log(message);
    /*if (message.txt === "yo!"){
        let paragraphs = document.getElementsByTagName('p');
        for (elt of paragraphs){
            elt.style['background-color'] = '#FF00FF';
        }
    }*/
    return true;
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
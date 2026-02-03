import alphabet from "./alphabet-module.js";

function PlaySound(soundSource)
{
    var audio = new Audio(soundSource);
    audio.play();
}

function SetTextArrayFromArray(items, textArray)
{
    for(let i = 0; i < items.length; i++)
    {
        items[i].textContent = textArray[i];
    }
}
function SetText(item, text)
{
    item.textContent = text;
}

//let selectables = LinkByClass("selectable");
let title = document.getElementById("main-title");
let examples = document.getElementsByClassName("example");

function LinkItemsToEvent(items, func)
{
    for(let i = 0; i < items.length; i++)
    {
        items[i].addEventListener('click', () => 
        {
            func(items[i]);
        });
    }
}

function AlphabetHTML(item)
{
    let aux = alphabet[item.textContent];

    SetText(title, aux.letter);
    SetTextArrayFromArray(examples, aux.examples);

    //PlaySound(aux.pronunciation);
}

export default{
    LinkItemsToEvent,
    AlphabetHTML
}
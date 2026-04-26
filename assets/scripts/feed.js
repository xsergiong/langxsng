const FEED = document.getElementById("feed");

let language = "";
let category = "";
let unit = "";
let point = "";

let globalPath = "./assets/"

const BLOCKAUDIOSMAP = new Map();

//Place updates
function UpdateLanguage(newLanguage)
{
    language = newLanguage;

    UpdateFeed();
}
function UpdateCategory(newCategory)
{
    category = newCategory;

    UpdateFeed();
}
function UpdateUnit(newUnit)
{
    unit = newUnit;

    UpdateFeed();
}
function UpdatePoint(newPoint)
{
    point = newPoint;

    UpdateFeed();
}
 
function UpdateFeed()
{
    if (language == "")
    {
        CreateFeed("languageBlocks")

        return;
    }

    if (category == "")
    {
        CreateFeed(language);

        return;
    }
    if (unit == "")
    {
        CreateFeed(language + "/" + category);

        return;
    }
    if (point == "")
    {
        CreateFeed(language + "/" + category + "/" + unit);

        return;
    }

    CreateFeed(language + "/" + category + "/" + unit + "/" + point);
}

function EmptyFeed()
{
    let feedBlocks = FEED.childNodes;
    
    let index = feedBlocks.length - 1;

    if (index == 0)
        return;

    for (let i = index; i > 0; i--)
    {
        DeleteBlock(feedBlocks[i]);
    }

    BLOCKAUDIOSMAP.clear();
}

function DeleteBlock(block)
{
    block.remove();
}

function CreateFeed(blocksArrayName)
{
    EmptyFeed();

    let path = globalPath + "/json/" + blocksArrayName + ".json";

    fetch(path)
        .then(res => res.json())
        .then(data => 
        {
            data.blocksArray.forEach(block =>
            {
                CreateBlock(block.text, block.imageName, data.className, data.functionName);
            })
        });
}

function CreateBlock(textContent, imageName, className, functionName) 
{
    console.log("Creating block");

    let block = document.createElement("div");
    let text = document.createElement("h5");
    let image = document.createElement("img");

    let directoryPath = "./assets/images/" + className + "/";
    let imagePath = directoryPath + imageName;

    block.classList.add(className);
    block.classList.add("block");
    block.setAttribute("onClick", functionName + "('" + textContent + "')");

    text.textContent = RemoveCharacterInString(textContent, "_");

    image.src = imagePath;

    block.appendChild(text);

    if (imagePath != directoryPath + "undefined")
        block.appendChild(image);
    
    FEED.appendChild(block);
}

function GoHome()
{
    language = "";
    category = "";
    unit = "";
    point = "";
    UpdateFeed();
}

function GetBlocks()
{
    let blocksArray = document.getElementsByClass("block");

    if (language == "")
    {
        blocksArray.forEach(block =>
        {
            block.addEventListener(UpdateLanguage(block.textContent));
        });
    }
    if (section == "")
    {
        blocksArray.forEach(block =>
        {
            block.addEventListener(UpdateSection(block.textContent));
        });

    }
    if (unit == "")
    {
        blocksArray.forEach(block =>
        {
            block.addEventListener(UpdateUnit(block.textContent));
        });
    }
    if (point == "")
    {
        blocksArray.forEach(block =>
        {
            block.addEventListener(UpdatePoint(block.textContent));
        });
    }

    blocksArray.forEach(block =>
    {
        block.addEventListener(UpdateLanguage(block.textContent));

        BLOCKAUDIOSMAP.set(block.textContent,
        (audioFileName) =>
        {
            PlayAudio(audioFileName);
            return;
        })
    });
}

function PlayAudio(audioFileName)
{
    let path = globalPath + "/audios/" + language + "/" + section + "/" + unit + "/" + point + "/" + audioFileName + ".mp3";

    var sound = new Audio(path);
    sound.Play();
}

function RemoveCharacterInString(stringToChange, characterToRemove)
{
    let stringArray = stringToChange.split("");
    let index = stringArray.length;

    for (let i = 0; i < index; i++)
    {
        if (stringArray[i] == characterToRemove)
        {
            stringArray[i] = " ";
        }
    }

    return stringArray.join(""); 
}

//OnLoad
UpdateFeed();
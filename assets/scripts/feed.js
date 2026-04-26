const feedDiv = document.getElementById("feed");

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

    console.log(language);

    UpdateFeed();
}
function UpdateCategory(newCategory)
{
    category = newCategory;

    UpdateFeed();
}
function UpdateUnit(newUnit)
{
    unit = newcategory;

    UpdateFeed();
}
function UpdatePoint(newPoint)
{
    point = newPoint;

    UpdateFeed();
}

function UpdateFeed()
{
    EmptyFeed();

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
    let feedBlocks = feedDiv.children;
    
    if (feedBlocks.length == 0)
        return;

    feedBlocks.forEach(block => 
    {
        block.remove();
    });

    BLOCKAUDIOSMAP.clear();
}

function CreateFeed(blocksArrayName)
{
    let path = globalPath + "/json/" + blocksArrayName + ".json";

    fetch(path)
        .then(res => res.json())
        .then(data => 
        {
            data.languageBlocks.forEach(block =>
            {
                CreateBlock(block.text, block.imageName, data.className);
            })
        });
}

function CreateBlock(textContent, imageName, className)
{

    let block = document.createElement("div");
    let text = document.createElement("h4");
    let image = document.createElement("img");
    let imagePath = "./assets/images/" + className + "/" + imageName;
    block.className = className;
    text.textContent = textContent;
    image.src = imagePath;
    block.appendChild(text);
    block.appendChild(image);
    feedDiv.appendChild(block);
}

function GoHome()
{
    UpdateLanguage("");
    UpdateCategory("");
    UpdateUnit("");
    UpdatePoint("");
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


//OnLoad
UpdateFeed();
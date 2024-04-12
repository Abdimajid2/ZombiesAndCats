const images = [
    "images/autumn-3937289_1280.jpg",
    "images/buildings-1838418_1280.jpg",
    "images/forrest-2681103_1280.jpg",
    "images/pedestrians-1853552_1280.jpg",
    "images/singapore-1990959_1280.jpg",
    "images/snowman-321034_1280.jpg",
    "images/the-park-1489020_1280.jpg",
    "images/tree-5353930_1280.jpg",
    "images/horror-2686315_1280.jpg",
    "images/sunset-1373186_1280.jpg",
    "images/asia-3771733_1280.jpg",
    "images/apley-woods-4762915_1280.jpg",
    " images/trees-5051595_1280.jpg",
    "images/monument-valley-5499156_1280.jpg",
    "images/art-1580767_1280.jpg",
    "images/building-6467081_1280.jpg",
    "images/alley-89197_1280.jpg",
    "images/castelmezzano-1979546_1280.jpg",
    "images/cat-8121892_1280.jpg",
    "images/mountain-4950653_1280.jpg",
    "images/portugal-4828134_1280.jpg",
     "images/dark-1936954_1280.jpg",
    "images/usa-1777986_1280.jpg",
    "images/castle-4118455_1280.jpg",
    "images/autumn-481752_1280.jpg"
     
];

const url = "https://api.api-ninjas.com/v1/dadjokes?limit="

const dadjoke = document.getElementById("dadjokes")

const apikey = "pMoFBo38AoYqb6c2CFIB8g==fN7OdvT6YTG6odWq"

const dadjokesdiv = document.getElementById("dadjokes")

 

let currentImageIndex = 0;
let gameEnded = false
let playerscore = 0

function updatePlayerScore()
{
    document.getElementById("scorevalue").textContent = playerscore
}


function ReShuffleThePictures()
{
    images.sort(() => Math.random() - 0.5);
  
}

function startgame()
{
    document.getElementById("startgame")
    playerscore = 0
    updatePlayerScore()
    updateImage()
    drawMap() 
    gameEnded = false
}

function drawMap() {
    let map = document.getElementById('spelplanen');
    map.innerHTML = ''; 

    let gridSize = 5;
    let count = 0;

    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement('div');
        for (let j = 0; j < gridSize; j++) {
            let position = document.createElement('span');
            if (count === currentImageIndex) {
                position.textContent = 'X'; 
            } else {
                position.textContent = 'O'; 
            }
            row.appendChild(position);
            count++;
        }
        map.appendChild(row);
    }

    if(images[currentImageIndex] === "images/cat-8121892_1280.jpg")
    {
        playerscore++
        updatePlayerScore()
        document.getElementById("catmessage").textContent = "Grattis, du har hittat katten, du förtjänar en Dad Joke"
       
        setTimeout(function(){
            document.getElementById("catmessage").textContent = ""
            ReShuffleThePictures()
        }, 9000)
    
       
       
        fetch (url, {
            headers: {
                "X-Api-Key": apikey 
            }
        })
            .then(function(response){return response.json()})    
            .then(function(data){
                let dadjokes = data
        
               dadjokes.forEach(function(dadjoke) {
        
                    const jokeElement = document.createElement('p')
                    jokeElement.textContent = dadjoke.joke
                    dadjokesdiv.appendChild(jokeElement)
               });
        
            
        
            })

            setTimeout(function(){
                document.getElementById("dadjokes").textContent = ""
            }, 9000)
        
            
    
    }

   else if (images[currentImageIndex] ===  "images/horror-2686315_1280.jpg" && playerscore === 0)
    {
        document.getElementById("zombiemessage").textContent = "Game Over, Tryck på gröna knappen för att börja om"
        gameEnded = true
         
        setTimeout(() => 
        {
            document.getElementById("zombiemessage").textContent = " "
            ReShuffleThePictures()
        }, 6000)
         

    }
    
    
    else if(images[currentImageIndex] ===  "images/horror-2686315_1280.jpg" && playerscore > 0)
    {
        playerscore--
        
        updatePlayerScore()
        document.getElementById("zombiemessage").textContent = "OOPS, du har stött på Zombien"
        
        setTimeout(() => 
        {
            document.getElementById("zombiemessage").textContent = " "
            ReShuffleThePictures()
        }, 6000)
         
        
        
        
    }  
    
    
}
function updateImage() {
    const imgElement = document.getElementById('currentImage');
    imgElement.src = images[currentImageIndex];
}

function playerPositionNorth() {
    if (!gameEnded && currentImageIndex >= 5) {
        currentImageIndex -= 5;
        drawMap();
        updateImage();
    }
}

function playerPositionEast() {
    if ((!gameEnded && currentImageIndex + 1) % 5 !== 0) {
        currentImageIndex++;
        drawMap();
        updateImage();
    }
}

function playerPositionSouth() {
    if (!gameEnded && currentImageIndex < 20) {
        currentImageIndex += 5;
        drawMap();
        updateImage();
    }
}

function playerPositionWest() {
    if (!gameEnded && currentImageIndex % 5 !== 0) {
        currentImageIndex--;
        drawMap();
        updateImage();
    }
}
ReShuffleThePictures()
updateImage();
drawMap()

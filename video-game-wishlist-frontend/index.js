const BASE_URL = 'http://localhost:3000'

window.addEventListener("load", () => {
    getHomePage()
    attachClickToNavigationLinks() 
    
})
 
// --------------Home Page -----------------------//

function getHomePage(){
  clearGenresIndex(); 
  clearVideoGamesIndex();
  clearVideoGameShow();
  clearVideoGameCreateForm();
  clearVideoGameEditForm();
  let homeAnchor = document.querySelector("#home");
  homeAnchor.innerHTML = `
  <div class="hero-image">
    <div class="hero-text">
        <h1>Welcome to the Video Game Wishlist App </h1> 
        <h3> Select Genre buttom to get the App started </h3> 
    </div>
  </div>
  `  
}


// --------------Genres Index -----------------------//

function getGenres(){
    // will need to add more clear functions
    clearHome();
    clearVideoGamesIndex();
    clearVideoGameShow();
    clearVideoGameCreateForm();
    clearVideoGameEditForm();
    let genresIndex = document.querySelector("#genresIndex");
    genresIndex.innerHTML = "";
    fetch(BASE_URL+"/genres")
    .then(resp => resp.json())
    .then(genres => {
        genres.forEach(genre => {
            let newGenre = new Genre(genre)
        });  
        genresIndex.innerHTML = Genre.listGenres()
        attachLinksToGenreIndex();
    })

    
}

class Genre {

    static all = []

    constructor(genre){
        this.id = genre.id
        this.name = genre.name 
        Genre.all.push(this)
    }

    static listGenres() {
        return `
        <h1 id="genresIndexH1">CHOOSE A GENRE</h1>

        <div class="grid-container-genres-index">
          <div><ion-icon name="walk-outline"></ion-icon> <br> <a href="#" data-id='${Genre.all[0]["id"]}'>${Genre.all[0]["name"]}</a> </div>
          <div><ion-icon name="image-outline"></ion-icon></ion-icon> <br> <a href="#" data-id='${Genre.all[1]["id"]}'>${Genre.all[1]["name"]}</a></div>
          <div><ion-icon name="skull-outline"></ion-icon><br> <a href="#" data-id='${Genre.all[2]["id"]}'>${Genre.all[2]["name"]}</a></div>  
          <div><ion-icon name="aperture-outline"></ion-icon><br> <a href="#" data-id='${Genre.all[3]["id"]}'>${Genre.all[3]["name"]}</a></div>
          <div><ion-icon name="american-football-outline"></ion-icon><br> <a href="#" data-id='${Genre.all[4]["id"]}'>${Genre.all[4]["name"]}</a></div>
          <div><ion-icon name="git-compare-outline"></ion-icon><br> <a href="#" data-id='${Genre.all[5]["id"]}'>${Genre.all[5]["name"]}</a></div>  
        </div>
        `
        
    }
}

function attachLinksToGenreIndex(){
    let indexLinks = document.querySelectorAll("#genresIndex a")
    indexLinks.forEach(indexLink => {
        indexLink.addEventListener("click", displayVideoGamesFilterByGenre)
    })
}


//-----------------Video Game Index --------------//

function displayVideoGamesFilterByGenre() {
    clearGenresIndex(); 
    clearHome(); 
    clearVideoGameShow();
    clearVideoGameEditForm();
    clearVideoGameCreateForm();
    let genreId = event.target.dataset.id 
    let genreName = event.target.innerHTML
    let videoGamesIndexAnchor = document.querySelector("#videoGamesIndex")
    videoGamesIndexAnchor.innerHTML = ""
    fetch(BASE_URL+`/genres/${genreId}/video_games`)
    .then(resp => resp.json())
    .then(videoGames => {
        if (videoGames.length === 0){
            videoGamesIndexAnchor.innerHTML = `
                <h2> There is not video Games for this genre right now. click on add new  video game at the bottom right of the screen to add some. </h2>
            `
        } else {
            videoGames.forEach(videoGame => {
                let newVideoGame = new VideoGame(videoGame)
                videoGamesIndexAnchor.innerHTML += newVideoGame.renderVideoGame(genreName)
            })
        }

        let createDivForLinkToCreateNewGame = `
          <div id="newVideoGameLink">
            <a href="#" data-genreId="${genreId}">Create New Video Game</a>
          <div>
          `
        videoGamesIndexAnchor.innerHTML += createDivForLinkToCreateNewGame

        attachClickToVideoGameIndex();
    })

}


class VideoGame {
    constructor(videoGame){
        this.id = videoGame.id;
        this.name = videoGame.name;
        this.new = videoGame.new; 
        this.pre_owned = videoGame.pre_owned;
        this.stars = videoGame.stars; 
        this.image = videoGame.image;
        this.company_name = videoGame.company_name;
        this.rated = videoGame.rated;
        this.genre_id = videoGame.genre_id;
    }

    renderVideoGame(nameOfGenre) {
        return `
        <div class="videoGameColumn">
        <div class="videoGameCard">
        <a href="#" data-genreId="${this.genre_id}" data-id="${this.id}"><img src="/Users/tinto/dev/flatiron/Projects/video-game-wishlist/video-game-wishlist-frontend/assets/images/${nameOfGenre}/${this.image}" width="220" height="263" alt="Image not Avaliable"></a>
          <p id="videoGameName"><b>${this.name}</b></p>
          <hr>
          <p id="videoGameNew">New: &nbsp;  <b>$${this.new}</b> </p>
          <hr>
          <p id="videoGamePreOwned" >Pre-Owned: &nbsp; <b>$${this.pre_owned}</b> </p>
          <hr>
          <p id="videoGameName">Stars: &nbsp;<b>${this.stars}/5</b></p>
        </div>
      </div>  
        `
    }
}

function attachClickToVideoGameIndex(){
    let newVideoGameLink = document.querySelector("#newVideoGameLink a")
    newVideoGameLink.addEventListener("click", displayCreateVideoGameForm)
    let videoGameShowLinks =  document.querySelectorAll(".videoGameCard a");
    videoGameShowLinks.forEach(videoGameShowLink => {
        videoGameShowLink.addEventListener("click", displayVideoGame)
    })
}


//-----------------Video Game New --------------------//

function displayCreateVideoGameForm() {
    clearVideoGamesIndex();
    clearVideoGameShow();
    clearVideoGameEditForm();
    let genreId = event.target.dataset.genreid
    let videoGameFormAnchor = document.querySelector("#videoGameForm"); 
    let formHtml = `
        <h2>Create New Game</h2>
        <p>Please fill in this form to create a new game</p>
        
        <form id="newGameForm">
            <div class="videoGameFormContainer">
                <label for="title">Title</label> <br>
                <input type="text" name="title" id="title"><br>
        
                <label for="new">New Price</label> <br>
                <input type="text" name="new" id="new"><br>
        
                <label for="preOwned">Pre Owned Price</label> <br>
                <input type="text" name="preOwned" id="preOwned"><br>
        
                <label for="stars">Stars</label> <br>
                <input type="text" name="stars" id="stars"><br>
        
                <label for="image">Image </label> <br>
                <input type="text" name="image" id="image"><br>
        
                <label for="companyName">Company Name</label> <br>
                <input type="text" name="companyName" id="companyName"><br>
                
                <label for="rated">Rated</label> <br>
                <input type="Text" name="rated"  id="rated">

                <input type="hidden" id="formGenreId" value="${genreId}">
        
                
                <input type="submit" id="submitBtn">
            </div>
        </form>
    
    `
    videoGameFormAnchor.innerHTML = formHtml; 
    document.querySelector("#newGameForm").addEventListener("submit", createVideoGame)
}

function createVideoGame(){
    event.preventDefault();
    let newVideoGameObj = {
        name: document.querySelector("#newGameForm #title").value,
        new: document.querySelector("#newGameForm #new").value,
        pre_owned: document.querySelector("#newGameForm #preOwned").value,
        stars: document.querySelector("#newGameForm #stars").value,
        image: document.querySelector("#newGameForm #image").value,
        company_name: document.querySelector("#newGameForm #companyName").value,
        rated: document.querySelector("#newGameForm #rated").value,
        genre_id: document.querySelector("#newGameForm #formGenreId").value,
    }
    
    // sending the created object to the backend
    fetch(BASE_URL+`/genres/${newVideoGameObj.genre_id}/video_games`, {
        method: "POST",
        body: JSON.stringify(newVideoGameObj),
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(newVideoGameObject => {
        let videoGameShowAnchor = document.querySelector("#videoGameShow")
        clearVideoGameCreateForm();
        let showNewVideoGame = new ShowVideoGame(newVideoGameObject);
        videoGameShowAnchor.innerHTML = showNewVideoGame.renderShowVideoGame();
    })

}




//---------------Show Video Game --------------------//

function displayVideoGame(){
    let genreId = event.target.parentElement.dataset.genreid
    let id = event.target.parentElement.dataset.id
    clearVideoGameCreateForm();
    clearVideoGamesIndex(); 
    clearHome();
    clearGenresIndex();
    clearVideoGameEditForm()
    let videoGameShowAnchor = document.querySelector("#videoGameShow")
    fetch(BASE_URL+`/genres/${genreId}/video_games/${id}`)
    .then(resp => resp.json())
    .then(videoGame => {
        let showVideoGame = new ShowVideoGame(videoGame);
        videoGameShowAnchor.innerHTML = showVideoGame.renderShowVideoGame(); 
        attachClicktoVideoGameShow();
    })
    
}

class ShowVideoGame {
    constructor(videoGame){
        this.id = videoGame.id;
        this.name = videoGame.name;
        this.new = videoGame.new;
        this.pre_owned = videoGame.pre_owned;
        this.stars = videoGame.stars;
        this.image = videoGame.image;
        this.company_name = videoGame.company_name;
        this.rated = videoGame.rated;
        this.genre_id = videoGame.genre_id;
    }


    renderShowVideoGame(){
        let nameOfGenre = correctGenre(this.genre_id)

        let showVideoGameHtml = `
        <div class="videoGameShowColumn">
            <div class="videoGameShowCard">
                <img src="/Users/tinto/dev/flatiron/Projects/video-game-wishlist/video-game-wishlist-frontend/assets/images/${nameOfGenre}/${this.image}" width="220" height="263" alt="Image not Avaliable"></a>
                <p id="videoGameName"><b>${this.name}</b> </p> <p>Rated: ${this.rated}</p>
                <hr>
                <p id="videoCompanyName">Company name: &nbsp;  <b>${this.company_name}</b> </p>
                <hr>      
                <p id="videoGameNew">New: &nbsp;  <b>$${this.new}</b> </p>
                <hr>
                <p id="videoGamePreOwned" >Pre-Owned: &nbsp; <b>$${this.pre_owned}</b> </p>
                <hr>
                <p id="videoGameName">Stars: &nbsp;<b>${this.stars}/5</b></p>
            
                <a href="#" data-genreId="${this.genre_id}" data-id="${this.id}" id="edit">Edit</a> &nbsp; &nbsp;
                <a href="#" data-genreId="${this.genre_id}" data-id="${this.id}" id="delete">Delete</a>
            </div>
        </div>  
        `

        return showVideoGameHtml;
    }
}


function attachClicktoVideoGameShow(){
    let editLink = document.querySelector(".videoGameShowCard #edit");
    editLink.addEventListener("click", editVideoGame)
    let deleteLink = document.querySelector(".videoGameShowCard #delete");
    deleteLink.addEventListener("click", deleteVideoGame)
}




//-----------------Delete Video Game--------------------// 

function deleteVideoGame() {
    event.preventDefault();
    let genreId = event.target.dataset.genreid;
    let id = event.target.dataset.id 
    fetch(BASE_URL+`/genres/${genreId}/video_games/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    }).then( () =>
    {
    let genreName = correctGenre(parseInt(genreId));
    let videoGamesIndexAnchor = document.querySelector("#videoGamesIndex")
    videoGamesIndexAnchor.innerHTML = ""
    fetch(BASE_URL+`/genres/${genreId}/video_games`)
    .then(resp => resp.json())
    .then(videoGames => {
        videoGames.forEach(videoGame => {
            let newVideoGame = new VideoGame(videoGame)
            videoGamesIndexAnchor.innerHTML += newVideoGame.renderVideoGame(genreName)
        })
        let createDivForLinkToCreateNewGame = `
          <div id="newVideoGameLink">
            <a href="#" data-genreId="${genreId}">Create New Video Game</a>
          <div>
          `
        videoGamesIndexAnchor.innerHTML += createDivForLinkToCreateNewGame

        attachClickToVideoGameIndex();
        clearVideoGameShow();
    })
  })

}


//-----------------Edit Video Game--------------------// 

function editVideoGame(){
    event.preventDefault();
    let genreId = event.target.dataset.genreid;
    let id = event.target.dataset.id 
    clearVideoGameShow();
    fetch(BASE_URL+`/genres/${genreId}/video_games/${id}`)
    .then(resp => resp.json())
    .then(videoGame => {
        let videoGameEditAnchor = document.querySelector("#videoGameEditForm")
        let editFormHtml = `
        <h2>Edit Video Game</h2>
        <p>Please fill in this form to update the video game</p>
        
        <form id="EditGameForm">
            <div class="videoEditGameFormContainer">
                <label for="title">Title</label> <br>
                <input type="text" name="title" id="title" value='${videoGame.name}'><br>
        
                <label for="new">New Price</label> <br>
                <input type="text" name="new" id="new" value='${videoGame.new}'><br>
        
                <label for="preOwned">Pre Owned Price</label> <br>
                <input type="text" name="preOwned" id="preOwned" value='${videoGame.pre_owned}'><br>
        
                <label for="stars">Stars</label> <br>
                <input type="text" name="stars" id="stars" value='${videoGame.stars}'><br>
        
                <label for="image">Image </label> <br>
                <input type="text" name="image" id="image" value='${videoGame.image}'><br>
        
                <label for="companyName">Company Name</label> <br>
                <input type="text" name="companyName" id="companyName" value='${videoGame.company_name}'><br>
                
                <label for="rated">Rated</label> <br>
                <input type="Text" name="rated"  id="rated" value='${videoGame.rated}'>
        
                <input type="hidden" id="formGenreId" value="${genreId}">
                <input type="hidden" id="formId" value="${id}">
        
                
                <input type="submit" id="submitBtn">
            </div>
        </form>
        `
        videoGameEditAnchor.innerHTML = editFormHtml;
        document.querySelector("#EditGameForm #submitBtn").addEventListener("click", updateVideoGame)
    })
}


function updateVideoGame() {
    event.preventDefault();
    let updatedVideoGameObj = {
        name: document.querySelector("#editGameForm #title").value,
        new: document.querySelector("#editGameForm #new").value,
        pre_owned: document.querySelector("#editGameForm #preOwned").value,
        stars: document.querySelector("#editGameForm #stars").value,
        image: document.querySelector("#editGameForm #image").value,
        company_name: document.querySelector("#editGameForm #companyName").value,
        rated: document.querySelector("#editGameForm #rated").value,
        genre_id: document.querySelector("#editGameForm #formGenreId").value,
        id: document.querySelector("#editGameForm #formId").value,
    }
    
    fetch(BASE_URL+`/genres/${updatedVideoGameObj.genre_id}/video_games/${updatedVideoGameObj.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify(updatedVideoGameObj)
    }) // this sends it to the update action for the contoller and then it reponds back with JSON
    .then(resp => resp.json() )
    .then(updatedVideoGameObject => {
        let showUpdatedVideoGame = new ShowVideoGame(updatedVideoGameObject);
        let videoGameShowAnchor = document.querySelector("#videoGameShow");
        videoGameShowAnchor.innerHTML = showUpdatedVideoGame.renderShowVideoGame(); 
        attachClicktoVideoGameShow();
        clearVideoGameEditForm();
    })
    
}


//-----------------Navigation--------------------// 
function attachClickToNavigationLinks(){
    let homeLink = document.querySelector("#homeLink");
    let genresLink = document.querySelector("#genresLink");
    homeLink.addEventListener("click", getHomePage);
    genresLink.addEventListener("click", getGenres)
}



//-------------Clearing the Page ----------------//
function clearHome(){
    let homeAnchor = document.querySelector("#home");
    homeAnchor.innerHTML = ""  
}

function clearGenresIndex(){
    let genresIndex = document.querySelector("#genresIndex");
    genresIndex.innerHTML = ""
}

function clearVideoGamesIndex(){
    let videoGamesIndexAnchor = document.querySelector("#videoGamesIndex")
    videoGamesIndexAnchor.innerHTML = ""
}

function clearVideoGameCreateForm() {
    let videoGameFormAnchor = document.querySelector("#videoGameForm"); 
    videoGameFormAnchor.innerHTML = ""
}

function clearVideoGameShow(){
    let videoGameShowAnchor = document.querySelector("#videoGameShow")
    videoGameShowAnchor.innerHTML = ""
}

function clearVideoGameEditForm() {
    let videoGameEditAnchor = document.querySelector("#videoGameEditForm")
    videoGameEditAnchor.innerHTML = "" 
}

//------------Misc functions ------------------------------//
function correctGenre(genreId){
    let nameOfGenre;
    switch(genreId) {
        case 1:
            nameOfGenre = "Action";
            break;
        case 2:
            nameOfGenre = "Adventure";
            break;
        case 3:
            nameOfGenre = "RPG";
            break;
        case 4:
            nameOfGenre = "Shooter";
            break;
        case 5:
            nameOfGenre = "Sports";
            break;
        case 6:
            nameOfGenre = "Stragedy";
            break; 
    } 

    return nameOfGenre
}
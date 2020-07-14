const BASE_URL = 'http://localhost:3000'

window.addEventListener("load", () => {
    getHomePage()
    attachClickToNavigationLinks() 
    
})
 
// --------------Home Page -----------------------//

function getHomePage(){
  clearGenresIndex()  
  clearVideoGamesIndex()
  let homeAnchor = document.querySelector("#home");
  homeAnchor.innerHTML = `
  <h1>Welcome to the Video Game Wishlist App </h1> 
  <h3> Select Genre buttom to get the App started </h3> 
  `  
}


// --------------Genres Index -----------------------//

function getGenres(){
    // will need to add more clear functions
    clearHome();
    clearVideoGamesIndex();
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
    let genreId = event.target.dataset.id 
    let genreName = event.target.innerHTML
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
        <a href="#" data-genreId="${this.genre_id}" data-id="${this.id}"><img src="/Users/tinto/dev/flatiron/Projects/video-game-wishlist/video-game-wishlist-frontend/assets/images/${nameOfGenre}/${this.image}" width="220" height="263"></a>
          <p id="videoGameName"><b>${this.name}</b></p>
          <hr>
          <p id="videoGameNew">New: &nbsp;  <b>${this.new}</b> </p>
          <hr>
          <p id="videoGamePreOwned" >Pre-Owned: &nbsp; <b>${this.pre_owned}</b> </p>
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
        preOwned: document.querySelector("#newGameForm #preOwned").value,
        stars: document.querySelector("#newGameForm #stars").value,
        image: document.querySelector("#newGameForm #image").value,
        company_name: document.querySelector("#newGameForm #companyName").value,
        rated: document.querySelector("#newGameForm #rated").value,
        genre_id: document.querySelector("#newGameForm #formGenreId").value,
    }
    
    // sending the created object to the backend
    fetch(BASE_URL+`/genres/${newVideoGameObj.genreId}/video_games`, {
        method: "POST",
        body: JSON.stringify(newVideoGameObj),
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(newVideoGameObject => {
        // need to do some work here 
    })

}




//---------------Show Video Game --------------------//

function displayVideoGame(){
    clearVideoGameCreateForm();
    clearVideoGamesIndex(); 
    let genreId = event.target.dataset.genreId
    let id = event.target.dataset.id
    let videoGameShowAnchor = doucment.querySelector("videoGameShow")
    fetch(BASE_URL+`genres/${genreId}/video_games/${id}`)
    .then(resp => resp.json())
    .then(videoGame => {
        videoGameShowAnchor.innerHTML = `
        
        `
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
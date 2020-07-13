const BASE_URL = 'http://localhost:3000'

window.addEventListener("load", () => {
    getHomePage()
    attachClickToNavigationLinks() 
    
})
 
// --------------Home Page -----------------------//

function getHomePage(){
  clearGenresIndex()  
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
    let videoGamesIndexAncher = document.querySelector("#videoGamesIndex")
    videoGamesIndexAncher.innerHTML = ""
    fetch(BASE_URL+`/genres/${genreId}/video_games`)
    .then(resp => resp.json())
    .then(videoGames => {
        let games = videoGames.map(videoGame => {
          return  `
          <div class="videoGameColumn">
            <div class="videoGameCard">
              <img src="/video-game-wishlist-frontend/assets/images/${genreName}/${videoGame.image}" width="220" height="263">
              <p class="title">${videoGame.name}</p>
            
              <hr>
            
              <p>New: ${videoGame.new} </p>
          
              <hr>
              <p>Pre-Owned: ${videoGame.pre_owned} </p>
            
              <hr>
              
              <p>Stars: ${videoGame.stars}/5</p>
      
            </div>
          </div>  
            `
        }).join("")
        videoGamesIndexAncher.innerHTML =  games
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
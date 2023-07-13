const title = document.querySelector("#first")
const year = document.querySelector(".year")
const rating = document.querySelector(".rating")
const about = document.querySelector(".about p")
const body = document.querySelector("body")
const recImg = document.querySelectorAll('.recommendation')
const suprise = document.querySelector('.featuresbtn')
const infoBtn = document.querySelectorAll(".moviebtn button")

let Movie_title = "John Wick: Chapter 4"

let movies = 0;

function getRandom(){
  let random = Math.floor(Math.random()* 20)
  return random
}

function update(id){

    console.log(id + " i get")
    if(id >= 20){
      id -= 20
    }

    console.log(id + " i get after change")
    let movie = movies.results[id]
    title.innerHTML = movie.title
    Movie_title = movie.title
    year.innerText = movie.release_date.slice(0,4)
    rating.innerText = movie.vote_average
    about.innerText = movie.overview
    let path = "https://image.tmdb.org/t/p/original/"+ movie.backdrop_path
    body.style.backgroundImage = `url(${path})`

    infoMovie(id)

}

function infoMovie(id){
  let index = id + 1

    for(let i = 0; i < recImg.length; i++){
      
      console.log(index + i)
      let recMovie = movies.results[index + i]
      console.log("value of in index " + (index + i))
      if(index + i > 19){
        index -= 19
      }
      // console.log(index)
      try {
        recImg[i].querySelector("img").src = "https://image.tmdb.org/t/p/w500/" + recMovie.backdrop_path
        recImg[i].querySelector('#recommend_tittle').innerText = recMovie.title
        recImg[i].addEventListener('click', () => {
          console.log(`updated with ${recMovie.title} done...`)
          update(index + i)
        })
      } catch (error) {
        console.log(i + " error index")
      }
}

    // recImg.forEach( function (element)  {
    //   let recMovie = movies.results[index]
    //   // console.log(index)
    //   element.querySelector("img").src = "https://image.tmdb.org/t/p/w500/" + recMovie.backdrop_path
    //   element.querySelector('#recommend_tittle').innerText = recMovie.title

    //   index++

    // });
}

  function getResponse(){

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTVhZWEzYzU3NjQxODRkMDg2MDk4YjQyMzRlOTExMCIsInN1YiI6IjYxMTI5MmFhMjk3NWNhMDA1ZDRkNjg0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TB6-lyIIah-kAsL2PMl1dt2dS3v3JwWJiHF9cXFi75E'
      }
    };
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => {
        console.log("fetching....")
        // console.log(response)
        movies = response
        let random = Math.floor(Math.random()* 10)
        // return response
        update(random)

        })
    .catch(err => console.error(err));
  }


// suprise.onclick = getResponse
suprise.addEventListener('click', () => {
  let random = Math.floor(Math.random()* 10)
  update(random)
})


infoBtn[0].onclick = function() {
  location.assign(`https://www.youtube.com/results?search_query=${Movie_title}+trailer`)
}

infoBtn[1].onclick = function () {
  console.log("hello")
  location.assign(`https://www.imdb.com/find/?q=${Movie_title}`);
}

getResponse()
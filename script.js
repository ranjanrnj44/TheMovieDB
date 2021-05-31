//getting path,key
let apiKey = '04c35731a5ee918f014970082a0088b1';
let apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
let imgPath = "https://image.tmdb.org/t/p/w1280";
let searchApi = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

getMovies(apiUrl);

//display
async function getMovies(url) {
    let response = await fetch(url);
    let convert_json = await response.json();
    console.log(convert_json);

    let { results } = convert_json;
    searchedMovies(results);
}

//get the color  based on rating.
function getColor(voting) {
    if (voting >= 8) {
        return 'green';
    }
    else if (voting >= 5) {
        return 'yellow';
    }
    else {
        return 'red';
    }
}

//searched movies
function searchedMovies(search_result) {
    let parent_container = document.querySelector("section");
    parent_container.innerHTML = ''; //clear-up each time so the movies will not get appended to the existing one

    search_result.forEach((item) => {
      let { poster_path, title, overview, vote_average } = item; // destructured
          
      let movie_content = document.createElement("div");
      movie_content.classList.add("movie_container");
      movie_content.innerHTML = `
                        <img src="${imgPath + poster_path}" alt="${title}" class="image">
                            
                            <div class="overlay_movie_detail">
                                <p>${overview}</p>
                            </div>

                            <div class="movie_information">
                                <h3 class="left">${title}</h3>
                                <h3 class="right ${getColor(
                                  vote_average
                                )}">${vote_average}</h3>
                            </div>
            `;
      parent_container.appendChild(movie_content);
    });

}

//search API implementation
let form = document.querySelector("form");
let input = document.querySelector("input");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchValue = input.value;
    if (searchValue) {
        console.log(searchValue);
        getMovies(searchApi + searchValue);
        searchValue = '';
        input.focus();
    }
});
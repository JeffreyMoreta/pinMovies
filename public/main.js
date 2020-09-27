let trash = document.getElementsByClassName("trash");

let movie = {
  searchMovies: () =>{
    let movieName = document.querySelector("#search").value;
    fetch(`searchMovies?movieName=${movieName}`)
      .then(response => response.json())
      .then(data => {
        movie.displayAllMovie(data)
        movie.setUpBookMarkButtons()
      })
  },
  displayAllMovie: (data) =>{
    document.querySelector("#movieResults").innerHTML = `
    <div class="row mx-auto">${data.Search.map(x =>{
            return( `
              <div class="col-md-6">
                <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" style="background-color: white;">
                  <div class="col p-4 d-flex flex-column position-static">
                    <h4 class="d-inline-block mb-2">${x.Year.split('–')[0]}</h4>
                    <span class="title mb-4">${x.Title}</span>
                    <button class="pins btn btn-secondary my-2 data-title='${x.Title}' data-year='${x.Year.split('–')[0]}' "><i class="fas fa-thumbtack"></i></button>
                  </div>
                  <div class="col-auto d-none d-lg-block">
                    <img src="${x.Poster}" alt="${x.Title}" style="width: 200px; height:250px;"/>
                  </div>
                </div>
              </div>
            `)}).join("")}
    </div>`
  },
  setUpBookMarkButtons: () => {
    let pins = document.getElementsByClassName("pins")
    Array.from(pins).forEach(function (element) {
      element.addEventListener('click', function () {
        console.log(element.getAttribute(".data-title"))
        // console.log(element.dataset.year)
        // console.log()
      //   fetch('addMovie', {
      //       method: 'post',
      //       headers: {
      //         'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify({
      //         'name': 'admin',
      //         'title': title,
      //         'year': year
      //       })
      //     })
          // .then(function (response) {
          //   window.location.reload()
          // })
      })
    })
 }
}

let searchBtn = document.querySelector("#searchBtn").addEventListener('click', movie.searchMovies)

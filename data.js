const API_KEY = "79a74590457937928e9fe7824aa3fb3d";
    const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

    function getPopularMovies() {
        try {
          $.ajax({
            url: API_URL,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
              let html = "";
              let linkImage = "https://image.tmdb.org/t/p/w500";
      
              $.each(data.results, function(i, result) {
                id = "genre" + i;
                html += `<div class="col">
                          <div class="card mt-4" style="width: 18rem;">
                              <img src="${linkImage +
                                result.poster_path}" class="card-img-top" alt="...">
                              <div class="card-body">
                               <h5 class="card-title">${
                                 result.original_title
                               }</h5>
                               <p class="card-text" id="${id}">${getGenres(
                                 id,
                                 result.genre_ids
                               )}</p>
                               <p class="card-text">${result.overview}</p>
                                   <a href="detailfilm.html?id=${result.id}" class="btn btn-primary" id="fetch_button">Detail Film</a>
                               </div>
                          </div>
                       </div>`;
              });
              $("#listMovie").html(html);
            },
            error: function(error) {
              console.error(error);
            }
          });
        } catch (error) {
          console.error(error);
        }
      }
      
getPopularMovies();

    const genre_url = "genre.json";

    function getGenres(id, number) {
        try {
          $.ajax({
            url: genre_url,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
              let html = "";
              id = '#' + id;
              $.each(data.genres, function(i, result) {
                if (number.includes(result.id)) {
                    if ( html !== ""){
                        html += ", ";
                      }
                  html += `<span> <a href="?genre=${result.id}"> ${result.name} </a> </span>`;
                }
                // console.log(i);
              });
              $(id).html(html);
            },
            error: function(error) {
              console.error(error);
            }
          });
        } catch (error) {
          console.error(error);
        }
      }
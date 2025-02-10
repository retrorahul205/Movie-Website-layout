//Swiper
var swiper = new Swiper(".popular-content", {
    slidesPerView:1,
    spaceBetween: 10,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints:{
        280:{
            slidesPerView:1,
            spaceBetween:10,
        },
        320:{
            slidesPerView:2,
            spaceBetween:10,
        },
        510:{
            slidesPerView:2,
            spaceBetween:10,
        },
        758:{
            slidesPerView:3,
            spaceBetween:15,
        },
        900:{
            slidesPerView:4,
            spaceBetween:20,
        },
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const movieContainer = document.querySelector(".swiper-wrapper");
  
    fetch("http://localhost:3000/api/movies")
      .then((response) => response.json())
      .then((movies) => {
        console.log("Movies received:", movies); // Log the full response
  
        movieContainer.innerHTML = ""; // Clear existing content
  
        // Check if movies 1-8 are included
        const validMovies = movies.filter((movie) => movie.id >= 1 && movie.id <= 8);
        console.log("Valid movies (IDs 1-8):", validMovies); // Log valid movies
  
        validMovies.forEach((movie) => {
          if (!movie.name || !movie.poster) {
            console.warn("Invalid movie data:", movie);
            return;
          }
  
          const movieSlide = document.createElement("div");
          movieSlide.classList.add("swiper-slide");
  
          movieSlide.innerHTML = `
            <div class="movie-box">
                <img src="${movie.poster}" alt="${movie.name}" class="movie-box-img">
                <div class="box-text">
                    <h2 class="movie-title">${movie.name}</h2>
                    <span class="movie-type">${movie.type}</span>
                    <a href="player.html?id=${movie.id}" class="watch-btn play-btn">
                        <i class='bx bx-right-arrow'></i>
                    </a>
                </div>
            </div>
          `;
  
          movieContainer.appendChild(movieSlide);
        });
      })
      .catch((error) => console.error("Error fetching movies:", error));
  });
  

  // Movies and Shows area
  document.addEventListener("DOMContentLoaded", () => {
    const moviesContent = document.querySelector(".movies-content"); // Corrected selector

    async function fetchMovies() {
        try {
            const response = await fetch("movies.json"); // Update with actual API if needed
            const movies = await response.json();

            // Filter out movies with an ID less than 9
            const filteredMovies = movies.filter(movie => movie.id >= 9 && movie.id <= 16);

            moviesContent.innerHTML = ""; // Clear existing content

            filteredMovies.forEach(movie => {
                if (!movie.name || !movie.poster) {
                    console.warn("Invalid movie data:", movie);
                    return;
                }

                const movieBox = document.createElement("div");
                movieBox.classList.add("movie-box");

                movieBox.innerHTML = `
                    <img src="${movie.poster}" alt="${movie.name}" class="movie-box-img">
                    <div class="box-text">
                        <h2 class="movie-title">${movie.name}</h2>
                        <span class="movie-type">${movie.type}</span>
                        <a href="play-page.html?movieId=${movie.id}" class="watch-btn play-btn">
                            <i class='bx bx-right-arrow'></i>
                        </a>
                    </div>
                `;

                moviesContent.appendChild(movieBox);
            });

        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    }

    fetchMovies();
});


//Home page 
document.addEventListener("DOMContentLoaded", () => {
    const homeVideo = document.getElementById("home-video");
    const videoSource = homeVideo.querySelector("source");
    const homeTitle = document.getElementById("home-title");
    const releaseDate = document.getElementById("release-date");

    fetch("http://localhost:3000/api/movies")
        .then(response => response.json())
        .then(movies => {
            console.log("Movies fetched:", movies); // Debugging

            // Filter movies with IDs 17-22 and ensure they have a video URL
            const filteredMovies = movies.filter(movie => movie.id >= 17 && movie.id <= 22 && movie.video);

            if (filteredMovies.length === 0) {
                console.warn("No movies found with a video URL.");
                return;
            }

            // Select a random movie from the filtered list
            const selectedMovie = filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
            console.log("Selected Movie:", selectedMovie);  // Debugging

            // Set video source
            videoSource.src = selectedMovie.video;
            homeVideo.load(); // Reload video to apply new source

            // Set movie title and release date
            homeTitle.textContent = selectedMovie.name;
            releaseDate.textContent = `Releasing ${selectedMovie.release_date}`;
        })
        .catch(error => console.error("Error fetching movie data:", error));
});

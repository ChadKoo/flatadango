function fetchMovies() {
    fetch('https://raw.githubusercontent.com/ChadKoo/flatadango/master/db.json')  // Correct URL
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById("movie-list");
            movieList.innerHTML = '';  // Clear any existing content

            data.films.forEach(movie => {  // Adjusted for correct data structure
                const movieItem = document.createElement("li");
                movieItem.innerHTML = `
                    <h3>${movie.title}</h3>
                    <img src="${movie.poster}" alt="${movie.title}" style="width: 100px;">
                    <button data-id="${movie.id}">View Details</button>
                `;

                // Attach the event listener using data-id attribute
                const button = movieItem.querySelector('button');
                button.addEventListener('click', () => {
                    const movieId = button.getAttribute('data-id');
                    viewMovieDetails(movieId, data.films);  // Pass the full movie data to filter locally
                });

                movieList.appendChild(movieItem);
            });
        })
        .catch(error => console.error("Error fetching films:", error));
}

// Show details of a selected movie
function viewMovieDetails(id, films) {
    const movie = films.find(film => film.id === id);  // Filter movie from the passed array

    if (movie) {
        // Populate movie details
        document.getElementById('movie-title').textContent = movie.title;
        document.getElementById('movie-poster').src = movie.poster;
        document.getElementById('movie-runtime').textContent = `Runtime: ${movie.runtime} minutes`;
        document.getElementById('movie-showtime').textContent = `Showtime: ${movie.showtime}`;
        document.getElementById('available-tickets').textContent = movie.capacity - movie.tickets_sold;

        // Set movieId in the buy ticket button (for later use)
        document.getElementById('buy-ticket-btn').dataset.movieId = movie.id;

        // Display the movie details section on the right
        document.getElementById('movie-details').style.display = 'block';
    }
}

// Buy ticket functionality
document.getElementById('buy-ticket-btn').addEventListener('click', function () {
    const availableTicketsElement = document.getElementById('available-tickets');
    let availableTickets = parseInt(availableTicketsElement.textContent);

    if (availableTickets > 0) {
        // Decrease the available tickets (locally)
        availableTicketsElement.textContent = availableTickets - 1;

        // Update the server with the new tickets sold (this won't work with GitHub Pages)
        // You can simulate a local change but it won't persist on GitHub Pages
        updateTicketsSold();
    } else {
        alert("No more tickets available!");
    }
});

// Function to simulate updating tickets sold (GitHub doesn't support PUT for raw files)
function updateTicketsSold() {
    const movieId = document.getElementById('buy-ticket-btn').dataset.movieId;  // Get movie ID from the button

    // Simulate the ticket update (this will not persist on GitHub)
    console.log(`Ticket sold for movie ID: ${movieId}`);
    // You would ideally need a backend or database to persist this update.
}

// Initialize movie list
fetchMovies();

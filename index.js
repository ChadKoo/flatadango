function fetchMovies() {
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(movies => {
            const movieList = document.getElementById("movie-list");
            movieList.innerHTML = '';  // Clear any existing content

            movies.forEach(movie => {
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
                    viewMovieDetails(movieId);
                });

                movieList.appendChild(movieItem);
            });
        })
        .catch(error => console.error("Error fetching films:", error));
}

// Show details of a selected movie
function viewMovieDetails(id) {
    fetch(`http://localhost:3000/films/${id}`)
        .then(response => response.json())
        .then(movie => {
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
        })
        .catch(error => console.error('Error fetching movie details:', error));
}

// Buy ticket functionality
document.getElementById('buy-ticket-btn').addEventListener('click', function () {
    const availableTicketsElement = document.getElementById('available-tickets');
    let availableTickets = parseInt(availableTicketsElement.textContent);

    if (availableTickets > 0) {
        // Decrease the available tickets
        availableTicketsElement.textContent = availableTickets - 1;

        // Update the server with the new tickets sold
        updateTicketsSold();
    } else {
        alert("No more tickets available!");
    }
});

// Function to update tickets sold on the server
function updateTicketsSold() {
    const movieId = document.getElementById('buy-ticket-btn').dataset.movieId;  // Get movie ID from the button
    fetch(`http://localhost:3000/films/${movieId}`)
        .then(response => response.json())
        .then(movie => {
            const updatedMovie = {
                ...movie,
                tickets_sold: movie.tickets_sold + 1  // Increment tickets sold
            };

            fetch(`http://localhost:3000/films/${movieId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedMovie)
            })
                .then(response => response.json())
                .then(updatedMovie => {
                    console.log('Tickets sold updated:', updatedMovie);
                    document.getElementById('available-tickets').textContent = updatedMovie.capacity - updatedMovie.tickets_sold;
                })
                .catch(error => console.error('Error updating ticket data:', error));
        })
        .catch(error => console.error('Error fetching movie data:', error));
}

// Initialize movie list
fetchMovies();

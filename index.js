function fetchMovies() {
    fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(movies => {
            const movieList = document.getElementById("movie-list");
            movies.forEach(movie =>{
                const movieItem = document.createElement("li");
                movieItem.innerHTML = 
                `<h3>${movie.title}</h3>
                <img src="${movie.poster}" alt="${movie.title}" style ="width: 100px;">
                <button onclick ="viewMovieDetails(${movie.id})">View Details</button>`;
                movieList.appendChild(movieItem)
        })})
    .catch(error=> console.error("Error fetching films:", error));
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
                })
                .catch(error => console.error('Error fetching movie details:', error));
        }
        
        // Buy ticket functionality
        document.getElementById('buy-ticket-btn').addEventListener('click', function() {
            let availableTicketsElement = document.getElementById('available-tickets');
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
            const movieId = document.getElementById('movie-title').textContent;  // Assuming the movie title contains the movie ID
            fetch(`http://localhost:3000/films/${movieId}`)
                .then(response => response.json())
                .then(movie => {
                    const updatedMovie = {
                        ...movie,
                        tickets_sold: movie.tickets_sold + 1
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
                });
        }
        
        // Initialize movie list
        fetchMovies(); 

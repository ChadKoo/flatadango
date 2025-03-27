# flatadango

## Project Overview

Flatadango is a movie ticketing system where users can browse available movies, view detailed information about each movie, and purchase tickets. It provides an easy-to-use interface for users to check available movies, see details like showtimes and ticket availability, and purchase tickets online. The system also displays a "Sold-out" message if no tickets are available for a movie


## Features

- **Movie Menu**: A menu on the left side displays all available movies.
- **Movie Details**: Clicking on a movie displays detailed information, including its poster, title, runtime, showtime, and available tickets.
- **Ticket Purchase**: Users can buy tickets for available movies.
- **Sold-out Error**: If a movie is sold out, an error message is displayed indicating no available tickets.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Features](#features)




## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rsvp-application.git

2.  Navigate into the project directory:
    cd flatadango

3. Install the necessary dependencies:
    npm install
    
4. Set up environment variables: i.e. Add a db.json file in the root directory and prepare the file for new information.

5. Run the project:
    npm install -g json-server
    json-server --watch db.json


6. This will start the server, and you can view the application in your browser at http://localhost:3000.

## Usage
Once the project is running locally, open your browser and navigate to http://localhost:3000. You will be able to:

Browse the available movies.

View detailed movie information, including showtimes and available tickets.

Search for movies by title or genre.

Purchase tickets for available movies (if there are tickets in stock).

View error messages if a movie is sold out.




## Technologies 

Frontend: HTML, CSS, JavaScript

Backend: Node.js



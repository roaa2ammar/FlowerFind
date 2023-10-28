document.addEventListener("DOMContentLoaded", function(){
    const heading = document.querySelector('.welcome');
    heading.style.color= "black";
    heading.style.transform= "scale(1)";
});

document.addEventListener("DOMContentLoaded", function() {
    const dropContainer = document.getElementById("dropContainer");
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");

    dropContainer.addEventListener("dragover", function(e) {
        e.preventDefault();
        dropZone.classList.add('highlight');
    });

    dropContainer.addEventListener("dragleave", function() {
        dropZone.classList.remove('highlight');
    });

    dropContainer.addEventListener("drop", function(e) {
        e.preventDefault();
        dropZone.classList.remove('highlight');

        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener("change", function() {
        const files = fileInput.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        // Handle the dropped or selected files here
        console.log(files);
        // You can add further processing for the files, such as uploading to a server or displaying them on the page.
    }
});

function openNav() {
    document.getElementById("homeSidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("homeSidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Functionality for login/signup form
    // Add event listeners, handle form submissions, etc.

    // Dummy data for scoreboard (replace with actual user data)
    const scores = [
        { username: "user1", score: 100 },
        { username: "user2", score: 200 },
        // Add more user scores as needed
    ];

    const scoreboardElement = document.getElementById("scoreboard");

    // Function to display scores on the scoreboard
    function displayScores() {
        scoreboardElement.innerHTML = ""; // Clear previous scores
        scores.forEach((user) => {
            const userScoreElement = document.createElement("div");
            userScoreElement.innerText = `${user.username}: ${user.score}`;
            scoreboardElement.appendChild(userScoreElement);
        });
    }

    // Dummy function to simulate fetching user scores from the server
    function fetchUserScores() {
        // Assume an API endpoint /api/scores returns user scores
        // Make a fetch request to the server to get user scores
        // Replace the following code with actual fetch request
        setTimeout(() => {
            displayScores();
        }, 1000); // Simulating delay for API response (1 second)
    }

    // Call the function to initially display user scores
    fetchUserScores();
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get user input
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Perform authentication (this is where you would send the data to a server)

    // For now, log the input to the console
    console.log("Username:", username);
    console.log("Password:", password);
});

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const saltRounds = 10;

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Hash the password before storing it in the database
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            // Store 'username' and 'hash' in the database
            // ...
            res.send('User registered successfully!');
        });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Retrieve the hashed password and salt from the database based on 'username'

    // Compare the entered password with the stored hash
    bcrypt.compare(password, storedHash, (err, result) => {
        if (result) {
            // Passwords match, user is authenticated
            res.send('Login successful!');
        } else {
            // Passwords do not match, authentication failed
            res.status(401).send('Authentication failed');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});


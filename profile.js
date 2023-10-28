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

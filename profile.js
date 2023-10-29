//Login features

// Firebase configuration
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
// Initialize the FirebaseUI Widget using Firebase
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var firebase = require('firebase');
var firebaseui = require('firebaseui');

ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });

  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
      }
    ],
    // Other config options...
  });

  // Is there an email link sign-in?
if (ui.isPendingRedirect()) {
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  // This can also be done via:
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      // List of OAuth providers supported.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  // The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

// Temp variable to hold the anonymous user data if needed.
var data = null;
// Hold a reference to the anonymous current user.
var anonymousUser = firebase.auth().currentUser;
ui.start('#firebaseui-auth-container', {
  // Whether to upgrade anonymous users should be explicitly provided.
  // The user must already be signed in anonymously before FirebaseUI is
  // rendered.
  autoUpgradeAnonymousUsers: true,
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // signInFailure callback must be provided to handle merge conflicts which
    // occur when an existing credential is linked to an anonymous user.
    signInFailure: function(error) {
      // For merge conflicts, the error.code will be
      // 'firebaseui/anonymous-upgrade-merge-conflict'.
      if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
        return Promise.resolve();
      }
      // The credential the user tried to sign in with.
      var cred = error.credential;
      // Copy data from anonymous user to permanent user and delete anonymous
      // user.
      // ...
      // Finish sign-in after data is copied.
      return firebase.auth().signInWithCredential(cred);
    }
  }
});




//Home page title effect (not working yet)
document.addEventListener("DOMContentLoaded", function(){
    const heading = document.querySelector('.welcome');
    heading.style.color= "black";
    heading.style.transform= "scale(1)";
});

//Menu open and close
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


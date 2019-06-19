/* File description:
This is the source code file 'article-script.js'. */

$(document).ready(function() {
    /*--- FIREBASE ---*/
    // Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBHYeMuQrg0QDWKc4yk4I_4hTi0F6uSXig",
        authDomain: "webfinalproject-2a7fa.firebaseapp.com",
        databaseURL: "https://webfinalproject-2a7fa.firebaseio.com",
        projectId: "webfinalproject-2a7fa",
        storageBucket: "webfinalproject-2a7fa.appspot.com",
        messagingSenderId: "867138850890",
        appId: "1:867138850890:web:f0342ceb7383c9af"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Manager user
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            $(".login").css({ "display": "none" });
            $(".signup").css({ "display": "none" });
            $(".logged-in").css({ "display": "table" });

            // Modify logged in with the user information
            $(".logged-in p").text("You have successfully logged in as '" + user.email + "'. Please fill your questionaire inside the box below and submit your request.");

            // Set the name sent by the form as the user email address
            $("#pb-form input").val(user.email);
        } else {
            // No user is signed in.
            $(".login").css({ "display": "table" });
            $(".signup").css({ "display": "none" });
            $(".logged-in").css({ "display": "none" });
        }
    });

    /*--- LOGIN ---*/
    $(".login button").on("click", function() {
        /* LOGIN */
        const email = $("#login_email_field").val();
        const password = $("#login_password_field").val();

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            window.alert("Error: " + errorMessage);
        });
    });

    $("#logout").on("click", function() {
        /* SIGN OUT */
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.alert("You have logged out successfully!");
        }).catch(function(error) {
            // An error happened.
            window.alert("Error:" + error);
        });
    });

    /*--- SIGN UP ---*/
    $(".signup button").on("click", function() {
        /* SIGN IN */
        const email = $("#signup_email_field").val();
        const password = $("#signup_password_field").val();

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            window.alert("Error: " + errorMessage);
        });
    });

    /* LOGIN/ SIGN UP */
    // Hide logged in and sign up at first
    $(".logged-in").css({ "display": "none" });
    $(".signup").css({ "display": "none" });

    // Show sign up, hide login
    $(".login a").on("click", function() {
        $(".login").css({ "display": "none" });
        $(".signup").css({ "display": "table" });
    });

    // Show login, hide signup
    $(".signup a").on("click", function() {
        $(".login").css({ "display": "table" });
        $(".signup").css({ "display": "none" });
    });


    /*-----------------------------FORM-----------------------------*/
    /*
        ~ WRITE DATA TO GOOGLE SHEETS ON SUBMIT BUTTON BEING CLICKED
        ~ Remark:
        ~ Do make sure that the attribute 'name' of each input in HTML is similar to each column name of the Google Sheets
    */
    const url = 'https://script.google.com/macros/s/AKfycbzhG7xvSnW3KyPUgJ2MdZ7-qaKhOU2E7-4_oEgdAdoyDS09sXBI/exec';

    $('#submit-form').on('click', function(e) {
        e.preventDefault();

        var jqxhr = $
            .ajax({
                url: url,
                method: "GET",
                dataType: "json",
                data: $("#pb-form").serializeObject()
            })
            .done(
                // Reload website
                // () => {
                //     location.reload();
                // }
                () => {
                    window.alert("Your request has been submitted successfully!");
                }
            );
    });

});
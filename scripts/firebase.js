var firebaseConfig = {
    apiKey: "AIzaSyC8JH_xK-n3RPChWBWyoGrzD7N3vmQ7YbU",
    authDomain: "flameseeker-56fb5.firebaseapp.com",
    databaseURL: "https://flameseeker-56fb5.firebaseio.com",
    projectId: "flameseeker-56fb5",
    storageBucket: "flameseeker-56fb5.appspot.com",
    messagingSenderId: "121065227260",
    appId: "1:121065227260:web:02a46a9c0cbbfc86656879"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

function firebaseLogin(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorCode + ': ' + errorMessage);
        });
}
const loginBox = document.querySelector("#login-box");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginButton = document.querySelector("#login-button");

const USERNAME = "npacivitas";
const PASSWORD = "neoprodigyacademy";

password.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        login();
    }
});

window.onload = () => {
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");

    loginBox.classList.remove("hidden");
    loginBox.classList.add("visible");

    loginButton.addEventListener("click", login);
}

function login() {
    if (username.value.toLowerCase() == USERNAME && password.value == PASSWORD) {
        closeOverlay();
        loadDatabase();
    } else {
        alert("Username or password wrong,\nPlease try again.");
    }
}

function closeOverlay() {
    overlayBoxes.forEach((box) => {
        overlay.classList.remove("flex");
            overlay.classList.add("hidden");
            box.classList.remove("visible");
            box.classList.add("hidden");
    })
}
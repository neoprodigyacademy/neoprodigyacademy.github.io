const loginBox = document.querySelector("#login-box");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginButton = document.querySelector("#login-button");

const USERNAME = "npacivitas";
const PASSWORD = "neoprodigyacademy";

password.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        login();
    }
});

function showLoginModal() {
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");

    loginBox.classList.remove("hidden");
    loginBox.classList.add("visible");

    loginButton.addEventListener("click", login);
}

window.onload = () => {
    showWarning();
}

function login() {
    if (username.value.toLowerCase() == USERNAME && password.value == PASSWORD) {
        closeOverlay();
        loadSingleDatabase();
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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
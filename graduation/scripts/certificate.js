const WIDTH = 1140;
const HEIGHT = 817;
const FONT_SIZE = 30;
const IMG_CERTIFICATE = "../assets/certificate.png";
const PP_WIDTH = 150;
const PP_HEIGHT = 180;

const canvas = document.querySelector("#canvas");
const c2D = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;


function drawImage(url, name) {
    const image = new Image();
    image.src = url;
    image.onload = () => {
        c2D.drawImage(image, 0, 0, canvas.width, canvas.height);
        drawName(name, "Niconne");
        if (profilePicture) {
            c2D.drawImage(profilePicture, 180, 180, PP_WIDTH,PP_HEIGHT);
        }
    }
}

function drawName(name, font = "Helvetica") {
    c2D.textAlign = "center";
    c2D.font = FONT_SIZE + "px " + font;
    c2D.fillText(name, WIDTH / 2, (HEIGHT - FONT_SIZE) / 2);
}

window.onload = () => {
    drawImage(IMG_CERTIFICATE, "");
}

submitName.onclick = () => { drawImage(IMG_CERTIFICATE, name.value) };
name.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        drawImage(IMG_CERTIFICATE, name.value);
    }
});
const WIDTH = 1280;
const HEIGHT = 913;
const FONT_SIZE = 30;

const canvas = document.querySelector("#canvas");
const c2D = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;

const IMG_CERTIFICATE = "../assets/certificate.png";

function drawImage(url, name) {
    const image = new Image();
    image.src = url;
    image.onload = () => {
        c2D.drawImage(image, 0, 0, canvas.width, canvas.height);
        drawName(name);
    }
}

function drawName(name) {
    c2D.textAlign = "center";
    c2D.font = FONT_SIZE + "px Helvetica";
    c2D.fillText(name, WIDTH / 2, (HEIGHT - FONT_SIZE) / 2);
}

window.onload = () => {
    drawImage("../assets/certificate.png", "");
}

submitName.onclick = () => { drawName(name.value) };
name.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        drawName(name.value);
    }
});
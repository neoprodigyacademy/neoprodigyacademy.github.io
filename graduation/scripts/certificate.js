const IMG_CERTIFICATE = "../assets/certificate.png";
const WIDTH = 1000;
const HEIGHT = 1425;
const FONT_SIZE = 46;
const NAME_HEIGHT_OFFSET = 450;

const PP_WIDTH = 96;
const PP_HEIGHT = 128;

const canvas = document.querySelector("#canvas");
const c2D = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;


function drawCertificate(url, name) {
    const image = new Image();
    image.src = url;
    image.onload = () => {
        c2D.drawImage(image, 0, 0, canvas.width, canvas.height);
        drawName(name, "Alegreya");
        if (profilePicture) {
            c2D.drawImage(profilePicture, 320, 1190, PP_WIDTH,PP_HEIGHT);
        }
    }
}

function drawName(name, font = "Helvetica") {
    c2D.textAlign = "center";
    c2D.font = FONT_SIZE + "px " + font;
    c2D.fillText(name, WIDTH / 2, NAME_HEIGHT_OFFSET);
}

window.onload = () => {
    drawCertificate(IMG_CERTIFICATE, "");
}

function submit() {
    graduationKit.style.display = "block";
    drawCertificate(IMG_CERTIFICATE, name.value)
}

submitName.onclick = submit;
name.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submit();
    }
});
const IMG_CERTIFICATE = "../assets/certificate.png";
const CERT_WIDTH = 1000;
const CERT_HEIGHT = 1425;
const FONT_SIZE = 46;
const NAME_HEIGHT_OFFSET = 450;

const PP_WIDTH = 96;
const PP_HEIGHT = 128;

const canvas = document.querySelector("#canvas");
const c2D = canvas.getContext("2d");
canvas.width = CERT_WIDTH;
canvas.height = CERT_HEIGHT;

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
    c2D.fillText(name, CERT_WIDTH / 2, NAME_HEIGHT_OFFSET);
}

window.onload = () => {
    drawCertificate(IMG_CERTIFICATE, "");
}

const downloadCertificate = document.querySelector("#certificate-download");

downloadCertificate.onclick = () => {
    var url = canvas.toDataURL("image/png");
    downloadCertificate.href = url;
}
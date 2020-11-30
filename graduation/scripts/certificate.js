const IMG_CERTIFICATE = "../assets/certificate_";
const CERT_WIDTH = 1000;
const CERT_HEIGHT = 1425;
const FONT_SIZE = 46;
const NAME_HEIGHT_OFFSET = 430;

const PP_WIDTH = 877 - 736;
const PP_HEIGHT = 465 - 276;

function drawCertificate(url, name, canvas) {
    let c2D = canvas.getContext("2d");
    canvas.width = CERT_WIDTH;
    canvas.height = CERT_HEIGHT;

    const image = new Image();
    image.src = url;
    image.onload = () => {
        c2D.drawImage(image, 0, 0, canvas.width, canvas.height);
        drawName(name, c2D, "Alegreya");
    }
}

function drawName(name, context, font = "Alegreya") {
    context.textAlign = "center";
    context.font = FONT_SIZE + "px " + font;
    context.fillText(name, CERT_WIDTH / 2, NAME_HEIGHT_OFFSET);
}
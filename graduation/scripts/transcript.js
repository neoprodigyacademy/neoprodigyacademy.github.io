const TRANSCRIPT_PREFIX = "../assets/transcript_";
const TRANSCRIPT_SUFFIX = ".png";

const TRANSCRIPT_WIDTH = 1000;
const TRANSCRIPT_HEIGHT = 1425;

const trCanvas = document.querySelector("#transcript-canvas");
const trC2D = trCanvas.getContext("2d");
trCanvas.width = TRANSCRIPT_WIDTH;
trCanvas.height = TRANSCRIPT_HEIGHT;

function generateScore(name) {
    var output = [];
    generateRawScore(name).forEach((i) => {
        output.push(String.fromCharCode(parseInt(i) + 65));
    });

    return output;
}

function generateGPA(name) {
    var output = [];
    generateRawScore(name).forEach((i) => {
        output.push(4 - parseInt(i));
    })
    return output;
}

function generateRawScore(name) {
    var aggregate = name.hashCode().toString(3);
    return aggregate.split('');
}

function sumGPA(name) {
    var gpa = 0;
    generateGPA(name).forEach((score) => {
        gpa += score;
    })
    return gpa;
}

function drawTranscript(url, name) {
    const image = new Image();
    image.src = url;
    image.onload = () => {
        trC2D.drawImage(image, 0, 0, trCanvas.width, trCanvas.height);
        drawTranscriptName(name);
        drawScore(generateScore(name));
    }
}

function drawTranscriptName(name) {
    trC2D.textAlign = "left";
    trC2D.font = "20px Alegreya";
    trC2D.fillText(name.toUpperCase(), 193, 245);
    trC2D.fillText(name.hashCode(), 193, 280);
}

function drawScore(scores) {
    trC2D.textAlign = "center";
    trC2D.font = "21px Alegreya";

    for (i = 0; i < 9; i++) {
        trC2D.fillText(scores[i], 400, 537 + (i * 35));
    }
}

const TRANSCRIPT_PREFIX = "../assets/transcript_";
const TRANSCRIPT_SUFFIX = ".png";

const TRANSCRIPT_WIDTH = 1000;
const TRANSCRIPT_HEIGHT = 1425;

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

function drawTranscript(url, name, canvas) {
    let trC2D = canvas.getContext("2d");
    canvas.width = TRANSCRIPT_WIDTH;
    canvas.height = TRANSCRIPT_HEIGHT;

    const image = new Image();
    image.src = url;
    image.onload = () => {
        trC2D.drawImage(image, 0, 0, canvas.width, canvas.height);
        drawTranscriptName(name, trC2D);
        drawScore(generateScore(name), trC2D);
    }
}

function drawTranscriptName(name, context) {
    context.textAlign = "left";
    context.font = "20px Alegreya";
    context.fillText(name.toUpperCase(), 193, 245);
    context.fillText(name.hashCode(), 193, 280);
}

function drawScore(scores, context) {
    context.textAlign = "center";
    context.font = "21px Alegreya";

    for (i = 0; i < 9; i++) {
        context.fillText(scores[i], 400, 537 + (i * 35));
    }
}

// const downloadTranscript = document.querySelector("#transcript-download");

// downloadTranscript.onclick = () => {
//     var url = canvas.toDataURL("image/png");
//     downloadTranscript.href = url;
// }
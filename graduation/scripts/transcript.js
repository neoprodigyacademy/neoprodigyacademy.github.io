const TRANSCRIPT_PREFIX = "../assets/transcript_";
const TRANSCRIPT_SUFFIX = ".png";

const TRANSCRIPT_WIDTH = 1000;
const TRANSCRIPT_HEIGHT = 1425;

function generateScore(name) {
    var output = [];
    generateRawScore(name).forEach((i) => {
        output.push(String.fromCharCode(parseInt(i) + 'A'.charCodeAt()));
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
    var aggregate = name.hashCode().toString(3); // Radix 3 (0, 1, 2)
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
        if (profilePicture) {
            trC2D.drawImage(profilePicture, 736, 275, PP_WIDTH,PP_HEIGHT);
        }
    }
}

function drawTranscriptName(name, context) {
    context.textAlign = "left";
    context.font = "20px Alegreya";
    context.fillText(name.toUpperCase(), 315, 322);
    context.fillText(name.hashCode(), 315, 352);
}

function drawScore(scores, context) {
    context.textAlign = "center";
    context.font = "21px Alegreya";

    var totalGrade = 0;

    for (i = 1; i <= 7; i++) {
        let mark = 4 - parseInt(scores[i].charCodeAt(0) - 'A'.charCodeAt());
        let credits = i == 7? 8 : 7;
        let cumulative = mark * credits;
        totalGrade += cumulative;

        context.fillText(scores[i], 741, 558 + (i * 35));
        context.fillText(mark, 850, 558 + (i * 35));
        context.fillText(credits, 614, 558 + (i * 35));
    }

    context.fillText(totalGrade / 50.0, 336, 885);
    context.fillText(50, 336, 915);
}

// const downloadTranscript = document.querySelector("#transcript-download");

// downloadTranscript.onclick = () => {
//     var url = canvas.toDataURL("image/png");
//     downloadTranscript.href = url;
// }
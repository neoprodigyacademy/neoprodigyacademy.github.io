const TRANSCRIPT_PREFIX = "../assets/transcript_";
const TRANSCRIPT_SUFFIX = ".png";

const TRANSCRIPT_WIDTH = 1000;
const TRANSCRIPT_HEIGHT = 1425;

function drawStudentTranscript(canvas, student) {
    let context = canvas.getContext("2d");
    canvas.width = TRANSCRIPT_WIDTH;
    canvas.height = TRANSCRIPT_HEIGHT;

    let fontStyle = "bold ";
    let fontSize = " 22px ";
    let fontFamily = " Times New Roman";

    const image = new Image();
    image.src = TRANSCRIPT_PREFIX + student.prodigy.toLowerCase() + ".png";
    image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        if (profilePicture) {
            context.drawImage(profilePicture, 736, 275, PP_WIDTH,PP_HEIGHT);
        }

        // Name
        context.textAlign = "left";
        context.font = fontStyle + fontSize + fontFamily;
        context.fillText(student.name.toUpperCase(), 315, 322);

        // ID
        context.font = fontSize + fontFamily;
        context.fillText(student.id, 315, 352);

        // Date
        context.fillText("20/12/2020", 315, 443);
        
        // Scores
        context.textAlign = "center";
        context.font = fontSize + fontFamily;
        student.grades().forEach((grades, i) => {
            context.fillText(grades.credits, 614, 593 + (i * 35));
            context.fillText(grades.mark, 850, 593 + (i * 35));
            context.fillText(grades.score, 741, 593 + (i * 35));
        });

        context.fillText(student.getGPA(), 336, 885);
        context.fillText(student.getTotalCredits(), 336, 915);
    }
}
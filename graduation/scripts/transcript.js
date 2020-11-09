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
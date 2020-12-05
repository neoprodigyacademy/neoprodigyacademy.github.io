class Student {
    constructor(name, prodigy, id) {
        this.name = name;
        this.prodigy = prodigy;
        this.id = "20 - 0514 - " + this.prodigium[prodigy] + " - " + id;
    }

    prodigium = {
        "Sydenium"  : "01",
        "Nordenium" : "02",
        "Ostenium"  : "03",
        "Vestenium" : "04"
    }

    rawScores() {
        let radix = 3; // A, AB, B
        let subjectCount = 7
        let output = this.name.hashCode()
            .toString(radix)
            .substring(1, 1 + subjectCount)
            .split('');
        output.forEach((e, i) => {
            output[i] = 4 - (0.5 * e);
        })
        return output;
    }

    marks() {
        // let marks = this.rawScores();
        // marks.forEach((e, index) => {
        //     marks[index] = String.fromCharCode(parseInt(e) + 'A'.charCodeAt());
        // });

        let map = {
            4   : "A",
            3.5 : "AB",
            3   : "B"
        }

        let output = [];
        this.rawScores().forEach((e, i) => {
            output[i] = map[e];
        });

        return output;
    }

    credits() {
        return [7, 7, 7, 7, 7, 7, 8];
    }

    getTotalCredits() {
        var creditsTaken = 0;
        this.credits().forEach(e => { creditsTaken += e; });
        return creditsTaken;
    }

    grades() {
        let grades = [];
        this.marks().forEach((mark, index) => {
            grades.push({
                "score": this.rawScores()[index],
                "mark": mark,
                "credits": this.credits()[index]
            });
        });
        return grades;
    }

    getGPA() {
        var cumulativeGrades = 0.0;
        this.rawScores().forEach((e, i) => {
            cumulativeGrades += e * this.credits()[i];
        })

        let gpa = cumulativeGrades / this.getTotalCredits();
        return gpa;
    }
}

var student = null;

[["A","AB","AB","AB","AB","B","AB"], ["AB","AB","AB","AB","AB","AB","AB"],["A","A","A","AB","AB","B","B"],["A","A","A","A","B","B","B"],["A","A","AB","AB","AB","B","AB"],["A","AB","AB","AB","AB","AB","AB"],["A","A","A","A","AB","B","B"],["A","A","AB","AB","AB","AB","AB"],["A","A","A","AB","AB","B","AB"],["A","A","A","A","A","B","B"],["A","A","A","AB","AB","AB","AB"],["A","A","A","A","AB","B","AB"], ["A","A","A","A","AB","AB","AB"],["A","A","A","A","A","B","AB"]] 
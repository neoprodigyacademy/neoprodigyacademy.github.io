class Student {
    constructor(name, prodigy, id) {
        this.name = name;
        this.prodigy = prodigy;
        this.id = "20 - 0514 - " + this.prodigium[prodigy] + " - " + id;
        this.hash = name.hashCode() % gradeMap.length;
    }

    prodigium = {
        "Sydenium"  : "01",
        "Nordenium" : "02",
        "Ostenium"  : "03",
        "Vestenium" : "04"
    }

    map = {
        "A"  : 4,
        "AB" : 3.5,
        "B"  : 3 
    }

    marks() {
        return gradeMap[this.hash];
    }

    credits() {
        return [6, 6, 7, 7, 7, 8, 9];
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
                "score": this.map[mark],
                "mark": mark,
                "credits": this.credits()[index]
            });
        });
        return grades;
    }

    getGPA() {
        var cumulativeGrades = 0.0;
        this.marks().forEach((e, i) => {
            cumulativeGrades += this.map[e] * this.credits()[i];
        })

        let gpa = cumulativeGrades / this.getTotalCredits();
        return gpa;
    }
}

var student = null;
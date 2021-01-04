console.log("funguju");

String.prototype.isLower = function() {
    return this.toLowerCase() == this;
}

String.prototype.isUpper = function() {
    return this.toUpperCase() == this;
}

String.prototype.react = function(index) {
    return this.substring(0,index) + this.substring(index+2);
}

String.prototype.dispose = function(index) {
    return this.substring(0,index) + this.substring(index+1);
}


const task1 = polymer => {
    let startI = 0;
    mainWhile: while (true) {
        let maxI = polymer.length - 1;
        //console.log(maxI, startI);
        for (let i = startI; i < maxI; i++) {
            let char1 = polymer[i];
            let char2 = polymer[i+1];
            if (char1.isLower() && char1.toUpperCase() === char2 || char1.isUpper() && char1.toLowerCase() === char2) {
                polymer = polymer.react(i);
                startI = i - 1;
                if (startI < 0) startI = 0;
                continue mainWhile;
            }
        }
        break mainWhile;
    }  
    return polymer.length;
};

const task2 = polymer => {
    let shortest = polymer.length;
    for (let ch = 97; ch < 123; ch++) {
        let reducedPolymer = polymer;
        let char = String.fromCharCode(ch);
        console.log("working with", char);
        for (let j = 0; j < reducedPolymer.length; j++) {
            if (reducedPolymer[j] === char || reducedPolymer[j] === char.toUpperCase()) {
                reducedPolymer = reducedPolymer.dispose(j);
                j--;
            }
        }
        let produced = task1(reducedPolymer);
        console.log(produced);
        if (produced < shortest) shortest = produced;
    }
    return shortest;
}

let testdata = `dabAcCaCBAcCcaDA`;

console.log("");

doEqualTest(task1(testdata), 10);

console.time();
console.log("Task 1: " + task1(inputdata));
console.timeEnd();

console.log("");

doEqualTest(task2(testdata), 4);

console.log("Task 2: " + task2(inputdata));
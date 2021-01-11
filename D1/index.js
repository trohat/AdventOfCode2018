console.log("AOC 2018 - Day 1: Chronal Calibration");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => data.map(d => +d);

Array.prototype.sum = function () {
    return this.reduce((a,b) => a+b, 0);
}

const task1 = data => data.sum();

const task2 = data => {
    const reached = new Set;
    let sum = 0;
    while (true) {
        for (const n of data) {
            sum += n;
            if (reached.has(sum)) {
                return sum;
            }
            reached.add(sum);
        }
    }
}

let testdata = `+1
-2
+3
+1`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 3);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 2);

console.log("Task 2: " + task2(inputdata));
console.log("AOC 2018 - Day 25: Four-Dimensional Adventure");

const countManhattan = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) + Math.abs(a[3] - b[3]);

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => data.map(s => s.split(",").map(Number));

const task1 = points => {
    let constellations = [];
    for (const point of points) {
        let found = false;
        let myConstellation;
        let constellationsToDelete = [];
        for (constellation of constellations) {
            for (pointInC of constellation) {
                if (countManhattan(point, pointInC) <= 3) {
                    if (!found) {
                        constellation.push(point);
                        myConstellation = constellation;
                        found = true;
                    }
                    else {
                        myConstellation.push(...constellation);
                        constellationsToDelete.push(constellation);
                    }
                    break;
                }
            }
        }
        if (!found) constellations.push([ point ]);
        constellations = constellations.filter(c => !(constellationsToDelete.includes(c)));
    }
    return constellations.length;
};

let testdata = ` 0,0,0,0
3,0,0,0
0,3,0,0
0,0,3,0
0,0,0,3
0,0,0,6
9,0,0,0
12,0,0,0`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 2);

console.log("Task 1: " + task1(inputdata));
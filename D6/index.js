console.log("AOC 2018 - Day 6: Chronal Coordinates");

let chr = String.fromCharCode;

// not needed here, just added for completeness
let ord = str => str.charCodeAt(0);

Array.prototype.countChar = function (char) {
    return this.reduce((accumulator, str) => accumulator + str.split(char).length-1, 0);
}

const countManhattan = (i,j, coords) => {
    return Math.abs(j - coords[0]) + Math.abs(i - coords[1]); 
};

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => data.map(line => line = line.split(",").map(n => +n));

const task1 = (data) => {
    let minX = 5000;
    let maxX = 0;
    let minY = 5000;
    let maxY = 0;
    for (const line of data) {
        let [ x, y ] = line;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }
    let startX = minX - 1;
    let endX = maxX + 2;
    let startY = minY - 1;
    let endY = maxY + 1;
    const grid = [];
    for (let i = startY; i < endY; i++) {
        grid.push("");
        for (let j = startX; j < endX; j++) {
            let min = 800;
            let minIndex = 0;
            let center;
            data.forEach((coords, index) => {
                let manhattan = countManhattan(i,j,coords);
                //if (manhattan === 0) center = true;
                if (manhattan === min) {
                    minIndex = null;
                }
                else if (manhattan < min) {
                    min = manhattan;
                    minIndex = index;
                }
            })
            //if (center) grid[i-startY].push(chr(minIndex+66));
            if (minIndex !== null) grid[i-startY] += chr(minIndex+65);
            else grid[i-startY] += chr(46);
            
        }
    }
    //for (const line of grid) console.log(line.substring(0,200));
    let infinites = new Set();
    for (const ch of grid[0]) infinites.add(ch);
    for (const ch of grid[grid.length - 1]) infinites.add(ch);
    for (const line of grid) {
        infinites.add(line[0]);
        infinites.add(line[line.length-1]);
    }
    let maxCount = 0;
    for (let i = 0; i < data.length; i++) {
        if (!infinites.has(chr(i+65))) {
            let count = grid.countChar(chr(i+65));
            if (count > maxCount) maxCount = count;
        }
    }
    return maxCount;
};

const task2 = (data, task) => {
    let minX = 5000;
    let maxX = 0;
    let minY = 5000;
    let maxY = 0;
    for (const line of data) {
        let [ x, y ] = line;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }
    console.log(minX, maxX, minY, maxY);
    let startX = minX - 1;
    let endX = maxX + 2;
    let startY = minY - 1;
    let endY = maxY + 1;

    let count = 0;
    let limit = 10000;
    if (task === "test") limit = 32;
    for (let i = startY; i < endY; i++) {
        for (let j = startX; j < endX; j++) {
            let manhattanCount = 0;
            for (const coords of data) {
                manhattanCount += countManhattan(i,j,coords);
            }
            if (manhattanCount < limit) count++;
        }
    }
    return count;
}

let testdata = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 17);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata, "test"), 16);

console.log("Task 2: " + task2(inputdata));
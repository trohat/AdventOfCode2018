console.log("AOC 2018 - Day 20: A Regular Map");

String.prototype.countChar = function (char) {
    return this.split(char).length-1;
};

const task = (regex, task) => {
    console.log("Length:", regex.length)
    const letters = regex.countChar("W") + regex.countChar("N") + regex.countChar("E") + regex.countChar("S");
    console.log("Letters:", letters); 
    const returns = regex.countChar("|)");
    console.log("Returns:", returns);
    console.log("Size:", Math.sqrt(letters - returns - returns + 1));

    const maxX = 200;
    const maxY = 200;
    const startX = Math.floor(maxX / 2);
    const startY = Math.floor(maxY / 2);

    const area = [];

    for (let i = 0; i < maxY; i++) {
        area.push([]);
        for (let j = 0; j < maxX; j++) {
            area[i].push({ doorNorth: null, doorSouth: null, doorWest: null, doorEast: null, distance: null });
        }
    }

    let currX = startX;
    let currY = startY;

    area[currY][currX].distance = 0;

    const openPars = [];

    for (const char of regex) {
        const getDistance = (y,x) => {
            return area[y][x].distance;
        };

        const setDistance = (y,x, distance) => {
            if (!area[y][x].distance) area[y][x].distance = distance + 1;
        }

        if (char === "^") continue;
        if (char === "$") break;
        if (char === "N") {
            let distance = getDistance(currY, currX);
            area[currY][currX].doorNorth = true;
            currY--;
            area[currY][currX].doorSouth = true;
            setDistance(currY, currX, distance);
        }
        if (char === "S") {
            let distance = getDistance(currY, currX);
            area[currY][currX].doorSouth = true;
            currY++;
            area[currY][currX].doorNorth = true;
            setDistance(currY, currX, distance);
        }
        if (char === "W") {
            let distance = getDistance(currY, currX);
            area[currY][currX].doorWest = true;
            currX--;
            area[currY][currX].doorEast = true;
            setDistance(currY, currX, distance);
        }
        if (char === "E") {
            let distance = getDistance(currY, currX);
            area[currY][currX].doorEast = true;
            currX++;
            area[currY][currX].doorWest = true;
            setDistance(currY, currX, distance);
        }
        if (char === "(") {
            openPars.push({ x: currX, y: currY});
        }
        if (char === ")") {
            openPars.pop();
        }
        if (char === "|") {
            let returnTo = openPars[openPars.length-1];
            currX = returnTo.x;
            currY = returnTo.y;
        }
    }


    let maxDist = 0;
    let distantDoors = 0;

    for (let i = 0; i < maxY; i++) {
        for (let j = 0; j < maxX; j++) {
            if (area[i][j].distance > maxDist) maxDist = area[i][j].distance;
            if (area[i][j].distance >= 1000) distantDoors++;
        }
    }

    if (task === "task2") return distantDoors;
    else return maxDist;
};

let testdata1 = `^WNE$`;
let testdata2 = `^ENWWW(NEEE|SSE(EE|N))$`;
let testdata3 = `^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$`;
let testdata4 = `^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$`;
let testdata5 = `^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$`;

doEqualTest(task(testdata1), 3);
doEqualTest(task(testdata2), 10);
doEqualTest(task(testdata3), 18);
doEqualTest(task(testdata4), 23);
doEqualTest(task(testdata5), 31);

console.log("Task 1: " + task(inputdata));

console.log("");

console.log("Task 2: " + task(inputdata, "task2"));
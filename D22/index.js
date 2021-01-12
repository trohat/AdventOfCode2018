console.log("AOC 2018 - Day 22: Mode Maze");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const re1 = /depth: (\d+)/;
    const re2 = /target: (\d+),(\d+)/;
    const [, depth] = re1.exec(data[0]);
    const [, x, y] = re2.exec(data[1]);
    return [+ depth, +x, +y];
};

const task1 = ([depth, targetX, targetY]) => {
    const cave = [];
    for (let i = 0; i <= targetY; i++) {
        cave.push([]);
        for (let j = 0; j <= targetX; j++) {
            let geologicIndex;
            if (i === 0 && j === 0) geologicIndex = 0;
            else if (i === targetY && j === targetX) geologicIndex = 0;
            else if (i === 0) geologicIndex = j * 16807;
            else if (j === 0) geologicIndex = i * 48271;
            else geologicIndex = cave[i - 1][j].erosionLevel * cave[i][j - 1].erosionLevel;

            let erosionLevel = (geologicIndex + depth) % 20183;

            let regionType, riskLevel;

            switch (erosionLevel % 3) {
                case 0:
                    regionType = "rocky";
                    riskLevel = 0;
                    break;
                case 1:
                    regionType = "wet";
                    riskLevel = 1;
                    break;
                case 2:
                    regionType = "narrow";
                    riskLevel = 2;
                    break;
            }
            cave[i].push({ geologicIndex, erosionLevel, regionType, riskLevel });
        }
    }
    console.log(cave[0][0].regionType);
    console.log(cave[targetY][targetX].regionType);

    let totalRisk = 0;
    for (let i = 0; i < cave.length; i++) {
        for (let j = 0; j < cave[0].length; j++) {
            totalRisk += cave[i][j].riskLevel;
        }
    }

    return totalRisk;
};

const task2 = data => {

}

let testdata = `depth: 510
target: 10,10`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 114);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
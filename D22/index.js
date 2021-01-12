console.log("AOC 2018 - Day 22: Mode Maze");

const dirs = [{ y: -1, x: 0 }, { y: 0, x: -1 }, { y: 0, x: 1 }, { y: 1, x: 0 }];

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

const task2 = ([depth, targetX, targetY]) => {
    const cave = [];
    for (let i = 0; i <= (targetY * 32); i++) {
        cave.push([]);
        for (let j = 0; j <= (targetX * 32); j++) {
            let geologicIndex;
            if (i === 0 && j === 0) geologicIndex = 0;
            else if (i === targetY && j === targetX) geologicIndex = 0;
            else if (i === 0) geologicIndex = j * 16807;
            else if (j === 0) geologicIndex = i * 48271;
            else geologicIndex = cave[i - 1][j].erosionLevel * cave[i][j - 1].erosionLevel;

            let erosionLevel = (geologicIndex + depth) % 20183;

            let regionType, riskLevel;
            let withTorch = 10e10;
            let withGear = 10e10;
            let withNeither = 10e10;

            switch (erosionLevel % 3) {
                case 0:
                    regionType = "rocky";
                    riskLevel = 0;
                    withNeither = -1;
                    break;
                case 1:
                    regionType = "wet";
                    riskLevel = 1;
                    withTorch = -1;
                    break;
                case 2:
                    regionType = "narrow";
                    riskLevel = 2;
                    withGear = -1;
                    break;
            }
            cave[i].push({ erosionLevel, regionType, withTorch, withGear, withNeither });
        }
    }

    cave[0][0].withTorch = 0;
    cave[0][0].withGear = 7;

    toExplore = [{ x: 0, y: 0 }];

    while (toExplore.length > 0) {
        let { x, y } = toExplore.shift();
        let oldRegion = cave[y][x];
        if (oldRegion.withGear + oldRegion.withTorch + oldRegion.withNeither > 2216) continue;
        for (const dir of dirs) {
            let newX = x + dir.x;
            let newY = y + dir.y;
            if (newY < 0 || newY >= cave.length || newX < 0 || newX >= cave[0].length) continue;
            let newRegion = cave[newY][newX];
            let changed = false;
            let withTorch, withGear, withNeither;
            switch (oldRegion.regionType) {
                case "rocky":
                    switch (newRegion.regionType) {
                        case "rocky":
                            withGear = oldRegion.withGear + 1;
                            if (withGear < newRegion.withGear) {
                                newRegion.withGear = withGear;
                                changed = true;
                            }
                            withTorch = oldRegion.withTorch + 1;
                            if (withTorch < newRegion.withTorch) {
                                newRegion.withTorch = withTorch;
                                changed = true;
                            }
                            if (changed) toExplore.push({ x: newX, y: newY });
                            break;
                        case "wet":
                            withGear = oldRegion.withGear + 1;
                            if (withGear < newRegion.withGear) {
                                newRegion.withGear = withGear;
                                changed = true;
                            }
                            withNeither = withGear + 7;
                            if (withNeither < newRegion.withNeither) {
                                newRegion.withNeither = withNeither;
                                changed = true;
                            }
                            if (changed) toExplore.push({ x: newX, y: newY });
                            break;
                        case "narrow":
                            withTorch = oldRegion.withTorch + 1;
                            if (withTorch < newRegion.withTorch) {
                                newRegion.withTorch = withTorch;
                                changed = true;
                            }
                            withNeither = withTorch + 7;
                            if (withNeither < newRegion.withNeither) {
                                newRegion.withNeither = withNeither;
                                changed = true;
                            }
                            if (changed) toExplore.push({ x: newX, y: newY });
                            break;
                        default:
                            console.error("Wrong switch case.");
                    }
                    break;
                case "wet":
                    switch (newRegion.regionType) {
                        case "rocky":
                            withGear = oldRegion.withGear + 1;
                            if (withGear < newRegion.withGear) {
                                newRegion.withGear = withGear;
                                changed = true;
                            }
                            withTorch = withGear + 7;
                            if (withTorch < newRegion.withTorch) {
                                newRegion.withTorch = withTorch;
                                changed = true;
                            }
                            if (changed) toExplore.push({ x: newX, y: newY });
                            break;
                        case "wet":
                            withGear = oldRegion.withGear + 1;
                            if (withGear < newRegion.withGear) {
                                newRegion.withGear = withGear;
                                changed = true;
                            }
                            withNeither = oldRegion.withNeither + 1;
                            if (withNeither < newRegion.withNeither) {
                                newRegion.withNeither = withNeither;
                                changed = true;
                            }
                            if (changed) toExplore.push({ x: newX, y: newY });
                            break;
                        case "narrow":
                            withNeither = oldRegion.withNeither + 1;
                            if (withNeither < newRegion.withNeither) {
                                newRegion.withNeither = withNeither;
                                changed = true;
                            }
                            withTorch = withNeither + 7;
                            if (withTorch < newRegion.withTorch) {
                                newRegion.withTorch = withTorch;
                                changed = true;
                            }
                            if (changed) toExplore.push({ x: newX, y: newY });
                            break;
                        default:
                            console.error("Wrong switch case.");
                    }
                    break;
                case "narrow":
                    switch (newRegion.regionType) {
                        case "rocky":
                            withTorch = oldRegion.withTorch + 1;
                            if (withTorch < newRegion.withTorch) {
                                newRegion.withTorch = withTorch;
                                changed = true;
                            }
                            withGear = withTorch + 7;
                            if (withGear < newRegion.withGear) {
                                newRegion.withGear = withGear;
                                changed = true;
                            }
                            if (changed) toExplore.push({ x: newX, y: newY });
                            break;
                        case "wet":
                            withNeither = oldRegion.withNeither + 1;
                            if (withNeither < newRegion.withNeither) {
                                newRegion.withNeither = withNeither;
                                changed = true;
                            }
                            withGear = withNeither + 7;
                            if (withGear < newRegion.withGear) {
                                newRegion.withGear = withGear;
                                changed = true;
                            }
                            if (changed) toExplore.push({ x: newX, y: newY });
                            break;
                        case "narrow":
                            withTorch = oldRegion.withTorch + 1;
                            if (withTorch < newRegion.withTorch) {
                                newRegion.withTorch = withTorch;
                                changed = true;
                            }
                            withNeither = oldRegion.withNeither + 1;
                            if (withNeither < newRegion.withNeither) {
                                newRegion.withNeither = withNeither;
                                changed = true;
                            }
                            if (changed) toExplore.push({ x: newX, y: newY });
                            break;
                        default:
                            console.error("Wrong switch case.");
                    }
                    break;
                default: 
                    console.error("Wrong outer switch.");
            }
        }
    }

    return [ cave[targetY][targetX].withGear + 7, cave[targetY][targetX].withTorch ];
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

doEqualTest(task2(testdata), 45);

console.time();
console.log("Task 2: " + task2(inputdata));
console.timeEnd();
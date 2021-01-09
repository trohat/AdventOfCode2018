console.log("funguju");

String.prototype.setCharAt = function (index, char) {
    return this.substring(0, index) + char + this.substring(index + 1);
}

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    let scan = [];
    const re = /(x|y)=(\d+), (x|y)=(\d+)\.\.(\d+)/;
    for (const line of data) {
        const [, firstLetter, firstNumber, secondLetter, secondNumber, thirdNumber] = re.exec(line);
        scan.push({
            [firstLetter]: [+firstNumber, +firstNumber],
            [secondLetter]: [+secondNumber, +thirdNumber]
        });
    }

    maxX = 0;
    minX = 10e10;
    minY = 10e10;
    maxY = 0;
    for (const line of scan) {
        let x = line.x[0];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        x = line.x[1];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        let y = line.y[0];;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        y = line.y[1];;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }
    console.log(minX, maxX, minY, maxY);

    let grid = [];
    let strGrid = [];
    for (let i = 0; i <= maxY; i++) {
        grid.push([]);
        let str = "";
        for (let j = minX; j <= maxX; j++) {
            grid[i].push({ isWall: false, isWater: false });
            str += ".";
        }
        strGrid.push(str);
    }

    for (const line of scan) {
        for (let i = line.y[0]; i <= line.y[1]; i++) {
            for (let j = line.x[0]; j <= line.x[1]; j++) {
                grid[i][j - minX].isWall = true;
                strGrid[i] = strGrid[i].setCharAt(j - minX, "#");
            }
        }
    }

    strGrid[0] = strGrid[0].setCharAt(500 - minX, "+");

    let startArr = [{ y: 1, x: 500 - minX, state: "freefall" }];
    grid[1][500 - minX].isWater = true;
    strGrid[1] = strGrid[1].setCharAt(500 - minX, "|");

    console.log(strGrid);

    return [grid, strGrid, startArr];
};

const task1 = ([grid, strGrid, toInspectArr]) => {
    const isFree = (y, x) => {
        return !(grid[y][x].isWall || grid[y][x].isWater);
    };

    //TO DELETE
    grid[6][6].isWall = false;

    while (toInspectArr.length > 0) {
        let toInspect = toInspectArr.shift();
        let y = toInspect.y;
        let x = toInspect.x;
        let state = toInspect.state;

        // reached the end of sand
        if (y === grid.length) continue;

        // can go down
        if (isFree(y + 1, x)) {
            grid[y + 1][x].isWater = true;
            strGrid[y + 1] = strGrid[y + 1].setCharAt(x, "|");
            toInspectArr.push({ y: y + 1, x, state: "freefall" });
            continue;
        }

        // felt on water
        if (grid[y+1][x].isWater) continue;

        // felt on clay
        if (state === "freefall") {
            if (isFree(y, x+1)) {
                grid[y][x + 1].isWater = true;
                strGrid[y] = strGrid[y].setCharAt(x + 1, "~");
                toInspectArr.push({ y, x: x + 1, state: "going right" });
            }
            if (isFree(y, x-1)) {
                grid[y][x - 1].isWater = true;
                strGrid[y] = strGrid[y].setCharAt(x - 1, "~");
                toInspectArr.push({ y, x: x - 1, state: "going left" });
            }
            continue;
        }

        if (state === "going right") {
            if (isFree(y, x + 1)) {
                grid[y][x + 1].isWater = true;
                strGrid[y] = strGrid[y].setCharAt(x + 1, "~");
                toInspectArr.push({ y, x: x + 1, state: "going right" });
            }
            continue;
        }

        if (state === "going left") {
            if (isFree(y, x - 1)) {
                grid[y][x - 1].isWater = true;
                strGrid[y] = strGrid[y].setCharAt(x - 1, "~");
                toInspectArr.push({ y, x: x - 1, state: "going left" });
            }
            continue;
        }

    }
    console.log(strGrid);
    console.log(grid);
};

const task2 = data => {

}

let testdata = `x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`;

//inputdata = prepare(splitLines(inputdata));

//console.log(inputdata);

testdata = prepare(splitLines(testdata));

//console.log(testdata)

console.log("");

doEqualTest(task1(testdata), undefined);

//console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
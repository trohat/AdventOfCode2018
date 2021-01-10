console.log("funguju");

String.prototype.setCharAt = function (index, char) {
    return this.substring(0, index) + char + this.substring(index + 1);
}

Array.prototype.countChar = function(char) {
    return this.reduce((accumulator, str) => accumulator + str.split(char).length-1, 0);
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
        for (let j = minX; j <= maxX + 1; j++) {
            grid[i].push({ isWall: false, isWater: false, cameFrom: null, beenDown: false, beenLeft: false, beenRight: false, twoWays: false, firstReturned: false });
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


    return [grid, strGrid, startArr];
};

const task1 = ([grid, strGrid, toInspectArr]) => {
    const isWater = (y, x) => {
        return grid[y][x].isWater;
    };

    const isWall = (y, x) => {
        return grid[y][x].isWall;
    };

    const isFree = (y, x) => {
        return !(grid[y][x].isWall || grid[y][x].isWater);
    };

    const goBack = (x,y) => {
        let found = false;
        while (!found) {
            let searching = grid[y][x];
            if (!searching.twoWays) {
                if (searching.beenDown && searching.beenRight && searching.beenLeft) ({x,y} = searching.cameFrom);
                else found = true;
            } 
            else // two ways field
            if (searching.firstReturned) ({x,y} = searching.cameFrom);
            else {
                searching.firstReturned = true;
                return;
            }
        }
        if (found) toInspectArr.push({x, y, state: "going back"});
        else console.warn("goBack working unexpectedly");
    };

    const canFlowRight = (y, x) => {
        let steps = 0;
        while(true) {
            x++;
            if (isFree(y,x) && isFree(y+1,x) && isFree(y+2,x) && isFree(y+3,x) && isFree(y+4,x) && isFree(y+5,x) && isFree(y+6,x) && isFree(y+7,x)) return true;
            if (isWall(y,x)) return false;
            steps++;
            if (steps > 200) {
                console.warn("canFlowRight overflow");
                return;
            }
        }
    };

    const canFlowLeft = (y, x) => {
        let steps = 0;
        while(true) {
            x--;
            if (isFree(y,x) && isFree(y+1,x) && isFree(y+2,x) && isFree(y+3,x) && isFree(y+4,x) && isFree(y+5,x) && isFree(y+6,x) && isFree(y+7,x)) return true;
            if (isWall(y,x)) return false;
            steps++;
            if (steps > 200) {
                console.warn("canFlowLeft overflow");
                return;
            }
        }
    };

    while (toInspectArr.length > 0) {
        let toInspect = toInspectArr.shift();
        let y = toInspect.y;
        let x = toInspect.x;
        let state = toInspect.state;

        // reached the end of sand
        if (y === grid.length - 1) {
            console.log("end reached", toInspectArr.length)
            continue;
        };

        // can go down
        grid[y][x].beenDown = true;
        if (isFree(y + 1, x)) {
            grid[y + 1][x].isWater = true;
            grid[y + 1][x].cameFrom = { x, y };
            strGrid[y + 1] = strGrid[y + 1].setCharAt(x, "|");
            toInspectArr.push({ y: y + 1, x, state: "freefall" });
            continue;
        }

        if (isWater(y+1, x)) {
            if (canFlowRight(y+1,x) || canFlowLeft(y+1,x)) continue;
        }

        // felt on clay 
        grid[y][x].beenRight = true;
        grid[y][x].beenLeft = true;
        if (state === "freefall" || state === "going back") {
            let possibleToMove = 0;
            if (isFree(y, x+1)) {
                possibleToMove++;
                grid[y][x + 1].isWater = true;
                grid[y][x + 1].cameFrom = { x, y };
                strGrid[y] = strGrid[y].setCharAt(x + 1, "~");
                toInspectArr.push({ y, x: x + 1, state: "going right" });
            }
            if (isFree(y, x-1)) {
                possibleToMove++;
                grid[y][x - 1].isWater = true;
                grid[y][x - 1].cameFrom = { x, y };
                strGrid[y] = strGrid[y].setCharAt(x - 1, "~");
                toInspectArr.push({ y, x: x - 1, state: "going left" });
            }
            if (possibleToMove === 0) goBack(x,y);
            if (possibleToMove === 2) grid[y][x].twoWays = true;
            continue;
        }
        
        if (state === "going right") {
            if (isFree(y, x + 1)) {
                grid[y][x + 1].isWater = true;
                grid[y][x + 1].cameFrom = { x, y };
                strGrid[y] = strGrid[y].setCharAt(x + 1, "~");
                toInspectArr.push({ y, x: x + 1, state: "going right" });
            }
            else goBack(x,y);
            continue;
        }
        
        if (state === "going left") {
            if (isFree(y, x - 1)) {
                grid[y][x - 1].isWater = true;
                grid[y][x - 1].cameFrom = { x, y };
                strGrid[y] = strGrid[y].setCharAt(x - 1, "~");
                toInspectArr.push({ y, x: x - 1, state: "going left" });
            }
            else goBack(x,y);
            continue;
        }

    }
    console.log(strGrid);
    return strGrid.countChar("|") + strGrid.countChar("~") - 2;
};

const task2 = ([grid, strGrid, toInspectArr]) => {
    const isWater = (y, x) => {
        return grid[y][x].isWater;
    };

    const isWall = (y, x) => {
        return grid[y][x].isWall;
    };

    const isFree = (y, x) => {
        try {
            return !(grid[y][x].isWall || grid[y][x].isWater);
        }
        catch {
            console.log(y, x, grid[y]);
        }
    };

    const canFlowRight = (y, x) => {
        let steps = 0;
        while(true) {
            x++;
            if (x >= grid[0].length) return true;
            if (isFree(y,x)) return true;
            if (isWall(y,x)) return false;
            steps++;
            if (steps > 200) {
                console.warn("canFlowRight overflow");
                return;
            }
        }
    };

    const canFlowLeft = (y, x) => {
        let steps = 0;
        while(true) {
            x--;
            if (isFree(y,x)) return true;
            if (isWall(y,x)) return false;
            steps++;
            if (steps > 200) {
                console.warn("canFlowLeft overflow");
                return;
            }
        }
    };
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (isWater(i,j)) {
                if (canFlowLeft(i,j) || canFlowRight(i,j)) strGrid[i] = strGrid[i].setCharAt(j, "|");
                else strGrid[i] = strGrid[i].setCharAt(j, "~");
            }
        }
    }

    return strGrid.countChar("~");
}

let testdata = `y=39, x=489..506
x=489, y=29..39
x=506, y=30..39
x=498, y=33..35
x=500, y=33..35
y=35, x=498..500
y=21, x=499..515
x=499, y=10..21
x=515, y=9..21`;

inputdata = prepare(splitLines(inputdata));

//console.log(inputdata);

//testdata = prepare(splitLines(testdata));

//console.log(testdata)


//doEqualTest(task1(testdata), undefined);

console.log("Task 1: " + task1(inputdata));

console.log("");

console.log("Task 2: " + task2(inputdata));
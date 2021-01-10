console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

inputdata = splitLines(inputdata);

const compareArrays = (arr1, arr2) => {
    let same = true;
    arr1.forEach((field, index) => {
        if (field !== arr2[index]) same = false;
    })
    return same;
}

String.prototype.setCharAt = function(index, char) {
    return this.substring(0,index) + char + this.substring(index+1);
}

Array.prototype.countChar = function(char) {
    return this.reduce((accumulator, str) => accumulator + str.split(char).length-1, 0);
} 

const task1 = (grid) => {
    const countNeighbours = ( x,y, grid ) => {
        let trees = 0;
        let lumberyards = 0;
        if ( y > 0) {
            lumberyards += (grid[y-1].charAt(x-1) === "#");
            trees += (grid[y-1].charAt(x-1) === "|");
            lumberyards += (grid[y-1].charAt(x) === "#");
            trees += (grid[y-1].charAt(x) === "|");
            lumberyards += (grid[y-1].charAt(x+1) === "#");
            trees += (grid[y-1].charAt(x+1) === "|");
        } 
        lumberyards += (grid[y].charAt(x-1) === "#");
        trees += (grid[y].charAt(x-1) === "|");
        lumberyards += (grid[y].charAt(x+1) === "#");
        trees += (grid[y].charAt(x+1) === "|");
        if ( y < grid.length - 1) {
            lumberyards += (grid[y+1].charAt(x-1) === "#");
            trees += (grid[y+1].charAt(x-1) === "|");
            lumberyards += (grid[y+1].charAt(x) === "#");
            trees += (grid[y+1].charAt(x) === "|");
            lumberyards += (grid[y+1].charAt(x+1) === "#");
            trees += (grid[y+1].charAt(x+1) === "|");
        } 
        return [ trees, lumberyards ];
    }

    for (let minutes = 0; minutes < 10; minutes++) {
        let lastGrid = [...grid];
        grid = grid.map( (line, index) => {
            for (let i = 0; i < line.length; i++) {
                let acre = line.charAt(i);
                const [ trees, lumberyards ] = countNeighbours(i, index, lastGrid);
                if (acre === "." && trees >= 3) line = line.setCharAt(i, "|");
                if (acre === "|" && lumberyards >= 3) line = line.setCharAt(i, "#");
                if (acre === "#" && (lumberyards < 1 || trees < 1)) line = line.setCharAt(i, ".");
            }
            return line;
        });
    }
    return grid.countChar('|') * grid.countChar('#');
};

let testdata = `.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`;

testdata = splitLines(testdata);

console.log("");

doEqualTest(task1(testdata), 1147);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 26);

//console.log("Task 2: " + task2(inputdata));

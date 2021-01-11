console.log("AOC 2018 - Day 18: Settlers of The North Pole");

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

const task = (area, totalMinutes) => {
    const countNeighbours = ( x,y, area ) => {
        let trees = 0;
        let lumberyards = 0;
        if ( y > 0) {
            lumberyards += (area[y-1].charAt(x-1) === "#");
            trees += (area[y-1].charAt(x-1) === "|");
            lumberyards += (area[y-1].charAt(x) === "#");
            trees += (area[y-1].charAt(x) === "|");
            lumberyards += (area[y-1].charAt(x+1) === "#");
            trees += (area[y-1].charAt(x+1) === "|");
        } 
        lumberyards += (area[y].charAt(x-1) === "#");
        trees += (area[y].charAt(x-1) === "|");
        lumberyards += (area[y].charAt(x+1) === "#");
        trees += (area[y].charAt(x+1) === "|");
        if ( y < area.length - 1) {
            lumberyards += (area[y+1].charAt(x-1) === "#");
            trees += (area[y+1].charAt(x-1) === "|");
            lumberyards += (area[y+1].charAt(x) === "#");
            trees += (area[y+1].charAt(x) === "|");
            lumberyards += (area[y+1].charAt(x+1) === "#");
            trees += (area[y+1].charAt(x+1) === "|");
        } 
        return [ trees, lumberyards ];
    }
    let scores = new Set;
    let repeats = 0;
    let sequence = false;
    let firstInSequence, firstMinute;
    for (let minutes = 0; minutes < totalMinutes; minutes++) {
        let lastArea = [...area];
        area = area.map( (line, index) => {
            for (let i = 0; i < line.length; i++) {
                let acre = line.charAt(i);
                const [ trees, lumberyards ] = countNeighbours(i, index, lastArea);
                if (acre === "." && trees >= 3) line = line.setCharAt(i, "|");
                if (acre === "|" && lumberyards >= 3) line = line.setCharAt(i, "#");
                if (acre === "#" && (lumberyards < 1 || trees < 1)) line = line.setCharAt(i, ".");
            }
            return line;
        });
        let score = area.countChar('|') * area.countChar('#');
        console.log("Minutes: " + minutes + " - resources: " + score);

        if (!sequence) {
            if (!scores.has(score)) {
                scores.add(score);
                repeats = 0;
            }
            else { 
                console.log("Found repeat!");
                repeats++;
                if (repeats > 50) {
                    sequence = new Map;
                    firstMinute = minutes;
                    sequence.set(0, score);
                    firstInSequence = score;
                }
            }
        }
        else {
            if (firstInSequence === score) {
                console.log(sequence);
                return sequence.get((totalMinutes - minutes - 1) % sequence.size);
            }
            else sequence.set(minutes - firstMinute, score);
            
        }
    }

    return area.countChar('|') * area.countChar('#');
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

doEqualTest(task(testdata, 100), 1147);

console.log("Task 2: " + task(inputdata, 1000000000));

console.log("");

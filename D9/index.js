console.log("funguju");

Array.prototype.max = function () {
    return Math.max(...this);
}

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
          const re = /(\d+) players; last marble is worth (\d+) points/;
          const [ , players, lastMarble ] = re.exec(data);
          return [ +players, +lastMarble ];
};

const task1 = (data) => {
    const [ players, lastMarble ] = data;
    let circle = [ 0 ];
    let currentMarble = 0;
    let currentPlayer = 0;
    let playerScores = Array.from({length:players}).map(x => 0);
    for (let i = 1; i <= lastMarble; i++) {
        if (i % 23 === 0) {
            playerScores[currentPlayer] += i;
            currentMarble -= 7;
            if (currentMarble < 0) currentMarble += circle.length;
            playerScores[currentPlayer] += circle.splice(currentMarble, 1)[0];
        } else {
            currentMarble = ((currentMarble + 1) % circle.length) + 1;
            circle.splice(currentMarble, 0, i);
        }
        currentPlayer = (currentPlayer + 1) % playerScores.length;
    }
    //console.log(circle);
    //console.log(playerScores);

    return playerScores.max();
};

const task2 = data => {
    
}

//let testdata = `9 players; last marble is worth 25 points`;
let testdata = `13 players; last marble is worth 7999 points`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 8317);

console.time();
console.log("Task 1: " + task1(inputdata));
console.timeEnd();

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
console.log("AOC 2018 - Day 9: Marble Mania");

// from AOC 2020 - Day 9: Encoding Error
Array.prototype.max = function () {
    return Math.max(...this);
}

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
          const re = /(\d+) players; last marble is worth (\d+) points/;
          const [ , players, lastMarble ] = re.exec(data);
          return [ +players, +lastMarble ];
};

const task = (data) => {
    const logLinkedList = current => {
        while (current.val !== 0) current = current.next;
        let str = "0";
        let value = 0;
        current = current.next;
        while (current.val !== value) {
            str += "," + current.val;
            current = current.next;
        }
        console.log(str);
    }

    const [ players, lastMarble ] = data;
    let current = { val: 0 };
    current.next = current;
    current.prev = current;
    let player = 0;
    let playerScores = Array.from({length:players}).map(x => 0);
    for (let i = 1; i <= lastMarble; i++) {
        if (i % 23 === 0) {
            playerScores[player] += i;
            current = current.prev.prev.prev.prev.prev.prev.prev;
            playerScores[player] += current.val;
            current.prev.next = current.next;
            current.next.prev = current.prev;
            current = current.next;
        } else {
            current = current.next;
            current.next = {
                val: i,
                next: current.next,
                prev: current
            };
            current = current.next;
            current.next.prev = current;
        }
        player = (player + 1) % playerScores.length;
    }
    //logLinkedList(current);
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

doEqualTest(task(testdata), 8317);

console.time();
console.log("Task: " + task(inputdata));
console.timeEnd();

console.log("");
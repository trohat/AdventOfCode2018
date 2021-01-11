console.log("AOC 2018 - Day 2: Inventory Management System");

String.prototype.count = function (char) { 
    let result = 0;
    for (const letter of this) {
        if (letter === char) result++;
    }
    return result;
};

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => data;

const task1 = boxes => {
    let iterations = 0;
    let twos = 0;
    let threes = 0;
    for (const box of boxes) {
        let two = false;
        let three = false;
        let set = new Set(box); // set is not necessary, but is it faster or slower with it?
        for (const letter of set) {
        //for (const letter of box) {
            const n = box.count(letter);
            iterations++;
            if (n === 2) two = true;
            if (n === 3) three = true;
        }
        if (two) twos++;
        if (three) threes++;
    }
    console.log("Iterations: " + iterations);
    return twos * threes;
};

const task2 = boxes => {
    for (const box1 of boxes) {
        for (const box2 of boxes) {
            let differs = 0;
            for (let i = 0; i < box1.length; i++) {
                if (box1[i] !== box2[i]) differs++;
            }
            if (differs === 1) {
                let newStr = "";
                for (let i = 0; i < box1.length; i++) {
                    if (box1[i] === box2[i]) newStr += box1[i];
                }
                return newStr;
            }
        }
    }
}

let testdata = `abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab`;

let testdata2 = `abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));
testdata2 = prepare(splitLines(testdata2));

console.log("");

console.time("Task 1: ");
doEqualTest(task1(testdata), 12);

console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1: ");

console.log("");

doEqualTest(task2(testdata2), "fgij");

console.log("Task 2: " + task2(inputdata));
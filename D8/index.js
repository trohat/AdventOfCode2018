console.log("funguju");

Array.prototype.sum = function () {
    return this.reduce((a,b) => a+b, 0);
}

const splitLines = (data) => data.split(" ").map(d => +d);

const prepare = data => {
    const readNode = () => {
        let childNodes = data.shift();
        let metadataEntries = data.shift();
        for (let i = 0; i < childNodes; i++) {
            readNode();
        }
        for (let i = 0; i < metadataEntries; i++) {
            metadata.push(data.shift());
        }
    }

    let metadata = [];
    readNode();

    return metadata;
};

const task1 = data => data.sum();

const task2 = data => {
    
}

let testdata = `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 138);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
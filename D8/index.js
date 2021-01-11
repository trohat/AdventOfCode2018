console.log("AOC 2018 - Day 8: Memory Maneuver");

Array.prototype.sum = function () {
    return this.reduce((a,b) => a+b, 0);
}

const splitLines = (data) => data.split(" ").map(d => +d);

const prepare = data => data;

const task1 = pdata => {
    let data = [ ...pdata ];
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

    return metadata.sum();
};

const task2 = data => {
    const readNode = () => {
        let childNodes = data.shift();
        let metadataEntries = data.shift();
        let childValues = [];
        let metadata = [];
        for (let i = 0; i < childNodes; i++) {
            childValues.push(readNode());
        }
        for (let i = 0; i < metadataEntries; i++) {
            metadata.push(data.shift());
        }

        if (childNodes === 0) return metadata.sum();
        let value = 0;
        for (const d of metadata) {
            if ((d-1) in childValues) value += childValues[d-1];
        }
        return value;
    }

    return readNode();
};

let testdata = `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 138);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 66);

console.log("Task 2: " + task2(inputdata));
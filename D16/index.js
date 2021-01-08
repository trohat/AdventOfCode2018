console.log("funguju");

const compareArrays = (arr1, arr2) => {
    let same = true;
    arr1.forEach((field, index) => {
        if (field !== arr2[index]) same = false;
    })
    return same;
}

const splitLines = (data) => data.split(String.fromCharCode(10) + String.fromCharCode(10));

const prepare = data => {
    let instrs = [];
    for (let line of data) {
        if (line === "") break;
        line = line.split(String.fromCharCode(10));
        let before = line[0].slice(9);
        before = before.slice(0, before.length - 1).split(",").map(d => +d);
        let instr = line[1].split(" ").map(d => +d);
        let after = line[2].slice(9);
        after = after.slice(0, after.length - 1).split(",").map(d => +d);
        instrs.push({ before, instr, after });
    }
    return instrs;
};

const task1 = (data) => {

    let opcodes = ["addr", "addi", "mulr", "muli", "banr", "bani", "borr", "bori", "setr", "seti", "gtir", "gtri", "gtrr", "eqir", "eqir", "eqrr"];

    let totalFits = 0;
    for (const sample of data) {
        let fits = 0;
        for (const opcode of opcodes) {
            let code = opcode.slice(0, 2);
            let first = "r";
            let second = opcode[3];
            if (["gt", "eq"].includes(code)) first = opcode[2];

            let arg1 = first === "r" ? sample.before[sample.instr[1]] : sample.instr[1];
            let arg2 = second === "r" ? sample.before[sample.instr[2]] : sample.instr[2];
            let res;

            switch (code) {
                case "ad":
                    res = arg1 + arg2;
                    break;
                case "mu":
                    res = arg1 * arg2;
                    break;
                case "ba":
                    res = arg1 & arg2;
                    break;
                case "bo":
                    res = arg1 | arg2;
                    break;
                case "se":
                    res = second === "r" ? sample.before[sample.instr[1]] : sample.instr[1];
                    break;
                case "gt":
                    res = arg1 > arg2 ? 1 : 0;
                    break;
                case "eq":
                    res = arg1 === arg2 ? 1 : 0;
                    break;
                default:
                    console.error("Unknown switch operation.");
            }
            let newAfter = [...sample.before];
            newAfter[sample.instr[3]] = res;

            if (compareArrays(sample.after, newAfter)) {
                console.log(opcode);
                fits++;
            }
        }
        if (fits >= 3) totalFits++;
    }
    return totalFits;
};

const task2 = data => {

}

let testdata = `Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 1);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
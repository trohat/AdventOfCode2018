console.log("funguju");

const compareArrays = (arr1, arr2) => {
    let same = true;
    arr1.forEach((field, index) => {
        if (field !== arr2[index]) same = false;
    })
    return same;
}

Array.prototype.intersection = function (arrB) {
    return this.filter(el => arrB.includes(el));
};

const splitLines = (data) => data.split(String.fromCharCode(10) + String.fromCharCode(10));

const prepare = data => {
    let instrs = [];
    second = false;
    for (let line of data) {
        if (second) {
            secondPart = line.split(String.fromCharCode(10));
            secondPart = secondPart.map(line => line.split(" ").map(d => +d));

            break;
        }
        if (line === "") {
            second = true;
            continue;
        }
        line = line.split(String.fromCharCode(10));
        let before = line[0].slice(9);
        before = before.slice(0, before.length - 1).split(",").map(d => +d);
        let instr = line[1].split(" ").map(d => +d);
        let after = line[2].slice(9);
        after = after.slice(0, after.length - 1).split(",").map(d => +d);
        instrs.push({ before, instr, after });
    }
    return [instrs, secondPart];
};

const task1 = ([data, secondPart]) => {

    let opcodes = ["addr", "addi", "mulr", "muli", "banr", "bani", "borr", "bori", "setr", "seti", "gtir", "gtri", "gtrr", "eqir", "eqri", "eqrr"];

    let totalFits = 0;
    let instrMap = new Map;
    for (const sample of data) {
        let fits = [];
        let instr = sample.instr[0];

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
                fits.push(opcode);
            }
        }
        if (instrMap.has(instr)) instrMap.set(instr, instrMap.get(instr).intersection(fits));
        else instrMap.set(instr, [...fits]);
    }

    let instrObj = {};
    while (instrMap.size > 0) {
        for (const [key, value] of instrMap) {
            if (value.length === 1) {
                instrObj[key] = value[0];
            }
        }
        let newInstrMap = new Map;
        for (let [key, value] of instrMap) {
            if (!(key in instrObj)) {
                value = value.filter(opcode => !Object.values(instrObj).includes(opcode));
                newInstrMap.set(key, value);
            }
        }
        instrMap = newInstrMap;
    }

    return [instrObj, secondPart];
};

const task2 = ([instrObj, testProgram]) => {
    let registers = [0, 0, 0, 0];
    for (const instruction of testProgram) {
        let opcode = instrObj[instruction[0]];
        let code = opcode.slice(0, 2);
        let first = "r";
        let second = opcode[3];
        if (["gt", "eq"].includes(code)) first = opcode[2];

        let arg1 = first === "r" ? registers[instruction[1]] : instruction[1];
        let arg2 = second === "r" ? registers[instruction[2]] : instruction[2];
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
                res = second === "r" ? registers[instruction[1]] : instruction[1];
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
        registers[instruction[3]] = res;
    }
    return registers[0];
}

inputdata = prepare(splitLines(inputdata));

inputdata = task1(inputdata);

console.log("Task 2: " + task2(inputdata));
console.log("AOC 2018 - Day 19: Go With The Flow");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    let program = [];
    const ipRe = /#ip (\d+)/;
    const instrRe = /(\w{4}) (-?\d+) (\d+) (\d+)/;
    const [ , ip ] = ipRe.exec(data.shift());
    for (const line of data) {
        const [ , instr, first, second, third ] = instrRe.exec(line);
        program.push([ instr, +first, +second, +third ]);
    }
    return [ +ip, program ];
};

const task1 = ([ipRegister, program]) => {

    const runInstruction = (registers, instruction) => {
        let opcode = instruction[0];
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

    let registers = [0, 0, 0, 0, 0, 0];
    let ip = 17;
    let steps = 0;

    while (ip < program.length) {
        registers[ipRegister] = ip;
        runInstruction(registers, program[ip]);
        ip = registers[ipRegister] + 1;
        steps++;
    }
    
    console.log("Ending with ip " + ip);
    console.log("Steps:" + steps);
    console.log(registers);
    return registers[0];
}

const task2 = () => {
    const r5 = 10551355;
    //const r5 = 955;
    let r0 = 0;
    let r1, r3, r4;
    r1 = 1;
    while (r1 <= r5) {
        r3 = 1;
        while (r3 * r1 <= r5) {
            r4 = r1 * r3;
            if (r4 === r5) r0 += r1;
            r3++;
        }
        r1++;
    }
    return r0;
}

let testdata = `#ip 0
seti 5 0 1
seti 6 0 2
addi 0 1 0
addr 1 2 3
setr 1 0 0
seti 8 0 4
seti 9 0 5`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

//doEqualTest(task(testdata), 6);

console.time("Task 1");
console.log("Task1: " + task1(inputdata));
console.timeEnd("Task 1");

console.time("Task 2");
console.log("Task2: " + task2(inputdata));
console.timeEnd("Task 2");
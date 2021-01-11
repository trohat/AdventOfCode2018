console.log("AOC 2018 - Day 21: Chronal Conversion");

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

    const runProgram = (firstRegister, maxSteps) => {
        
        let registers = [firstRegister, 0, 0, 0, 0, 0];

        let ip = 0;
        let steps = 0;

        while (ip < program.length && steps < maxSteps) {
            registers[ipRegister] = ip;
            runInstruction(registers, program[ip]);
            ip = registers[ipRegister] + 1;
            steps++;
        }
        if (steps < maxSteps) console.log("Finished in " + steps + " steps. First register is " + firstRegister + ".");
    }

    runProgram(16457176, 300000000);  
    return 16457176;
}

const task2 = () => {
    let results = new Set();
    let lastR5 = 0;

    let r5 = 0;
    let r2, r3, r4;
    r4 = r5 | 65536;
    r5 = 3935295;
    while (true) {
        r2 = r4 & 255;
        r5 += r2;
        r5 &= 16777215;
        r5 *= 65899; 
        r5 &= 16777215; 
        if (r4 < 256) {
            if (results.has(r5)) return lastR5;
            results.add(r5);
            lastR5 = r5;
            if (results.size % 1000 === 0) console.log(results.size);
            r4 = r5 | 65536;
            r5 = 3935295;
        }
        else r4 >>= 8;
    }
};

inputdata = prepare(splitLines(inputdata));

console.time("Task 1");
console.log("Task1: " + task1(inputdata));
console.timeEnd("Task 1");

console.time("Task 2");
console.log("Task2: " + task2());
console.timeEnd("Task 2");
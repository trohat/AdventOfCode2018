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
            //if (ip === 28) console.log(registers, steps);
            runInstruction(registers, program[ip]);
            ip = registers[ipRegister] + 1;
            steps++;
        }

        if (steps < maxSteps) console.log("Finished in " + steps + " steps. First register is " + firstRegister + ".");
    }

    /* this takes 36 mins
    for (let i = 0; i < 20000000; i++) {
        runProgram(i, 2000);
    }*/

    runProgram(16457176, 3000);  // this is beteer
}

inputdata = prepare(splitLines(inputdata));

console.time("Task 1");
console.log("Task1: " + task1(inputdata));
console.timeEnd("Task 1");
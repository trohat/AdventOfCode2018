console.log("funguju");

let ord = str => str.charCodeAt(0);

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /Step ([A-Z]) must be finished before step ([A-Z]) can begin./;
    const instructions = new Map();
    data.forEach( d => {
        const [ , prereq, actStep ] = re.exec(d);
        if (instructions.has(actStep)) instructions.get(actStep).push(prereq);
        else instructions.set(actStep, [ prereq ]);
        if (!instructions.has(prereq)) instructions.set(prereq, [ ]);
    })
    return instructions;
};

const task1 = parInstructions => {
    let instructions = new Map(parInstructions);
    let sequence = "";
    const size = instructions.size;
    while (sequence.length < size) {
        let availables = new Array();
        for (const [ key, value ] of instructions) {
            if (value.length === 0) availables.push(key);
        }
        availables.sort();
        let newStep = availables.shift();
        instructions.delete(newStep);
        sequence += newStep;
        for (const [ key, value ] of instructions) {
            let index = value.indexOf(newStep);
            if (index !== -1) value.splice(index, 1);
        }
    }
    return sequence;
};


const task2 = (instructions, test) => {
    let reduce = 4;
    if (test === "test") reduce = 64;
    let now = 0;
    const size = instructions.size;
    let workers = 5;
    if (test === "test") workers = 2;
    let sequence = "";
    let finished = new Array();
    while (sequence.length < size) {
        let availables = new Array();
        for (const [ key, value ] of instructions) {
            if (value.length === 0) availables.push(key);
        }
        availables.sort();
        while (workers > 0 && availables.length > 0) {
            let newStep = availables.shift();
            instructions.delete(newStep);
            finished.push({ step: newStep, finishTime: now + ord(newStep) - reduce})
            workers--;
        }
        finished.sort((a,b) => a.finishTime - b.finishTime);
        //if (workers > 0) continue;
        nowFinished = finished.shift();
        sequence += nowFinished.step;
        for (const [ key, value ] of instructions) {
            let index = value.indexOf(nowFinished.step);
            if (index !== -1) value.splice(index, 1);
        }
        workers++;
        now = nowFinished.finishTime;
    }
    return now;
};

let testdata = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

//doEqualTest(task1(testdata), "CABDFE");

//console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata, "test"), 15);

console.log("Task 2: " + task2(inputdata));
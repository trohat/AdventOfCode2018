console.log("funguju");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    let state = data.shift();
    state = state.slice(state.indexOf("te: ") + 3).trim();
    data.shift();
    data.sort().reverse();
    state = state.padStart(state.length + 30, ".");
    let zeroIndex = state.indexOf("#");
    const re = /(.{5}) => (.)/;
    data = data.map( rule => {
        const [ , pattern, output ] = re.exec(rule);
        return { pattern, output };
    });
    return { state, data, zeroIndex };
};

const task1 = ({ state, data: rules, zeroIndex } ) => {
    console.log(rules);
    state += "..";
    const steps = 20;
    for (let _ = 0; _ < steps; _++) {
        console.log(_)
        console.log(state);
        let newState = "";
        state = ".." + state + "..";
        for (let i = 0; i < state.length - 4; i++) {
            let around = state.slice(i, i + 5);
            let ruleUsed = false;
            for (const rule of rules) {
                if (around === rule.pattern) {
                    newState += rule.output;
                    ruleUsed = true;
                    break;
                }
            }
            if (!ruleUsed) newState += ".";
        }
        if (newState.lastIndexOf("#") > newState.length - 4) newState += ".....";
        state = newState;
    }
    let sum = 0;
    console.log(steps);
    console.log(state);
    for (let i = 0; i < state.length; i++) { 
        if (state[i] === "#")  sum += i - zeroIndex;
    }
    return sum;
};

const task2 = data => {
    
}

let testdata = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 325);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
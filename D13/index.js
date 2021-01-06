console.log("funguju");

let chr = String.fromCharCode;

let ord = str => str.charCodeAt(0);

const turns = new Map([["left", "straight"], ["straight", "right"], ["right", "left"]]);

const dirs = new Map([["<", "left"], [">", "right"], ["^", "up"], ["v", "down"]]);

const moves = new Map([["left", { x: -1, y: 0 }], ["right", { x: 1, y: 0 }], ["up", { x: 0, y: -1 }], ["down", { x: 0, y: 1 }]]);

const leftTurns = new Map([["up", "left"], ["left", "down"], ["down", "right"], ["right", "up"]]);

const rightTurns = new Map([["up", "right"], ["right", "down"], ["down", "left"], ["left", "up"]]);

const leftTopTurns = new Map([["up", "right"], ["right", "up"], ["down", "left"], ["left", "down"]]);

const rightTopTurns = new Map([["down", "right"], ["right", "down"], ["up", "left"], ["left", "up"]]);

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const carts = [];
    data.shift(); // remove first empty line

    data.forEach((line, lineIndex) => {
        line.split("").forEach((char, charIndex) => {
            if (["<", ">", "^", "v"].includes(char)) {
                let cart = {
                    x: charIndex,
                    y: lineIndex,
                    nextTurn: "left",
                    dir: dirs.get(char)
                };
                carts.push(cart);
            }
        });
    });

    return [carts, data];
};

const task1 = ([carts, tracks]) => {
    console.log("carts: " + carts.length);
    while (true) {
        for (const cart of carts) {
            let move = moves.get(cart.dir);
            //console.log(cart.dir)
            //console.log(move)
            cart.x += move.x;
            cart.y += move.y;
            for (const otherCart of carts) {
                if (cart === otherCart) continue;
                if (cart.x === otherCart.x && cart.y === otherCart.y) {
                    return cart.x + "," + cart.y;
                }
            }
            const ground = tracks[cart.y][cart.x];
            switch (ground) {
                case "-":
                case "|":
                case "<":
                case ">":
                case "^":
                case "v":
                    break;
                case "/":
                    cart.dir = leftTopTurns.get(cart.dir);
                    break;
                case "\\":
                    cart.dir = rightTopTurns.get(cart.dir);
                    break;
                case "+":
                    switch (cart.nextTurn) {
                        case "left":
                            cart.dir = leftTurns.get(cart.dir);
                            break;
                        case "straight":
                            break;
                        case "right":
                            cart.dir = rightTurns.get(cart.dir);
                            break;
                        default:
                            console.warn("Inner switch error.");
                    }
                    cart.nextTurn = turns.get(cart.nextTurn);
                    break;
                default:
                    console.warn("Outer switch error.");
            }
        }
    }
};

const task2 = data => {

}

let testdata = `
/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), "7,3");

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
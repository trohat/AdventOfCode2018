console.log("AOC 2018 - Day 13: Mine Cart Madness");

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
    data.shift(); // first remove empty line

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

const task = ([carts, tracks]) => {
    console.log("carts: " + carts.length);
    while (true) {
        let cartsToRemove = [];
        for (const cart of carts) {
            let move = moves.get(cart.dir);
            cart.x += move.x;
            cart.y += move.y;
            for (const otherCart of carts) {
                if (cart === otherCart) continue;
                if (cart.x === otherCart.x && cart.y === otherCart.y) {
                    cartsToRemove.push(cart);
                    cartsToRemove.push(otherCart);
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
        carts = carts.filter(c => !cartsToRemove.includes(c));
        carts.sort((c1,c2) => {
            if (c1.y === c2.y) return c1.x - c2.x;
            return c1.y - c2.y;
        });
        if (carts.length === 1) return carts[0].x + "," + carts[0].y; // + "," + carts[0].dir;
    }
};

let testdata = `
/>-<\\  
|   |  
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`;
  
inputdata = prepare(splitLines(inputdata));
  
testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task(testdata), "6,4");

console.log("");

console.log("Task: " + task(inputdata));

console.log("");
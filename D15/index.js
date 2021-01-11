console.log("AOC 2018 - Day 15: Beverage Bandits");

const dirs = [{ y: -1, x: 0 }, { y: 0, x: -1 }, { y: 0, x: 1 }, { y: 1, x: 0 }];

String.prototype.setCharAt = function (index, char) {
    return this.substring(0, index) + char + this.substring(index + 1);
}

const sortXY = (el1, el2) => {
    if (el1.y === el2.y) return el1.x - el2.x;
    return el1.y - el2.y;
};

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    let units = [];
    let map = [];
    data.forEach((line, lineIndex) => {
        map.push([]);
        line.split("").forEach((char, charIndex) => {
            const isWall = char === "#";
            const isEmpty = char === ".";
            let type = null;
            if (["E", "G"].includes(char)) {
                type = "goblin";
                if (char === "E") type = "elf";
                units.push({ type, x: charIndex, y: lineIndex, moved: false, hp: 200 });
            }
            map[lineIndex].push({ isWall, isEmpty, unit: type, distance: null, reverseDistance: null });
        })
    });
    return [map, units];
};

const draw = (maze, parUnits) => {
    let units = [...parUnits];
    units.sort(sortXY);
    for (const line of maze) {
        let str = "";
        let unitStr = "";
        for (const field of line) {
            switch (true) {
                case field.isWall:
                    str += "#";
                    break;
                case field.isEmpty:
                    str += ".";
                    break;
                case (field.unit && field.unit === "elf"):
                    str += "E";
                    break;
                case (field.unit && field.unit === "goblin"):
                    str += "G";
                    break;
                default:
                    console.error("Wrong switch");
            }
            if (field.unit) {
                u = units.shift();
                unitStr += u.type.slice(0, 1).toUpperCase() + "(" + u.hp + "), ";
            }
        }
        if (unitStr.length > 0) unitStr = unitStr.slice(0, unitStr.length - 2);
        console.log(str + "   " + unitStr);
    }
}

const task1 = (map, units, elvesAttack) => {
    let rounds = 0;
    while (true) {
        for (let i = 0; i < map.length; i++) {   // going throug maze, y-style
            for (let j = 0; j < map[0].length; j++) {  // going through maze, x-style
                if (map[i][j].unit) {               // is there unit?
                    for (const unit of units) {         // finding the right unit
                        if (unit.x === j && unit.y === i && !unit.moved) {
                            let someoneToFight = false;
                            for (const enemy of units) {
                                if (enemy.type !== unit.type) someoneToFight = true;
                            }
                            if (!someoneToFight) {
                                let totalHP = 0;
                                for (const friend of units) {
                                    totalHP += friend.hp;
                                }
                                return rounds * totalHP;
                            }
                            unit.moved = true;
                            // looking where to move
                            let inRange = [];
                            let fieldsToInspect = [];
                            fieldsToInspect.push({ x: unit.x, y: unit.y, distance: 0 })
                            map[i][j].distance = 0;
                            let foundEnemy = false;
                            while (fieldsToInspect.length > 0 && !foundEnemy) {
                                let newFieldsToInspect = [];
                                while (fieldsToInspect.length > 0) {
                                    let field = fieldsToInspect.shift();
                                    for (const dir of dirs) {
                                        let newX = field.x + dir.x;
                                        let newY = field.y + dir.y;
                                        let newField = map[newY][newX];
                                        if (newField.isWall || newField.unit === unit.type) {
                                            continue;
                                        }
                                        if (newField.distance !== null) {
                                            continue;
                                        }
                                        if (newField.unit) {
                                            inRange.push({ x: field.x, y: field.y });
                                            foundEnemy = true;
                                            break;
                                        }
                                        if (newField.isEmpty && newField.distance === null) {
                                            newField.distance = field.distance + 1;
                                            newFieldsToInspect.push({ x: field.x + dir.x, y: field.y + dir.y, distance: field.distance + 1 });
                                            continue;
                                        }
                                        console.error("Unknown field.");
                                    }
                                }
                                fieldsToInspect = newFieldsToInspect;
                            }
                            if (foundEnemy) {
                                inRange.sort(sortXY);
                                let moveTo = inRange.shift();
                                let targetDistance = map[moveTo.y][moveTo.x].distance;
                                if (targetDistance !== 0) {
                                    while (targetDistance > 1) {
                                        for (const dir of dirs) {
                                            if (map[moveTo.y + dir.y][moveTo.x + dir.x].distance && map[moveTo.y + dir.y][moveTo.x + dir.x].distance < targetDistance) {
                                                moveTo.y += dir.y;
                                                moveTo.x += dir.x;
                                                targetDistance--;
                                                break;
                                            }
                                        }
                                    }
                                    //moving
                                    map[unit.y][unit.x].unit = null;
                                    map[unit.y][unit.x].isEmpty = true;
                                    unit.y = moveTo.y;
                                    unit.x = moveTo.x;
                                    map[unit.y][unit.x].unit = unit.type;
                                    map[unit.y][unit.x].isEmpty = false;
                                }
                            }
                            // clear distances
                            for (let i = 0; i < map.length; i++) {
                                for (let j = 0; j < map[0].length; j++) {
                                    map[i][j].distance = null;
                                    map[i][j].reverseDistance = null;
                                }
                            }

                            // unit attacks
                            let targets = [];
                            let weakest = 201;
                            for (const dir of dirs) {
                                let x = unit.x + dir.x;
                                let y = unit.y + dir.y;
                                if (map[y][x].unit && map[y][x].unit !== unit.type) {
                                    for (const target of units) {
                                        if (target.x === x && target.y === y) {
                                            if (target.hp < weakest) {
                                                targets.push(target);
                                                weakest = target.hp;
                                            }
                                        }
                                    }
                                }
                            }
                            targets.sort((t1, t2) => t1.hp - t2.hp);
                            target = targets.shift();
                            if (target) {
                                if (target.type === "elf") target.hp -= 3;
                                else target.hp -= elvesAttack;

                                if (target.hp <= 0) {
                                    if (target.type === "elf") return "elf died";
                                    units = units.filter(u => u != target);
                                    map[target.y][target.x].isEmpty = true;
                                    map[target.y][target.x].unit = null;
                                }
                            }
                        }
                    }
                }
            }
        }
        rounds++;
        for (const unit of units) unit.moved = false;
        //draw(map, units);
    }
};

const task2 = ([ map, units ]) => {
    let backupMap = JSON.stringify(map);
    let backupUnits = JSON.stringify(units);
    let elvesAttack = 3;
    while (true) {
        elvesAttack++;
        let result = task1(JSON.parse(backupMap), JSON.parse(backupUnits), elvesAttack);
        if (result !== "elf died") {
            console.log("Final attack: " + elvesAttack);
            console.log("Result: " + result);
            return result;
        };
    }
}

let testdata1 = `#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`;

let testdata2 = `#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`;

let testdata3 = `#######
#E.G#.#
#.#G..#
#G.#.G#
#G..#.#
#...E.#
#######`;

let testdata4 = `#######
#.E...#
#.#..G#
#.###.#
#E#G#G#
#...#G#
#######`;

let testdata5 = `#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`;

inputdata = prepare(splitLines(inputdata));

//console.log(inputdata);

testdata1 = prepare(splitLines(testdata1));
testdata2 = prepare(splitLines(testdata2));
testdata3 = prepare(splitLines(testdata3));
testdata4 = prepare(splitLines(testdata4));
testdata5 = prepare(splitLines(testdata5));

console.log("");

//doEqualTest(task1(testdata), 47);

//console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata1), 4988);
doEqualTest(task2(testdata2), 31284);
doEqualTest(task2(testdata3), 3478);
doEqualTest(task2(testdata4), 6474);
doEqualTest(task2(testdata5), 1140);

console.log("Task 2: " + task2(inputdata));
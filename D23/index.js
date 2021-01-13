console.log("AOC 2018 - Day 23: Experimental Emergency Teleportation");

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(-?\d+)/;
    const nanobots = [];
    for (const line of data) {
        const [, x, y, z, range] = re.exec(line);
        nanobots.push({ x: +x, y: +y, z: +z, range: +range });
    }
    return nanobots;
};

const countManhattan = (a, b) => (Math.abs(a.x - b.x)) + (Math.abs(a.y - b.y)) + (Math.abs(a.z - b.z));

const countManhattan2 = (a, x, y, z) => (Math.abs(a.x - x)) + (Math.abs(a.y - y)) + (Math.abs(a.z - z));

const task1 = nanobots => {
    let bestIndex = 0;
    nanobots.forEach((bot, index) => {
        if (bot.range > nanobots[bestIndex].range) {
            bestIndex = index;
        }
    });

    let inRange = 0;
    nanobots.forEach((bot) => {
        if (countManhattan(bot, nanobots[bestIndex]) <= nanobots[bestIndex].range) inRange++;
    });

    return inRange;
};

const task2 = nanobots => {

    // made with iterating from divisor 10e6 through divisor = lastDivisor / 10 to divisor = 1 and manually interpreting the results
    let divisor = 1;
    const divisedNanobots = nanobots.map(bot => ({ x: Math.floor( bot.x / divisor ), y: Math.floor( bot.y / divisor ), z: Math.floor( bot.z / divisor ), range: Math.floor( bot.range / divisor )}));

    // code from AOC 2018 D6 - Chronal Coordinates
    let minX = 10e10;
    let maxX = 0;
    let minY = 10e10;
    let maxY = 0;
    let minZ = 10e10;
    let maxZ = 0;
    for (const nanobot of divisedNanobots) {
        let {x, y, z} = nanobot;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        if (z < minZ) minZ = z;
        if (z > maxZ) maxZ = z;
    }

    console.log(minX, maxX, maxX - minX, minY, maxY, maxY - minY, minZ, maxZ, maxZ - minZ);

    let most = [];
    for (let x = 50372470; x <= 50372550; x++) {
    for (let y = 12337760; y <= 12337800; y++) {
    for (let z = 46178980; z <= 46179080; z++) { 
                let sum = 0;
                for (const bot of divisedNanobots) {
                    if (countManhattan2(bot, x,y,z) <= bot.range) sum++;
                }
                most.push({ x,y,z, sum});
            }
        }
    }

    most.sort((a,b) => {
        if (a.sum - b.sum === 0) return a.x + a.y + a.z - b.x - b.y - b.z;
        return b.sum- a.sum;
    });

    console.log(most);

    console.log(most[0]);
    console.log(most[0].x + most[0].y + most[0].z)
    
};

let testdata1 = `pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1`;

let testdata2 = `pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata1 = prepare(splitLines(testdata1));
testdata2 = prepare(splitLines(testdata2));

console.log("");

doEqualTest(task1(testdata1), 7);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata2), undefined);

task2(inputdata);
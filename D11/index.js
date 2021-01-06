console.log("funguju");

const prepare = data => data;

const powerLevel = (x, y, serialNumber) => {
    let rackID = x + 10;
    let powerLevel = rackID * y;
    powerLevel += serialNumber;
    powerLevel *= rackID;
    powerLevel = Math.floor(powerLevel / 100) % 10;
    return powerLevel - 5;
}

const task1 = serialNumber => {
    let grid = [];
    for (let i = 1; i <= 300; i++) {
        grid.push([]);
        for (let j = 1; j <= 300; j++) {
            grid[i-1].push(powerLevel(j,i,serialNumber));
        }
    }
    let maxPower = 0;
    let maxI;
    let maxJ;
    let bestSize;
    for (let i = 0; i < 300; i++) {
        for (let j = 0; j < 300; j++) {
            let maxSize = 300 - Math.max(i,j);
            for (let size = 0; size < maxSize; size++) {
                let totalPower = 0;
                for (let iInside = i; iInside < i + size; iInside++) {
                    for (let jInside = j; jInside < j + size; jInside++) {
                        totalPower += grid[iInside][jInside];
                    }
                }

                if (totalPower > maxPower) {
                    maxPower = totalPower;
                    maxI = i;
                    maxJ = j;
                    bestSize = size;
                }
            }
        }
        console.log("finished:", i);
    }
    return (maxJ+1) + "," + (maxI+1) + "," + bestSize;
};

const task2 = data => {
    
}

let testdata = ``;


console.log(inputdata);


console.log("");

console.time();
doEqualTest(task1(18), "90,269,16");
doEqualTest(task1(42), "232,251,12");

console.log("Task 1: " + task1(inputdata));
console.timeEnd();

console.log("");

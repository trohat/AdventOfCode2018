console.log("AOC 2018 - Day 10: The Stars Align");

Array.prototype.arrayFieldsToNumbers = function () {
    return this.map(f => +f);
};

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = (data) => {
    const re = /position=< ?(-?\d+),  ?(-?\d+)> velocity=< ?(-?\d+),  ?(-?\d+)>/;
    const stars = [];
    data.forEach(line => {
        const [, posX, posY, velX, velY] = re.exec(line);
        stars.push({
            posX: +posX,
            posY: +posY,
            velX: +velX,
            velY: +velY
        });
    });
    return stars;
};

const task1 = stars => {
    const countPos = stars => {
        maxX = 0;
        minX = 10e10;
        minY = 10e10;
        maxY = 0;
        for (const star of stars) {
            let x = star.posX;
            let y = star.posY;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }
        return;
    };
    
    const isNice = stars => {
        let aligned = 0;
        for (const star of stars) {
            if (star.posX === minX || star.posX === maxX) aligned++;
            if (star.posY === minY || star.posY === maxY) aligned++;
        }
        let returnVal = false;
        if (aligned > lastAligned) returnVal = true;
        lastAligned = aligned;
        return returnVal;
    };

    const makeStep = stars => {
        for (const star of stars) {
            star.posX += star.velX;
            star.posY += star.velY;
        }
    };

    const draw = stars => {
        for (let i = minY; i <= maxY; i++) {
            let str = "";
            innerFor: for (let j = minX; j <= maxX; j++) {
                for (const star of stars) {
                    if (i === star.posY && j === star.posX) { 
                        str += "#";
                        continue innerFor;
                    }
                }
                str += ".";
            }
            console.log(str);
        }
    };

    let nicePictures = 0;
    let step = 0;
    let lastAligned = 10e10;
    let minX, maxX, maxY, minY;

    while (step < 10600) {
        countPos(stars);
        if (isNice(stars) && step > 3) {
            console.log("Drawing... - step", step, "lastAligned:", lastAligned, "xDiff:", maxX- minX, "yDiff", maxY - minY );
            console.log("");
            nicePictures++;
            draw(stars);
        }
        step++;
        makeStep(stars);
    }
};

const task2 = data => {

}

let testdata = `position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log("");

//doEqualTest(task1(testdata), 7);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
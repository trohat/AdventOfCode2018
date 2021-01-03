console.log("funguju");

String.prototype.setCharAt = function(index, char) {
    return this.substring(0,index) + char + this.substring(index+1);
}

Array.prototype.countChar = function (char) {
    return this.reduce((accumulator, str) => accumulator + str.split(char).length-1, 0);
}

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
    data = data.map ( line => {
        let [ , id, fromLeft, fromTop, width, height ] = re.exec(line);
        return {
            id,
            fromLeft: +fromLeft,
            fromTop: +fromTop,
            width: +width,
            height: +height
        }
    })
    return data;
};


const task1 = (data, task2) => {
    maxW = 0;
    maxH = 0;
    
    
    for (const claim of data) {
        if (claim.fromLeft + claim.width > maxW) maxW = claim.fromLeft + claim.width;
        if (claim.fromTop + claim.height > maxH) maxH = claim.fromTop + claim.height;
    }
    
    const size = maxH + 3;
    let str = "";
    let fabric = [];
    
    for (let i = 0; i < size; i++) {
        str += ".";
    }
    for (let i = 0; i < size; i++) {
        fabric.push(str);
    }

    for (const claim of data) {
        for (let i = 0; i < claim.height; i++) {
            for (let j = 0; j < claim.width; j++) {
                if (fabric[ i + claim.fromTop ][ j + claim.fromLeft ] === "1") fabric[ i + claim.fromTop ] = fabric[ i + claim.fromTop ].setCharAt( j + claim.fromLeft, "2");
                if (fabric[ i + claim.fromTop ][ j + claim.fromLeft ] === ".") fabric[ i + claim.fromTop ] = fabric[ i + claim.fromTop ].setCharAt( j + claim.fromLeft, "1");
            }
        }
    }


    if (task2 === "task2") return fabric;
    return fabric.countChar("2");

};

const task2 = data => {
    let fabric = task1(data, "task2");

    for (const claim of data) {
        let overlapping = false;
        for (let i = 0; i < claim.height; i++) {
            for (let j = 0; j < claim.width; j++) {
                if (fabric[ i + claim.fromTop ][ j + claim.fromLeft ] === "2") overlapping = true;
            }
        }
        if (!overlapping) return claim.id;
    }
}

let testdata = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task1(testdata), 4);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), "3");

console.log("Task 2: " + task2(inputdata));
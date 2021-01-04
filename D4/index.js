console.log("funguju");

String.prototype.setCharAt = function(index, char) {
    return this.substring(0,index) + char + this.substring(index+1);
}

Array.prototype.countChar = function (char) {
    return this.reduce((accumulator, str) => accumulator + str.split(char).length-1, 0);
}

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => {
    data = data.sort();
    let guards = new Map();
    let guardArr;
    const re = /:(\d\d)] (Guard #(\d+) begins shift|falls asleep|wakes up)/;
    for (const line of data) {
        const [ , mins, action, id ] = re.exec(line);
        if (id) {
            if (guards.has(id)) {
                guardArr = guards.get(id);
                guardArr.push({ action: "next shift", mins});
            } else {
                guardArr = [];
                guards.set(id, guardArr);
            }
        } else {
            guardArr.push({
                mins, action
            });
        }
    }
    return guards;
};

const task1 = guards => {
    const dot = ".";
    let sixtyDots = "";
    for (let i = 0; i < 60; i++) {
        sixtyDots += dot;
    }

    let maxSleep = 0;
    let sleepiest;
    let records = new Map();
    for (const [ id, guard ] of guards) {
        let schedule = [];
        records.set(id, schedule);
        let day = sixtyDots;
        let sleepyTime;
        for (const record of guard) {
            switch (record.action) {
                case "next shift":
                    schedule.push(day);
                    day = sixtyDots;
                    break;
                case "falls asleep":
                    sleepyTime = record.mins;
                    break;
                case "wakes up":
                    for (let i = +sleepyTime; i < record.mins; i++) {
                        day = day.setCharAt(i, "#");
                    }
                    break;
                }
        }
        schedule.push(day);
        if (schedule.countChar("#") > maxSleep) {
            maxSleep = schedule.countChar("#");
            sleepiest = id; 
        }
    }
    let guard = records.get(sleepiest);
    let maxCount = 0;
    let minute;
    for (let j = 0; j < sixtyDots.length; j++) {
        let count = 0;
        for (let i = 0; i < guard.length; i++) {
            if (guard[i][j] === "#") count++;
        }
        if (count > maxCount) {
            maxCount = count;
            minute = j;
        }
    }
    return [ sleepiest * minute, sleepiest, minute ];
};

const task2 = guards => {
    const dot = ".";
    let sixtyDots = "";
    for (let i = 0; i < 60; i++) {
        sixtyDots += dot;
    }

    let records = new Map();
    for (const [ id, guard ] of guards) {
        let schedule = [];
        records.set(id, schedule);
        let day = sixtyDots;
        let sleepyTime;
        for (const record of guard) {
            switch (record.action) {
                case "next shift":
                    schedule.push(day);
                    day = sixtyDots;
                    break;
                case "falls asleep":
                    sleepyTime = record.mins;
                    break;
                case "wakes up":
                    for (let i = +sleepyTime; i < record.mins; i++) {
                        day = day.setCharAt(i, "#");
                    }
                    break;
                }
        }
        schedule.push(day);
    }

    let maxCount = 0;
    let minute;
    let maxId;
    
    for (const [ id, guard ] of records) {
        for (let j = 0; j < sixtyDots.length; j++) {
            let count = 0;
            for (let i = 0; i < guard.length; i++) {
                if (guard[i][j] === "#") count++;
            }
            if (count > maxCount) {
                maxCount = count;
                minute = j;
                maxId = id;
            }
        }
    }
    return [ maxId * minute, maxId, minute, maxCount ];
};

let testdata = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`;

inputdata = prepare(splitLines(inputdata));

//console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 240);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 4455);

console.log("Task 2: " + task2(inputdata));
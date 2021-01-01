console.log("funguju");


String.prototype.count = function(c) { 
    let result = 0, i = 0;
    for(i;i<this.length;i++) if(this[i]==c)result++;
    return result;
};

String.prototype.countOptimized = function(c) { 
    let result = 0, i = 0, l = this.length;
    for(i; i<l; i++) if(this[i]==c)result++;
    return result;
};

String.prototype.countChar = function (char) {
    return this.split(char).length-1;
};

String.prototype.countWithForOf = function (char) { 
    let result = 0;
    for (const letter of this) {
        if (letter === char) result++;
    }
    return result;
};

const task1 = data => {
    data.count("a");
};

const task2 = data => {
    data.countOptimized("a");
};

const task3 = data => {
    data.countChar("a");
};

const task4 = data => { 
    data.countWithForOf("a");
};

const test = func => {
    for (let i = 0; i < 100000; i++) {
        func(inputdata);
    }
}


console.time("Simple count with for loop");
test(task1);
console.timeEnd("Simple count with for loop");

console.log("");

console.time("Simple count with optimized for loop");
test(task2);
console.timeEnd("Simple count with optimized for loop");

console.log("");

console.time("Count with spliting");
test(task3);
console.timeEnd("Count with spliting");

console.log("");

console.time("For-of loop");
test(task4);
console.timeEnd("For-of loop");

console.log("");

// Results: Spliting is afar the fastest method.
// For-of is still better than usual for loop.
console.log("funguju");


const task1 = improve => {
    let recipes = [ 3, 7];
    let firstElf = 0;
    let secondElf = 1;
    while (recipes.length < improve + 10) {
        let newRecipe = recipes[firstElf] + recipes[secondElf];
        if (newRecipe > 9) {
            recipes.push(1);
            recipes.push(newRecipe % 10);
        } else recipes.push(newRecipe);
        firstElf = (firstElf + 1 + recipes[firstElf]) % recipes.length;
        secondElf = (secondElf + 1 + recipes[secondElf]) % recipes.length;
    }
    return recipes.slice(improve).join("");
};

const task2 = toAppear => {
    toAppear = toAppear.toString();
    let recipes = [ 3, 7];
    let firstElf = 0;
    let secondElf = 1;
    while (true) {
        let newRecipe = recipes[firstElf] + recipes[secondElf];
        if (newRecipe > 9) {
            recipes.push(1);
            recipes.push(newRecipe % 10);
        } else recipes.push(newRecipe);
        firstElf = (firstElf + 1 + recipes[firstElf]) % recipes.length;
        secondElf = (secondElf + 1 + recipes[secondElf]) % recipes.length;

        if (recipes.slice(recipes.length - toAppear.length).join("") === toAppear) return recipes.length - toAppear.length;
        if (recipes.slice(recipes.length - toAppear.length - 1, recipes.length - 1).join("") === toAppear) return recipes.length - toAppear.length - 1;
    }
}

let testdata = 9;

console.log("");

doEqualTest(task1(testdata), "5158916779");

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2("51589"), 9);
doEqualTest(task2("01245"), 5);
doEqualTest(task2("92510"), 18);
doEqualTest(task2("59414"), 2018);

console.time();
console.log("Task 2: " + task2("110201"));
console.timeEnd();
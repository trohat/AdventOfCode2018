console.log("AOC 2018 - Day 24: Immune System Simulator 20XX");

const splitLines = (data) => data.split(String.fromCharCode(10));

const IMMUNE_SYSTEM = "immuneSystem";
const INFECTION = "infection";
const IMMUNE = "immune";
const WEAK = "weak";
const DEBUG = "debug";

const prepare = data => {
    let re = /(\d+) units each with (\d+) hit points (\([a-z ,;]+\) |)with an attack that does (\d+) (\w+) damage at initiative (\d+)/
    let traitsRE = /(weak|immune) to ([\w, ]+)$/;

    const system = [];
    let type;
    let id;
    for (const line of data) {
        if (line === "") continue;
        if (line.trim() === "Immune System:") {
            type = IMMUNE_SYSTEM;
            id = 1;
            continue;
        }
        if (line.trim() === "Infection:") {
            type = INFECTION;
            id = 1;
            continue;
        }

        let [, units, hp, traits, attack, attackType, initiative] = re.exec(line);
        if (traits.length > 0) {
            traits = traits.slice(1, traits.length - 2);
            traits = traits.split(";");
            let traitsObj = {};
            for (const line of traits) {
                let [, what, names] = traitsRE.exec(line);
                traitsObj[what] = names;
            }
            traits = traitsObj;
        } else traits = null;
        let effectivePower = units * attack;
        system.push({ type, id, initiative: +initiative, effectivePower, units: +units, hp: +hp, attack: +attack, attackType, initiative: +initiative, traits, target: null, chosen: false });
        id++;
    }
    return system;
};

const task1 = (system, debug) => {
    const effectivePowerSortingFunction = (a,b) => {
        if (a.effectivePower === b.effectivePower) return b.initiative - a.initiative;
        return b.effectivePower - a.effectivePower;
    };

    const initiativeSortingFunction = (a, b) => b.initiative - a.initiative;

    const logSortingFunction = (a,b) => {
        if (a.type === b.type) return a.id - b.id;
        if (a.type === IMMUNE_SYSTEM) return -1;
        return 1;
    };

    const log = (text) => {
        if (debug === DEBUG) console.log(text);
    };

    const damageCoefficient = (attackType, traits) => {
        if (traits === null) return 1;
        if (IMMUNE in traits && traits.immune.indexOf(attackType) !== -1) return 0;
        if (WEAK in traits && traits.weak.indexOf(attackType) !== -1) return 2;
        return 1;
    }

    const selectTarget = (unit, system) => {
        let maxDamage = 0;
        let target = null;
        let enemyEffectivePower = 0;
        let enemyInitative = 0;
        system.forEach((enemyUnit, index) => {
            if (unit.type === enemyUnit.type || enemyUnit.chosen) return;
            let actualDamage = unit.effectivePower * damageCoefficient(unit.attackType, enemyUnit.traits);
            if (actualDamage > 0 && actualDamage === maxDamage && enemyEffectivePower === enemyUnit.effectivePower && enemyUnit.initiative > enemyInitative
                || actualDamage > 0 && actualDamage === maxDamage && enemyUnit.effectivePower > enemyEffectivePower
                || actualDamage > maxDamage) {
                target = enemyUnit;
                maxDamage = actualDamage;
                enemyEffectivePower = enemyUnit.effectivePower;
                enemyInitative = enemyUnit.initiative;
                let type = unit.type === IMMUNE_SYSTEM ? "Immune System" : "Infection";
                log(type + " group " + unit.id + " would deal defending group " + enemyUnit.id + " " + actualDamage + " damage.");
            }
        });
        if (maxDamage === 0) return null;
        target.chosen = true;
        return target;
    };

    const attack = (unit, enemy) => {
        if (unit.units < 0) return;
        unit.effectivePower = unit.units * unit.attack;
        let damage = unit.effectivePower * damageCoefficient(unit.attackType, enemy.traits);
        let killed = Math.floor(damage / enemy.hp);
        let type = unit.type === IMMUNE_SYSTEM ? "Immune System" : "Infection";
        log(type + " group " + unit.id + " attacks defending group " + enemy.id + ", killing " + killed + " units.");
        enemy.units -= killed;
        return killed;
    };

    let end = false;
    let round = 0;
    let reindeerWon = false;
    while (!end) {
        round++;
        log("");
        log("Round " + round + ":");
        let totalKilled = 0;
        
        system.sort(effectivePowerSortingFunction);
        
        for (const unit of system) {
            unit.target = selectTarget(unit, system);
        }

        log("");
        system.sort(initiativeSortingFunction);

        for (const unit of system) {
            if (unit.target) totalKilled += attack(unit, unit.target);
        }

        system = system.filter( unit => unit.units > 0);

        let immunity = false;
        let infection = false;
        let firstInfection = true;
        system.sort(logSortingFunction);
        log("Immune System:");

        // reset effective power + which units were chosen and log the state
        for (const unit of system) {
            unit.effectivePower = unit.units * unit.attack;
            unit.chosen = false;
            if (unit.type === IMMUNE_SYSTEM) immunity = true;
            if (unit.type === INFECTION) {
                if (firstInfection) {
                    firstInfection = false;
                    infection = true;
                    if (!immunity) log("No groups remain.");
                    log("Infection:");
                }
            };
            log("Group " + unit.id + " contains " + unit.units + ".");
        }
        if (!infection) log("No groups remain.");

        log("Total killed " + totalKilled);
        if (totalKilled === 0) end = true;

        if (!(infection && immunity)) end = true;
        if (!infection) reindeerWon = true;

    }
    let totalUnits = 0;
    for (const unit of system) totalUnits += unit.units;

    return [ totalUnits, reindeerWon ];
};

const task2 = system => {
    const backupSystem = JSON.stringify(system);
    let boost = 0;
    let boostChange = 1000;

    let nextEnds = false;

    while (true) {
        let system = JSON.parse(backupSystem);
        boost += boostChange;
        //console.log("Working with " + boost + " boost.");
        for (const unit of system) {
            if (unit.type === IMMUNE_SYSTEM) {
                unit.attack += boost;
                unit.effectivePower = unit.units * unit.attack;
            }
        }

        let result;
        result = task1(system);
        if (result[1]) {
            boost -= boostChange;
            boostChange = boostChange / 10;
        }

        if (result[1] && boostChange < 1) return result[0];
    }
}

let testdata = `Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

//doEqualTest(task1(testdata, DEBUG)[0], 5216);

//console.log("Task 1: " + task1(inputdata)[0]);

console.log("");

//doEqualTest(task2(testdata), 51);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");
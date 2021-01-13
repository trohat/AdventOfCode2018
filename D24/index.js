console.log("AOC 2018 - Day 24: Immune System Simulator 20XX");

const splitLines = (data) => data.split(String.fromCharCode(10) + String.fromCharCode(10));

const prepare = data => {
    const readArr = arr => {
        let re = /(\d+) units each with (\d+) hit points (\([a-z ,;]+\) |)with an attack that does (\d+) (\w+) damage at initiative (\d+)/
        let traitsRE = /(weak|immune) to ([\w, ]+)$/;
        arr = arr.split(String.fromCharCode(10));
        arr.shift();
        let output = [];
        for (const line of arr) {
            let [ , units, hp, traits, attack, attackType, initiative ] = re.exec(line);
            if (traits.length > 0) {
                traits = traits.slice(1, traits.length - 2);
                traits = traits.split(";");
                let traitsObj = {};
                for (const line of traits) {
                    let [ , what, names ] = traitsRE.exec(line);
                    traitsObj[what] = names;
                }
                traits = traitsObj;
            } else traits = null;
            let effectivePower = units * attack;
            output.push({ effectivePower, units: +units, hp: +hp, attack: +attack, attackType, initiative: +initiative, traits, target: null });
        }
        return output;
    }

    const immuneSystem = readArr(data[0]);
    const infection = readArr(data[1]);
    
    return  [ immuneSystem, infection ];
};

const task1 = ([ immuneSystem, infection ]) => { 
    const sortingFunction = (a,b) => {
        if (b.units * b.attack === a.units* a.attack) return b.initiative - a.initiative;
        return b.units * b.attack - a.units* a.attack;
    };

    const damageCoefficient = (attackType, traits) => {
        if (traits === null) return 1;
        if ("immune" in traits && traits.immune.indexOf(attackType) !== -1) return 0;
        if ("weak" in traits && traits.weak.indexOf(attackType) !== -1) return 2;
        return 1;
    }

    const selectTarget = (unit, enemyGroup) => {
        let maxDamage = 0;
        let enemyIndex = -1;
        enemyGroup.forEach((enemyUnit, index) => {
            let actualDamage = unit.effectivePower * damageCoefficient(unit.attackType, enemyUnit.traits);
            if (actualDamage > maxDamage) {
                maxDamage = actualDamage;
                enemyIndex = index;
            }
        });
        if (maxDamage === 0) return null;
        return enemyIndex;
    };

    const attack = (unit, enemy) => {
        if (unit.units < 0) return;
        let damage = unit.effectivePower * damageCoefficient(unit.attackType, enemy.traits);
        let killed = Math.floor(damage / enemy.hp);
        enemy.units -= killed;
    };

   
    end = false;
    while (!end) {
        immuneSystem.sort(sortingFunction);
        infection.sort(sortingFunction);
        for (const unit of immuneSystem) {
            unit.target = selectTarget(unit, infection);
        }
        for (const unit of infection) {
            unit.target = selectTarget(unit, immuneSystem);
        }
        for (const unit of immuneSystem) {
            attack(unit, infection[unit.target]);
        }
        for (const unit of infection) {
            attack(unit, immuneSystem[unit.target]);
        }

        console.log(immuneSystem);
        console.log(infection);
        end = true;
    }
    */
};

const task2 = data => {
    
}

let testdata = `Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log("");

//doEqualTest(task1(testdata), 7);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));
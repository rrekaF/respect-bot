import { getTargets, checkTargetExists, addTarget, setRespect, addRespect, subRespect, removeTarget, setAllRespect } from "./logic.js";

console.log("Targets: " + getTargets());
const targetCheckName = "Patryk";
console.log(`Does target ${targetCheckName} exist: ` + checkTargetExists(targetCheckName));
const targetToAdd = "Maciek";
console.log(`Adding target ${targetToAdd}: ` + addTarget(targetToAdd));
const targetToSet = "Oskar";
const valueToSet = 4;
console.log(`Setting respect of ${targetToSet} to ${valueToSet}: ` + setRespect(targetToSet, valueToSet));
const valueToAdd = 1;
const TargetToAdd = "Maciek";
console.log(`Adding ${valueToAdd} respect to ${TargetToAdd}: ` + addRespect(targetToAdd, valueToAdd));
const valueToSub = 3;
const TargetToSub = "Jacek";
console.log(`Subtracting ${valueToSub} respect from ${TargetToSub}: ` + subRespect(TargetToSub, valueToSub));

// const targetToRemove = "Maciek";
// console.log(`Removing ${targetToRemove}: ` + removeTarget(targetToRemove));

const valueToSetAll = 0;
console.log(`Setting all respect to ${valueToSetAll}: ` + setAllRespect(valueToSetAll));

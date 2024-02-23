import { readFileSync, writeFileSync } from "fs";

export function getTargets() {
  let data;
  try {
    // reading a JSON file synchronously
    data = readFileSync("targets.json");
  } catch (error) {
    // logging the error
    console.error(error);

    throw error;
  }

  // parsing the JSON content
  const targets = JSON.parse(data);

  return targets;
}
export function checkTargetExists(name = "") {
  if (!name) {
    return false;
  }

  const targets = getTargets();
  if (name in targets) {
    return true;
  }

  return false;
}

export function setRespect(name, value) {
  const targets = getTargets();
  if (!checkTargetExists(name)) {
    return `Target ${name} doesn't exist`;
  }
  if (typeof value !== "number") {
    value = parseInt(value);

    /*
     * JS wall of shame
     * console.log(NaN == NaN) -> false
     * WHAT IS HAPPENNING HAHAHHAHAHHAHAHHAHAHAHHAH
     * it cost me 45 minutes of my life
     */

    // console.log(NaN == NaN);
    if (isNaN(value)) {
      return "Please provide a number";
    }
  }
  targets[name]["respect"] = value;
  const data = JSON.stringify(targets);
  try {
    // reading a JSON file synchronously
    writeFileSync("targets.json", data);
  } catch (error) {
    // logging the error
    console.error(error);

    throw error;
  }
  return `Set ${name}'s respect to ${value}.`;
}

export function addRespect(name, value) {
  const targets = getTargets();
  if (!checkTargetExists(name)) {
    return `Target ${name} does not exist`;
  }
  if (typeof value !== "number") {
    value = parseInt(value);

    if (isNaN(value)) {
      return "Please provide a number";
    }
  }

  const currentRespect = targets[name]["respect"];
  const ok = setRespect(name, currentRespect + value);
  if (ok) {
    return `Added ${value} to ${name}'s respect. It is now ${currentRespect + value}.`;
  }
  return ok;
}
export function subRespect(name, value) {
  const targets = getTargets();
  if (!checkTargetExists(name)) {
    return `Target ${name} does not exist`;
  }
  if (typeof value !== "number") {
    value = parseInt(value);

    if (isNaN(value)) {
      return "Please provide a number";
    }
  }
  const currentRespect = targets[name]["respect"];
  const ok = setRespect(name, currentRespect - value);
  if (ok) {
    return `Subtracted ${value} from ${name}'s respect. It is now ${currentRespect - value}.`;
  }
  return ok;
}

export function addTarget(name = "") {
  if (!name) {
    return "Please provide a name";
  }
  if (checkTargetExists(name)) {
    return `Target ${name} already exists`;
  }
  let targets = getTargets();
  targets[name] = {
    respect: 0,
  };
  const data = JSON.stringify(targets);
  try {
    // reading a JSON file synchronously
    writeFileSync("targets.json", data);
  } catch (error) {
    // logging the error
    console.error(error);

    throw error;
  }
  return `Target ${name} added successfully`;
}

export function removeTarget(name = "") {
  if (!name) {
    return "Please provide a name";
  }
  if (!checkTargetExists(name)) {
    return `Target ${name} doesn't exist`;
  }
  let targets = getTargets();
  delete targets[name];
  const data = JSON.stringify(targets);
  try {
    // reading a JSON file synchronously
    writeFileSync("targets.json", data);
  } catch (error) {
    // logging the error
    console.error(error);

    throw error;
  }
  return `Target ${name} removed successfully`;
}

export function setAllRespect(value) {
  const targets = getTargets();
  console.log(`Setting all respect to ${value}`);
  for (const key in targets) {
    console.log(setRespect(key, value));
  }
  return `Set all respect to ${value}`;
}

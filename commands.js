import { InstallGlobalCommands, capitalize } from "./utils.js";
import { getTargets } from "./logic.js";

function createCommandChoices() {
  const choices = Object.keys(getTargets());
  // console.log(choices);
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: choice,
      value: choice,
    });
  }
  console.log(commandChoices);

  return commandChoices;
}

// // Simple test command
// const TEST_COMMAND = {
//   name: "test",
//   description: "Basic command",
//   type: 1,
// };

const RESPECT_COMMAND = {
  name: "respect",
  description: "add or subtract someones respect level",
  options: [
    {
      type: 3,
      name: "action",
      description: "add / sub / set",
      required: true,
      choices: [
        { name: "Add", value: "add" },
        { name: "Sub", value: "sub" },
        { name: "Set", value: "set" },
      ],
    },
    {
      type: 3,
      name: "target",
      description: "target of the action",
      required: true,
    },
    {
      type: 3,
      name: "value",
      description: "value",
      required: true,
    },
  ],
  type: 1,
};
const ADD_COMMAND = {
  name: "new-target",
  description: "Add a new target",
  required: true,
  options: [
    {
      type: 3,
      name: "target",
      description: "name of the target",
      required: true,
    },
  ],
  type: 1,
};
const CHECK_COMMAND = {
  name: "check-target",
  description: "Check if a target already exists",
  required: true,
  options: [
    {
      type: 3,
      name: "target",
      description: "name of the target",
      required: true,
    },
  ],
  type: 1,
};
const REMOVE_COMMAND = {
  name: "remove-target",
  description: "Remove a target from the database.",
  required: true,
  options: [
    {
      type: 3,
      name: "target",
      description: "name of the target",
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
};
const GET_TARGETS = {
  name: "get-targets",
  description: "Get a list of all targets.",
  required: true,
  type: 1,
};

const SET_ALL_RESPECT = {
  name: "set-all-respect",
  description: "Set every target's respect to a value",
  required: true,
  options: [
    {
      type: 3,
      name: "value",
      description: "value",
      required: true,
    },
  ],
  type: 1,
};

const ALL_COMMANDS = [SET_ALL_RESPECT, GET_TARGETS, RESPECT_COMMAND, ADD_COMMAND, CHECK_COMMAND, REMOVE_COMMAND];
InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);

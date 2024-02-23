import "dotenv/config";
import express from "express";
import { InteractionType, InteractionResponseType } from "discord-interactions";
import { VerifyDiscordRequest } from "./utils.js";
import { setAllRespect, getTargets, checkTargetExists, addTarget, setRespect, addRespect, subRespect, removeTarget } from "./logic.js";

const app = express();

const PORT = 3000;

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post("/interactions", async function (req, res) {
  const { type, id, data } = req.body;
  let response_txt = "";
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    if (name === "respect") {
      const type = data["options"][0]["value"];
      const target = data["options"][1]["value"];
      const val = data["options"][2]["value"];
      // console.log(data);

      switch (type) {
        case "add":
          response_txt = addRespect(target, val);
          break;
        case "sub":
          response_txt = subRespect(target, val);
          break;
        case "set":
          response_txt = setRespect(target, val);
          break;
      }
    }
    if (name === "set-all-respect") {
      const val = data["options"][0]["value"];
      response_txt = setAllRespect(val);
    }
    if (name === "new-target") {
      const newTarget = data.options[0]["value"];
      response_txt = addTarget(newTarget);
    }
    if (name === "remove-target") {
      const targetToRemove = data.options[0]["value"];
      response_txt = removeTarget(targetToRemove);
    }
    if (name === "check-target") {
      const targetToCheck = data.options[0]["value"];
      if (checkTargetExists(targetToCheck)) {
        response_txt = `Target ${targetToCheck} exists.`;
      } else {
        response_txt = `Target ${targetToCheck} doesn't exist.`;
      }
    }
    if (name === "get-targets") {
      const targets = getTargets();
      response_txt = "## List of available targets:\n";
      for (const target in targets) {
        response_txt += `### ${target}: ${targets[target]["respect"]}\n`;
      }
    }

    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: response_txt,
      },
    });
  }
});
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});

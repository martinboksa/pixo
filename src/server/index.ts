import express from "express";
import cors from "cors";
import { port } from "../common/constants";
import { nextNameday } from "../common/nameday";
import { stripAccents } from "../pixoo/helpers";
import { runPixooCommand } from "../pixoo";
import { findDevices } from "../pixoo/divoom";

type DisplayResponse = {
  ReturnCode: number;
  ReturnMessage: string;
  DispData: string;
};

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send(200);
});

app.get("/run", async (req, res) => {
  await runPixooCommand();
  res.send(200);
});

app.get("/devices", async (req, res) => {
  const { DeviceList } = await findDevices();
  res.json(DeviceList);
});

app.get("/nameday", (req, res) => {
  const name = stripAccents(nextNameday()).toUpperCase();

  const data: DisplayResponse = {
    ReturnCode: 0,
    ReturnMessage: "",
    DispData: name,
  };

  res.json(data);
});

app.listen(port);

runPixooCommand().then(() => {
  console.log("Pixoo command done");
});

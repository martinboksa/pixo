import express from "express";
import cors from "cors";
import { assetsDir, port } from "../common/constants";
import { nextNameday } from "../common/nameday";
import { stripAccents } from "../pixoo/helpers";
import { runPixooCommand } from "../pixoo";
import { findDevices } from "../pixoo/divoom";
import { expressLogger } from "../common/logger";
import { readIP } from "../common/ip";

type DisplayResponse = {
  ReturnCode: number;
  ReturnMessage: string;
  DispData: string;
};

export const initServer = () => {
  const app = express();

  app.use(cors());
  app.use(expressLogger);
  app.use('/asset', express.static(assetsDir));

  app.get("/", (req, res) => {
    res.sendStatus(200);
  });

  app.get("/run", async (req, res) => {
    await runPixooCommand();
    res.sendStatus(200);
  });

  app.get("/devices", async (req, res) => {
    const { DeviceList } = await findDevices();
    res.json(DeviceList);
  });

  app.get("/nameday", (req, res) => {
    const ip = readIP(req) || "none";
    const name = stripAccents(nextNameday(ip)).toUpperCase();

    const data: DisplayResponse = {
      ReturnCode: 0,
      ReturnMessage: "",
      DispData: name,
    };

    res.json(data);
  });

  app.listen(port);

  return app;
};

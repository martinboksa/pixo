import express from "express";
import cors from "cors";
import { port } from "../common/constants";
import { nextNameday } from "../common/nameday";
import { stripAccents } from "../pixoo/helpers";

type DisplayResponse = {
  ReturnCode: number;
  ReturnMessage: string;
  DispData: string;
};

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
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

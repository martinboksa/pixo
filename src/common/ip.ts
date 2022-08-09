import { Request } from "express";

const { networkInterfaces } = require("os");

export const readIP = (req: Request) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (!ip) {
    return undefined;
  }

  if (Array.isArray(ip)) {
    return ip[0];
  }

  return ip;
};

export const getMyIP = () => {
  const nets = networkInterfaces();

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
};

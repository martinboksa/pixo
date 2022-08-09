import { getMyIP } from "./ip";
import path from "path";

export const ipAddress = process.env.PIXOO;
export const port = process.env.PORT || 3000;

export const serverIp = getMyIP();
export const serverUrl = `http://${serverIp}:${port}`;
export const serverAssetUrl = `${serverUrl}/asset`;

export const maxPixels: 16 | 32 | 64 = 64;

export const srcDir = path.join(__dirname, "../");
export const rootDir = path.join(srcDir, "../");

export const pixooDir = path.join(srcDir, "pixoo");
export const assetsDir = path.join(pixooDir, "assets");

export const tempsDir = path.join(rootDir, "temp");

if (!serverIp) {
  throw new Error("Server IP is missing");
}

if (!ipAddress) {
  throw new Error("IP is missing");
}

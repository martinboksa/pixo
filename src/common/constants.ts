import { getMyIP } from "./ip";
import path from "path";

export const ipAddress = process.env.PIXOO || "192.168.100.90";
export const port = 3000;

export const serverIp = getMyIP();
export const serverUrl = `http://${serverIp}:${port}`;

export const maxPixels: 16 | 32 | 64 = 64;

export const sourceDir = path.join(__dirname, "../");
export const pixooDir = path.join(sourceDir, "pixoo");
export const assetsDir = path.join(pixooDir, "assets");

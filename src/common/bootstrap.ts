import "dotenv/config";
import logger from "./logger";
import { ipAddress, serverUrl } from "./constants";

logger.info(`Pixoo IP: %s`, ipAddress);
logger.info(`Server url: %s`, serverUrl);

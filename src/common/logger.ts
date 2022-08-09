import pino from "pino";
import pinoHTTP from "pino-http";
import pretty from "pino-pretty";

const stream = pretty({
  colorize: true,
  translateTime: true,
  singleLine: true,
});

const logger = pino(stream);

export const expressLogger = pinoHTTP({
  logger,
});

export default logger;

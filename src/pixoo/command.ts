import { ipAddress } from "../common/constants";
import axios from "axios";
import { Command, CommandList } from "./commands";
import logger from "../common/logger";

type Payload = Command | CommandList;

export type PixooGenericResponse = {
  error_code: number;
};

class PixooError extends Error {
  constructor(data: PixooGenericResponse) {
    logger.error(data);
    super("PixooError");
  }
}

export const command = async <T extends PixooGenericResponse>(
  payload: Payload
) => {
  const url = `http://${ipAddress}/post`;
  const { data } = await axios.post<T>(url, payload);

  logger.info(`Command %s sent to url %s`, payload.Command, url);

  if (data.error_code !== 0) {
    throw new PixooError(data);
  }

  return data;
};

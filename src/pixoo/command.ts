import { ipAddress } from "../common/constants";
import axios from "axios";
import {
  Clear,
  DisplayList,
  PlayBuzzer,
  ResetSending,
  SelectChannel,
  SendAnimation,
  SendingId,
  TextCommand,
} from "./commands";

type Payload =
  | PlayBuzzer
  | Clear
  | DisplayList
  | TextCommand
  | SelectChannel
  | SendingId
  | ResetSending
  | SendAnimation;

export type PixooGenericResponse = {
  error_code: number;
};

class PixooError extends Error {
  constructor(data: PixooGenericResponse) {
    console.error(data);
    super("PixooError");
  }
}

export const command = async <T extends PixooGenericResponse>(
  payload: Payload
) => {
  const url = `http://${ipAddress}/post`;
  const { data } = await axios.post<T>(url, payload);

  if (data.error_code !== 0) {
    throw new PixooError(data);
  }

  return data;
};

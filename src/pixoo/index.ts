import * as command from "./commands";
import {
  DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_DATE_WEEK_YEAR,
  DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_HOUR_MIN_SEC,
  DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_NET_TEXT_MESSAGE,
} from "./commands";
import { ipAddress, serverUrl } from "../common/constants";
import "../common/ip";
import { drawImage } from "./draw-image";

const ids = {
  time: 2,
  date: 3,
  nameday: 1,
};

const main = async () => {
  console.log("[Pixoo address]", ipAddress);

  await command.resetSending();
  console.log("Picture ID reset");

  await command.clear();
  console.log("Text area cleared");

  await drawImage("vader.png", [0, 0]);

  const items: command.DisplayItem[] = [
    {
      TextId: ids.nameday,
      x: 0,
      y: 59,
      color: "#ffffff",
      dir: command.SCROLL_DIRECTION_RIGHT,
      font: 18,
      align: command.HORIZONTAL_TEXT_ALIGNMENT_LEFT,
      TextWidth: 64,
      Textheight: 5,
      speed: 100,
      type: DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_NET_TEXT_MESSAGE,
      update_time: 5,
      TextString: `${serverUrl}/nameday`,
    },
    {
      TextId: ids.time,
      x: 0,
      y: 0,
      color: "#ffffff",
      dir: command.SCROLL_DIRECTION_RIGHT,
      font: 18,
      align: command.HORIZONTAL_TEXT_ALIGNMENT_LEFT,
      TextWidth: 64,
      Textheight: 5,
      speed: 100,
      type: DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_HOUR_MIN_SEC,
    },
    {
      TextId: ids.date,
      x: 0,
      y: 10,
      color: "#ffffff",
      dir: command.SCROLL_DIRECTION_RIGHT,
      font: 18,
      align: command.HORIZONTAL_TEXT_ALIGNMENT_LEFT,
      TextWidth: 64,
      Textheight: 5,
      speed: 100,
      type: DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_DATE_WEEK_YEAR,
    },
  ];

  await command.displayList(items);
  console.log("Items displayed");
};

main();

import { command } from "./command";

/** DATA **/
let currentPictureId = 1;

/**
 * DOCUMENTATION
 * http://doc.divoom-gz.com/web/#/12?page_id=336
 */

/**
 * Display types
 * http://doc.divoom-gz.com/web/#/12?page_id=234
 */
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_SECOND = 1; // second , font should include digit
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_MIN = 2; // min, font should include digit
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_HOUR = 3; // hour, font should include digit
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_TIME_AM_PM = 4; // am or pm, font should include a,m,p
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_HOUR_MIN = 5; // hour：min , font should include digit
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_HOUR_MIN_SEC = 6; //hour:min:sec, , font should include digit
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_YEAR = 7; // year,, font should include digit
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_DAY = 8; // day, font should include digit
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_MON = 9; // month, font should include digit
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_MON_YEAR = 10; // mon-year, font should include digit
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_ENG_MONTH_DOT_DAY = 11; // month, font should include english letters
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_DATE_WEEK_YEAR = 12; // day:month:year, font should include digit
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_ENG_WEEK = 13; /// weekday-"SU","MO","TU","WE","TH","FR","SA", font should include english letters
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_ENG_WEEK_THREE = 14; // weekday-"SUN","MON","TUE","WED","THU","FRI","SAT", font should include english letters
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_ENG_WEEK_ALL = 15; // weekday-"SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY", font should include english letters
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_ENG_MON = 16; // month-"JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC", font should include english letters
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_TEMP_DIGIT = 17; // temperature, font should include digit and c,f
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_TODAY_MAX_TEMP = 18; // the max temperature, font should include digit and c,f
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_TODAY_MIN_TEMP = 19; // the min temperature, font should include digit and c,f
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_WEATHER_WORD = 20; // the weather, font should include english letters
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_NOISE_DIGIT = 21; // the nosie value, font should include digit
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_TEXT_MESSAGE = 22; // the text string, font should include text information
export const DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_NET_TEXT_MESSAGE = 23; //the url request string, font should include url information, response should be json encode including the "DispData" string element, eg:http://appin.divoom-gz.com/Device/ReturnCurrentDate?test=0 response {"DispData": "2022-01-22 13:51:56"}

type HorizontalTextAlignment =
  | typeof HORIZONTAL_TEXT_ALIGNMENT_LEFT
  | typeof HORIZONTAL_TEXT_ALIGNMENT_MIDDLE
  | typeof HORIZONTAL_TEXT_ALIGNMENT_RIGHT;

export const HORIZONTAL_TEXT_ALIGNMENT_LEFT = 1;
export const HORIZONTAL_TEXT_ALIGNMENT_MIDDLE = 2;
export const HORIZONTAL_TEXT_ALIGNMENT_RIGHT = 3;

export type Direction =
  | typeof SCROLL_DIRECTION_LEFT
  | typeof SCROLL_DIRECTION_RIGHT;
export const SCROLL_DIRECTION_LEFT = 0;
export const SCROLL_DIRECTION_RIGHT = 1;

export type Clear = {
  Command: "Draw/ClearHttpText";
};

export const clear = () => command({ Command: "Draw/ClearHttpText" });

export type PlayBuzzer = {
  Command: "Device/PlayBuzzer";
  ActiveTimeInCycle: number; // Working time of buzzer in one cycle in milliseconds
  OffTimeInCycle: number; // Idle time of buzzer in one cycle in milliseconds
  PlayTotalTime: number; // Working total time of buzzer in milliseconds
};

export const playBuzzer = (
  activeTimeInCycle: number,
  offTimeInCycle: number,
  playTotalTime: number
) =>
  command({
    Command: "Device/PlayBuzzer",
    ActiveTimeInCycle: activeTimeInCycle,
    OffTimeInCycle: offTimeInCycle,
    PlayTotalTime: playTotalTime,
  });

export type DisplayItem = {
  font: number; // https://app.divoom-gz.com/Device/GetTimeDialFontList
  TextId: number; // the text id is unique and will be replaced with the same ID， it is smaller than 40
  type: number; // types above (DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_SECOND, ...)
  x: number;
  y: number;
  dir: Direction;
  TextWidth: number; // the text area width
  Textheight: number; // the text area height
  speed: number; // the scroll speed if it need scroll, the time (ms) the text move one step
  align: HorizontalTextAlignment;
  color: string; // hex
  update_time?: number; // the url request interval time based on seconds; for type DIVOOM_DISP_CUSTOM_DIAL_SUPPORT_NET_TEXT_MESSAGE
  TextString?: string; // the text string is utf8 string and lenght is smaller than 512 , it will be display string or request url string， it is Optional
};

export type DisplayList = {
  Command: "Draw/SendHttpItemList";
  ItemList: Array<DisplayItem>;
};

export const displayList = (items: DisplayItem[]) =>
  command({
    Command: "Draw/SendHttpItemList",
    ItemList: items,
  });

export type Text = {
  TextId: number; // the text id is is unique and will be replaced with the same ID， it is samller than 20
  x: number;
  y: number;
  dir: Direction;
  font: number; // 0~7, app animation’s font
  TextWidth: number; // the text width is based point and bigger than 16, smaller than 64
  TextString: string; // the text string is utf8 string and lenght is smaller than 512
  speed: number; // the scroll speed if it need scroll, the time (ms) the text move one step
  color: string;
  align: HorizontalTextAlignment;
};

export type TextCommand = {
  Command: "Draw/SendHttpText";
} & Text;

export const text = ({
  TextId = 1,
  TextString = "Hello World",
  TextWidth = 64,
  dir = SCROLL_DIRECTION_LEFT,
  color = "#FFFFFF",
  font = 2,
  speed = 50,
  y = 0,
  x = 0,
  align = HORIZONTAL_TEXT_ALIGNMENT_LEFT,
}: Partial<Text>) =>
  command({
    Command: "Draw/SendHttpText",
    TextId,
    TextString,
    TextWidth,
    dir,
    color,
    font,
    speed,
    x,
    y,
    align,
  });

export type Channel = number; // channel id 0~3 ；0:Faces;1:Cloud Channdle;2:Visualizer;3:Custom
export type SelectChannel = {
  Command: "Channel/SetIndex";
  SelectIndex: Channel;
};

export const selectChannel = (channel: Channel) =>
  command({ Command: "Channel/SetIndex", SelectIndex: channel });

export type ResetSending = {
  Command: "Draw/ResetHttpGifId";
};
export const resetSending = () =>
  command({ Command: "Draw/ResetHttpGifId" }).then((data) => {
    currentPictureId = 1;
    return data;
  });

export type SendingId = {
  Command: "Draw/GetHttpGifId";
};
export const sendingId = () =>
  command<{ error_code: number; PicId: number }>({
    Command: "Draw/GetHttpGifId",
  }).then((data) => {
    currentPictureId = data.PicId;

    return data;
  });

export type SendAnimation = {
  Command: "Draw/SendHttpGif";
} & AnimationData;

type AnimationData = {
  PicNum: number; // the include single pictures of the animation and smaller than 60
  PicWidth: number; // the pixels of the animation, and only support the 16,32,64
  PicOffset: number; // the picture offset start from 0. eg:0,1,2,3,4,PicNum-1
  PicID: number; // the animation ID, every animation must have unique ID and auto increase,It’s getting bigger and start with 1, example: the current gif id is 100, and then next gif’s id should be greater than or equal to 101
  PicSpeed: number; // the animation speed, it bases on ms
  PicData: string; // the picutre Base64 encoded RGB data, The RGB data is left to right and up to down
};

export const animation = ({
  PicID = currentPictureId,
  ...data
}: Omit<AnimationData, "PicID"> & { PicID?: number }) => {
  currentPictureId++;

  return command({
    Command: "Draw/SendHttpGif",
    PicID,
    ...data,
  });
};

export const blackScreen = () =>
  animation({
    PicNum: 1,
    PicWidth: 64,
    PicOffset: 0,
    PicSpeed: 0,
    PicData: "",
  });

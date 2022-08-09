import axios from "axios";

export const findDevices = async () => {
  const { data } = await axios.post<{
    ReturnCode: number;
    ReturnMessage: string;
    DeviceList: Array<{
      DeviceName: string;
      DeviceId: number;
      DevicePrivateIP: string;
      DeviceMac: string;
    }>;
  }>("https://app.divoom-gz.com/Device/ReturnSameLANDevice");

  return data;
};

export const dialType = async () => {
  const { data } = await axios.post<{
    ReturnCode: number;
    ReturnMessage: string;
    DialTypeList: string[];
  }>("https://app.divoom-gz.com/Channel/GetDialType");

  return data;
};

export const fontList = async () => {
  const { data } = await axios.post<{
    ReturnCode: number;
    ReturnMessage: string;
    FontList: Array<{
      id: number;
      name: string;
      width: string;
      high: string;
      charset: string;
      type: number;
    }>;
  }>("https://app.divoom-gz.com/Device/GetTimeDialFontList");

  return data;
};

export const dialList = async (type: string, page = 1) => {
  const { data } = await axios.post<{
    ReturnCode: number;
    ReturnMessage: string;
    TotalNum: string;
    DialList: Array<{
      ClockId: number;
      Name: string;
    }>;
  }>("https://app.divoom-gz.com/Channel/GetDialList", {
    DialType: type,
    Page: page,
  });

  return data;
};

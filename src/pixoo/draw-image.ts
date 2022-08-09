import Jimp from "jimp";
import { assetsDir, maxPixels } from "../common/constants";
import path from "path";
import { clampColor, RGB } from "../common/utils";
import { animationPayload, currentPictureId } from "./commands";

const toImageBuffer = (image: Jimp) => {
  function unflattenToRGB(arr: number[], result: RGB[]): RGB[] {
    if (arr.length === 0) {
      return result;
    }

    const pixelRGBData = arr.splice(0, 3) as RGB;
    result.push(pixelRGBData);
    return unflattenToRGB(arr, result);
  }

  // image.bitmap.data is format (r, g, b, a), but Pixoo only handles RGB data
  // so we remove the alpha channel here
  const imgBuf = Array.from(
    image.bitmap.data.filter((_val, index) => (index + 1) % 4 !== 0)
  );

  if (imgBuf.length % 3 !== 0) {
    throw new Error("invalid image!");
  }

  const rgbBuf: RGB[] = [];
  unflattenToRGB(imgBuf, rgbBuf);

  return rgbBuf;
};

export type ImageResampleMode =
  | typeof Jimp.RESIZE_NEAREST_NEIGHBOR
  | typeof Jimp.RESIZE_BILINEAR
  | typeof Jimp.RESIZE_BICUBIC;

async function loadImage(pathToImage: string) {
  return Jimp.read(path.resolve(assetsDir, pathToImage));
}

async function resizeImage(
  image: Jimp,
  size: [number, number],
  method: ImageResampleMode = "nearestNeighbor"
) {
  return image.resize(size[0], size[1], method);
}

export const drawImagePayload = async (
  imagePath: string,
  pos: [number, number],
  options: {
    id?: number;
    size: 16 | 32 | 64;
    resampleMode?: ImageResampleMode;
    totalPictures: number;
    offset: number;
    speed: number;
  } = {
    size: maxPixels,
    resampleMode: "nearestNeighbor",
    totalPictures: 1,
    offset: 0,
    speed: 100,
    id: currentPictureId,
  }
) => {
  const { size, resampleMode, offset, totalPictures, speed, id } = options;
  const buffer: RGB[] = [];
  const image = await loadImage(imagePath);

  const resized = await resizeImage(image, [size, size], resampleMode);

  const imgBuf = toImageBuffer(resized);

  for (let y = 0; y < resized.getHeight(); y += 1) {
    for (let x = 0; x < resized.getWidth(); x += 1) {
      const shiftedXPos = x + pos[0];
      if (size - 1 < shiftedXPos || shiftedXPos < 0) {
        continue;
      }

      const shiftedYPos = y + pos[1];
      if (size - 1 < shiftedYPos || shiftedYPos < 0) {
        continue;
      }

      buffer.push(clampColor(imgBuf[x + y * size]));
    }
  }

  return animationPayload({
    PicID: id,
    PicData: Buffer.from(buffer.flat()).toString("base64"),
    PicNum: totalPictures,
    PicOffset: offset,
    PicSpeed: speed,
    PicWidth: size,
  });
};

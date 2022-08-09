import gitFrames from "gif-frames";
import path from "path";
import { assetsDir, maxPixels, tempsDir } from "../common/constants";
import * as fs from "fs";
import { drawImagePayload } from "./draw-image";
import {
  animation,
  currentPictureId,
  resetSending,
  sendingId,
} from "./commands";

// WIP
export const drawGif = async (image: string, size = maxPixels) => {
  await resetSending();
  await sendingId();

  return gitFrames(
    {
      url: path.resolve(assetsDir, image),
      frames: "all",
      outputType: "png",
      cumulative: false,
    },
    function (err, frameData) {
      if (err) {
        throw err;
      }

      const totalFrames = frameData.length;
      const id = currentPictureId;
      let done = 0;

      frameData.forEach(function (frame) {
        const filePath = path.resolve(
          tempsDir,
          "image-" + frame.frameIndex + ".png"
        );

        const canvas = frame.getImage();
        canvas.pipe(fs.createWriteStream(filePath));
        canvas.on("end", async () => {
          try {
            const payload = await drawImagePayload(filePath, [0, 0], {
              id,
              size,
              offset: frame.frameIndex,
              speed: 100,
              totalPictures: totalFrames,
            });

            await animation(payload);

            done++;

            console.log(
              "DONE IMAGE",
              frame.frameIndex,
              "done",
              done,
              "totalFrames",
              totalFrames
            );
          } finally {
            fs.unlinkSync(filePath);
          }
        });
      });
    }
  );
};

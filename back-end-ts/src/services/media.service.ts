import deleteWrapper from '#src/helpers/deleteWrapper.js';
import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import Media from '#src/models/media.js';

export const mediaServices = {
  async getAllMedias(): Promise<ServiceResponse> {
    //خواندن تمام رسانه ها از دیتابیس
    const findOp = await Media.find({});
    return serviceResponse(200, findOp);
  },

  async seeOneMedia(mediaId: string): Promise<ServiceResponse> {
    // خواندن یک رسانه از دیتابیس
    const findOp = await Media.findById(mediaId);
    return serviceResponse(200, findOp);
  },
  async createMedia(array: Express.Multer.File[]): Promise<ServiceResponse> {
    //اضافه کردن رسانه
    let medias = [];
    for (let file of array) {
      if (file.urls) {
        const newMedia = {
          urls: file.urls,
        };
        medias.push(newMedia);
      }
    }

    const saveOp = await Media.create(medias);
    return serviceResponse(200, saveOp);
  },

  async updateMedia(file: Express.Multer.File, mediaId: string): Promise<ServiceResponse> {
    const media = await Media.findById(mediaId);
    if (media) {
      if (file) {
        deleteWrapper(media.urls);
        media.urls = file.urls!;
      }
      await media.save();
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  },
};

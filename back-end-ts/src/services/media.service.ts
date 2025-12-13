import serviceResponse, { ServiceResponse } from '#src/helpers/serviceResponse.js';
import Media from '#src/models/media.js';

export const mediaServices = {
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
};

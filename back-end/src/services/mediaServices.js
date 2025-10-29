const deleteWrapper = require("../helpers/deleteWrapper");
const serviceResponse = require("../helpers/serviceResponse");
const Media = require("../models/media");

class MediaServices {
  async getAllMedias(req, res) {
    //خواندن تمام رسانه ها از دیتابیس
    const findOp = await Media.find({});
    return serviceResponse(200, findOp);
  }

  async seeOneMedia(req, res) {
    // خواندن یک رسانه از دیتابیس
    const findOp = await Media.findById(req.params.mediaId);
    return serviceResponse(200, findOp);
  }

  async createMedia(req, res) {
    //اضافه کردن رسانه
    let medias = [];
    for (let file of req.files) {
      if (file.urls) {
        const newMedia = {
          urls: file.urls,
        };
        medias.push(newMedia);
      }
    }

    const saveOp = await Media.create(medias);
    return serviceResponse(200, saveOp);
  }

  //بروزرسانی رسانه
  async updateMedia(req, res) {
    const media = await Media.findById(req.params.mediaId);
    if (media) {
      if (req.file) {
        deleteWrapper(media.urls._doc); //باید از _doc استفاده کنی چون مانگوز یک آبجکت سطح بالا رو برگردونده و صرفا چیزی که فکر میکنی نیست
        media.urls = req.file.urls;
      }
      const saveOp = await media.save();
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }

  async deleteMedia(req, res) {
    //حذف رسانه
    const deleteOp = await Media.findOneAndDelete({ _id: req.params.mediaId });
    if (deleteOp) {
      deleteWrapper(deleteOp.urls._doc);
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }
}
module.exports = new MediaServices();

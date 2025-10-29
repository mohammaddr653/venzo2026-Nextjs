const serviceResponse = require("../helpers/serviceResponse");
const Trust = require("../models/trust");

class TrustServices {
  async getAllTrusts(req, res) {
    //خواندن تمام اعتماد ها از دیتابیس
    const findOp = await Trust.find({}).populate("image");
    return serviceResponse(200, findOp);
  }

  async seeOneTrust(req, res) {
    // خواندن یک اعتماد از دیتابیس
    const findOp = await Trust.findById(req.params.trustId).populate("image");
    return serviceResponse(200, findOp);
  }

  async createTrust(req, res) {
    //اضافه کردن اعتماد
    const newTrust = new Trust({
      image: req.body.image === "" ? null : req.body.image,
      title: req.body.title,
      caption: req.body.caption,
      show: req.body.show,
    });

    const saveOp = await newTrust.save();
    return serviceResponse(200, saveOp);
  }

  //بروزرسانی اعتماد
  async updateTrust(req, res) {
    let data = {
      title: req.body.title,
      caption: req.body.caption,
      show: req.body.show,
    };
    const updateOp = await Trust.findOneAndUpdate(
      { _id: req.params.trustId },
      { $set: data }
    );
    if (updateOp) {
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }

  async deleteTrust(req, res) {
    //حذف اعتماد
    const deleteOp = await Trust.findOneAndDelete({ _id: req.params.trustId });
    if (deleteOp) {
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }
}
module.exports = new TrustServices();

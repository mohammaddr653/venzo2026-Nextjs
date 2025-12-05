const serviceResponse = require("../helpers/serviceResponse");

class EditorServices {
  async createUpload(req, res) {
    //آپلود کردن فایل
    let urls = {};
    for (let file of req.files) {
      if (file.urls) {
        urls = { ...file.urls };
      }
    }
    return serviceResponse(200, urls);
  }
}
module.exports = new EditorServices();

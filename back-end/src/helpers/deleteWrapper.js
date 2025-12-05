//this function calls deleteFile component for all urls of file or files

const deleteFile = require("./deleteFile");

const deleteWrapper = (fileURLS) => {
  //if some files uploaded with this req , delete them
  for (let urlObj of Object.values(fileURLS))
    if (urlObj) {
      deleteFile(urlObj.url.substring(1));
    }
};
module.exports = deleteWrapper;

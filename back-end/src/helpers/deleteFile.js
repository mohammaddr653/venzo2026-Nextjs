//this function checks if a file exists deletes it
const fs = require("fs");

const deleteFile = (path) => {
  fs.stat(path, (err, stats) => {
    if (!err) {
      fs.unlink(path, (err) => {});
    }
  });
};
module.exports = deleteFile;

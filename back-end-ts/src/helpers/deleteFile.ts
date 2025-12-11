//this function checks if a file exists deletes it

import * as fs from 'fs';

const deleteFile = (path: string) => {
  fs.stat(path, (err, stats) => {
    if (!err) {
      fs.unlink(path, (err) => {});
    }
  });
};
export default deleteFile;

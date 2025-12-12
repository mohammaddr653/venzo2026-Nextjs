//this function checks if a file exists deletes it

import * as fs from 'fs';

const deleteFile = (path: string) => {
  fs.stat(path, (err, _stats) => {
    if (!err) {
      fs.unlink(path, (_err) => {});
    }
  });
};
export default deleteFile;

//this function calls deleteFile component for all urls of file or files

import { UrlsObj } from '#src/types/urlsObj.types.js';
import deleteFile from './deleteFile.js';
enum Sizes {
  original = 'original',
  small = 'small',
  medium = 'medium',
  large = 'large',
}
const deleteWrapper = (fileURLS: UrlsObj) => {
  //if some files uploaded with this req , delete them
  for (let key of Object.values(Sizes))
    if (fileURLS[key]) {
      deleteFile(fileURLS[key].url.substring(1));
    }
};
export default deleteWrapper;

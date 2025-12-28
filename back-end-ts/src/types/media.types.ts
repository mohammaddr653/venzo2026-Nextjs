import { UrlsObj } from './urlsObj.types.js';

export interface Media {
  urls: UrlsObj;
}

export interface IMediaDocument extends Media, Document {}

export interface UrlObj {
  width: string;
  height: string;
  url: string;
}
export interface IUrlObjDocument extends UrlObj, Document {}

export interface UrlsObj {
  original?: UrlObj;
  small?: UrlObj;
  medium?: UrlObj;
  large?: UrlObj;
}
export interface IUrlsObjDocument extends UrlsObj, Document {}

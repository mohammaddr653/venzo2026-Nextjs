export interface UrlObj {
  width: string;
  height: string;
  url: string;
}

export interface UrlsObjSchema {
  original?: UrlObj;
  small?: UrlObj;
  medium?: UrlObj;
  large?: UrlObj;
}

export interface UrlObj {
  width: string;
  height: string;
  url: string;
}

export interface UrlsObj {
  original?: UrlObj;
  small?: UrlObj;
  medium?: UrlObj;
  large?: UrlObj;
}

export const SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`;

export const SERVER_API = SERVER_URL + "/api";

export const DEFAULT_IMAGE = "/placeholder.jpg"; //تصویر پیش فرض

export const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY;

export const TMCE_API_KEY = process.env.NEXT_PUBLIC_TINYMCE_KEY;

//same on index.css
export const BREAK_POINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

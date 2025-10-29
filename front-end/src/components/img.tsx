//note:this component needs to be set correctly everywhere it used . due to width of the image set the sizes property .
import { DEFAULT_IMAGE, SERVER_URL } from "../../config";

const Img = ({ pic, ...props }: any) => {
  return (
    <img
      src={
        pic?.urls?.original?.url
          ? SERVER_URL + pic.urls.original.url
          : DEFAULT_IMAGE
      }
      srcSet={
        pic?.urls
          ? `
          ${SERVER_URL + pic?.urls.small.url} ${pic?.urls.small.width + "w"},
          ${SERVER_URL + pic?.urls.medium.url} ${pic?.urls.medium.width + "w"},
          ${SERVER_URL + pic?.urls.large.url} ${pic?.urls.large.width + "w"},
          ${SERVER_URL + pic?.urls.original.url} ${
              pic?.urls.original.width + "w"
            },
        `
          : ""
      }
      {...props}
    />
  );
};

export default Img;

import { useEffect } from "react";
import Img from "./img";
import useLoadMedias from "@/hooks/useLoadMedias";

interface LibraryProps {
  setLibShow: any;
  selectedImgs: any; //useState with an empty array as intial val
  setSelectedImgs: any;
}

const Library = (props: LibraryProps) => {
  const { medias, loadMedias } = useLoadMedias();

  useEffect(() => {
    loadMedias();
  }, []);

  const handleSelect = (media: any) => {
    props.setSelectedImgs((prev: any) => {
      const exist = prev.some((img: any) => img._id === media._id);
      if (exist) {
        return [...prev.filter((item: any) => item._id !== media._id)];
      } else {
        return [...prev, media];
      }
    });
  };

  return (
    <>
      <div
        className="library-overlay fixed w-full h-full z-10 top-0 right-0 bg-glass-shadow"
        onClick={() => props.setLibShow(false)}
      ></div>
      <div className="bg-pink-400 border fixed w-[90vw] h-[90vh] overflow-y-scroll rounded-lg top-[5vh] right-[5vw] z-20">
        <div className="grid grid-cols-8 gap-2">
          {medias?.map((media: any, index: any) => {
            return (
              <div
                key={index}
                onClick={() => handleSelect(media)}
                className="w-full relative"
              >
                <Img
                  pic={media}
                  sizes={"500px"}
                  className={"aspect-square object-cover w-full"}
                  width={100}
                ></Img>
                {props.selectedImgs.some(
                  (img: any) => img._id === media._id
                ) ? (
                  <span className="flex absolute top-0 left-0 bg-red-500 w-[5px] aspect-square"></span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Library;

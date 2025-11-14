import GallerySvg from "@/components/icons/gallery-svg";
import Img from "@/components/img";
import GallerySlider from "./gallerySlider";
import OpenButton from "./openButton";
import Thumbnails from "./thumbnails";

interface SingleShopGalleryProps {
  product: any;
}

const SingleShopGallery = ({ product }: SingleShopGalleryProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative group rounded-md overflow-hidden">
        <Img
          pic={product?.img}
          sizes={"500px"}
          id="singleshop-image"
          className="aspect-square object-cover w-full"
        ></Img>
        {product?.gallery.length ? (
          <OpenButton className="cursor-pointer absolute w-full h-full opacity-0 group-hover:opacity-100 flex transition-opacity duration-300 justify-center items-center top-0 bg-glass-shadow" initialSlide={0}>
            <GallerySvg width={50} fill={"white"}></GallerySvg>
          </OpenButton>
        ) : null}
      </div>
      <Thumbnails product={product}></Thumbnails>
      <GallerySlider product={product}></GallerySlider>
    </div>
  );
};

export default SingleShopGallery;

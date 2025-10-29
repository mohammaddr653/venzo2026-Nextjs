import { vazir } from "@/app/ui/fonts";
import SocialIcons from "./social-icons";
import TypeWriter from "./typeWriter";
import Image from "next/image";

const Greetings = () => {
  return (
    <div className="relative w-full min-h-[700px] flex flex-col gap-5 justify-center items-center px-2 md:px-36">
      <Image
        src={"/Background_Image.webp"}
        alt="background-image-light"
        className="z-0 dark:hidden object-cover"
        priority
        fetchPriority="high"
        unoptimized
        fill
      ></Image>
      <Image
        src={"/jason-mavrommatis-FzURx0rFhUk-unsplash.webp"}
        alt="background-image-dark"
        className=" hidden dark:block object-cover"
        priority
        fetchPriority="high"
        unoptimized
        fill
      ></Image>
      <div className="absolute z-5 w-full h-full back-overlay bg-[#ffffffb3] bg-blend-lighten dark:bg-[#000000bd] dark:bg-blend-darken"></div>
      <div className="relative z-10 flex flex-grow flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-5 w-full md:h-full">
        <div
          className={`${vazir.className} md:flex-[2] text-shadow-xs dark:text-shadow-sm text-shadow-primary font-weight600 ms-4 text-neutral-800 dark:text-neutral-50 flex flex-col gap-2 md:gap-5 items-center justify-center md:items-start`}
        >
          <p className="text-2xl hidden md:flex">
            <TypeWriter text={"سلام 👋"} speed={200}></TypeWriter>
          </p>
          <h2 className="text-2xl md:text-5xl leading-tight">
            <TypeWriter text={"محمد امین درخشنده"} speed={200}></TypeWriter>
          </h2>
          <h2 className="text-size15 md:text-2xl">
            <TypeWriter text={"توسعه دهنده وب 💻"} speed={200}></TypeWriter>
          </h2>
        </div>
        <div className="max-w-[500px] min-w-[250px] md:flex-[1.5]">
          <Image
            src="/7247961_35736489.webp"
            alt="mohammad amin derakhshande"
            className="w-full h-auto"
            width={800}
            height={760}
            unoptimized
          ></Image>
        </div>
      </div>
      <div className="relative z-10 flex mb-5 gap-3 text-neutral-700 dark:text-neutral-50">
        <SocialIcons
          width={"20px"}
          height={"20px"}
          fill={"currentColor"}
        ></SocialIcons>
      </div>
    </div>
  );
};

export default Greetings;

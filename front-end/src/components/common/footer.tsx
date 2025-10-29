import Link from "next/link";
import DownloadSvg from "../icons/download-svg";
import SocialIcons from "./social-icons";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="footer-container pt-20 flex flex-col gap-15 overflow-y-hidden bg-[url(/2147734183.webp)] dark:bg-[url(/66a180fa208c.webp)] bg-cover bg-center bg-[#ffffffb3] dark:bg-[#000000bd] bg-blend-lighten dark:bg-blend-darken px-5 md:px-40 text-neutral-800 dark:text-neutral-200">
        <div className="flex flex-col gap-6 items-center text-neutral-600 dark:text-neutral-200">
          <h5 className="text-lg">برای دریافت فایل کامل رزومه کلیک کنید</h5>
          <Link
            href={"/cv-derakhshande.pdf"}
            download={true}
            prefetch={false}
            className="bg-gradient-to-r flex flex-row-reverse justify-center items-end gap-1 hover:animate-pulse from-primary to-secondary border-2 border-white outline-2 outline-primary dark:outline-secondary p-3 px-4 rounded-lg text-neutral-50 text-shadow-2xs"
          >
            <DownloadSvg width={30} fill={"currentColor"}></DownloadSvg>
            CV-Derakhshande
          </Link>
          <div className="flex mt-auto mb-5 gap-3">
            <SocialIcons
              width={"20px"}
              height={"20px"}
              fill={"currentColor"}
            ></SocialIcons>
          </div>
        </div>
        <div className="mt-auto">
          <img
            src={"/derakhshande-dark.webp"}
            alt="تایپوگرافی"
            className="hidden dark:block"
          />
          <img
            src={"/derakhshande.webp"}
            alt="تایپوگرافی"
            className="dark:hidden"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

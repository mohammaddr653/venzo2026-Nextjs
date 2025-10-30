import SocialIcons from "../../../components/social-icons";
import Logo from "../../../components/logo";
import Enamad from "./enamad";

const Footer = () => {
  return (
    <>
      <footer className="mt-auto">
        <div
          id="footer-container"
          className="flex flex-col gap-20 border-t border-neutral-200 py-10 px-5 md:px-20"
        >
          <div className="flex flex-col md:flex-row justify-between gap-5 items-center">
            <div className=" w-full flex flex-col gap-8">
              <div className="flex flex-row justify-between items-center">
                <Logo></Logo>
                <div className="flex flex-row gap-2">
                  <SocialIcons
                    width={"20px"}
                    height={"20px"}
                    fill={"#404040"}
                  ></SocialIcons>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3 justify-start text-neutral-700">
                <div className="flex flex-row gap-2">
                  <h4 className="text-size14 font-weight300 text-nowrap">
                    تماس با پشتیبانی :
                  </h4>
                  <span>09377372231</span>
                </div>
                <span className="hidden md:flex bg-secondary rounded-2xl w-0.5 self-stretch"></span>
                <div className="flex flex-row gap-2">
                  <h4 className="text-size14 font-weight300 text-nowrap">
                    آدرس فروشگاه :
                  </h4>
                  <span className="text-justify">
                    تهران ، حسن آباد ، خیابان حافظ ، روبروی بیمارستان نجمیه ،
                    خوابگاه دانشجویی تربیت دبیر رجایی
                  </span>
                </div>
              </div>
            </div>
            <div className=" w-full flex flex-row gap-3 justify-end">
              <Enamad></Enamad>
            </div>
          </div>
          <p className="text-size14 text-center  text-neutral-700">
            وانیمارت یک فروشگاه اینترنتی در حال توسعه توسط محمدامین درخشنده است
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

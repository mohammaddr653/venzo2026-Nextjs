import AnnotationSvg from "../icons/annotation-svg";
import AppSvg from "../icons/app-svg";
import SitemapSvg from "../icons/sitemap-svg";

const About = () => {
  return (
    <div
      id="about-me"
      className="px-5 md:px-40 flex flex-col-reverse md:flex-row gap-5 scroll-mt-20"
    >
      <ul className="flex flex-[1] flex-col gap-2 text-neutral-700 dark:text-neutral-200">
        <li className="flex items-center gap-4">
          <span className="bg-primary dark:bg-secondary w-0.75 h-full ms-0.5 rounded-md hidden md:flex"></span>
          <div className="flex items-center gap-4 py-3">
            <AppSvg width={"40px"} stroke={"currentColor"}></AppSvg>
            <h3>دانش فنی و آشنایی با اصول دیتابیس ، سرور و کلاینت</h3>
          </div>
        </li>
        <span className="bg-primary dark:bg-secondary rounded-full w-2 h-2 hidden md:flex"></span>
        <li className="flex items-center gap-4">
          <span className="bg-primary dark:bg-secondary w-0.75 h-full ms-0.5 rounded-md hidden md:flex"></span>
          <div className="flex items-center gap-4 py-3">
            <SitemapSvg width={"40px"} stroke={"currentColor"}></SitemapSvg>
            <h3>دید جامع و آینده نگر در طراحی و توسعه</h3>
          </div>
        </li>
        <span className="bg-primary dark:bg-secondary rounded-full w-2 h-2 hidden md:flex"></span>
        <li className="flex items-center gap-4">
          <span className="bg-primary dark:bg-secondary w-0.75 h-full ms-0.5 rounded-md hidden md:flex"></span>
          <div className="flex items-center gap-4 py-3">
            <AnnotationSvg
              width={"40px"}
              fill={"none"}
              stroke={"currentColor"}
            ></AnnotationSvg>
            <h3>ارتباط کلامی قوی و توانایی حل مسئله</h3>
          </div>
        </li>
      </ul>
      <div className="flex flex-[1] flex-col gap-4 text-neutral-800 dark:text-neutral-200">
        <h3 className="text-2xl font-weight400">درباره من :</h3>
        <div className="flex gap-2 items-start">
          <p className="font-weight200 leading-loose text-justify">
            زمانی که بصورت خودآموز شروع به یادگیری برنامه نویسی کردم 19 سالم بود
            . تا امروز سختی های زیادی رو پشت سر گذاشتم و آماده ام تا با چالش های
            جدید روبرو بشم چون به این مسیر باور دارم . الان میتونم بگم که در این
            حرفه به عنوان یک توسعه دهنده فرانت ، مهارت و تجربه کافی دارم و به
            دنبال همکاری با دیگر توسعه دهندگان هستم تا مهارت های خودم رو ارتقا
            بدم و چیز های جدیدی یاد بگیرم .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

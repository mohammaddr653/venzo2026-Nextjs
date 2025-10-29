import Link from "next/link";
import BootstrapSvg from "../icons/bootstrap-svg";
import CheckSvg from "../icons/check-svg";
import ReactSvg from "../icons/react-svg";
import TypescriptSvg from "../icons/typescript-svg";
import NodeSvg from "../icons/node-svg";
import ExpressSvg from "../icons/express-svg";
import MongoSvg from "../icons/mongo-svg";
import TailwindSvg from "../icons/tailwind-svg";
import JavascriptSvg from "../icons/javascript-svg";
import ZustandSvg from "../icons/zustand-svg";
import NextjsSvg from "../icons/nextjs-svg";
import CssSvg from "../icons/css-svg";
import HtmlSvg from "../icons/html-svg ";

const ProjectSlider = ({ project }: any) => {
  return (
    <div className="projectslider-container w-full flex flex-col-reverse md:flex-row justify-between items-center md:gap-5">
      <div className="flex flex-[4] flex-col self-stretch md:self-auto gap-7 md:gap-25 h-fit">
        <div className="flex flex-col items-center md:items-start gap-2">
          <h4 className="text-center text-2xl font-weight400 text-primary dark:text-secondary">
            {project?.title}
          </h4>
          <p className="text-center md:text-right text-size15 font-weight200">
            {project?.description}
          </p>
        </div>
        <div className="flex flex-col gap-7">
          {project?.details?.length ? (
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="font-weight300">درباره این پروژه :</p>
              <ul className="text-neutral-800 dark:text-neutral-300 font-weight200 flex flex-col gap-2 text-size15">
                {project?.details.map((item: any, index: any) => {
                  return (
                    <li key={index} className="flex gap-1 items-start">
                      <CheckSvg width={15} fill={"currentColor"}></CheckSvg>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          <div className="flex justify-center md:justify-start items-center gap-2 mt-2">
            {project?.github ? (
              <Link
                href={project?.github}
                className="border border-primary rounded-lg p-2 text-primary"
              >
                ریپازیتوری گیت هاب
              </Link>
            ) : null}
            {project?.online ? (
              <Link
                href={project?.online}
                className="border border-primary rounded-lg p-2 px-3 cursor-pointer text-white bg-neutral-primary"
              >
                نمونه آنلاین
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-[9] justify-end relative h-fit">
        <figure className="w-full aspect-[1027/642] relative text-neutral-900 dark:text-neutral-200 h-fit">
          <div className="top-0 right-0 absolute w-full">
            <img src="/f9ccd1187b7c1c3c4d6ecc3b4be12efe.webp" alt="laptop" />
          </div>
          {project?.gallery.length ? (
            <div className="relative image-wrapper w-[76%] h-[80%] mx-auto bg-amber-700 outline-4 outline-black rounded-lg mt-[2%] overflow-y-scroll scrollbar-hide">
              <img
                src={`/${project.gallery[0].desktop}`}
                alt="project demo on desktop"
                className="object-cover"
              />
            </div>
          ) : null}
        </figure>
        <figure className="w-[20%] absolute bottom-0 right-[-2px] aspect-[526/961] text-neutral-900 dark:text-neutral-200">
          <div className="top-0 right-0 absolute w-full h-full">
            <img
              src="/30c3c9f943e1f47729c6a627bb02ccef.webp"
              alt="smartphone"
            />
          </div>
          {project?.gallery.length && project.gallery[0].mobile ? (
            <div className="relative image-wrapper w-[75%] h-[73%] mx-auto bg-amber-700 outline-2 outline-black mt-[21%] overflow-y-scroll scrollbar-hide">
              <img
                src={`/${project.gallery[0].mobile}`}
                alt="project demo on mobile"
              />
            </div>
          ) : null}
        </figure>
        {project?.langs.length ? (
          <div className="flex w-[8%] md:p-2 p-1 md:border-2 border-secondary rounded-lg flex-col absolute left-0 top-0 items-end">
            {project.langs.map((item: any, index: any) => {
              switch (item) {
                case "nextjs":
                  return (
                    <NextjsSvg
                      key={index}
                      className={"w-full"}
                      fill={"currentColor"}
                    ></NextjsSvg>
                  );
                case "nodejs":
                  return <NodeSvg key={index} className={"w-full"}></NodeSvg>;
                case "express":
                  return (
                    <ExpressSvg
                      key={index}
                      className={"w-full"}
                      fill={"currentColor"}
                    ></ExpressSvg>
                  );
                case "js":
                  return (
                    <JavascriptSvg
                      key={index}
                      className={"w-full"}
                    ></JavascriptSvg>
                  );
                case "tailwind":
                  return (
                    <TailwindSvg key={index} className={"w-full"}></TailwindSvg>
                  );
                case "html":
                  return <HtmlSvg key={index} className={"w-full"}></HtmlSvg>;

                case "css":
                  return <CssSvg key={index} className={"w-full"}></CssSvg>;
                case "zustand":
                  return (
                    <ZustandSvg key={index} className={"w-full"}></ZustandSvg>
                  );
                case "mongo":
                  return <MongoSvg key={index} className={"w-full"}></MongoSvg>;
                case "react":
                  return (
                    <ReactSvg
                      key={index}
                      className={"w-full text-white dark:text-neutral-900"}
                    ></ReactSvg>
                  );
                case "ts":
                  return (
                    <TypescriptSvg
                      key={index}
                      className={"w-full"}
                    ></TypescriptSvg>
                  );
                case "bootstrap":
                  return (
                    <BootstrapSvg
                      key={index}
                      className={"w-full"}
                    ></BootstrapSvg>
                  );
              }
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectSlider;

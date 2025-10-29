import BootstrapSvg from "@/components/icons/bootstrap-svg";
import CssSvg from "@/components/icons/css-svg";
import ExpressSvg from "@/components/icons/express-svg";
import GitSvg from "@/components/icons/git-svg";
import HtmlSvg from "@/components/icons/html-svg ";
import JavascriptSvg from "@/components/icons/javascript-svg";
import MongoSvg from "@/components/icons/mongo-svg";
import NextjsSvg from "@/components/icons/nextjs-svg";
import NodeSvg from "@/components/icons/node-svg";
import ReactSvg from "@/components/icons/react-svg";
import ReduxSvg from "@/components/icons/redux-svg";
import TailwindSvg from "@/components/icons/tailwind-svg";
import TypescriptSvg from "@/components/icons/typescript-svg";
import ZustandSvg from "@/components/icons/zustand-svg";

const Skills = () => {
  return (
    <div
      id="my-skills"
      className="px-5 md:px-40 flex flex-col gap-6 text-neutral-800 dark:text-neutral-200 scroll-mt-20"
    >
      <h3 className="text-2xl font-weight400">مهارت ها :</h3>
      <div className="flex flex-wrap gap-5 [&>*]:grow">
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <NextjsSvg width="100px" fill={"currentColor"}></NextjsSvg>
          <h4>Next.js</h4>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <ReactSvg width="100px" className="text-white dark:text-neutral-900" ></ReactSvg>
          <h4>React.js</h4>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <NodeSvg width="100px"></NodeSvg>
          <h4>Node.js</h4>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <ExpressSvg width="100px" fill={"currentColor"}></ExpressSvg>
          <h4>Express</h4>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <MongoSvg width="100px"></MongoSvg>
          <h4>MongoDB</h4>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <TypescriptSvg width="100px"></TypescriptSvg>
          <h4>Typescript</h4>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <JavascriptSvg width="100px"></JavascriptSvg>
          <h4>Javascript</h4>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <TailwindSvg width="100px"></TailwindSvg>
          <h4>Tailwind</h4>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <BootstrapSvg width="100px"></BootstrapSvg>
          <h4>Bootstrap</h4>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <HtmlSvg width="100px"></HtmlSvg>
          <h4>HTML</h4>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <CssSvg width="100px"></CssSvg>
          <h4>CSS</h4>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <GitSvg width="100px"></GitSvg>
          <h4>Git & Github</h4>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <ReduxSvg width="100px"></ReduxSvg>
          <h4>ReduxTLK</h4>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-lg flex flex-col justify-between items-center gap-4 p-5 border-2 border-secondary">
          <ZustandSvg width="100px"></ZustandSvg>
          <h4>Zustand</h4>
        </div>
      </div>
    </div>
  );
};

export default Skills;

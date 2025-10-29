"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Scrollbar,
  Pagination,
  A11y,
  EffectFade,
} from "swiper/modules";

import "../../assets/css/projects.css";

import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import SwiperButtonPrev from "./swiper-button-prev";
import SwiperButtonNext from "./swiper-button-next";
import ProjectSlider from "./projectSlider";
import { useEffect, useState } from "react";
import callManager from "@/hooks/callManager";
import axios from "axios";
import { SERVER_API } from "../../../config";

const Projects = () => {
  const { call } = callManager();
  const [projects, setProjects] = useState<any[]>([]);

  async function load() {
    const response = await call(axios.get(SERVER_API + "/projects"), false);
    setProjects([...response?.data.data]);
  }

  useEffect(() => {
    load();
  }, []);
  return (
    <>
      {projects.length ? (
        <div
          id="my-projects"
          className="projects-container px-5 md:px-40 flex flex-col gap-6 text-neutral-800 dark:text-neutral-200 scroll-mt-20"
        >
          <h3 className="text-2xl font-weight400">نمونه کارها :</h3>
          <div className="relative">
            <Swiper
              modules={[Pagination, EffectFade, Navigation, Scrollbar, A11y]}
              initialSlide={0}
              loop={true}
              slidesPerView={1}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={500}
            >
              <div className="swiperjs-controlls flex flex-col md:flex-row justify-end items-center gap-2 absolute top-[50%] md:bottom-0 md:top-auto right-0 md:left-0 md:right-auto z-10 text-black">
                <SwiperButtonPrev
                  className={
                    "cursor-pointer flex w-[35px] md:w-[50px] bg-primary-glass md:border-4 text-white border-white dark:border-neutral-900 aspect-square justify-center items-center rounded-full"
                  }
                ></SwiperButtonPrev>
                <SwiperButtonNext
                  className={
                    "cursor-pointer flex w-[35px] md:w-[50px] bg-primary-glass md:border-4 text-white border-white dark:border-neutral-900 aspect-square justify-center items-center rounded-full"
                  }
                ></SwiperButtonNext>
              </div>

              {projects
                ?.sort((a, b) => a.id - b.id)
                .map((project: any, index: any) => {
                  return (
                    <SwiperSlide key={index}>
                      <ProjectSlider project={project}></ProjectSlider>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Projects;

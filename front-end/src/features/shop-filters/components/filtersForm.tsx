import AccordionLi from "@/features/accordion/components/accordion-li";
import { SERVER_API } from "../../../../config";
import ColorFilterBox from "./colorFilter-box";
import OrdinaryFilterBox from "./ordinaryFilter-box";
import AccordionHead from "@/features/accordion/components/accordion-head";
import AccordionChilds from "@/features/accordion/components/accordion-childs";
import LeftSvg from "@/components/icons/left-svg";
import "@/assets/css/filters-form.css";
import AccordionUl from "@/features/accordion/components/accordion-ul";

const FiltersForm = async ({ categoryId, query }: any) => {
  const response = (await (
    await fetch(`${SERVER_API}/shop/filters/${categoryId}`)
  ).json()) as any;
  const filters = response.data;

  return filters.length ? (
    <>
      <p className="py-3">فیلتر ها</p>
      <AccordionUl
        id="filters-container"
        className="border border-neutral-300 rounded-md flex flex-col gap-1 p-2 text-sm"
      >
        {filters.map((item: any, index: any) => {
          return (
            <AccordionLi
              key={index}
              className={`${
                index === filters.length - 1 ? null : "border-b"
              } border-neutral-200`}
            >
              <AccordionHead className="text-neutral-700 p-3 cursor-pointer flex justify-between items-center">
                <h4 className="font-weight300">{item?.property.name}</h4>
                <LeftSvg fill={"currentColor"} width={20}></LeftSvg>
              </AccordionHead>
              <AccordionChilds>
                <form className="flex flex-col gap-2 p-2">
                  {item?.property?.type === "color" ? (
                    <ColorFilterBox item={item} query={query}></ColorFilterBox>
                  ) : (
                    <OrdinaryFilterBox
                      item={item}
                      query={query}
                    ></OrdinaryFilterBox>
                  )}
                </form>
              </AccordionChilds>
            </AccordionLi>
          );
        })}
      </AccordionUl>
    </>
  ) : null;
};

export default FiltersForm;

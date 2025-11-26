import { SERVER_API } from "../../../../config";
import ColorFilterBox from "./colorFilter-box";
import OrdinaryFilterBox from "./ordinaryFilter-box";

const FiltersForm = async ({ categoryId, query }: any) => {
  const response = (await (
    await fetch(`${SERVER_API}/shop/filters/${categoryId}`)
  ).json()) as any;
  const filters = response.data;

  return filters.length ? (
    <>
      <p className="py-3">فیلتر ها</p>
      <div className="border border-neutral-300 rounded-md">
        {filters.map((item: any, index: any) => {
          return (
            <form className="flex flex-col gap-2 p-4" key={index}>
              <h4 className="font-weight300 text-neutral-700">{item?.property.name}</h4>
              {item?.property?.type === "color" ? (
                <ColorFilterBox item={item} query={query}></ColorFilterBox>
              ) : (
                <OrdinaryFilterBox
                  item={item}
                  query={query}
                ></OrdinaryFilterBox>
              )}
            </form>
          );
        })}
      </div>
    </>
  ) : null;
};

export default FiltersForm;

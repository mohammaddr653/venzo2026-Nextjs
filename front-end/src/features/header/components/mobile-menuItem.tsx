import LeftSvg from "@/components/icons/left-svg";
import Link from "next/link";

const MobMenuItem = ({ item, categories }: any) => {
  //بررسی شرط وجود فرزند
  const condition =
    categories?.length &&
    categories.some((category: any) => category.motherId === item._id);

  return (
    <li className={`${item.display} ps-2 w-full`}>
      <div className={`head flex flex-row items-center justify-between ${!condition&&"font-weight200"}`}>
        {item.type === "shop" && (
          <Link href={`/shop/${item._id}`}>{item.name}</Link>
        )}
        {item.type === "archive" && (
          <Link href={`/archive/${item._id}`}>{item.name}</Link>
        )}
        {item.type === "box" && <h4>{item.name}</h4>}
        {item.type === "link" && <Link href={item.link}>{item.name}</Link>}
        {condition && <LeftSvg fill={"none"} width={20}></LeftSvg>}
      </div>
      {condition && (
        <div className="childs">
          <ul>
            {categories.map((category: any, index: any) => {
              if (category.motherId === item._id) {
                return (
                  <MobMenuItem
                    key={category._id}
                    item={category}
                    categories={categories}
                  ></MobMenuItem>
                );
              }
            })}
          </ul>
        </div>
      )}
    </li>
  );
};

export default MobMenuItem;


import Link from "next/link";

const DeskMenuItem = ({ item, categories }: any) => {
  return (
    <li
      className={item.display}
    >
      <div className="head">
        {item.type === "shop" && (
          <Link href={`/shop/${item._id}`}>{item.name}</Link>
        )}
        {item.type === "archive" && (
          <Link href={`/archive/${item._id}`}>{item.name}</Link>
        )}
        {item.type === "box" && <h4>{item.name}</h4>}
        {item.type === "link" && <Link href={item.link}>{item.name}</Link>}
      </div>
      {categories?.length &&
        categories.some((category: any) => category.motherId === item._id) && (
          <div className="childs">
            <ul>
              {categories.map((category: any, index: any) => {
                if (category.motherId === item._id) {
                  return (
                    <DeskMenuItem
                      key={category._id}
                      item={category}
                      categories={categories}
                    ></DeskMenuItem>
                  );
                }
              })}
            </ul>
          </div>
        )}
    </li>
  );
};

export default DeskMenuItem;

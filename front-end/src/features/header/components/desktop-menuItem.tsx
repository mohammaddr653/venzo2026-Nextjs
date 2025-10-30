import Link from "next/link";

const DeskMenuItem = ({ item, categories }: any) => {
  return (
    <li className={item.display}>
      <div className="head h-full">
        {item.type === "shop" && (
          <Link href={`/shop/${item._id}`} className="flex justify-around items-center h-full">
            {item.name}
          </Link>
        )}
        {item.type === "archive" && (
          <Link href={`/archive/${item._id}`} className="flex justify-around items-center h-full">
            {item.name}
          </Link>
        )}
        {item.type === "box" && <h4 className="flex justify-around items-center h-full">{item.name}</h4>}
        {item.type === "link" && (
          <Link href={item.link} className="flex justify-around items-center h-full">
            {item.name}
          </Link>
        )}
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

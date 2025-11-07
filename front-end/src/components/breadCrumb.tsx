import Link from "next/link";
import React from "react";

const BreadCrumb = ({ motherCats }: any) => {
  return (
    <div className="flex flex-row px-5 md:px-20 pt-10 gap-1">
      <Link href={`/`} className="text-neutral-600 text-size14">
        فروشگاه اینترنتی وانیمارت
      </Link>
      {motherCats.map((item: any, index: any) => {
        return (
          <React.Fragment key={index}>
            <span>/</span>
            <Link
              href={`/shop/${item._id}`}
              className="text-neutral-600 text-size14"
            >
              {item.name}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumb;

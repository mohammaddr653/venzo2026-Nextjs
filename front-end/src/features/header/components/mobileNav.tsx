"use client";
//کلاینتی باشد بهتر است چون محتوای منو در دسکتاپ هم موجود است و اگر این هم ایندکس شود امتیاز منفی دارد

import MobMenuItem from "./mobile-menuItem";

const MobileNav = ({ categories }: any) => {

  return (
    <nav className="mobile-nav">
      <ul className="flex px-2 w-full flex-col gap-2 items-center font-weight300 text-cu-neutral-900">
        {categories?.length
          ? categories.map((category: any, index: any) => {
              return category.motherId === "root" ? (
                <MobMenuItem
                  key={category._id}
                  item={category}
                  categories={categories}
                ></MobMenuItem>
              ) : null;
            })
          : null}
      </ul>
    </nav>
  );
};

export default MobileNav;

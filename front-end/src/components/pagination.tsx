"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Pagination = ({ totalPagesCount, searchParams }: any) => {
  const page = parseInt(searchParams.page) || 1;
  const router = useRouter();
  const pathName = usePathname();
  const handleChangePage = (pageNum: number) => {
    let currentParams = new URLSearchParams(searchParams);
    currentParams.set("page", pageNum.toString());
    router.push(`${pathName}?${currentParams.toString()}`);
  };
  const handleNext = () => {
    const currentPage = page;
    if (currentPage === totalPagesCount) {
      return handleChangePage(totalPagesCount);
    }
    return handleChangePage(currentPage + 1);
  };
  const handlePrev = () => {
    const currentPage = page;
    if (currentPage <= 1) {
      return handleChangePage(1);
    }
    return handleChangePage(currentPage - 1);
  };

  return (
    <>
      {totalPagesCount ? (
        <div className="pagination flex flex-row justify-between">
          <button
            className="border border-neutral-300 rounded-md px-2 py-1 text-size14 text-neutral-800 cursor-pointer"
            onClick={handleNext}
          >
            صفحه بعد
          </button>
          <div className="flex flex-row-reverse gap-1">
            {Array.from({ length: totalPagesCount }, (_, index) => {
              if (
                (index + 1 <= page + 1 && index + 1 >= page - 1) ||
                index + 1 === 1 ||
                index + 1 === totalPagesCount
              ) {
                //شماره های بعدی
                return (
                  <React.Fragment key={index}>
                    {index + 1 === page - 1 && index + 1 > 2 ? "..." : null}
                    <button
                      className={`border rounded-md w-[30px] h-[30px] flex items-center justify-center cursor-pointer ${
                        page === index + 1 ? "bg-amber-400" : null
                      }`}
                      onClick={() => {
                        handleChangePage(index + 1);
                      }}
                    >
                      {index + 1}
                    </button>
                    {index + 1 === page + 1 && index + 1 <= totalPagesCount - 2
                      ? "..."
                      : null}
                  </React.Fragment>
                );
              }
            })}
          </div>
          <button
            className="border border-neutral-300 rounded-md px-2 py-1 text-size14 text-neutral-800 cursor-pointer"
            onClick={handlePrev}
          >
            صفحه قبل
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;

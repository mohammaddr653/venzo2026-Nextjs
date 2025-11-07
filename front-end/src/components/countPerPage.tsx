"use client";

import { usePathname, useRouter } from "next/navigation";

const CountPerPage = ({ query, initialVal }: any) => {
  const router = useRouter();
  const pathName = usePathname();
  const handleCountPerPage = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    query = new URLSearchParams(query);
    query.delete("page");
    query.set("limit", e.target.value);
    router.push(`${pathName}?${query.toString()}`);
  };

  return (
    <label className="text-size15 py-2 flex gap-1 items-center ms-auto">
      <p className="font-weight300">تعداد نمایش :</p>
      <select
        name="countPerPage"
        id="countPerPage"
        className="appearance-none p-2 w-15 py-1 border border-neutral-300 rounded-md"
        onChange={handleCountPerPage}
        value={initialVal}
      >
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </label>
  );
};

export default CountPerPage;

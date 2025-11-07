//این تابع مقدار فیلتر کلیک شده را در کوئری صفحه قرار میدهد تا اعمال شود
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ChangeEvent } from "react";

export const handleFilterCheck = (
  e: ChangeEvent<HTMLInputElement>,
  query: URLSearchParams,
  router: AppRouterInstance,
  pathName: string,
  name: any
) => {
  if (query.getAll(`attributes[${name}]`).includes(e.target.value)) {
    query.delete(`attributes[${name}]`, e.target.value);
  } else {
    query.append(`attributes[${name}]`, e.target.value);
  }
  query.delete("page");
  router.push(`${pathName}?${query.toString()}`);
};

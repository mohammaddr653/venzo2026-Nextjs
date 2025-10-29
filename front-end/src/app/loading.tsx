import Loader from "@/components/common/loader";

export default function Loading() {
  return (
    <div className="bg-white h-full fixed w-full top-0 right-0 z-600 flex justify-center items-center">
      <div className="flex flex-col gap-2 items-center justify-center aspect-square w-[800px]">
        {/* <Loader></Loader> */}
        در حال  آماده سازی...
      </div>
    </div>
  );
}

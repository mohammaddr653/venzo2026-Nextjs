import SearchSvg from "@/components/icons/search-svg";

const SearchBar = (props: any) => {
  return (
    <div className="rounded-full h-full overflow-hidden focus:outline-0 border border-primary/70 px-2 flex justify-start items-stretch">
      <span className="flex items-center justify-center text-neutral-primary">
        <SearchSvg className="h-full" stroke={"currentColor"}></SearchSvg>
      </span>
      <input
        type="text"
        className={` font-weight300 py-2 w-full px-1 text-size14 ${props.className} text-neutral-primary`}
        placeholder="جستجو..."
      />
    </div>
  );
};
export default SearchBar;

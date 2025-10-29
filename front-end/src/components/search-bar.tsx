const SearchBar = (props:any) => {
  return (
    <input
      type="text"
      className={`focus:bg-white focus:border-primary focus:outline-0 border rounded-xl border-cu-neutral-700 font-weight300 py-2 w-52 px-3 text-size14 ${props.className}`}
      placeholder="جستجو..."
    />
  );
};
export default SearchBar;

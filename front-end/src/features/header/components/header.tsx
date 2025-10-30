import SearchBar from "./search-bar";
import CartCounter from "./cart-counter";
import AccountButtons from "./account-buttons";
import MenuButton from "./menuButton";
import "../../../assets/css/header.css";
import CloseMenuButton from "./closeMenuButton";
import MobileMenuOverlay from "./mobileMenu-overlay";
import { SERVER_API } from "../../../../config";
import DeskMenuItem from "./desktop-menuItem";
import MobileNav from "./mobileNav";
import Logo from "@/components/logo";

const Header = async ({ focus }: any) => {
  const response = (await (
    await fetch(`${SERVER_API}/categories`)
  ).json()) as any;
  const categories = response.data;
  return (
    <header className={`w-full max-w-screen fixed z-50`}>
      <div
        id="header-container"
        className={`relative z-50 flex flex-row gap-10 justify-start items-stretch px-5 md:px-20 transition-all duration-300 delay-150 bg-transparent cu-header-focus ${
          focus ? "cu-header-absolute-focus" : null
        }`}
      >
        <Logo></Logo>
        <div className="menu hidden md:flex flex-row justify-between w-full items-stretch">
          <nav className="desktop-nav">
            <ul
              className={`flex px-0 h-full flex-row gap-5 font-weight200 transition-all duration-300 delay-150 `}
            >
              {categories?.length
                ? categories.map((category: any, index: any) => {
                    return category.motherId === "root" ? (
                      <DeskMenuItem
                        key={category._id}
                        item={category}
                        categories={categories}
                      ></DeskMenuItem>
                    ) : null;
                  })
                : null}
              <div
                className={`glass absolute w-[100vw] max-w-screen h-[100vh] bg-glass-shadow top-full right-0 z-30 transition-all duration-300 delay-150 invisible opacity-0`}
              ></div>
            </ul>
          </nav>
          <div className="flex flex-row gap-2 items-center">
            <div className="w-full px-0">
              <SearchBar className={"w-auto"}></SearchBar>
            </div>
            <span className="block bg-cu-neutral-700 w-1px h-6 rounded-3xl border-0"></span>
            <div className="block">
              <CartCounter width={40}></CartCounter>
            </div>
            <div className="block">
              <AccountButtons mode={"desktop"}></AccountButtons>
            </div>
          </div>
        </div>
        <MenuButton></MenuButton>
        <MobileMenuOverlay></MobileMenuOverlay>
        <div
          className={`mobileMenu overflow-y-scroll flex flex-col md:hidden gap-5 items-stretch h-[100dvh] w-[90%] dark:shadow-r-lean-light bg-white dark:bg-neutral-900 absolute transition-[left] duration-500 top-0 left-[-100%] mobmenu-open:left-0`}
        >
          <div className="flex justify-between items-center gap-2 p-4 px-5">
            <h1>وانیمارت</h1>
            <CloseMenuButton></CloseMenuButton>
          </div>
          <div className="flex flex-col gap-4 items-start">
            <div className="w-full px-4">
              <SearchBar className={"w-full"}></SearchBar>
            </div>
            <div className="block px-4 w-full">
              <AccountButtons mode={"mobile"}></AccountButtons>
            </div>
          </div>
          <MobileNav categories={categories}></MobileNav>
        </div>
      </div>
    </header>
  );
};

export default Header;

"use client";
import Link from "next/link";

const MenuNavbar = ({ mobileMenuShow, setMobileMenuShow }: any) => {
  const clickHandler = () => {
    mobileMenuShow && setMobileMenuShow(false);
  };
  return (
    <>
      <li>
        <Link href={"#about-me"} onClick={clickHandler}>
          درباره من
        </Link>
      </li>
      <li>
        <Link href={"#my-skills"} onClick={clickHandler}>
          مهارت ها
        </Link>
      </li>
      <li>
        <Link href={"#my-projects"} onClick={clickHandler}>
          نمونه کار ها
        </Link>
      </li>
      <li>
        <Link href={"#contact-me"} onClick={clickHandler}>
          تماس با من
        </Link>
      </li>
    </>
  );
};

export default MenuNavbar;

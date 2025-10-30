//this function manages the listeners of mobile menu items

export const mobileMenuScripts = () => {
  const items = document.querySelectorAll(
    "header div#header-container nav.mobile-nav ul li"
  );
  function handler(currentChilds: HTMLElement) {
    const children = currentChilds.parentElement?.parentElement?.children; //all li's with same parent
    for (let li of children!) {
      const childs = li.querySelector("div.childs") as HTMLElement | null;
      childs !== currentChilds && li?.classList.remove("open");
    }
    currentChilds.parentElement?.classList.toggle("open");
  }

  for (let li of items) {
    const head = li.querySelector("div.head") as HTMLElement | null;
    const childs = li.querySelector("div.childs") as HTMLElement | null;
    if (head && childs) {
      head.onclick = () => handler(childs);
    }
  }
};

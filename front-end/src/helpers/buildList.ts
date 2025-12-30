//this function fills the ul tag to show a list of categories
//if handleDelete and handleUpdate set to null , the buttons wont show
export const buildList = (
  list: any,
  categories: any,
  handleDelete: Function | null,
  handleUpdate: Function | null,
  menu: boolean,
  handleLink: Function | null,
  setGlassShow: Function | null
) => {
  if (list.current) {
    list.current.innerHTML = "";
    categories.forEach((category: any) => {
      if (category.motherId === "root") {
        listLoop(category, list.current);
      }
    });
  }

  function listLoop(item: any, parent: any) {
    const newLi = document.createElement("li");
    if (item.display === "mega-menu" && setGlassShow) {
      newLi.onmouseenter = () => setGlassShow(true);
      newLi.onmouseleave = () => setGlassShow(false);
    }
    newLi.classList.add(item.display);
    const liHead = document.createElement("div");
    liHead.classList.add("head");
    const liChilds = document.createElement("div");
    liChilds.classList.add("childs");
    const newUl = document.createElement("ul");
    liChilds.appendChild(newUl);

    let title;
    let link: string;
    if (menu && handleLink) {
      switch (item.type) {
        case "shop":
          title = document.createElement("a");
          link = `/shop/${item._id}`;
          title.href = link;
          title.onclick = () => {
            handleLink(link);
          };
          break;
        case "archive":
          title = document.createElement("a");
          link = `/archive/${item._id}`;
          title.href = link;
          title.onclick = () => {
            handleLink(link);
          };
          break;
        case "box": //note:need to be completed
          title = document.createElement("h4");
          break;
        case "link":
          title = document.createElement("a");
          link = item.link;
          title.href = link;
          title.onclick = () => {
            handleLink(link);
          };
          break;
        default:
          break;
      }
    } else {
      title = document.createElement("h4");
    }
    if (title) {
      title.innerHTML = item.name;
      liHead.appendChild(title);
    }

    if (handleDelete && handleUpdate) {
      const liButtons = document.createElement("div");
      liButtons.classList.add("li-buttons");

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerText = "حذف";
      const updateBtn = document.createElement("button");
      updateBtn.classList.add("update-btn");
      updateBtn.innerText = "ویرایش";
      const itemType = document.createElement("span");
      itemType.classList.add("item-type");
      itemType.innerText = `نوع: ${item.type}`;
      liButtons.appendChild(itemType);
      const itemDisplay = document.createElement("span");
      itemDisplay.classList.add("item-display");
      itemDisplay.innerText = `نمایش: ${item.display}`;
      liButtons.appendChild(itemDisplay);

      [deleteBtn, updateBtn].forEach((btn, i) => {
        liButtons.appendChild(btn);
        btn.onclick = (e, categoryId = item._id) => {
          i == 0 ? handleDelete(categoryId) : null;
          i == 1 ? handleUpdate(categoryId) : null;
        };
      });
      liHead.appendChild(liButtons);
    }

    newLi.appendChild(liHead);
    parent.appendChild(newLi);
    categories.map((category: any) => {
      if (category.motherId === item._id) {
        newLi.appendChild(liChilds);
        listLoop(category, newUl);
      }
    });
  }
};

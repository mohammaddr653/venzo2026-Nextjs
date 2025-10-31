//this function fills the select element for choosing category
//if categoryId was null the if will always be true . and the categories 
export const buildSelectionList = (
  selectionList: any,
  categories: any,
  defaultVal: string,
  defaultText: string,
  categoryId: string | null
) => {
  if (selectionList.current) {
    selectionList.current.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = defaultVal;
    defaultOption.textContent = defaultText;
    selectionList.current.appendChild(defaultOption);
    categories.forEach((category: any) => {
      if (category.motherId === "root") {
        selectionListLoop(category, selectionList.current);
      }
    });
  }

  function selectionListLoop(item: any, parent: any) {
    const newOption = document.createElement("option");
    newOption.value = item._id;
    newOption.textContent = item.name;
    if (item._id !== categoryId) {
      parent.appendChild(newOption);
      categories.map((category: any) => {
        if (category.motherId === item._id) {
          selectionListLoop(category, parent);
        }
      });
    }
  }
};

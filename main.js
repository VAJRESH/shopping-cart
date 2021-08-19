$(function () {
  const addBtn = $(".addBtn");
  const addItemsForm = $(".addItemsForm");
  const listContainerUl = $(".listContainer ul");
  const text = $("#text");
  const clearItems = $("#clearItems");

  const shoppingList = getSavedItems();
  if (shoppingList.length !== 0) {
    addItems(shoppingList);
  }

  // loops through the items and adds in html
  function addItems(items) {
    listContainerUl.html("");
    items.map((item) => {
      const newItem = $(`<li>${item}</li>`);
      newItem.appendTo(listContainerUl);
    });
  }

  addBtn.on("click", () => {
    addBtn.hide();
    addItemsForm.show();
  });

  // add items
  $("#addtolistBtn").on("click", function (e) {
    e.preventDefault();
    text.innerHTML = "";
    const item = $("input").val();

    if (!item) return;

    shoppingList.push(item);
    addItems(shoppingList);
    saveItems(shoppingList);
    $("#itemInput").val("");
  });

  clearItems.on("click", function (e) {
    e.preventDefault();

    //   deletes saved items
    shoppingList.length = 0;
    deleteSavedItems();

    //   updates the UI
    listContainerUl.html("");
    text.html("Your Shopping list is empty, add something...");
  });
});

function saveItems(items) {
  localStorage.setItem("shopping", JSON.stringify(items));
}

function deleteSavedItems() {
  localStorage.removeItem("shopping");
}

function getSavedItems() {
  return JSON.parse(localStorage.getItem("shopping")) || [];
}

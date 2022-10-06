const list = document.querySelector("ul");
const input = document.querySelector(".add-todo");

const deleteIcon = `<img class="delete-icon" src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png"/>`;

const todos = [
  {
    key: "1",
    done: false,
    value: "Complete react form component",
  },
  {
    key: "2",
    done: false,
    value: "Grocery shopping",
  },
  {
    key: "3",
    done: false,
    value: "Gift shopping for Stephanie",
  },
];

function createListItem(key, text) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkboxInput = document.createElement("input");
  const checkbox = document.createElement("span");
  const itemText = document.createElement("span");
  const button = document.createElement("button");

  checkboxInput.setAttribute("type", "checkbox");
  checkbox.classList.add("checkbox");
  item.setAttribute("id", key);

  checkboxInput.addEventListener("change", (e) => {
    const item = e.target.closest("li");
    checkItem(item);
  });

  itemText.append(text);

  button.innerHTML = deleteIcon;
  button.addEventListener("click", (e) => {
    const item = e.target.closest("li");
    deleteItem(item);
  });

  item.appendChild(label).append(checkboxInput, checkbox, itemText, button);
  return item;
}

function initialList() {
  if (todos.length > 0) {
    todos.forEach((td) => {
      const item = createListItem(td.key, td.value);
      list.appendChild(item);
    });
  }
}

window.onload = initialList;

function addItem(text) {
  const todo = {
    key: new Date().getTime().toString(),
    done: false,
    value: text,
  };
  todos.push(todo);
  const item = createListItem(todo.key, todo.value);
  list.appendChild(item);
}

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addItem(e.target.value);
    e.target.value = "";
  }
});

function checkItem(node) {
  const checked = todos.find((todo) => todo.key === node.id);
  checked.done = !checked.done;

  node.querySelector("span").classList.toggle("checked");
  node.querySelector("label").classList.toggle("highlight");
}

function deleteItem(node) {
  const idx = todos.findIndex((todo) => todo.key === node.id);
  todos.splice(idx, 1);

  node.remove();
}

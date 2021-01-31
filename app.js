const inputBtn = document.querySelector(".todo-btn");
const todoInput = document.querySelector(".todo-input");
const todoLists = document.querySelector(".todo-lists");
const error = document.querySelector(".error");
const filter = document.querySelector(".filter-todos");
const deleteAll = document.querySelector("#delete-all");
const deletePromt = document.querySelector(".confirm");
const deleteYes = document.querySelector(".yes");
const deleteNo = document.querySelector(".no");

filter.addEventListener("change", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

inputBtn.addEventListener("click", (e) => {
  //prevent from submiting
  e.preventDefault();
  if (todoInput.value === "") {
    error.classList.add("error-show");
  } else {
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    //li
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-li");
    todoLi.innerText = todoInput.value;
    todoDiv.appendChild(todoLi);
    //ADD todo to local storage
    saveToLocal(todoInput.value);
    //check
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");
    checkBtn.innerHTML = "<i class='fas fa-check'></i>";
    todoDiv.appendChild(checkBtn);
    //delete
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";
    todoDiv.appendChild(deleteBtn);
    //append to everytinh to todolists
    todoLists.appendChild(todoDiv);
    todoInput.value = "";
  }
});

todoInput.addEventListener("input", () => {
  error.classList.remove("error-show");
});

todoLists.addEventListener("click", (e) => {
  const item = e.target;
  if (item.classList[0] === "delete-btn") {
    item.parentElement.classList.add("fall");
    removeLocalTodo(item.parentElement);
    item.parentElement.addEventListener("transitionend", () => {
      item.parentElement.remove();
    });
  }

  if (item.classList[0] === "check-btn") {
    item.parentElement.classList.toggle("complete");
  }
});

function filterTodo(e) {
  const todos = todoLists.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

deleteAll.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoLists.childNodes.length >= 1) {
    document.querySelector("header").style.opacity = ".3";
    document.querySelector("form").style.opacity = ".3";
    document.querySelector(".todo-container").style.opacity = ".3";
    document.querySelector("body").classList.add("pointer");
    deletePromt.classList.add("show");
  }
});

deleteNo.addEventListener("click", () => {
  deletePromt.classList.remove("show");
  document.querySelector("header").style.opacity = "1";
  document.querySelector("form").style.opacity = "1";
  document.querySelector(".todo-container").style.opacity = "1";
  document.querySelector("body").classList.remove("pointer");
});
deleteYes.addEventListener("click", () => {
  deletePromt.classList.remove("show");
  document.querySelector("header").style.opacity = "1";
  document.querySelector("form").style.opacity = "1";
  document.querySelector(".todo-container").style.opacity = "1";
  document.querySelector("body").classList.remove("pointer");
  todoLists.classList.toggle("delete-all");
  todoLists.addEventListener("transitionend", () => {
    let childs = todoLists.childNodes;
    for (let i = childs.length - 1; i >= 0; i--) {
      childs[i].remove();
    }
    todoLists.classList.remove("delete-all");
    localStorage.clear();
  });
});

//Understand This Code!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function saveToLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [todo];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    //li
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-li");
    todoLi.innerText = todo;
    todoDiv.appendChild(todoLi);
    //check
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");
    checkBtn.innerHTML = "<i class='fas fa-check'></i>";
    todoDiv.appendChild(checkBtn);
    //delete
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";
    todoDiv.appendChild(deleteBtn);
    //append to everytinh to todolists
    todoLists.appendChild(todoDiv);
  });
}

function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

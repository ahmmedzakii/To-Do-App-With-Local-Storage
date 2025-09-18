// Set The Main Var
let input = document.querySelector(".input");
let button = document.querySelector(".button");
let tasksDiv = document.querySelector(".tasks");

input.addEventListener("click", () => {
  input.style.width = "80%";
});

let empytArray = [];

if (window.localStorage.getItem("tasks")) {
  empytArray = JSON.parse(window.localStorage.getItem("tasks"));
}

//get data from local storage
getDataFromLocalStorage();

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();
    deleteTaskFromLocalStorage(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
  }

  if (e.target.classList.contains("done")) {
    e.target.parentElement.parentElement.classList.toggle("mashy");
    document.getElementById("doneSound").play();
    toggleAtatuseStartWith(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
  }
});

button.onclick = function () {
  if (input.value === "") {
    console.log("Pplease Enter Avalable Task");
  } else {
    addElementsToArray(input.value);
    input.value = "";
  }
};

function addElementsToArray(value) {
  let obj = {
    id: Date.now(),
    title: value,
    completed: false,
  };
  empytArray.push(obj);

  addElementsToPageForm(empytArray);
  //add Data to LocalStorage From Array OF data
  addDateToLocalStorageFrom(empytArray);
}

function addElementsToPageForm(array) {
  tasksDiv.innerHTML = "";
  array.forEach((title) => {
    let task = document.createElement("div");
    task.className = "task";
    task.setAttribute("data-id", title.id);
    let information = document.createElement("div");
    information.className = "information";

    if (title.completed) {
      task.classList.add("mashy");
    }

    let pinfo = document.createElement("p");
    pinfo.className = "info";
    pinfo.appendChild(document.createTextNode(title.title));

    let Premove = document.createElement("p");
    let i = document.createElement("i");
    i.className = "fa-solid fa-trash";
    Premove.className = "remove";
    Premove.appendChild(i);

    let Padd = document.createElement("p");
    let iTwo = document.createElement("i");
    iTwo.className = "fa-solid fa-circle-check";
    Padd.className = "done";
    Padd.setAttribute("id", "done");
    Padd.appendChild(iTwo);

    // Start Appent
    information.appendChild(pinfo);
    information.appendChild(Padd);
    information.appendChild(Premove);
    task.appendChild(information);
    tasksDiv.appendChild(task);

    Padd.onclick = function () {
      task.classList.add("task");
    }
  });
  //Remove All Button
  if (empytArray.length >= 2) {
    let all = document.createElement("p");
    all.appendChild(document.createTextNode(`Remove All`));
    all.className = "all remove";
    tasksDiv.appendChild(all);

    all.onclick = function () {
      tasksDiv.innerHTML = "";
      window.localStorage.clear();
    };
  }
}

function addDateToLocalStorageFrom(empytArray) {
  window.localStorage.setItem("tasks", JSON.stringify(empytArray));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(window.localStorage.getItem("tasks"));
    addElementsToPageForm(tasks);
  }
}

function deleteTaskFromLocalStorage(theElementById) {
  empytArray = empytArray.filter((E) => E.id != theElementById);
  addDateToLocalStorageFrom(empytArray);
}

function toggleAtatuseStartWith(taskId) {
  for (let i = 0; i < empytArray.length; i++) {
    if (empytArray[i]["id"] == taskId) {
      empytArray[i].completed == false
        ? (empytArray[i].completed = true)
        : (empytArray[i].completed = false);
    }
  }
  addDateToLocalStorageFrom(empytArray);
}

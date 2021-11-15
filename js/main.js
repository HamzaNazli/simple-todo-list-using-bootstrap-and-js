
const frmItem = document.querySelector("#frmItem");
const inptItem = document.querySelector("#inptItem");
const lstItems =  document.querySelector("#lstItems");


let todoItems = [];

function getList(todoItems){
    lstItems.innerHTML= "";

    if(todoItems.length > 0){
        todoItems.forEach(item => {
            let liTag = `          
            <li class="list-group-item d-flex justify-content-between align-items-center fs-4">
            <span>${item.name}</span>
            <span>
              <a><i class="bi bi-check-square"></i></a>
              <a><i class="bi bi-pencil-square "></i></a>
              <a><i class="bi bi-x-square "></i></a>
            </span>
            </li>`;
            lstItems.insertAdjacentHTML("beforeend", liTag);
        });
    }
}

function getLocalStorage(){
    const todoLocalStorage = localStorage.getItem("todoItems");

    if(todoLocalStorage !== null || todoLocalStorage !== "undefined"){
        todoItems = JSON.parse(todoLocalStorage);
    }

    getList(todoItems);
}

function setLocalStorage(todoItems){
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

document.addEventListener("DOMContentLoaded", () => {
    frmItem.addEventListener("submit",(e) => {
        e.preventDefault();
        const itemName = inptItem.value.trim();

        if(itemName.length !== 0){
            const itemObj = {
                name: itemName,
                isDone: false,
            };

            todoItems.push(itemObj);
            setLocalStorage(todoItems);
        }
        inptItem.value = "";
    });

    getLocalStorage();

});


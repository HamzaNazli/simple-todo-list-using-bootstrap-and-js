
const frmItem = document.querySelector("#frmItem");
const inptItem = document.querySelector("#inptItem");
const lstItems =  document.querySelector("#lstItems");


let todoItems = [];

function removeItem(item){
    if(todoItems){
    const ListElms = document.querySelectorAll(".list-group-item");
    ListElms.forEach((ListEl)=> {
        ListEl.querySelector("#dlt").addEventListener("click", (e)=>{
            e.preventDefault();

            ListEl.remove();
            todoItems.splice(todoItems.indexOf(item),1);
            setLocalStorage(todoItems);
        });
    });
}
}

function getList(todoItems){
    lstItems.innerHTML= "";
    
    if(todoItems !== null && todoItems.length > 0 ){
        todoItems.forEach(item => {
            let liTag = `          
            <li class="list-group-item d-flex justify-content-between align-items-center fs-4">
            <span id="liText">${item.name}</span>
            <span>
              <a><i class="bi bi-check-square"></i></a>
              <a><i class="bi bi-x-square" id="dlt"></i></a>
            </span>
            </li>`;
            lstItems.insertAdjacentHTML("beforeend", liTag);
            removeItem(item);
        });
    } else {
        let liTag = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
               <span>No Records Found.</span>
        </li>`;
        lstItems.insertAdjacentHTML("beforeend", liTag);

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
            todoItems = todoItems || [];
            todoItems.push(itemObj);
            setLocalStorage(todoItems);
            getList(todoItems);
        }else{
            alert('A task cannot be empty. Please enter a Task......');
        }
        inptItem.value = "";
    });

    getLocalStorage();

});


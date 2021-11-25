
const frmItem = document.querySelector("#frmItem");
const inptItem = document.querySelector("#inptItem");
const lstItems =  document.querySelector("#lstItems");
const switchBox = document.getElementById("flexSwitchCheckDefault");


let todoItems = [];

function changeTheme(){
    const isChecked=switchBox.checked;
        
    const themeChangeElms = document.querySelectorAll(".theme-change-elements");

    themeChangeElms.forEach((el)=>{
        if(isChecked){
            el.classList.add("bg-dark");
            el.classList.add("text-white");
        }else{
            el.classList.remove("bg-dark");
            el.classList.remove("text-white");
        }
    }); 
}

function statusFromStorage(){
    if(todoItems){
        const ListElms = document.querySelectorAll(".list-group-item");
        todoItems.forEach((item)=> {     
            ListElms.forEach((ListEl)=> {
                const txtId = ListEl.querySelector(".li-text");
                if(item.isDone && txtId.getAttribute('data-time') == item.addedTime ){
                txtId.classList.add("completed");
            } 
            });   
        });
    }
}

function statusToStorage(item){
    const itemIndex = todoItems.indexOf(item);
    const currentItem = todoItems[itemIndex];
    todoItems.splice(itemIndex,1,currentItem);
    setLocalStorage(todoItems);
}

function setItemStatus(item){
    if(todoItems){
        const ListElms = document.querySelectorAll(".list-group-item");
        ListElms.forEach((ListEl)=> {
            ListEl.querySelector(".stts-liEl").addEventListener("click", (e)=>{
                e.preventDefault();
                const txtId = ListEl.querySelector(".li-text");    
                if(txtId.getAttribute('data-time') == item.addedTime){
                    txtId.classList.toggle("completed");
                    if(txtId.classList.contains("completed")){
                        item.isDone = true;
                    }else{
                        item.isDone = false;
                    }
                    statusToStorage(item);
                                      
                }
            });
        });
    }
}

function removeItemFromStorage(item){
    const removeIndex = todoItems.indexOf(item);
            todoItems.splice(removeIndex,1);
            setLocalStorage(todoItems);
}

function removeItem(item){
    if(todoItems){
    const ListElms = document.querySelectorAll(".list-group-item");
    ListElms.forEach((ListEl)=> {
        ListEl.querySelector(".dlt-liEl").addEventListener("click", (e)=>{
            e.preventDefault();
            const txtId = ListEl.querySelector(".li-text");
            if(txtId.getAttribute('data-time') == item.addedTime){
                removeItemFromStorage(item);
            }
            ListEl.remove();
            getLocalStorage();
            statusFromStorage();
        });
    });
}
}

function getList(todoItems){
    lstItems.innerHTML= "";
    
    if(todoItems !== null && todoItems.length > 0 ){
        todoItems.forEach(item => {
            let liTag = `          
            <li class="list-group-item d-flex justify-content-between align-items-center fs-4 theme-change-elements">
            <span class="li-text" data-time=${item.addedTime}>${item.name}</span>
            <span>
              <a class="stts-liEl"><i class="bi bi-check-square"></i></a>
              <a class="dlt-liEl"><i class="bi bi-x-square"></i></a>
            </span>
            </li>`;
            lstItems.insertAdjacentHTML("beforeend", liTag);
            removeItem(item);
            setItemStatus(item);    
            changeTheme();    
        });        
    } else {
        let liTag = `
        <li class="list-group-item d-flex justify-content-between align-items-center theme-change-elements">
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
    changeTheme();
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
                addedTime: new Date().getTime()
            }
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

    statusFromStorage();

    switchBox.addEventListener("change", (e) => {
        e.preventDefault();
        changeTheme();
    });

});


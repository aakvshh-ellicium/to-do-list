const inputValue = document.getElementById('taskName');
const addTask = document.getElementById('addTask');
const alertTask = document.getElementById('alert');
const listItems = document.getElementById('listItems');

let todo = JSON.parse(localStorage.getItem("todoList"));

function setLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todo));
}

function addTasks(){
    if (inputValue.value === ""){
        alert("Please enter a task");
    } else {
        let isTaskPresent = false;

        todo?.forEach(element => {
            (element.item == inputValue.value) ? isTaskPresent = true : isTaskPresent = false;
        });

        isTaskPresent == true ? alert("This task is already present") : null;

        let li = document.createElement('li')

        const task =    `<div>
                            ${inputValue.value}
                        </div>
                        <div>
                            <i class="fa-solid fa-pen" id="editButton"></i>
                            <i class="fa-solid fa-trash" id="deleteButton"></i>
                        </div>`

        li.innerHTML = task;
        listItems.appendChild(li);

        (!todo) ? todo = [] : null

        let itemList = {
            item: inputValue.value,
            status: false
        }

        todo.push(itemList);

        setLocalStorage();
        alert("Task added successfully!")        
    }
    inputValue.value = '';
    
}








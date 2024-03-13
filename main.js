const inputValue = document.getElementById('taskName');
const addTask = document.getElementById('addTask');
const alertTask = document.getElementById('alert');
const listItems = document.getElementById('listItems');


let todo = JSON.parse(localStorage.getItem("todoList"));
(!todo) && (todo = [])

function addTasks(){
    if (inputValue.value === ""){
        alert("Please enter a task");
        inputValue.focus();
    } else {
        let isTaskPresent = false;

        todo?.forEach(element => {
            (element.item == inputValue.value) && (isTaskPresent = true);
        });

        isTaskPresent == true && alert("This task is already present");

        let li = document.createElement('li')

        const task =    `<div ondblclick="completedTasks(this)">
                            ${inputValue.value}
                        </div>
                        <div>
                            <i class="fa-solid fa-pen" id="editButton" onclick="updateTask(this)"></i>
                            <i class="fa-solid fa-trash" id="deleteButton" onclick="deleteTask(this)"></i>
                        </div>
                            `

        li.innerHTML = task;
        listItems.appendChild(li);

        (!todo) ? todo = [] : null

        let itemList = {
            id: 1,
            item: inputValue.value,
            status: false
        }

        todo.push(itemList);
        console.log(todo)
        setLocalStorage();
        alert("Task added successfully!");
    }
    inputValue.value = '';
           
}

function readTasks(){
    todo?.forEach(element => {
        let li = document.createElement('li');
        let style = "style='display: flex, align-items: center, gap: 2rem;'";

        element.status ? style = "style='text-decoration: line-through;'" : style = ""

        const task =    `<div ${style} ondblclick="completedTasks(this)">
                            ${element.item}
                        </div>
                        <div>
                            ${style === "" ? '<i class="fa-solid fa-pen" id="editButton" onclick="updateTask(this)"></i>' : ''}
                            
                            <i class="fa-solid fa-trash" id="deleteButton" onclick="deleteTask(this)"></i>
                        </div>
                        `
        li.innerHTML = task;
        listItems.appendChild(li)
    });
}

readTasks();

function updateTask(e){
    if (e.parentElement.parentElement.querySelector('div').style.textDecoration === "")
    {
        inputValue.value = e.parentElement.parentElement.querySelector('div').innerText;
        updateText = e.parentElement.parentElement.querySelector('div');
        addTask.setAttribute('onclick', 'updateSelectedTask()')
        addTask.innerText = 'Update'
        inputValue.focus();
    }
    
}

function updateSelectedTask(){
    let isTaskPresent = false;
    
    todo.forEach(element => {
        (element.item == inputValue.value) && (isTaskPresent = true);
    });

    isTaskPresent == true && alert("This task is already present");

    todo.forEach(element => {
        (element.item == updateText.innerText.trim()) && (element.item = inputValue.value)
    });

    setLocalStorage();

    updateText.innerText = inputValue.value;
    addTask.setAttribute('click', 'addtasks()');
    addTask.innerText = 'Add';

    inputValue.value = '';
    alert('Task updated successfully!');
    
}

function deleteTask(e){
    let deleteValue = e.parentElement.parentElement.querySelector('div').innerText;

    if (confirm(`Are you sure you want to delete this task ${deleteValue}?`)){
        e.parentElement.parentElement.setAttribute('class', 'deletedTask')
        inputValue.focus();

        setLocalStorage();
        todo.forEach((element) => {
            if (element.item == deleteValue.trim()){
                todo.splice(element, 1);
                
            }
        });

        

        setTimeout(() => {
            e.parentElement.parentElement.remove();
        }, 1000);

        

        
    }
}

function completedTasks(e){
    if (e.parentElement.querySelector("div").style.textDecoration === "") {
        const tick = document.createElement("span");
        tick.innerHTML = `<i class="fa-solid fa-check"></i>`
        tick.id = "todoCheck";
        e.parentElement.querySelector("div").style.textDecoration = "line-through";
        e.parentElement.querySelector("div").appendChild(tick);
        e.parentElement.querySelector("#editButton").remove();
    
        todo.forEach((element) => {
          if (
            e.parentElement.querySelector("div").innerText.trim() == element.item
          ) {
            element.status = true;
          }
        });
        setLocalStorage();
        // alert("Todo item Completed Successfully!");
    }
}

function setLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todo));
}


const obj = [
    {
        id: 1,
        name: 'Aakash'
    },
    {
        id: 2,
        name: 'Aakash'
    }
]

obj.forEach(element => {
    console.log(element)
});


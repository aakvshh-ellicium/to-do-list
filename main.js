const inputValue = document.getElementById('taskName');
const addTask = document.getElementById('addTask');
const alertTask = document.getElementById('alert');
const listItems = document.getElementById('listItems');
const projectInput = document.getElementById('projectName')
const projectList = document.getElementById('projectList');

let todo = JSON.parse(localStorage.getItem("todoList"));
(!todo) && (todo = [])
console.log(todo)

let todoProjects = JSON.parse(localStorage.getItem("projectsList"));
(!todoProjects) && (todoProjects = [])
console.log(todo)

function setLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todo));
    localStorage.setItem("projectsList", JSON.stringify(todoProjects));localStorage.setItem("todoList", JSON.stringify(todo));
}
let count = 0;

function addProject(){
    if (projectInput.value === ""){
        alert("Please enter a Project name");
        projectInput.focus();
    } else {
        let isProjectPresent = false;

        todo?.forEach(element => {
            (element.item == inputValue.value) && (isProjectPresent = true);
        });
        if (isProjectPresent == true) {
            alert("This project is already present") ;
        }
        else {
            let li = document.createElement('li');

            const project = `<div>${projectInput.value}</div>`

            li.innerHTML = project;
            
            projectList.appendChild(li);

            (!todo) ? todo = [] : null

            let projectsList = {
                id: `${count++}`,
            }
            todoProjects.push(projectsList)
            console.log(todo)
            setLocalStorage();
        }
        
    }
}

function addTasks(){
    if (inputValue.value === ""){
        alert("Please enter a task");
        inputValue.focus();
    } else {
        let isTaskPresent = false;

        todo?.forEach(element => {
            (element.item == inputValue.value.trim()) && (isTaskPresent = true);
        });

        if (isTaskPresent == true) {
            alert("This task is already present")
        } else {

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
                item: inputValue.value,
                status: false
            }

            todo.push(itemList);
            console.log(todo)
            setLocalStorage();
            alert("Task added successfully!");
        }
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
    addTask.setAttribute('onclick', 'addtasks()');
    addTask.innerText = 'Add';

    inputValue.value = '';
    alert('Task updated successfully!');
    
}

function deleteTask(e){
    let deleteValue = e.parentElement.parentElement.querySelector('div').innerText;
    console.log(deleteValue)
    if (confirm(`Are you sure you want to delete this task ${deleteValue}?`)){
        e.parentElement.parentElement.setAttribute('class', 'deletedTask')
        inputValue.focus();

        // todo.forEach((element) => {
        //     if (element.item === deleteValue.trim()){
        //         todo.splice(element, 1);
                
        //     }
            
        // });

        let deleteIndex = todo.findIndex(element => element.item === deleteValue.trim())
        
        todo.splice(deleteIndex, 1)

        setTimeout(() => {
            e.parentElement.parentElement.remove();
        }, 1000);

        setLocalStorage();
        
    }
}

function deleteAllTasks(e){
    if (confirm(`Are you sure you want to delete all tasks?`)){
        localStorage.clear();
        console.log(document.querySelector('#listItems'))
        setTimeout(() => {
            document.querySelector('#listItems').remove();
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




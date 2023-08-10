const addBtn = document.querySelector('.add-btn');
const input = document.querySelector('#input');
const list = document.querySelector('.list');
const filters = document.querySelectorAll('.list-filters span');
const clearBtn = document.querySelector('.clear-btn');

// getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem('todo-list'));

// Adding 'active' class to current filter button 
filters.forEach(btn =>{
    btn.addEventListener('click',()=>{
        document.querySelector('span.active').classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    })
})
document.getElementById("complet").addEventListener('click', function(){
    showTodo("completed");
    document.querySelector('span.active').classList.remove("active");
    completed.classList.add("active");
});
document.getElementById("alltasks").addEventListener('click', function(){
    document.querySelector('span.active').classList.remove("active");
    all.classList.add("active");
    showTodo("all");
})
// Showing task
const showTodo = (filter) =>{
    let li = '';
    if(todos){
        todos.forEach((todo, id) => {
            // if todo status is completed, set the isCompleted value to checked 
            let isCompleted = todo.status == "completed" ? "checked" : "";
            const isImportant = todo.isImportant ? 'important' : '';
            if(filter == todo.status || filter == "all"){
                li += `
            <li class="todo">
                <label for=${id}>
                    <input type="checkbox" onclick="updateStatus(this)" id="${id}"  ${isCompleted}>
                    <p class="${isCompleted}">${todo.name}</p>
                    <span class="due-date" style="font-weight: 600;">Due: ${todo.dueDate}</span>
                </label>
                <button type="button" onclick='deleteTask(${id})' class="btn delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>
                <button type="button" onclick="editTask(${id})"style=":"class="btn edit-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M14.854.146a.5.5 0 0 1 0 .708l-2.646 2.646a.5.5 0 0 1-.708 0L3.793 7.854a1.5 1.5 0 0 0-.354.535l-1.19 3.968a1.5 1.5 0 0 0 1.853 1.853l3.968-1.19a1.5 1.5 0 0 0 .535-.354l4.5-4.5a.5.5 0 0 1 0-.708l2.646-2.646a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5zM4.5 9l-1 3 3-1 6.5-6.5-2 2L4.5 9z"/>
        <path fill-rule="evenodd" d="M12.854 2.146a1 1 0 0 1 1.415 0l.5.5a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.246-1.246l1-3a1 1 0 0 1 .242-.39l9-9zM13.354 3.354l-9 9-1.207-.707 9-9 1.207.707z"/>
    </svg>
</button>
<button id="important-tasks-btn" class="btn important-task" onclick="updateImportance(${id})">
  <svg id="important-tasks-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
  </svg>
</button>


              

            </li>
            `;
            }
        });
    }
    list.innerHTML = li || "<span class='any-text'>You don't have any task here</span>";
    
    // let checkTask = list.querySelectorAll('.todo');
    // !checkTask.length ? clearBtn.classList.remove('active') : clearBtn.classList.add('active');
    
    list.offsetHeight >=250 ? list.classList.add('overflow') : list.classList.remove('overflow');
}

showTodo("all");

// Updating(toggle) checkbox status
const updateStatus = (selectedTask) =>{
    // getting pragraph the contains task name
    let taskname = selectedTask.parentElement.lastElementChild;  // parentElement() : 回傳子元素的父元素  lastElementChild() : 回傳 HTML content 最後一個元素
    if(selectedTask.checked){
        taskname.classList.add("checked");
        // updating the status of selected task to completed
        todos[selectedTask.id].status = "completed";
        alert("task completed ")
    }else{
        taskname.classList.remove("checked");
        // updating the status of selected task to pending
        todos[selectedTask.id].status = "pending";
    }
    // updating todo in localstorage
    localStorage.setItem('todo-list', JSON.stringify(todos));
}

// Click button to add task
addBtn.addEventListener('click',()=>{
    addTask();
})

// Operating keyboard to add task
input.addEventListener('keypress',(event)=>{
    if(event.key === 'Enter'){
        addTask();
    }
})
 const duedate =document.getElementById("dueDate");
// Adding task
const addTask = () =>{
    let inputValue = input.value;
    let isImportant=false
    if(inputValue.trim() === ""){
        alert('welcome!');
        return;
    }else{
        if(!todos){  // if todos isn't exist, pass an empty to todos
            todos = [];
        }
        
        let dueDate = duedate.value;
        if (!dueDate) {
            alert("please add due date");
            return;
        }
        let todoInfo = {name: inputValue, status: "pending", dueDate: dueDate , isImportant:isImportant};  // Object data
        todos.push(todoInfo);  // add new task to todoList
        localStorage.setItem('todo-list', JSON.stringify(todos));  // store key/value in localstorage and transform data into JSON string 
        input.value = "";
        duedate.value= null;
        showTodo("all");
    }
}

// Removing task
const deleteTask = (deleteId) =>{
    // removing selected task from array
    if(confirm(' delete task?')){
        todos.splice(deleteId, 1);
        localStorage.setItem('todo-list', JSON.stringify(todos));
        showTodo("all");
    }
}

// Removing all tasks
clearBtn.addEventListener('click',()=>{
    // removingif all task from array
    if(confirm("you want to delete all taks")){todos.splice(0, todos.length);
        localStorage.setItem('todo-list', JSON.stringify(todos));
        showTodo("all");}
    
})

const editTask = (taskId) => {
    const currentName = todos[taskId].name;
    const currentDate = todos[taskId].dueDate;
    const newName = prompt("Edit task name:", currentName);
const newduedate =prompt("edit ddue date", currentDate);
    if (newName != null && newName.trim() !== "") {
        todos[taskId].name = newName.trim();
        todos[taskId].dueDate=newduedate.trim();
        localStorage.setItem('todo-list', JSON.stringify(todos));
        showTodo("all");
    }

}

let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");
  let search = document.querySelector(".bx-search");

  closeBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle("open");
    menuBtnChange();//calling the function(optional)
  });

  search.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
    sidebar.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
  });

  // following are the code to change sidebar button(optional)
  function menuBtnChange() {
   if(sidebar.classList.contains("open")){
     closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
   }else {
     closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
   }
  }
  
  const searchBtn = document.querySelector('#search-btn');
  const searchInput = document.querySelector('#search-input');
  
  searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTodos = todos.filter(todo => todo.name.toLowerCase().includes(searchTerm));
    showFilteredTodos(filteredTodos);
    document.querySelector('span.active').classList.remove("active");
    all.classList.add("active");
  });
  const showFilteredTodos = (filteredTodos) => {
    let li = '';
    if (filteredTodos) {
      filteredTodos.forEach((todo, id) => {
        // if todo status is completed, set the isCompleted value to checked
        let isCompleted = todo.status == "completed" ? "checked" : "";
        li += `
          <li class="todo">
            <label for=${id}>
              <input type="checkbox" onclick="updateStatus(this)" id="${id}"  ${isCompleted}>
              <p class="${isCompleted}">${todo.name}</p>
              <span class="due-date" style="font-weight: 600;">Due: ${todo.dueDate}</span>
            </label>
            <button type="button" onclick='deleteTask(${id})' class="btn delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
        </button>
        <button type="button" onclick="editTask(${id})" class="btn edit-btn">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
<path d="M14.854.146a.5.5 0 0 1 0 .708l-2.646 2.646a.5.5 0 0 1-.708 0L3.793 7.854a1.5 1.5 0 0 0-.354.535l-1.19 3.968a1.5 1.5 0 0 0 1.853 1.853l3.968-1.19a1.5 1.5 0 0 0 .535-.354l4.5-4.5a.5.5 0 0 1 0-.708l2.646-2.646a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5zM4.5 9l-1 3 3-1 6.5-6.5-2 2L4.5 9z"/>
<path fill-rule="evenodd" d="M12.854 2.146a1 1 0 0 1 1.415 0l.5.5a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.246-1.246l1-3a1 1 0 0 1 .242-.39l9-9zM13.354 3.354l-9 9-1.207-.707 9-9 1.207.707z"/>
</svg>
</button>
<button id="important-tasks-btn" class="btn important-task" onclick="updateImportance(${id})">
  <svg id="important-tasks-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
  </svg>
</button>


      

    </li>
    `;
    });
};

list.innerHTML = li || "<span class='any-text'>You don't have any task here</span>";

// let checkTask = list.querySelectorAll('.todo');
// !checkTask.length ? clearBtn.classList.remove('active') : clearBtn.classList.add('active');

list.offsetHeight >=250 ? list.classList.add('overflow') : list.classList.remove('overflow');
};
const today =document.getElementById('today');
today.addEventListener("click", function(){
    // Adding 'active' class to current filter button 
 document.querySelector('span.active').classList.remove("active");
        all.classList.add("active");
        showTodotoday("all", new Date());

});
// Showing task
const showTodotoday = (filter, currentDate) =>{
    let li = '';
    if(todos){
        todos.forEach((todo, id) => {
            // if todo status is completed, set the isCompleted value to checked 
            let isCompleted = todo.status == "completed" ? "checked" : "";
            let dueDate = new Date(todo.dueDate);
            if(filter == todo.status || filter == "all"){
                if(dueDate.getDate() === currentDate.getDate() &&
                  dueDate.getMonth() === currentDate.getMonth() &&
                  dueDate.getFullYear() === currentDate.getFullYear()) {
                    li += `
                        <li class="todo">
                            <label for=${id}>
                                <input type="checkbox" onclick="updateStatus(this)" id="${id}"  ${isCompleted}>
                                <p class="${isCompleted}">${todo.name}</p>
                                <span class="due-date" style="font-weight: 600;">Due: ${todo.dueDate}</span>
                            </label>
                            <button type="button" onclick='deleteTask(${id})' class="btn delete-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                        <button type="button" onclick="editTask(${id})" class="btn edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M14.854.146a.5.5 0 0 1 0 .708l-2.646 2.646a.5.5 0 0 1-.708 0L3.793 7.854a1.5 1.5 0 0 0-.354.535l-1.19 3.968a1.5 1.5 0 0 0 1.853 1.853l3.968-1.19a1.5 1.5 0 0 0 .535-.354l4.5-4.5a.5.5 0 0 1 0-.708l2.646-2.646a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5zM4.5 9l-1 3 3-1 6.5-6.5-2 2L4.5 9z"/>
                <path fill-rule="evenodd" d="M12.854 2.146a1 1 0 0 1 1.415 0l.5.5a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.246-1.246l1-3a1 1 0 0 1 .242-.39l9-9zM13.354 3.354l-9 9-1.207-.707 9-9 1.207.707z"/>
            </svg>
        </button>
        <button id="important-tasks-btn" class="btn important-task" onclick="updateImportance(${id})">
        <svg id="important-tasks-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
        </svg>
      </button>
      
                      
        
                    </li>
                    `;
                  }
                }
            });
            
            }
            list.innerHTML = li || "<span class='any-text'>You don't have any task here</span>";
            
            // let checkTask = list.querySelectorAll('.todo');
            // !checkTask.length ? clearBtn.classList.remove('active') : clearBtn.classList.add('active');
            
            list.offsetHeight >=250 ? list.classList.add('overflow') : list.classList.remove('overflow');
        }
        const next7days = document.getElementById("next7days");
        next7days.addEventListener("click", function(){
            document.querySelector('span.active').classList.remove("active");
            all.classList.add("active");
        showTodonext("all", new Date());
        });
        const showTodonext = (filter, currentDate) =>{
            let li = '';
            if(todos){
                todos.forEach((todo, id) => {
                    // if todo status is completed, set the isCompleted value to checked 
                    let isCompleted = todo.status == "completed" ? "checked" : "";
                    let dueDate = new Date(todo.dueDate);
                    if(filter == todo.status || filter == "all"){
                        if(dueDate.getDate() <=(currentDate.getDate()+7) && dueDate.getDate() >= currentDate.getDate() &&
                          dueDate.getMonth() === currentDate.getMonth() &&
                          dueDate.getFullYear() === currentDate.getFullYear()) {
                            li += `
                                <li class="todo">
                                    <label for=${id}>
                                        <input type="checkbox" onclick="updateStatus(this)" id="${id}"  ${isCompleted}>
                                        <p class="${isCompleted}">${todo.name}</p>
                                        <span class="due-date" style="font-weight: 600;">Due: ${todo.dueDate}</span>
                                    </label>
                                    <button type="button" onclick='deleteTask(${id})' class="btn delete-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </button>
                                <button type="button" onclick="editTask(${id})" class="btn edit-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M14.854.146a.5.5 0 0 1 0 .708l-2.646 2.646a.5.5 0 0 1-.708 0L3.793 7.854a1.5 1.5 0 0 0-.354.535l-1.19 3.968a1.5 1.5 0 0 0 1.853 1.853l3.968-1.19a1.5 1.5 0 0 0 .535-.354l4.5-4.5a.5.5 0 0 1 0-.708l2.646-2.646a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5zM4.5 9l-1 3 3-1 6.5-6.5-2 2L4.5 9z"/>
                        <path fill-rule="evenodd" d="M12.854 2.146a1 1 0 0 1 1.415 0l.5.5a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.246-1.246l1-3a1 1 0 0 1 .242-.39l9-9zM13.354 3.354l-9 9-1.207-.707 9-9 1.207.707z"/>
                    </svg>
                </button>
                <button id="important-tasks-btn" class="btn important-task" onclick="updateImportance(${id})">
  <svg id="important-tasks-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
  </svg>
</button>

                
                              
                
                            </li>
                            `;
                          }
                        }
                    });
                    
                    }
                    list.innerHTML = li || "<span class='any-text'>You don't have any task here</span>";
                    
                    // let checkTask = list.querySelectorAll('.todo');
                    // !checkTask.length ? clearBtn.classList.remove('active') : clearBtn.classList.add('active');
                    
                    list.offsetHeight >=250 ? list.classList.add('overflow') : list.classList.remove('overflow');
                }
                const updateImportance = (id) => {
                    const todo = todos[id];
                    
                    todo.isImportant = !todo.isImportant; // toggle the importance status
                    localStorage.setItem('todo-list', JSON.stringify(todos)); 
                    // update local storage
                    if(todo.isImportant===true){
                        alert(" succefuly is important");
                    }else alert("not important")
                    showTodo("all"); // re-render the list
                  
                     
                  };
const importantBtn = document.querySelector('#important');
importantBtn.addEventListener("click", function(){
    showTodoimportant("all",true);
    document.querySelector('span.active').classList.remove("active");
    all.classList.add("active");
})
// Showing task
const showTodoimportant = (filter, isImportant = false) =>{
    let li = '';
    if(todos){
        todos.forEach((todo, id) => {
            // if todo status is completed, set the isCompleted value to checked 
            let isCompleted = todo.status == "completed" ? "checked" : "";
            const isTaskImportant = todo.isImportant ? 'important' : '';
            if((filter == todo.status || filter == "all") && (!isImportant || (isImportant && todo.isImportant))){
                li += `
            <li class="todo ${isTaskImportant}">
                <label for=${id}>
                    <input type="checkbox" onclick="updateStatus(this)" id="${id}"  ${isCompleted}>
                    <p class="${isCompleted}">${todo.name}</p>
                    <span class="due-date"  style="font-weight: 600;">Due: ${todo.dueDate}</span>
                </label>
                <button type="button" onclick='deleteTask(${id})' class="btn delete-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
            <button type="button" onclick="editTask(${id})" class="btn edit-btn">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M14.854.146a.5.5 0 0 1 0 .708l-2.646 2.646a.5.5 0 0 1-.708 0L3.793 7.854a1.5 1.5 0 0 0-.354.535l-1.19 3.968a1.5 1.5 0 0 0 1.853 1.853l3.968-1.19a1.5 1.5 0 0 0 .535-.354l4.5-4.5a.5.5 0 0 1 0-.708l2.646-2.646a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5zM4.5 9l-1 3 3-1 6.5-6.5-2 2L4.5 9z"/>
    <path fill-rule="evenodd" d="M12.854 2.146a1 1 0 0 1 1.415 0l.5.5a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.246-1.246l1-3a1 1 0 0 1 .242-.39l9-9zM13.354 3.354l-9 9-1.207-.707 9-9 1.207.707z"/>
</svg>
</button>
<button id="important-tasks-btn" class="btn important-task" onclick="updateImportance(${id})">
  <svg id="important-tasks-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
  </svg>
</button>


          

        </li>
        `;
      }
    });
}


list.innerHTML = li || "<span class='any-text'>You don't have any task here</span>";

// let checkTask = list.querySelectorAll('.todo');
// !checkTask.length ? clearBtn.classList.remove('active') : clearBtn.classList.add('active');

list.offsetHeight >=250 ? list.classList.add('overflow') : list.classList.remove('overflow');
}



var chang = new Typed("#title", {
    strings: [
     
      "<span>welcome to our todo list</span>",
      "<span >Make a good day</span>",
      "<span>welcome to our todo list</span>",
      "<span >Make a good day</span>"
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });
  document.getElementById("enretard").addEventListener("click",function(){
    showTodoenretard("all", new Date()) ;  
    document.querySelector('span.active').classList.remove("active");
    all.classList.add("active");                                           
  })
  const showTodoenretard = (filter, currentDate) =>{
    let li = '';
    if(todos){
        todos.forEach((todo, id) => {
            // if todo status is completed, set the isCompleted value to checked 
            let isCompleted = todo.status == "completed" ? "checked" : "";
            let dueDate = new Date(todo.dueDate);
            if(isCompleted==""){
            if(filter == todo.status || filter == "all"){
                if(dueDate.getDate() < currentDate.getDate()&&
                  dueDate.getMonth() <= currentDate.getMonth() &&
                  dueDate.getFullYear() <= currentDate.getFullYear()) {
                    li += `
                        <li class="todo">
                            <label for=${id}>
                                <input type="checkbox" onclick="updateStatus(this)" id="${id}"  ${isCompleted}>
                                <p class="${isCompleted}">${todo.name}</p>
                                <span class="due-date" style="font-weight: 600;">Due: ${todo.dueDate}</span>
                            </label>
                            <button type="button" onclick='deleteTask(${id})' class="btn delete-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                        <button type="button" onclick="editTask(${id})" class="btn edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M14.854.146a.5.5 0 0 1 0 .708l-2.646 2.646a.5.5 0 0 1-.708 0L3.793 7.854a1.5 1.5 0 0 0-.354.535l-1.19 3.968a1.5 1.5 0 0 0 1.853 1.853l3.968-1.19a1.5 1.5 0 0 0 .535-.354l4.5-4.5a.5.5 0 0 1 0-.708l2.646-2.646a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5zM4.5 9l-1 3 3-1 6.5-6.5-2 2L4.5 9z"/>
                <path fill-rule="evenodd" d="M12.854 2.146a1 1 0 0 1 1.415 0l.5.5a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.246-1.246l1-3a1 1 0 0 1 .242-.39l9-9zM13.354 3.354l-9 9-1.207-.707 9-9 1.207.707z"/>
            </svg>
        </button>
        <button id="important-tasks-btn" class="btn important-task" onclick="updateImportance(${id})">
<svg id="important-tasks-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg>
</button>

        
                      
        
                    </li>
                    `;
                  }
                }
            }
            });
            
            }
            list.innerHTML = li || "<span class='any-text'>You don't have any task here</span>";
            
            // let checkTask = list.querySelectorAll('.todo');
            // !checkTask.length ? clearBtn.classList.remove('active') : clearBtn.classList.add('active');
            
            list.offsetHeight >=250 ? list.classList.add('overflow') : list.classList.remove('overflow');
        }
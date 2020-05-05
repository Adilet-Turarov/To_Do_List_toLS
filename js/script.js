let addBtn = document.querySelector('#btn');
let inputTask = document.querySelector('#inp');
let addedTasks = document.querySelector('#newTask');
let completedTasks = document.querySelector('#completed')

function createNewElement(task, completed){
    let id = Date.now();
    let item = document.createElement('li');
    let checkbox = document.createElement('button')

    if(completed){
        checkbox.className = "material-icons checkbox"
        checkbox.innerHTML = '<i class="material-icons">check_box</i>'
    } else{
        checkbox.className = "material-icons checkbox"
        checkbox.innerHTML = '<i class="material-icons">check_box_outline_blank</i>'
    }

    let label = document.createElement('label');
    label.className = `item-${id}`;
    label.innerText = task;

    let input = document.createElement('input');
    input.type = "text";

    let editBtn = document.createElement('button');
    editBtn.className = "material-icons edit";
    editBtn.innerHTML = '<i class="material-icons">edit</i>';

    let deleteBtn = document.createElement('button');
    deleteBtn.className = "material-icons delete";
    deleteBtn.innerHTML = '<i class="material-icons">delete</i>';

    item.appendChild(checkbox)
    item.appendChild(label)
    item.appendChild(input)
    item.appendChild(deleteBtn)
    item.appendChild(editBtn)
    
    return item
}
addBtn.addEventListener('click', function(){
    if(inputTask.value){
        let item = createNewElement(inputTask.value, false);
        addedTasks.appendChild(item)
        bindTaskEvent(item, completed)
        inputTask.value = " ";
    }else {
        alert('Заполните Поле!')
    }
    setToLocalStorage();
})
function editTasks(){
    let editBtn = this;
    let item = this.parentNode;
    let label = item.querySelector('label');
    let input = item.querySelector('input[type=text]');

    let editClass = item.classList.contains('editMode')
    if(editClass){
        label.innerText = input.value;
        editBtn.className = "material-icons edit"
        editBtn.innerHTML = '<i class="material-icons">edit</i>';

    } else{
        input.value = label.innerText;
        editBtn.className = "material-icons save";
        editBtn.innerHTML = "<i class='material-icons'>save</i>"
    }
    item.classList.toggle('editMode')
    setToLocalStorage()
}

function deleteTask(){
    let item = this.parentNode;
    let ul = item.parentNode;
    ul.removeChild(item)
    setToLocalStorage()
}

function completed(){
    let item = this.parentNode;
    let checkbox = item.querySelector('button.checkbox');
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = "<i class='material-icons'>check_box</i>"
    completedTasks.appendChild(item);
    bindTaskEvent(item, addedTask)
    setToLocalStorage();
}

function addedTask(){
    let item = this.parentNode;
    let checkbox = item.querySelector('button.checkbox');
    checkbox.className = "material-icons checkbox";
    checkbox.innerHTML = '<i class="material-icons">check_box_outline_blank</i>';

    addedTasks.appendChild(item);
    bindTaskEvent(item, completed)
}

function bindTaskEvent(item, checkboxEvent){
    let checkbox = item.querySelector('button.checkbox');
    let editBtn = item.querySelector('button.edit');
    let deleteBtn = item.querySelector('button.delete')

    checkbox.addEventListener('click', checkboxEvent);
    editBtn.addEventListener('click', editTasks)
    deleteBtn.addEventListener('click', deleteTask)
}

function setToLocalStorage(){
    let addedTaskArr = [];
    let completedTaskArr = [];
    for(let i=0; i<addedTasks.children.length; i++){
        addedTaskArr.push(addedTasks.children[i].querySelectorAll('label')[0].innerText)
    }
    localStorage.removeItem('task');
    for(let i=0; i<completedTasks.children.length; i++){
        completedTaskArr.push(completedTasks.children[i].querySelectorAll('label')[0].innerText)
    }
    localStorage.setItem('task', JSON.stringify({addedTasks:addedTaskArr, completedTasks:completedTaskArr}))
}

function getInLocalStorage (){
    return JSON.parse(localStorage.getItem('task'))
}

let elem = getInLocalStorage();
for(let i=0; i<elem.addedTasks.length; i++){
    let item = createNewElement(elem.addedTasks[i], false);
    addedTasks.appendChild(item);
    bindTaskEvent(item, completed)
}

for(let i=0; i<elem.completedTasks.length; i++){
    let item = createNewElement(elem.completedTasks[i], true);
    completedTasks.appendChild(item)
    bindTaskEvent(item, addedTask)
}
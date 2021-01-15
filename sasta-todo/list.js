const tasksHolder = document.querySelector('ul.tasks');
const add = document.querySelector('form.add');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const controller = document.querySelector('.control')

function addItem(e){
    e.preventDefault();
    const text = this.querySelector('input[type=text').value;
    if(!text) return;
    const item = {
        text,
        done: false
    }
    tasks.push(item);
    this.reset();
    addToList(tasks, tasksHolder);
}

function addToList(tasks, element){
    element.innerHTML = tasks.reduce((html, task, idx)=>html+`<label><input data-index=${idx} type="checkbox" ${task.done?'checked':''}><span>${task.text}</span></label>`, '');
}

function checkTheBox(e){
    if(!e.target.matches('input')) return;

    const idx = e.target.dataset.index;
    tasks[idx].done = !tasks[idx].done;
}


add.addEventListener('submit', addItem);

window.onload = ()=>{
    addToList(tasks, tasksHolder);
    [...add.elements].forEach(input=>input.removeAttribute('disabled'));
    document.body.classList.add('loaded');
    add.querySelector('input:first-of-type').focus()
}
tasksHolder.addEventListener('click', checkTheBox);
window.onbeforeunload = _=>{
    if(tasks.length>0) localStorage.setItem('tasks', JSON.stringify(tasks))
}

// External buttons
controller.querySelector('[name=check]').addEventListener('click', _=>{
    tasks.forEach(task=>{task.done=true});
    addToList(tasks, tasksHolder);
})

controller.querySelector('[name=uncheck]').addEventListener('click', _=>{
    tasks.forEach(task=>{task.done=false});
    addToList(tasks, tasksHolder);
})

controller.querySelector('[name=clear]').addEventListener('click', _=>{
    tasks = [];
    tasksHolder.innerHTML = '';
    localStorage.removeItem('tasks');
})

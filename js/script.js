let theme = document.getElementById('theme'),
    newItemInp = document.getElementById('addItem'),
    todoList = document.querySelector('.content ul'),
    itemsLeft = document.querySelector('.items-left span');

itemsLeft.innerText = document.querySelectorAll('.list-item input[type="chechbox"]').length;
theme.addEventListener('click',() => {
    document.querySelector('body').classList = [theme.checked ? 'theme-light' : 'theme-dark'];
})


let todos;
function local() {
    todos = todoList.innerHTML;
    localStorage.setItem('todos', todos);
}

newItemInp.addEventListener('keypress', (e) => {
    if(e.charCode === 13 && newItemInp.value.length > 0){
        createNewItems(newItemInp.value)
        newItemInp.value = '';
        local()
    }
})

function createNewItems(text) {
    let elem = document.createElement('li')
    elem.classList.add('flex-row')
    elem.innerHTML = `
    <label class="list-item">
    <input type="checkbox" name="todoItem">
    <span class="checkmark"></span>
    <span class="text">${text}</span>
  </label>
  <span class="remove"></span>
    `
    if (document.querySelector('.filter input[type="radio"]:checked').id === 'completed') {
        elem.classList.add('hidden')
    }
    todoList.append(elem)
    //function
    check(1)
}


function check(elemet) {
    let number = 0;
    for(let item of todoList.querySelectorAll('li')){
        if(item.querySelector('.text')){
            number++
        }
    }
    document.querySelector('.items-left span').innerText = number;
}
check()

function removeItem(params) {
    params.remove()    
    check(-1)
}

todoList.addEventListener('click', (elem) => {
    if(elem.target.classList.contains('remove')){
        removeItem(elem.target.parentElement)
        local()
    }
})

document.querySelector('.clear').addEventListener('click', () => {
    document.querySelectorAll('.list-item input[type="checkbox"]:checked').forEach(item => {
        removeItem(item.closest('li'))
    })
})

document.querySelectorAll('.filter input').forEach(radio => {
    radio.addEventListener('click', (e) => {
        filterTodo(e.target.id)
    })
})

function filterTodo(id){
    const allItems = todoList.querySelectorAll('li')
    switch (id) {
        case 'all':
            allItems.forEach(item => {
                item.classList.remove('hidden')
            })
            break;
            case 'active':
                allItems.forEach(item => {
                    if(item.querySelector('input').checked){
                        item.classList.add('hidden')
                    }else{
                        item.classList.remove('hidden')
                    }
                })
            break;
        default:
            allItems.forEach(item => {
                if(!item.querySelector('input').checked){
                    item.classList.add('hidden')
                }else{
                    item.classList.remove('hidden')
                }
            })
            break;
    }
}

if(localStorage.getItem('todos')){
    todoList.innerHTML = localStorage.getItem('todos');
}
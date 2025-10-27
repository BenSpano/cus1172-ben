var add  = document.getElementById("addToDo")
var input = document.getElementById('inputField');
var toDoContainer = document.getElementById("toDoContainer")
var taskForm= document.getElementById('taskForm');
var prioritySelect = document.getElementById("prioritySelect")

function getSelectedStatus(){
  var radios = document.getElementsByName('statusRadio')
  for (var i=0; i<radios.length; i++){
    if (radios[i].checked) return radios[i].value
  }
  return 'pending'
}

var tasks = []

add.addEventListener('click', addItem)
input.addEventListener('keypress', function(e){
  if (e.key == "Enter"){
    addItem()
  }
})
taskForm.addEventListener('submit', function(e){
  e.preventDefault()
  addItem()
})

function addItem(e){
  const title = (input.value || '').trim()
  if (title.length === 0) {
    return
  }

  const priority = prioritySelect.value
  const statusVal = getSelectedStatus()

  const taskObj = {
    id: Date.now(),
    title: title,
    priority: priority,
    status: statusVal
  }
  tasks.push(taskObj)

  const li = document.createElement('li')
  li.dataset.id = String(taskObj.id)

  const item = document.createElement('div')
  item.classList.add('item')

  const item_content = document.createElement("div")
  item_content.classList.add('content')
  item.appendChild(item_content)

  const input_item = document.createElement('input')
  input_item.classList.add('text')
  input_item.type = "text"
  input_item.value = title
  input_item.setAttribute('readonly','readonly')
  input_item.addEventListener('dblclick', function (){
    input_item.style.textDecoration = 'line-through'
  })
  item_content.appendChild(input_item)

  var meta = document.createElement('small')
  meta.className = 'text-muted'
  meta.style.display = 'block'
  meta.textContent = priority.charAt(0).toUpperCase() + priority.slice(1) +
                     ' Priority, ' + (statusVal === 'completed' ? 'Completed' : 'Task Pending') 
  item_content.appendChild(meta)

  const item_action = document.createElement('div')
  item_action.classList.add('actions')

  const edit_item = document.createElement('button')
  edit_item.classList.add('edit','btn','btn-success')
  edit_item.type = 'button'
  edit_item.innerText = "Edit"

  const delete_item = document.createElement('button')
  delete_item.classList.add('delete','btn','btn-danger')
  delete_item.innerText = 'Delete'

  const complete_item = document.createElement('button')
  complete_item.classList.add('complete','btn','btn-warning','text-white')
  complete_item.type = 'button'
  complete_item.innerText = "Complete"

  item_action.appendChild(edit_item)
  item_action.appendChild(complete_item)
  item_action.appendChild(delete_item)

  item.appendChild(item_action)
  li.appendChild(item)
  toDoContainer.appendChild(li)
  input.value = ''
  

  edit_item.addEventListener('click', function (){
    if (edit_item.innerText.toLowerCase() == 'edit'){
      edit_item.innerText = 'Save'
      input_item.removeAttribute('readonly')
      input_item.focus()
    } else {
      edit_item.innerText = "Edit"
      input_item.setAttribute('readonly','readonly')
      var id = Number(li.dataset.id)
      var idx = tasks.findIndex(function(t){ return t.id === id })
      if (idx > -1){ tasks[idx].title = input_item.value }
    }
  })

  delete_item.addEventListener('click', function (){
    var id = Number(li.dataset.id)
    tasks = tasks.filter(function(t){ return t.id !== id })
    toDoContainer.removeChild(li)
  })


  complete_item.addEventListener('click', function (){
    input_item.style.textDecoration = 'line-through'
    var id = Number(li.dataset.id)
    var idx = tasks.findIndex(function(t){ return t.id === id })
    if (idx > -1){ tasks[idx].status = 'completed' }
    meta.textContent = priority.charAt(0).toUpperCase() + priority.slice(1) +
                       ' Priority, ' + (statusVal === 'completed' ? 'Completed' : 'Task Completed') 
  })

  if (statusVal === 'completed'){
    input_item.style.textDecoration = 'line-through'
  }
}

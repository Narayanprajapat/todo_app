// getting all required elements
const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deleteAllBtn = document.querySelector('.footer button');

// onkeyup event
inputBox.onkeyup = () => {
	let userEnteredValue = inputBox.value; //getting user entered value
	if (userEnteredValue.trim() != 0) {
		addBtn.classList.add('active'); //active the add button
	} else {
		addBtn.classList.remove('active'); //unactive the add button
	}
};

showTasks(); //calling showTask function


addBtn.onclick = () => {
	let todoValue = inputBox.value; //getting input field value
	const body = {
	    "text": todoValue
	}
	var xhttp = new XMLHttpRequest();
    xhttp.open('POST','/api/v1/create',true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(body));
    xhttp.onload = function(){
        if(xhttp.readyState === xhttp.DONE){
            var resp = JSON.parse(this.responseText);
            if(xhttp.status == 201){
                console.log(resp);
                showTasks(); //calling showTask function
	            addBtn.classList.remove('active'); //unactive the add button once the task added
            }else if(xhttp.status == 400){
                console.log(resp)
            }
        }
    }
};

function showTasks() {
	var xhttp = new XMLHttpRequest();
    xhttp.open('POST','/api/v1/get_todo',true);
    xhttp.send();
    xhttp.onload = function(){
        if(xhttp.readyState === xhttp.DONE){
            if(xhttp.status == 200){
                var resp = JSON.parse(this.responseText);
                console.log(resp)
                const listArray = resp['data'];
                const pendingTasksNumb = document.querySelector('.pendingTasks');
                pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
                if (listArray.length > 0) {
                    deleteAllBtn.classList.add('active'); //active the delete button
                } else {
                    deleteAllBtn.classList.remove('active'); //unactive the delete button
                }
                let newLiTag = '';
                listArray.forEach((element, index) => {
                    let todo_id = element['todo_id']
                    newLiTag += `
                    <li id=show_${todo_id}>
                        ${element['text']}
                        <span class="deleteIcon" onclick="deleteTask('${todo_id}')">
                            <i class="fas fa-trash"></i>
                        </span>
                        <span class="updateIcon" onclick="updateTask('${todo_id}')">
                            <i class="fas fa-pen"></i>
                        </span>
                    </li>
                    <li class="hide" id=hide_${todo_id}>
                        <div class="updateInputField">
                            <input type="text" placeholder="Add your new todo" value=${element['text']} id=value_${todo_id} />
                            <button onclick="update('${todo_id}')" id=><i class="fas fa-plus"></i></button>
                        </div>
                    </li>`;
                });
                todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
                inputBox.value = ''; //once task added leave the input field blank
            }else if(xhttp.status == 400){
                    console.log(resp)
                }
            }
        }
}

// delete task function
function deleteTask(todo_id) {
    const body = {
        "todo_id": todo_id
    }
	var xhttp = new XMLHttpRequest();
    xhttp.open('POST','/api/v1/delete',true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(body));
    xhttp.onload = function(){
        if(xhttp.readyState === xhttp.DONE){
            if(xhttp.status == 201){
                var resp = JSON.parse(this.responseText);
                console.log(resp)
	            showTasks(); //call the showTasks function
            }
        }
    }
}

// delete all tasks function
deleteAllBtn.onclick = () => {
	var xhttp = new XMLHttpRequest();
    xhttp.open('POST','/api/v1/delete-all',true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
    xhttp.onload = function(){
        if(xhttp.readyState === xhttp.DONE){
            if(xhttp.status == 201){
                var resp = JSON.parse(this.responseText);
                console.log(resp)
	            showTasks(); //call the showTasks function
            }
        }
    }
};


function updateTask(todo_id){
    document.getElementById(("show_"+todo_id)).classList.add('hide')
    document.getElementById(("hide_"+todo_id)).classList.remove('hide')
}

function update(todo_id){
    const updateInputId = "value_"+todo_id
    const value = document.getElementById(("value_"+todo_id)).value
    const body = {
        "todo_id": todo_id,
        "text": value
    }
	var xhttp = new XMLHttpRequest();
    xhttp.open('POST','/api/v1/update',true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(body));
    xhttp.onload = function(){
        if(xhttp.readyState === xhttp.DONE){
            if(xhttp.status == 201){
                var resp = JSON.parse(this.responseText);
                console.log(resp)
	            showTasks(); //call the showTasks function
            }
        }
    }
}

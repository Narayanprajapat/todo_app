// getting all required elements
const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deleteAllBtn = document.querySelector('.footer button');

// onkeyup event
inputBox.onkeyup = () => {
	let userEnteredValue = inputBox.value; //getting user entered value
	if (userEnteredValue.trim() != 0) {
		//if the user value isn't only spaces
		addBtn.classList.add('active'); //active the add button
	} else {
		addBtn.classList.remove('active'); //unactive the add button
	}
};

showTasks(); //calling showTask function

addBtn.onclick = () => {
	//when user click on plus icon button
	let userEnteredValue = inputBox.value; //getting input field value
	let getLocalStorageData = localStorage.getItem('New Todo'); //getting localstorage
	if (getLocalStorageData == null) {
		//if localstorage has no data
		listArray = []; //create a blank array
	} else {
		listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
	}
	listArray.push(userEnteredValue); //pushing or adding new value in array
	localStorage.setItem('New Todo', JSON.stringify(listArray)); //transforming js object into a json string
	showTasks(); //calling showTask function
	addBtn.classList.remove('active'); //unactive the add button once the task added
};

function showTasks() {
	let getLocalStorageData = localStorage.getItem('New Todo');
	if (getLocalStorageData == null) {
		listArray = [];
	} else {
		listArray = JSON.parse(getLocalStorageData);
	}
	const pendingTasksNumb = document.querySelector('.pendingTasks');
	pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
	if (listArray.length > 0) {
		//if array length is greater than 0
		deleteAllBtn.classList.add('active'); //active the delete button
	} else {
		deleteAllBtn.classList.remove('active'); //unactive the delete button
	}
	let newLiTag = '';
	listArray.forEach((element, index) => {
		newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
	});
	todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
	inputBox.value = ''; //once task added leave the input field blank
}

// delete task function
function deleteTask(index) {
	let getLocalStorageData = localStorage.getItem('New Todo');
	listArray = JSON.parse(getLocalStorageData);
	listArray.splice(index, 1); //delete or remove the li
	localStorage.setItem('New Todo', JSON.stringify(listArray));
	showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = () => {
	listArray = []; //empty the array
	localStorage.setItem('New Todo', JSON.stringify(listArray)); //set the item in localstorage
	showTasks(); //call the showTasks function
};


//var xhttp = new XMLHttpRequest();
//    xhttp.open('POST','/x_perience_setup_brand_solution',true);
//    xhttp.send(form);
//    xhttp.onprogress = function(){
//        bs_progress_btn.classList.add('d-none')
//        bs_connect_btn.classList.remove('d-none')
//    }
//    xhttp.onload = function(){
//        if(xhttp.readyState === xhttp.DONE){
//            if(xhttp.status == 200){
//                var resp = JSON.parse(this.responseText);
//                console.log(resp);
//                window.location.reload();
//            }else if(xhttp.status == 400){
//                var label_selection = document.getElementById('label_selection');
//                label_selection.classList.remove('position')
//                label_selection.classList.remove('d-none');
//                label_selection.innerHTML = 'Already Uploaded Brand Solution Data'
//                label_selection.style.backgroundColor = '#ffc107'
//                setTimeout(function(){
//                    label_selection.classList.add('d-none');
//                },3000)
//            }
//        }
//    }
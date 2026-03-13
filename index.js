let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const savedTasks = localStorage.getItem('tasks'); // есть ли сохраненные задачи в лок. хранилище

	if (savedTasks) {
		return JSON.parse(savedTasks); // есть - возвращаем, преобразуя в массив из JSON
	} else{
		return items; // возвращаем массив задач 

	}
}

function updateTasksAndSave(){
	const items = getTasksFromDOM();
	saveTasks(items);
}


function createItem(item) {

	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  	const textElement = clone.querySelector(".to-do__item-text");
  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item; // текст задачи 

	// обработчик для кнопки удаления 
	deleteButton.addEventListener('click', function() {
		clone.remove();
		updateTasksAndSave();
	});

	// обработчик для кнопки копирования 
	duplicateButton.addEventListener('click', function(){
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);

		listElement.prepend(newItem);
		updateTasksAndSave();

	});

	// обработчик для кнопки редактирования 
	editButton.addEventListener('click', function(){
		textElement.setAttribute('contenteditable', 'true');

		textElement.focus();
	});

	// обработчик 2 для кнопки редактирования 
	textElement.addEventListener('blur', function(){
		textElement.setAttribute('contenteditable', 'false');
		updateTasksAndSave();
	});

	return clone; // возвращаем готовую разметку элемента 
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text"); // находим все элементы и сохраняем в itemsNamesElements
	
	const tasks = [];

	// проходим по каждому элементу и добавляем его текст в массив
	itemsNamesElements.forEach(element => {
		tasks.push(element.textContent);
	});

	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks)); // сохраняем массив задач в лок. хранилище
}



items = loadTasks(); // переопределили 

// Проходиммся по массиву items и добавляем задачу в список 
items.forEach(item => {
	const taskElement = createItem(item); // создаем готовую разметку элемента 
	listElement.append(taskElement); // и добавляем в контейнер 
});


formElement.addEventListener('submit', function(event) {
	event.preventDefault(); // отключаем перезагрузку 

	const taskText = inputElement.value.trim(); // получаем текст задачи из поля ввода

	// проверяем пустое ли поле
	if (taskText) {
		const taskElement = createItem(taskText);
		listElement.prepend(taskElement);

		updateTasksAndSave();
		
		inputElement.value = ''; // очищаем поле ввода
	}
});
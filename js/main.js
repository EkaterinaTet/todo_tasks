//Добавление задач в список дел
//Находим элементы на стр
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

//создадим массив,который будет содержать в себе все задачи
let tasks = [];

//проверяем,если в localstorage есть какие-то данные, то мы их оттуда запишем в этот массив
//проверяем,получили ли мы что то из localstorage
if (localStorage.getItem("tasks")) {
  // console.log(localStorage.getItem("tasks"));
  // console.log(JSON.parse(localStorage.getItem("tasks")));
  tasks = JSON.parse(localStorage.getItem("tasks")); //уже не пустой массив, а массив с данными
  //отображаем их на странице(проходимся по массиву и для каждого элемента,который лежит в нем (задача). отобразить это все)
  tasks.forEach(function (task) {
    renderTask(task);
  });
}

checkEmptyList();

//вешаем прослушку на форму (когда эта форма будет отправляться(на кнопку добавить, либо ентер))
form.addEventListener("submit", addTask); //ф-ция будет запущена после submit(отправления)
//удаление задачи из списка(когда будет щелчок по tasksList(всему списку),будем смотреть где именно он произошел,тк изначально этой кнопки нет)
tasksList.addEventListener("click", deleteTask);
//Отмечаем задачу завершенной
tasksList.addEventListener("click", doneTask);

/*проверим,хранится ли что то в localStorage по ключу tasksHTML
 if (localStorage.getItem("tasksHTML")) {
   tasksList.innerHTML = localStorage.getItem("tasksHTML");
 }*/

//функции
function addTask(event) {
  //ф-цию можно вызывать до того, как она объявлена в коде (тк фанкшн декларейшн)
  event.preventDefault(); //отменяем стандартное действие формы(когда она что то отправляет происходит перезагрузка стр)-это нам не надо

  const taskText = taskInput.value; //достаем текст задачи из поля ввода

  //описываем задачу в виде объекта
  const newTask = {
    id: Date.now(), //время в милисек.
    text: taskText,
    done: false,
  };

  //добавляем задачу в массив с задачами
  tasks.push(newTask);

  saveToLocalStorage(); //сохраняем список задач в хранилище браузера localStorage

  renderTask(newTask); //рендерим задачу на стр

  //Очищаем поле ввода и возвращаем на него фокус
  taskInput.value = ""; //равно пустой строке
  taskInput.focus(); //можем продолжать писать в инпут

  // saveHTMLtoLS();

  checkEmptyList();
}

function deleteTask(event) {
  //проверяем,если клик был НЕ по кнопке удалить задачу
  if (event.target.dataset.action !== "delete") {
    return;
  }

  //проверяем чтобы клик был по кнопке data-action="delete"
  const parentNode = event.target.closest(".list-group-item"); //ищет родителя этой кнопки (li)

  //определяем id задачи
  const id = Number(parentNode.id); //переводим строки в тип число

  //Находим индекс задачи в массиве
  const index = tasks.findIndex(function (task) {
    if (task.id === id) {
      return true;
    } //либо return task.id === id; (без if)
  });

  //удалим задачу из массива с задачами
  tasks.splice(index, 1);

  saveToLocalStorage(); //сохраняем список задач в хранилище браузера localStorage

  parentNode.remove(); //удаляем задачу из разметки

  // saveHTMLtoLS();

  checkEmptyList();
}

function doneTask(event) {
  //проверяем что клик был НЕ по кнопке "done"
  if (event.target.dataset.action !== "done") {
    return;
  }

  const parentNode = event.target.closest(".list-group-item");

  //определяем айди задачи
  const id = parentNode.id;

  const task = tasks.find(function (task) {
    if (task.id == id) {
      //делаем не строгое сравнение, тк тип parentNode.id - строка
      return true;
    }
  });
  task.done = !task.done;

  saveToLocalStorage(); //сохраняем список задач в хранилище браузера localStorage

  const taskTitle = parentNode.querySelector(".task__title"); //ищем спан
  taskTitle.classList.toggle("task__title--done"); //добавляем к спану нужный класс.(toggle-если есть галочка,то добавится (зачеркнуто),если еще раз нажать на галочку,то уберется(черта))

  // saveHTMLtoLS();
}

/*ф-ция будет сохранять разметку нашего списка в localStorage (сохранение задач при обновлении стр)
function saveHTMLtoLS() {
  localStorage.setItem("tasksHTML", tasksList.innerHTML); //innerHTML-возвращает весь html, который находится в данном элементе
}*/

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
<img src="./img/icon.svg" alt="Empty" width="65" class="img-icon" />
<div class="empty-list__title">Список дел пуст</div>
</li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }
  if (tasks.length > 0) {
    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks)); //каждый раз вывызая эту ф-цию будет происходить сохранение массива tasks в localstorage
}

function renderTask(task) {
  //формируем css класс
  const cssClass = task.done ? "task__title task__title--done" : "task__title";
  //формируем разметку для новой задачи
  const taskHTML = `
 <li id="${task.id}" class="list-group-item list-group-item__two">
 <span class="${cssClass}">${task.text}</span>
 <div class="task-item__buttons">
   <button type="button" data-action="done" class="btn-action">
     <img class="img__icon" src="img/tick.svg" alt="tick" />
   </button>
   <button type="button" data-action="delete" class="btn-action">
     <img class="img__icon" src="img/cross.svg" alt="cross" />
   </button>
 </div>
 </li>`;
  //Добавляем задачу на страницу
  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}

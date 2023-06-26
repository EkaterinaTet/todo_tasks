//Добавление задач в список дел
//Находим элементы на стр
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");
//вешаем прослушку на форму (когда эта форма будет отправляться(на кнопку добавить, либо ентер))
form.addEventListener("submit", addTask); //ф-ция будет запущена после submit(отправления)

//удаление задачи из списка(когда будет щелчок по tasksList(всему списку),будем смотреть где именно он произошел,тк изначально этой кнопки нет)
tasksList.addEventListener("click", deleteTask);

//Отмечаем задачу завершенной
tasksList.addEventListener("click", doneTask);

function addTask(event) {
  //ф-цию можно вызывать до того, как она объявлена в коде (тк фанкшн декларейшн)
  event.preventDefault(); //отменяем стандартное действие формы(когда она что то отправляет происходит перезагрузка стр)-это нам не надо

  const taskText = taskInput.value; //достаем текст задачи из поля ввода

  const taskHTML = `
<li class="list-group-item list-group-item__two">
<span class="task__title">${taskText}</span>
<div class="task-item__buttons">
  <button type="button" data-action="done" class="btn-action">
    <img class="img__icon" src="img/tick.svg" alt="tick" />
  </button>
  <button type="button" data-action="delete" class="btn-action">
    <img class="img__icon" src="img/cross.svg" alt="cross" />
  </button>
</div>
</li>`; //Формируем разметку для новой задачи
  //Добавляем задачу на страницу
  tasksList.insertAdjacentHTML("beforeend", taskHTML);
  //Очищаем поле ввода и возвращаем на него фокус
  taskInput.value = ""; //равно пустой строке
  taskInput.focus(); //можем продолжать писать в инпут
  //проверяем есть ли какие то задачи в списке, если есть, то удалить (Список дел пуст)
  if (tasksList.children.length > 1) {
    emptyList.classList.add("none"); //скрываем
  }
}

function deleteTask(event) {
  //проверяем,если клик был НЕ по кнопке удалить задачу
  if (event.target.dataset.action !== "delete") {
    return;
  }

  //проверяем чтобы клик был по кнопке data-action="delete"
  const parentNode = event.target.closest(".list-group-item"); //ищет родителя этой кнопки (li)
  parentNode.remove(); //удаляем задачу

  //проверяем есть ли в списке задач более 1-го элемента,показываем блок Список дел пуст
  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none"); //скрываем
  }
}

function doneTask(event) {
  //проверяем что клик был НЕ по кнопке "done"
  if (event.target.dataset.action !== "done") {
    return;
  }

  const parentNode = event.target.closest(".list-group-item");
  const taskTitle = parentNode.querySelector(".task__title"); //ищем спан
  taskTitle.classList.toggle("task__title--done"); //добавляем к спану нужный класс.(toggle-если есть галочка,то добавится (зачеркнуто),если еще раз нажать на галочку,то уберется(черта))
}

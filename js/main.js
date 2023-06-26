//Добавление задач в список дел
//Находим элементы на стр
const form = document.querySelector("#form");
const input = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");
//вешаем прослушку на форму (когда эта форма будет отправляться(на кнопкук добавить, либо ентер))
form.addEventListener("submit", function (event) {
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
    emptyList.classList.add("none");
  }
});

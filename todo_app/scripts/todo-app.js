(function () {
  // создаём массив дел
  let todos = [];
  // ключ к localStorage
  let key;

  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.textContent = title;
    return appTitle;
  }

  // создаем и возвращаем форму для создания дела
  function createTodoItemform() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    // устанавливаем стили для формы и его элементов
    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";
    button.disabled = true;

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  // создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoItem(name) {
    let item = document.createElement("li");

    let text = document.createElement("p");
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    let id = todos.length + 1;
    let done = false;

    /* 
    устанавливаем стили для элемента списка, а также для размещения
    кнопок в его правой части с помощью flex
    */
    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "gap-3",
      "text-break"
    );

    text.classList.add("m-0");
    text.textContent = name;

    // устанавливаем стили для кнопок
    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success", "text-nowrap");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger", "text-nowrap");
    deleteButton.textContent = "Удалить";

    // вкладываем кнопки в отдельный элемент, чтобы они объеденились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(text);
    item.append(buttonGroup);

    // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return {
      item,
      id,
      done,
      text,
      doneButton,
      deleteButton,
    };
  }

  // функция для отслеживания состояния input
  function inputListener(input, button) {
    input.addEventListener("input", function () {
      button.disabled = false;

      if (input.value === "") {
        button.disabled = true;
      }
    });
  }

  // сохраняем список дел
  function setTodos() {
    localStorage.setItem(key, JSON.stringify(todos));
  }

  // получаем список дел
  function getTodos(list) {
    let savedTodos = JSON.parse(localStorage.getItem(key));

    if (savedTodos != null) {
      for (let i = 0; i < savedTodos.length; ++i) {
        let todoItem = createTodoItem(savedTodos[i].name);
        todoItem.id = savedTodos[i].id;
        todoItem.done = savedTodos[i].done;
        if (todoItem.done) {
          todoItem.item.classList.toggle("list-group-item-success");
        }
        list.append(todoItem.item);
        const newTodo = {
          id: todoItem.id,
          name: todoItem.text.textContent,
          done: todoItem.done,
        };
        todos.push(newTodo);

        doneButtonClick(todoItem);
        deleteButtonClick(todoItem);
      }
    }
  }

  function formSubmit(itemForm, todoList) {
    // браузер создаёт событие submit на форме по нажатию на Enter или на кнопку создания дела
    itemForm.form.addEventListener("submit", function (e) {
      /*
        эта строка необходима, чтобы предотвратить стандартные действия браузера
        в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
      */
      e.preventDefault();

      // игнорируем создание элемента, если пользователь ничего не ввёл в поле
      if (!itemForm.input.value) {
        return;
      }

      itemForm.button.disabled = true;

      let todoItem = createTodoItem(itemForm.input.value);
      const newTodo = {
        id: todoItem.id,
        name: todoItem.text.textContent,
        done: todoItem.done,
      };

      todos.push(newTodo);

      // создаём и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItem.item);

      setTodos();

      // обнуляем значение в поле, чтобы не пришлось стирать его в ручную
      itemForm.input.value = "";

      doneButtonClick(todoItem);
      deleteButtonClick(todoItem);
    });
  }

  // добавляем обработчик события на кнопку
  function doneButtonClick(todoItem) {
    todoItem.doneButton.addEventListener("click", function () {
      todoItem.item.classList.toggle("list-group-item-success");
      todoItem.done = !todoItem.done;

      for (let i = 0; i < todos.length; ++i) {
        if (todos[i].id === todoItem.id) {
          todos[i].done = todoItem.done;
        }
      }
      setTodos();
    });
  }

  // добавляем обработчик события на кнопку
  function deleteButtonClick(todoItem) {
    todoItem.deleteButton.addEventListener("click", function () {
      if (confirm("Вы уверены?")) {
        for (let i = 0; i < todos.length; ++i) {
          if (todos[i].id === todoItem.id) {
            todos.splice(i, 1);
          }
        }
        setTodos();
        //console.log(todos);
        todoItem.item.remove();
      }
    });
  }

  // создаём приложение
  function createTodoApp(containerName, title = "Список дел", saveKey) {
    key = saveKey;

    let container = document.getElementById(containerName);

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemform();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    getTodos(todoList);

    inputListener(todoItemForm.input, todoItemForm.button);
    formSubmit(todoItemForm, todoList);
  }
  window.createTodoApp = createTodoApp;
})();

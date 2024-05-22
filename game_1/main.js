const DEFAULT_AMOUNT = 4;

let numbers = [];
let matchedCards = [];
let firstCard = null;
let secondCard = null;
let didWin = false;

(() => {
  // создаём заголовок
  function createGameTitle(title) {
    const gameTitle = document.createElement("h2");
    gameTitle.textContent = title;
    return gameTitle;
  }

  // создаем и возвращаем форму для создания дела
  function createGameForm() {
    const form = document.createElement("form");
    const input = document.createElement("input");
    const buttonWrapper = document.createElement("div");
    const button = document.createElement("button");

    // устанавливаем стили для формы и его элементов
    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите количество карточек";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Начать игру";

    buttonWrapper.append(button);
    form.append(input, buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  // создаём контейнер для карточек
  function createBoard() {
    const board = document.createElement("div");

    board.classList.add("board");

    return board;
  }

  // создаём массив с парными числами
  function createNumbersArray(count) {
    for (let i = 1; i < count + 1; ++i) {
      numbers.push(i, i);
    }
  }

  // перемешиваем массив чисел
  function shuffle(arr) {
    for (let i = 0; i < arr.length; ++i) {
      let j = Math.floor(Math.random() * (i + 1));
      let t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }

    return arr;
  }

  // функция для создания карточек
  function createCard() {
    const card = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("div");

    card.classList.add("card");
    front.classList.add("card__front");
    back.classList.add("card__back");

    card.append(front, back);

    return { card, front };
  }

  // кнопка сыграть еще раз
  function createAgainButton() {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = "Сыграть еще раз";
    // если игрок выиграл кнопка окрашивается в зеленый, иначе в красный
    if (didWin) {
      btn.classList.add("btn-success");
    } else {
      btn.classList.add("btn-danger");
    }
    return btn;
  }

  function formSubmit(gameContainer, itemForm) {
    // отслеживаем нажатие на кнопку начать игру
    itemForm.form.addEventListener("submit", function (e) {
      e.preventDefault();

      // записываем ввод в переменную
      let value = itemForm.input.value;

      if (!value) {
        return;
      }

      // отключаем кнопку
      itemForm.button.disabled = true;

      const board = createBoard();

      // переводим строку в число
      value = Number(value);

      if (value >= 2 && value <= 8) {
        createNumbersArray(value);
      } else {
        alert("Вводите числа от 2 до 8");
        createNumbersArray(DEFAULT_AMOUNT);
      }
      shuffle(numbers);

      for (number of numbers) {
        const cardItem = createCard();
        cardItem.front.textContent = number;
        board.append(cardItem.card);

        cardItem.card.addEventListener("click", () => {
          if (firstCard != null && secondCard != null) {
            if (!matchedCards.includes(firstCard)) {
              firstCard.card.classList.remove("active");
              secondCard.card.classList.remove("active");
            }

            firstCard = null;
            secondCard = null;
          }

          // при нажатии на карточку добавляем класс active
          cardItem.card.classList.add("active");

          if (firstCard === null) {
            firstCard = cardItem;
          } else {
            secondCard = cardItem;
          }

          if (firstCard != null && secondCard != null) {
            const firstNumber = firstCard.front.textContent;
            const secondNumber = secondCard.front.textContent;

            if (firstNumber === secondNumber) {
              matchedCards.push(firstCard, secondCard);
              if (matchedCards.length === numbers.length) {
                setTimeout(() => {
                  alert("Вы выиграли!");
                  didWin = true;
                  const btn = createAgainButton();
                  gameContainer.append(btn);
                  btn.addEventListener("click", () => {
                    numbers = [];
                    matchedCards = [];
                    gameContainer.removeChild(board);
                    gameContainer.removeChild(btn);
                    itemForm.input.value = "";
                    itemForm.button.disabled = false;
                  });
                }, 400);
              }
            }
          }
        });
      }

      gameContainer.append(board);
    });
  }

  function createGame(containerName) {
    const gameContainer = document.getElementById(containerName);
    const gameTitle = createGameTitle("Игра в пары");
    const itemForm = createGameForm();

    gameContainer.append(gameTitle, itemForm.form);
    formSubmit(gameContainer, itemForm);
  }

  window.createGame = createGame;
})();

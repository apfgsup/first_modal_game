// Переменные
let roundsCount = 3;
let score = 0;
let isGameActive = false;

// Элементы
const buttonStart = document.getElementById("buttonStart");
const cells = document.querySelectorAll(".cell");
const scoreDisplay = document.getElementById("score");
const roundsDisplay = document.getElementById("rounds");
const messageDisplay = document.getElementById("message");
const modalWindow = document.getElementById("modalWindow");
const titleDisplay = document.getElementById("title");
//const btn = document.getElementById("myBtn");
//const span = document.getElementsByClassName("close")[0];

// Функции
// Генерация случайного числа
const getRandomInteger = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
};

// Показ клоуна
const showClown = () => {
  hideClown();
  const index = getRandomInteger(0, cells.length - 1);
  cells[index].textContent = "🤡";
};
// Скрытие клоуна
const hideClown = () => {
  cells.forEach((cell) => {
    if (cell.textContent === "🤡") {
      cell.textContent = "";
    }
  });
};
// Начало игры
const startGame = () => {
  isGameActive = true;
  buttonStart.disabled = true;
  messageDisplay.textContent = "";
  showClown();
};

const handleCellClick = (cell) => {
  if (cell.textContent === "🤡") {
    score++;
    roundsCount--;

    if (roundsCount > 0) {
      showClown();
      updateDisplays();
    } else {
      endGame(true);
    }
  } else {
    endGame(false);
  }
};
// Конец игры (результат - победа или поражение)
const endGame = (win) => {
  isGameActive = false;
  buttonStart.disabled = false;
  hideClown();
  score = 0;
  roundsCount = 3;
  updateDisplays();

  if (win) {
    alert("Игра окончена, вы выиграли 👍");
    messageDisplay.textContent =
      'Победа! Нажми на СТАРТ и снова испытай удачу!';
    messageDisplay.style.color = "green";
    titleDisplay.textContent = "Ты МОЛОДЕЦ!";
    titleDisplay.style.color = "green";
  } else {
    alert("Игра окончена, вы проиграли 😱");
    messageDisplay.textContent =
      'Проиграл? Нажми на СТАРТ и попробуй еще!';
    messageDisplay.style.color = "red";
    titleDisplay.textContent = "Попробуй снова!";
    titleDisplay.style.color = "red";
  }
  modalWindow.style.display = "none";
};
// Обновление счетчиков
const updateDisplays = () => {
  scoreDisplay.textContent = `Счёт: ${score}`;
  roundsDisplay.textContent = `Осталось раундов: ${roundsCount}`;
};

// Обработчики
// Клик по кнопке старта
buttonStart.addEventListener("click", startGame);
// Клик по ячейке
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (isGameActive) {
      handleCellClick(cell);
    }
  });
});

buttonStart.onclick = function () {
  modalWindow.style.display = "block";
};
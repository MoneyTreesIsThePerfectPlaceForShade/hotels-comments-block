// достаю нужные элементы
const wrapper = document.querySelector(".wrapper");
const nickname = document.querySelector(".inputNickname");
const comment = document.querySelector(".comment");
const time = document.querySelector(".inputTime");
const btn = document.querySelector(".btn");

const form = document.querySelector(".test");

const commentsArray = [];
// рендерит комментарий
const renderComment = function (name, text, time) {
  const now = new Date();
  const accurateTime = ["0" + now.getHours(), "0" + now.getMinutes()].map(
    (elem) => elem.slice(-2)
  );

  // форматирование во всех случаях, кроме пустой строки и вчерашней даты
  if (time !== "" && now.getDate() !== +time.slice(-2) + 1) {
    time = `${time.slice(-2)}.${time.slice(5, 7)}.${time.slice(0, 4)}`;
  }

  // если дата пустая - ставим текущую
  if (time === "") {
    time = `Сегодня, ${accurateTime.join(":")}`;
  }
  // если дата вчерашняя
  if (now.getDate() === +time.slice(-2) + 1) {
    time = `Вчера, ${accurateTime.join(":")}`;
  }

  const hmtl = `
  <div class="commentRendered">
  <h1>${name}</h1>
  <p>${text}</p>
  <p>${time}</p>
  <button class="like">LIKE</button>
  <button class="delete">DELETE</i></button>
  </div>
  `;
  wrapper.insertAdjacentHTML("beforeend", hmtl);
};

// кнопка, запускающая рендер комментария
btn.addEventListener("click", function (e) {
  e.preventDefault();

  const name = nickname.value;
  const text = comment.value;
  const commentTime = time.value;

  renderComment(name, text, commentTime);
});

// достаю нужные элементы
const body = document.body;
const nickname = document.querySelector(".inputNickname");
const comment = document.querySelector(".comment");
const time = document.querySelector(".inputTime");
const btn = document.querySelector(".btn");
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
  <button class='like'><i class="fa fa-heart heart"></i></button>
  <button class="delete"><i class="fa fa-trash-o trash"></i></button>
  </div>
  `;
  body.insertAdjacentHTML("beforeend", hmtl);
};

// кнопка, запускающая рендер комментария
btn.addEventListener("click", function (e) {
  e.preventDefault();

  const name = nickname.value;
  const text = comment.value;
  const commentTime = time.value;

  renderComment(name, text, commentTime);
});

const btnLike = document.querySelector(".like");
const heart = document.querySelector(".heart");
// btnLike.addEventListener("click", function (e) {
//   e.preventDefault();
//   heart.classList.toggle("heart-active");
// });

/*https://www.youtube.com/watch?v=W_5wlQ2FUVI&ab_channel=JavaScriptFront */

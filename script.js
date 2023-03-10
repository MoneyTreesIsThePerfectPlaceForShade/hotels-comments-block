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
    // console.log(now.getDate());
    time = `Вчера, ${accurateTime.join(":")}`;
  }

  const hmtl = `
  <div class="commentRendered">
  <h1>${name}</h1>
  <p class="text">${text}</p>
  <p class="time">${time}</p>
  <button class="likeBtn" onclick="like(this)"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="heart" >
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>
</button>
  <button class="deleteBtn" onclick="deleteComment(this)"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="heart" style="color:#c00411">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
</button>
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

  // простейшая валидация, пока не стал запариваться, в реальной задачи использовал бы API или библиотеку, а пока следую KISS
  // также можно было бы не alert использовать, а сделать нормальное сообщение под текстом или с модальным окном, если останется время - сделаю красиво, а пока так, MVP так сказать
  if (name === "") {
    alert("Введите имя");
    return;
  }
  if (text === "") {
    alert("Введите комментарий");
    return;
  }

  renderComment(name, text, commentTime);
});

// активирует лайк и деактивирует
function like(_this) {
  const parent = _this.parentNode;
  parent.childNodes[7].childNodes[0].classList.toggle("liked");
}

// удаляет комментарий
function deleteComment(_this) {
  const comment = _this.parentNode;
  comment.remove();
}

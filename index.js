const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "live_tiIvDj23hbegwt66kRYC1MzhXvALN3leNop6lV6DibMhWhKKSiuo4g7cVJ3toJdd"
  });
  
var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

const catGrid = document.getElementById("cat");

async function fetchCats() { // асинк помечает функцию как асинхронную
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?page=0&limit=30" , requestOptions);
    const cats = await response.json(); // эвэитне позволяет коду идти дальше, мы принудительно говорим подождать завершения пежди чем пойти дальше
    displayCats(cats);
  } catch (error) {
    console.log("Ошибка" , error);
  }
}

function displayCats(cats) {
  try {
    catGrid.innerHTML = cats.map(function(cat) {
      return '<div class="cat-item">' +
             `<img src="${cat.url}" class="cat-img">` +
             `<button class="like-btn" onclick="addToFavorites('${cat.id}', '${cat.url}')">Like</button>` +
             '</div>';
}).join('');
  } catch (error) {
    catGrid.innerHTML = "Произошла ошибка";
    console.error("Ошибка отображения:", error);
  }
}

// Добавление в избранное
function addToFavorites(id, url) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.find(function(cat) { return cat.id === id; })) {
    favorites.push({ id: id, url: url });
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

// Показать избранных котиков
function showFavorites() {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  displayFavorites(favorites);
}

// Отображение избранных
function displayFavorites(cats) {
  try {
    catGrid.innerHTML = cats.map(function(cat) {
      return '<div class="cat-item">' +
             `<img src="${cat.url}" class="cat-img">` +
             `<button class="remove-btn" onclick="removeFromFavorites('${cat.id}')">Remove</button>` +
             '</div>';
    }).join('');
  } catch (error) {
    catGrid.innerHTML = "Нет избранных котиков";
    console.error("Ошибка отображения:", error);
  }
}

// Удаление из избранного
function removeFromFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(function(cat) { return cat.id !== id; });
  localStorage.setItem('favorites', JSON.stringify(favorites));
  showFavorites();
}

fetchCats();
................................................................................

// Функция для добавления лайка
function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

// Функция для удаления ляйка
function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

................................................................................

const likeButtonArray = document.querySelectorAll('.card__like-button');

iconButtonArray.forEach((iconButton, index) => {
  iconButton.onclick = () =>
    toggleIsLiked(likeHeartArray[index], likeButtonArray[index]);
});

likeButtonArray.forEach((button, index) => {
  button.onclick = () => toggleIsLiked(likeHeartArray[index], button);
});

function toggleIsLiked(heart, button) {
  heart.classList.toggle('is-liked');
  setButtonText(heart, button);
}

//

<button type="button" class="button card__like-button">
<span class="button__text">Like</span>
</button>


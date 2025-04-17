const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "live_tiIvDj23hbegwt66kRYC1MzhXvALN3leNop6lV6DibMhWhKKSiuo4g7cVJ3toJdd"
  });
  
var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

const catGrid = document.getElementById("cat"); // получчаем ссылку по айдишнику 

async function fetchCats(page = 0) { // асинк помечает функцию как асинхронную
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?page="+ page +"&limit=10&order=ASC" , requestOptions); // Отправляем асинхронный GET-запрос к API котиков (30 изображений)
    const cats = await response.json(); // эвэитне позволяет коду идти дальше, мы принудительно говорим подождать завершения пежди чем пойти дальше
    displayCats(cats); // Вызываем функцию для отображения котов
  } catch (error) { // Обработка ошибок
    console.log("Ошибка" , error); // Выводим ошибку в консоль 
  }
}

function displayCats(cats) {
  try {
    const lovepics = JSON.parse(localStorage.getItem('lovepics')) || [];
    catGrid.innerHTML = cats.map(function(cat) {
      const isLiked = lovepics.some(lovedCat => lovedCat.id === cat.id);
      return `<div class="cat-item" data-cat-id="${cat.id}">` +
             `<img src="${cat.url}" class="cat-img">` +
             `<button class="like-btn" onclick="addToFavorites('${cat.id}', '${cat.url}')">
  <svg class="heart-icon ${isLiked ? 'liked' : ''}" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
</button>` +
             '</div>';
    }).join('');
  } catch (error) {
    catGrid.innerHTML = "Произошла ошибка";
    console.error("Ошибка отображения:", error);
  }
}

// Обновленная функция addToFavorites
function addToFavorites(id, url) {
  let lovepics = JSON.parse(localStorage.getItem('lovepics')) || [];
  if (!lovepics.find(cat => cat.id === id)) {
    lovepics.push({ id: id, url: url });
    localStorage.setItem('lovepics', JSON.stringify(lovepics));
    // Обновляем сердечко
    const catItem = document.querySelector(`[data-cat-id="${id}"]`);
    if (catItem) {
      const heartIcon = catItem.querySelector('.heart-icon');
      heartIcon.classList.add('liked');
    }
  }
}

// Показать избранных котиков
function showFavorites() { // Функция для отображения избранных котиков
  let lovepics = JSON.parse(localStorage.getItem('lovepics')); //Получаем данные избранных котиков из localStorage:
  displayFavorites(lovepics);   //Передаем массив lovepics в функцию отображения
}

// Отображение избранных
function displayFavorites(cats) { // Функция для отображения избранных котиков
  try {
    catGrid.innerHTML = cats.map(function(cat) {  // Очищаем контейнер catGrid и заполняем новым контентом:
      return '<div class="cat-item">' +       // Для каждого котика создаем HTML-структуру:
             `<img src="${cat.url}" class="cat-img">` + // Изображение с URL из данных котика
             `<button class="remove-btn" onclick="removeFromFavorites('${cat.id}')">Remove</button>` +  // Кнопка удаления с вызовом функции removeFromFavorites при клике
             '</div>';
    }).join(''); // Объединяем массив в строку
  } catch (error) {
    catGrid.innerHTML = "Нет избранных котиков";
    console.error("Ошибка отображения:", error);
  }
}

// Обновленная функция removeFromFavorites
function removeFromFavorites(id) {
  let lovepics = JSON.parse(localStorage.getItem('lovepics')) || [];
  lovepics = lovepics.filter(cat => cat.id !== id);
  localStorage.setItem('lovepics', JSON.stringify(lovepics));
  // Обновляем сердечко в разделе "Все котики"
  const catItem = document.querySelector(`[data-cat-id="${id}"]`);
  if (catItem) {
    const heartIcon = catItem.querySelector('.heart-icon');
    heartIcon.classList.remove('liked');
  }
  showFavorites();
}

 document.getElementById("number").addEventListener("click", function(){
  fetchCats (1)
 })


fetchCats();

// сделать курсор поинтер, пока он считает строку 
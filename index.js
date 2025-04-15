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

function displayCats(cats) { // Объявление функции для отображения карточек с котиками
  try {
    catGrid.innerHTML = cats.map(function(cat) { // Преобразует массив объектов cats в массив HTML-строк, для каждого элемента массива вызывает функцию-колбэк
      return '<div class="cat-item">' + // Контейнер для карточки
             `<img src="${cat.url}" class="cat-img">` + // Тег img с URL изображения из данных котика (подставляем через шаблонную строку)
             `<button class="like-btn" onclick="addToFavorites('${cat.id}', '${cat.url}')">Like</button>` + // Кнопка лайка с вызовом функции addToFavorites при клике (передаем id и url котик
             '</div>';
}).join(''); // Преобразуем массив HTML-строк в одну строку 
  } catch (error) {
    catGrid.innerHTML = "Произошла ошибка";
    console.error("Ошибка отображения:", error);
  }
}

// Добавление в избранное
function addToFavorites(id, url) {// Функция для добавления котика в избранное 
  let lovepics = JSON.parse(localStorage.getItem('lovepics')); // Получаем текущий список избранного из localStorage:
  console.log("click", lovepics );
  if (!lovepics) {lovepics = []}
  if (!lovepics.find(function(cat) { return cat.id === id; })) {   // Проверяем, нет ли уже этого котика в избранном:
    lovepics.push({ id: id, url: url });// Создаем объект с id и url
    localStorage.setItem('lovepics', JSON.stringify(lovepics)); //Сохраняем обновленный массив в localStorage:
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

// Удаление из избранного
function removeFromFavorites(id) { // Функция для удаления котика из избранного
  let lovepics = JSON.parse(localStorage.getItem('lovepics'));   //Получаем текущий список избранных котиков из localStorage:
  lovepics = lovepics.filter(function(cat) { return cat.id !== id; });   //Фильтруем массив, оставляя только котиков с НЕсовпадающим id:
  localStorage.setItem('lovepics', JSON.stringify(lovepics));   //Сохраняем обновленный массив (без удаленного котика) в localStorage:
  showFavorites();
}

 document.getElementById("number").addEventListener("click", function(){
  fetchCats (1)
 })


fetchCats();

// сделать курсор поинтер, пока он считает строку 
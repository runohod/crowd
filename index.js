const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "live_tiIvDj23hbegwt66kRYC1MzhXvALN3leNop6lV6DibMhWhKKSiuo4g7cVJ3toJdd"
});

const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

const catGrid = document.getElementById("cat"); // получчаем ссылку по айдишнику 
const pagination = document.querySelector('.pagination-container'); // находим блок с классом .pagination-container
const indices = Array.from(document.querySelectorAll('.page-index')); // находим все страницы с индексом и преобразуем их в массив 
let currentPage = 1; // с помощь переменной задаем начало индексации

// Инициализация пагинации
function initPagination() { // создаем функцию
    indices.forEach((index, i) => { // итерация по массиву кнопок, indices - позволяют пользователю переключаться между страницами
        index.addEventListener('click', () => handlePaginationClick(index, i)); // Добавление обработчика клика на каждую кнопку, который вызывает handlePaginationClick
    });
    indices[0].classList.add('active'); // Установка первой кнопки (индекс 0) в активное состояние путём добавления класса active.
}

// Обработчик клика по пагинации
function handlePaginationClick(index, pageNumber) { // Объявление функции с двумя параметрами - текущая кнопка, индекс кнопки
    // Обновление стилей
    indices.forEach(idx => idx.classList.remove('active')); // Сбрасываем активное состояние со всех кнопок пагинации, удаляя класс active у каждой кнопки.
    index.classList.add('active'); // Добавляем класс что бы выделить кнопку как активную
    
    // Анимация переключения
    pagination.className = 'pagination-container'; // Сбрасывает все классы элемента пагинации, оставляя только базовый класс 'pagination-container'
    void pagination.offsetWidth; // Вызывает рефлоу (перерасчёт стилей), что необходимо для триггера анимации CSS
    pagination.classList.add('open', `i${pageNumber + 1}`);
    
    // Направление анимации
    if (currentPage > pageNumber) { // Условие — проверяет, является ли текущая страница (currentPage) больше новой страницы
        pagination.classList.add('flip'); // Действие — добавляет CSS-класс flip элементу pagination
    }
    
    // Обновление состояния
    currentPage = pageNumber;
    fetchCats(pageNumber); //Вызывает функцию fetchCats, передавая ей номер новой страницы.
}

// Загрузка данных с API
async function fetchCats(page = 0) { // асинк помечает функцию как асинхронную
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&order=ASC`, requestOptions); // Отправляем асинхронный GET-запрос к API котиков (30 изображений)
        const cats = await response.json(); // эвэитне позволяет коду идти дальше, мы принудительно говорим подождать завершения пежди чем пойти дальше
        displayCats(cats);  // Вызываем функцию для отображения котов
        pagination.style.display = 'block';
    } catch (error) { // Обработка ошибок
        console.error("Ошибка загрузки:", error); // Выводим ошибку в консоль 
    }
}

// Отображение котиков
function displayCats(cats) { // Объявление функции для отображения карточек с котиками
    const favorites = JSON.parse(localStorage.getItem('lovepics')); // Получаем данные из LocalStorage по ключу lovepics, JSON.parse преобразует строку в массив объектов
    
    catGrid.innerHTML = cats.map(cat => //Очищаем и обновляем содержимое контейнера catGrid map() преобразует массив котов в массив HTML-строк
        ` <div class="cat-item" data-cat-id="${cat.id}"> 
            <img src="${cat.url}" class="cat-img" alt="Котик ${cat.id}">
            <button class="like-btn" onclick="toggleLike('${cat.id}', '${cat.url}')">
                <svg class="heart-icon ${favorites.some(f => f.id === cat.id) ? 'liked' : ''}" 
                     viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
        </div>
    `).join(''); // Преобразуем массив HTML-строк в одну строку 
}

// Управление избранным
function toggleLike(id, url) {
    let favorites = JSON.parse(localStorage.getItem('lovepics')); // Извлекает массив избранных котов из localStorage по ключу lovepics и парсит его в объект
    const index = favorites.findIndex(cat => cat.id === id); // Находит индекс элемента в массиве favorites с заданным id
    const isFavoriteView = document.querySelector('.menu-item:last-child').classList.contains('active'); // Проверяет, находится ли пользователь в режиме просмотра избранных котов

    if (index === -1) { // Проверяет, если элемент не найден в массиве favorites
        favorites.push({ id, url }); // Добавляет новый объект { id, url } в массив.
    } else {
        favorites.splice(index, 1); //  Удаляет элемент из массива.
        
        // Если находимся в разделе избранного - сразу обновляем список
        if (isFavoriteView) {
            const catElement = document.querySelector(`[data-cat-id="${id}"]`); //  Находит HTML-элемент кота с данным id
            if (catElement) {
                catElement.style.transform = 'scale(0)';
                setTimeout(() => {
                    catElement.remove();
                    // Если список пустой
                    if (!document.querySelector('.cat-item')) {
                        catGrid.innerHTML = '<p class="empty-message">Нет избранных котиков</p>';
                    }
                }, 300);
            }
        }
    }
    
    localStorage.setItem('lovepics', JSON.stringify(favorites));
    updateLikeState(id);
    
    // Обновляем счетчик избранного в реальном времени
    if (isFavoriteView && index !== -1) {
        showFavorites();
    }
}
// Обновление состояния лайка
function updateLikeState(catId) {
    const catItem = document.querySelector(`[data-cat-id="${catId}"]`);
    if (catItem) {
        const heartIcon = catItem.querySelector('.heart-icon');
        const isLiked = JSON.parse(localStorage.getItem('lovepics'))
            .some(f => f.id === catId);
            
        heartIcon.classList.toggle('liked', isLiked);
    }
}

// Показать избранное
function showFavorites() {
    const favorites = JSON.parse(localStorage.getItem('lovepics')) || [];
    pagination.style.display = 'none';
    
    if (favorites.length > 0) {
        catGrid.innerHTML = favorites.map(cat => `
            <div class="cat-item">
                <img src="${cat.url}" class="cat-img" alt="Избранный котик">
                <button class="like-btn" onclick="toggleLike('${cat.id}')">
                    <svg class="heart-icon liked" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
            </div>
        `).join('');
    } else {
        catGrid.innerHTML = '<p class="empty-message">Нет избранных котиков</p>';
    }
}

// Всплывающие уведомления
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

// Управление активным меню
function setActive(element) {
    document.querySelectorAll('.menu-item').forEach(item => 
        item.classList.remove('active'));
    element.classList.add('active');
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initPagination();
    fetchCats();
});
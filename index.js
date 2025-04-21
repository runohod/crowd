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
    fetchCats(pageNumber);
}

// Загрузка данных с API
async function fetchCats(page = 0) {
    try {
        const response = await fetch(
            `https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&order=ASC`, 
            requestOptions
        );
        const cats = await response.json();
        displayCats(cats);
        pagination.style.display = 'block';
    } catch (error) {
        console.error("Ошибка загрузки:", error);
        catGrid.innerHTML = "<p>Не удалось загрузить котиков 😿</p>";
    }
}

// Отображение котиков
function displayCats(cats) {
    const favorites = JSON.parse(localStorage.getItem('lovepics')) || [];
    
    catGrid.innerHTML = cats.map(cat => `
        <div class="cat-item" data-cat-id="${cat.id}">
            <img src="${cat.url}" class="cat-img" alt="Котик ${cat.id}">
            <button class="like-btn" onclick="toggleLike('${cat.id}', '${cat.url}')">
                <svg class="heart-icon ${favorites.some(f => f.id === cat.id) ? 'liked' : ''}" 
                     viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
        </div>
    `).join('');
}

// Управление избранным
function toggleLike(id, url) {
    let favorites = JSON.parse(localStorage.getItem('lovepics')) || [];
    const index = favorites.findIndex(cat => cat.id === id);
    const isFavoriteView = document.querySelector('.menu-item:last-child').classList.contains('active');

    if (index === -1) {
        favorites.push({ id, url });
        showNotification('❤️ Добавлено в избранное!');
    } else {
        favorites.splice(index, 1);
        showNotification('💔 Удалено из избранного');
        
        // Если находимся в разделе избранного - сразу обновляем список
        if (isFavoriteView) {
            const catElement = document.querySelector(`[data-cat-id="${id}"]`);
            if (catElement) {
                catElement.style.transform = 'scale(0)';
                setTimeout(() => {
                    catElement.remove();
                    // Если список пустой - показываем сообщение
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
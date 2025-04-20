const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "live_tiIvDj23hbegwt66kRYC1MzhXvALN3leNop6lV6DibMhWhKKSiuo4g7cVJ3toJdd"
});

const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

// DOM элементы
const catGrid = document.getElementById("cat");
const pagination = document.querySelector('.pagination-container');
const indices = Array.from(document.querySelectorAll('.page-index'));
let currentPage = 0;

// Инициализация пагинации
indices.forEach((index, i) => {
    index.addEventListener('click', () => {
        // Анимация переключения
        pagination.className = 'pagination-container';
        void pagination.offsetWidth;
        pagination.classList.add('open', `i${i + 1}`);
        if (currentPage > i) pagination.classList.add('flip');
        currentPage = i;
        
        // Загрузка данных
        fetchCats(i);
    });
});

// Загрузка котиков
async function fetchCats(page = 0) {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&order=ASC`, requestOptions);
        const cats = await response.json();
        displayCats(cats);
        pagination.style.display = 'block';
    } catch (error) {
        console.error("Ошибка загрузки:", error);
    }
}

// Отображение котиков
function displayCats(cats) {
    const lovepics = JSON.parse(localStorage.getItem('lovepics')) || [];
    catGrid.innerHTML = cats.map(cat => `
        <div class="cat-item" data-cat-id="${cat.id}">
            <img src="${cat.url}" class="cat-img">
            <button class="like-btn" onclick="toggleLike('${cat.id}', '${cat.url}')">
                <svg class="heart-icon ${lovepics.some(l => l.id === cat.id) ? 'liked' : ''}" 
                     viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
        </div>
    `).join('');
}

// Управление избранным
function toggleLike(id, url) {
    let lovepics = JSON.parse(localStorage.getItem('lovepics')) || [];
    const index = lovepics.findIndex(cat => cat.id === id);
    
    if (index === -1) {
        lovepics.push({ id, url });
    } else {
        lovepics.splice(index, 1);
    }
    
    localStorage.setItem('lovepics', JSON.stringify(lovepics));
    displayCats(JSON.parse(localStorage.getItem('lovepics')));
}

// Показать избранное
function showFavorites() {
    const lovepics = JSON.parse(localStorage.getItem('lovepics')) || [];
    pagination.style.display = 'none';
    catGrid.innerHTML = lovepics.map(cat => `
        <div class="cat-item">
            <img src="${cat.url}" class="cat-img">
            <button class="like-btn" onclick="toggleLike('${cat.id}')">
                <svg class="heart-icon liked" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
        </div>
    `).join('') || '<p>Нет избранных котиков</p>';
}

// Активация меню
function setActive(element) {
    document.querySelectorAll('.menu-item').forEach(item => 
        item.classList.remove('active'));
    element.classList.add('active');
}

// Первоначальная загрузка
fetchCats();
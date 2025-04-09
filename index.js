const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "live_tiIvDj23hbegwt66kRYC1MzhXvALN3leNop6lV6DibMhWhKKSiuo4g7cVJ3toJdd"
  });
  
var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};
 
// схранять котов у локал сторедж . А при удаление котво из избаранных кота нужно подчищать в локал сторадж

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
    catGrid.innerHTML = cats.map(cat => '<div>"img.src = cat.url"</div>').join('');
  } catch (error) {
    catGrid.innerHTML = "Произошла ошибка";
    console.error("Ошибка отображения:", error);
  }
}

fetchCats();




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

// Функция постановки и снятия лайка

export function toggleLikeActive(evt, data, likeCountElement) {
  const likeBtn = evt.target;

  if (!likeBtn.classList.contains("card__like-button_is-active")) {
    putLike(data._id)
      .then((res) => {
        likeBtn.classList.add("card__like-button_is-active");
        likesСounter(res, likeCountElement, likeBtn);
      })
      .catch(console.error);
  } else {
    deleteLike(data._id)
      .then((res) => {
        likeBtn.classList.remove("card__like-button_is-active");
        likesСounter(res, likeCountElement, likeBtn);
      })
      .catch(console.error);
  }
}

//catGrid.inerdHtml= [1,2,3,4,5].map((item)=>"<div>${item}</div>").join('')

// function displayCats(cats) {
//   try { cats.forEach(cat => {
//     const img = document.createElement("img");
//     img.src = cat.url;
//     img.classList.add("cat-img");
//     catGrid.appendChild(img);
//   });
// }

//   catch (error) {
//     catGrid.innerHTML = "Произошла ошибки";
//   }
// }


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
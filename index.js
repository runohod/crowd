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

async function fetchCats() {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?page=0&limit=30" , requestOptions);
    const cats = await response.json();
    displayCats(cats);
  } catch (error) {
    console.log("Ошибка" , error);
  }
}

function displayCats(cats) {
  try {
    catGrid.innerHTML = [cats].map(cat => '<div>"img.src = cat.url"</div>').join('');
  } catch (error) {
    catGrid.innerHTML = "Произошла ошибка";
    console.error("Ошибка отображения:", error);
  }
}

fetchCats();


function displayCats(cats) {
  try {
    catGrid.innerHTML = [cats].map(cat => `<img src="${cat.url}" class="cat-img" />`).join('');
  } catch (error) {
    catGrid.innerHTML = "Произошла ошибка";
    console.error("Ошибка отображения:", error);
  }
}

fetchCats();

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
